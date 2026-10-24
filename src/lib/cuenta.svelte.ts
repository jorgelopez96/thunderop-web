// Cuenta y sesión: las mismas funciones que la app (app/src/lib/cuenta.svelte.ts y sesion.svelte.ts),
// salvo `entrarCon`, que en el navegador usa el popup normal de PocketBase.
import { browser } from '$app/env';
import { PUBLIC_PB_URL } from '$app/env/public';
import { ClientResponseError, type RecordModel } from 'pocketbase';
import { pb } from './pb';
import { cuentaMessages, type CuentaMensajes } from './i18n/cuenta-messages';

export type Falta = 'verificar' | 'invitacion' | 'terminos' | 'perfil';

// En el servidor no hay sesión (vive en el localStorage del navegador).
export const sesion = $state<{ usuario: RecordModel | null }>({ usuario: browser && pb.authStore.isValid ? pb.authStore.record : null });
if (browser) pb.authStore.onChange(() => {
	const nuevo = pb.authStore.isValid ? pb.authStore.record : null;
	if (nuevo?.id !== sesion.usuario?.id) cuenta.falta = null; // otra cuenta (o ninguna): el estado guardado no es suyo
	sesion.usuario = nuevo;
});

/** Lo que le falta a la cuenta actual (null = todavía no se consultó o falló: el motivo queda en `error`). */
export const cuenta = $state<{ falta: Falta[] | null; menor: boolean; terminosVigente: number; error: unknown }>({ falta: null, menor: false, terminosVigente: 0, error: null });

const post = (ruta: string, body: object) => pb.send(`/api/cuenta/${ruta}`, { method: 'POST', body });

/** No lanza. Si falla y ya había un estado, lo conserva (un corte suelto no cambia la pantalla); si no, el motivo queda en `error`. */
export async function cargarEstado() {
	try {
		const e = await pb.send('/api/cuenta/estado', {});
		cuenta.falta = e.falta;
		cuenta.menor = e.menor;
		cuenta.terminosVigente = e.terminosVigente;
		cuenta.error = null;
	} catch (e) {
		if (cuenta.falta !== null) return;
		cuenta.error = e;
	}
}

/** Versión de términos vigente (sin sesión); es la que hay que mandar al registrarse. */
export async function leerTerminos(): Promise<number> {
	cuenta.terminosVigente = (await pb.send('/api/cuenta/terminos', {})).version;
	return cuenta.terminosVigente;
}

export const pedirCodigo = (email: string, tipo: 'verificar' | 'restablecer') => post('codigo', { email, tipo });
export const verificar = (email: string, codigo: string) => post('verificar', { email, codigo });
export const restablecer = (email: string, codigo: string, password: string) => post('restablecer', { email, codigo, password });

export async function ponerInvitacion(codigo: string) { await post('invitacion', { codigo }); await cargarEstado(); }
// authRefresh trae el usuario elegido (la sesión tenía el que se puso al azar al entrar con Google/Microsoft).
export async function completar(datos: { username: string; nacimiento: string; terminos: number }) {
	await post('completar', datos);
	await pb.collection('users').authRefresh().catch(() => {}); // ya quedó completo: si falla, se ve al volver a entrar
	await cargarEstado();
}
export async function aceptarTerminos(version: number) { await post('terminos', { version }); await cargarEstado(); }

/** Link del instalador, si el servidor acepta el código o (sin código) la sesión de una cuenta completa. Se pide desde el navegador:
 *  así el límite por IP del servidor es de cada visitante, y el link no está en el HTML ni en el código de la página. */
export async function pedirDescarga(codigo?: string): Promise<string> {
	const { url } = await pb.send('/api/descarga/validar', { method: 'POST', body: codigo === undefined ? {} : { codigo: codigo.trim().slice(0, 100) } });
	return linkSeguro(url);
}

/** Solo un link al mismo servidor (https, o http si el servidor mismo es http en desarrollo); si no, lanza. */
export function linkSeguro(url: unknown): string {
	const pbUrl = new URL(PUBLIC_PB_URL);
	let u: URL;
	try { u = new URL(String(url)); } catch { throw new Error('link de descarga inválido'); }
	const protocolos = pbUrl.protocol === 'http:' ? ['https:', 'http:'] : ['https:'];
	if (!protocolos.includes(u.protocol) || u.host !== pbUrl.host) throw new Error('link de descarga inválido');
	return u.href;
}

/** `ventana` la abre quien llama, en el mismo clic (si no, el navegador la bloquea). Si la cierran antes de terminar,
 *  se cancela el pedido y authWithOAuth2 rechaza con `isAbort` (sin esto, el SDK espera y termina en un error de conexión). */
