import PocketBase, { AsyncAuthStore } from 'pocketbase';
import { browser } from '$app/env';
import { PUBLIC_PB_URL } from '$app/env/public';

// La sesión va a localStorage con "Recordar mi cuenta" y a sessionStorage (solo esta pestaña) sin él.
// La preferencia (`dm.recordar`) se anota antes de entrar, así el token ya se guarda en el lugar correcto.
const CLAVE = 'pocketbase_auth';
const recuerda = () => { try { return localStorage.getItem('dm.recordar') !== '0'; } catch { return true; } };
function guardar(datos: string) {
	try {
		(recuerda() ? localStorage : sessionStorage).setItem(CLAVE, datos);
		(recuerda() ? sessionStorage : localStorage).removeItem(CLAVE);
	} catch { /* almacenamiento bloqueado: la sesión dura lo que la página */ }
}
function borrar() {
	try { localStorage.removeItem(CLAVE); sessionStorage.removeItem(CLAVE); } catch { /* idem */ }
}
function inicial() {
	try { return sessionStorage.getItem(CLAVE) ?? localStorage.getItem(CLAVE) ?? undefined; } catch { return undefined; }
}

export const pb = new PocketBase(PUBLIC_PB_URL, browser ? new AsyncAuthStore({ save: async (s) => guardar(s), clear: async () => borrar(), initial: inicial() }) : undefined);
