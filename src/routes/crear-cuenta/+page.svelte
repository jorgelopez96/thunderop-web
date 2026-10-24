<script lang="ts">
	import { goto } from '$app/navigation';
	import { getI18n } from '#lib/i18n/context.svelte.js';
	import { cuentaMessages } from '#lib/i18n/cuenta-messages.js';
	import { entrar, leerTerminos, mensajeError, registrarse, traducir } from '#lib/cuenta.svelte.js';
	import { errorClave, errorEdad, errorUsuario, normalizarUsuario } from '#lib/reglasCuenta.js';
	import PaginaCuenta from '#lib/components/cuenta/PaginaCuenta.svelte';
	import Requisitos from '#lib/components/cuenta/Requisitos.svelte';
	import Clave from '#lib/components/cuenta/Clave.svelte';
	import Terminos from '#lib/components/cuenta/Terminos.svelte';
	import Verificar from '#lib/components/cuenta/Verificar.svelte';

	const i18n = getI18n();
	const t = $derived(cuentaMessages[i18n.locale]);
	let email = $state('');
	let usuario = $state('');
	let name = $state('');
	let pass = $state('');
	let repetida = $state('');
	let nacimiento = $state('');
	let acepto = $state(false);
	let error = $state('');
	let aviso = $state('');
	let ocupado = $state(false);
	// Lo que se tipeó, en memoria hasta confirmar el código, para entrar solo después (la contraseña nunca se guarda).
	let pendiente = $state<{ email: string; usuario: string; pass: string } | null>(null);
	const hoy = new Date().toISOString().slice(0, 10);

	async function enviar(ev: SubmitEvent) {
		ev.preventDefault();
		error = traducir(errorUsuario(normalizarUsuario(usuario)) || errorClave(pass) || errorEdad(nacimiento, new Date()), t.errores);
		if (!error && pass !== repetida) error = t.errores.noCoinciden;
		if (!error && !acepto) error = t.errores.aceptar;
		if (error) return;
		ocupado = true;
		try {
			const datos = { email: email.trim(), username: normalizarUsuario(usuario), name: name.trim(), password: pass, nacimiento, terminos: await leerTerminos() };
			await registrarse(datos);
			pendiente = { email: datos.email, usuario: datos.username, pass };
		} catch (e) {
			error = mensajeError(e, t.errores);
		} finally {
			ocupado = false;
		}
	}

	async function verificado() {
		const p = pendiente!;
		try {
			await entrar(p.usuario, p.pass);
			await goto('/cuenta');
		} catch {
			aviso = t.verificar.listo;
		}
	}
</script>

{#if pendiente}
	<PaginaCuenta titulo={t.verificar.titulo}>
		{#if aviso}
			<p role="status">{aviso}</p>
			<a class="button button-primary" href="/entrar">{t.comun.irEntrar}</a>
		{:else}
			<Verificar email={pendiente.email} recienEnviado alVerificar={verificado} />
		{/if}
	</PaginaCuenta>
{:else}
	<PaginaCuenta titulo={t.crear.titulo}>
		<form onsubmit={enviar}>
			<label>{t.comun.email} <input type="email" bind:value={email} required autocomplete="email" /></label>
			<label>{t.comun.usuario} <input bind:value={usuario} required maxlength="20" autocomplete="username" placeholder={t.crear.phUsuario} /></label>
			<label>{t.comun.apodo} <input bind:value={name} required maxlength="32" autocomplete="nickname" placeholder={t.crear.phApodo} /></label>
			<Clave etiqueta={t.comun.clave} bind:value={pass} autocomplete="new-password" />
			<Requisitos clave={pass} />
			<Clave etiqueta={t.comun.repetir} bind:value={repetida} autocomplete="new-password" />
			<label>{t.comun.nacimiento} <input type="date" bind:value={nacimiento} required max={hoy} /></label>
			<Terminos bind:aceptado={acepto} />
			{#if error}<p role="alert">{error}</p>{/if}
			<button type="submit" class="button button-primary" disabled={!i18n.ready || ocupado}>{t.crear.enviar}</button>
		</form>
		<div class="enlaces centro"><span>{t.crear.yaTengo} <a href="/entrar">{t.crear.entrar}</a></span></div>
	</PaginaCuenta>
{/if}