export async function entrarCon(proveedor: 'google' | 'microsoft', ventana: Window, recordar = true) {
	const clave = `oauth-${Date.now()}`;
	const vigilar = setInterval(() => { if (ventana.closed) pb.cancelRequest(clave); }, 500);
	elegirRecordar(recordar);
	try {
		await pb.collection('users').authWithOAuth2({ provider: proveedor, requestKey: clave, urlCallback: (url) => { ventana.location.href = url; } });
		anotar(recordar, '');
	} finally {
		clearInterval(vigilar);
		ventana.close();
	}
}

// "Recordar mi cuenta": la contraseña nunca se guarda; persiste el token (dura 30 días).
// Sin recordar, el token va a sessionStorage (ver pb.ts) y la bandera de sessionStorage marca que esta pestaña ya inició sesión:
// en otra pestaña o al reabrir el navegador no está y la sesión se descarta.
const RECORDAR = 'dm.recordar', EN_CURSO = 'dm.sesion', EMAIL = 'dm.email';

/** Antes de entrar: decide dónde va a guardar el token pb.ts. */
function elegirRecordar(recordar: boolean) {
	try { localStorage.setItem(RECORDAR, recordar ? '1' : '0'); } catch { /* sin almacenamiento */ }
}

export function anotar(recordar: boolean, email: string) {
	try {
		localStorage.setItem(RECORDAR, recordar ? '1' : '0');
		sessionStorage.setItem(EN_CURSO, '1');
		if (recordar) localStorage.setItem(EMAIL, email); else localStorage.removeItem(EMAIL);
	} catch { /* almacenamiento bloqueado: se comporta como recordar */ }
}

/** Email de la última sesión recordada ('' si no hay). */
export function emailRecordado(): string {
	try { return localStorage.getItem(EMAIL) ?? ''; } catch { return ''; }
}

/** Revalida el token guardado contra el servidor; si falla (vencido, usuario borrado) cierra la sesión. */
export async function validarSesionAlIniciar() {
	if (!pb.authStore.token) return;
	try {
		if (localStorage.getItem(RECORDAR) === '0' && !sessionStorage.getItem(EN_CURSO)) { pb.authStore.clear(); return; }
	} catch { /* sin almacenamiento: se sigue como recordar */ }
	try { await pb.collection('users').authRefresh(); } catch (e) {
		// Solo 401/403/404 invalidan la sesión; red caída (0) o 5xx conservan la guardada.
		if (e instanceof ClientResponseError && [401, 403, 404].includes(e.status)) pb.authStore.clear();
	}
}

/** `identidad` es el usuario o el mail. */
export async function entrar(identidad: string, pass: string, recordar = true) {
	elegirRecordar(recordar);
	await pb.collection('users').authWithPassword(identidad, pass);
	anotar(recordar, identidad);
}

/** Crea la cuenta y manda el código por mail; no entra hasta confirmarlo (después: `verificar` y `entrar`). */
export async function registrarse(datos: { email: string; username: string; name: string; password: string; nacimiento: string; terminos: number }) {
	await pb.collection('users').create({ ...datos, passwordConfirm: datos.password });
	await pedirCodigo(datos.email, 'verificar');
}

export function salir() { pb.authStore.clear(); }

type Errores = CuentaMensajes['errores'];

/** Pasa un mensaje en castellano (de reglasCuenta o del servidor) al idioma de la página; si no lo conoce, lo deja igual. */
export function traducir(mensaje: string, t: Errores): string {
	const clave = (Object.keys(t) as (keyof Errores)[]).find((k) => cuentaMessages.es.errores[k] === mensaje);
	return clave ? t[clave] : mensaje;
}

/** Mensaje de error para mostrar; si no se reconoce, el mensaje original del servidor. */
export function mensajeError(e: unknown, t: Errores): string {
	if (!(e instanceof ClientResponseError) || e.status === 0) return t.conexion;
	if (e.status === 403 && Array.isArray(e.response?.falta)) { cuenta.falta = e.response.falta as Falta[]; return t.completa; }
	const campos = Object.entries(e.response?.data ?? {}) as [string, { code?: string }][];
	const en = (c: string) => campos.find(([k]) => k === c)?.[1];
	if (en('username')?.code === 'validation_not_unique') return t.usuarioRepetido;
	if (en('email')?.code === 'validation_not_unique') return t.emailRepetido;
	if (en('email')) return t.email;
	if (en('password')) return t.clave;
	if (en('name')) return t.apodo;
	if (e.status === 400 && /authenticate/i.test(e.message)) return t.datos;
	if (e.status === 429) return t.intentos;
	return traducir(e.message, t);
}
