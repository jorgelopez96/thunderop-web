<script lang="ts">
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';
	import { getI18n } from '#lib/i18n/context.svelte.js';
	import { cuentaMessages } from '#lib/i18n/cuenta-messages.js';
	import { aceptarTerminos, cargarEstado, completar, cuenta, leerTerminos, mensajeError, ponerInvitacion, sesion, traducir } from '#lib/cuenta.svelte.js';
	import { errorEdad, errorUsuario, normalizarUsuario } from '#lib/reglasCuenta.js';
	import PaginaCuenta from '#lib/components/cuenta/PaginaCuenta.svelte';
	import Terminos from '#lib/components/cuenta/Terminos.svelte';

	const i18n = getI18n();
	const t = $derived(cuentaMessages[i18n.locale]);
	// Una cosa por vez, en el orden del servidor: invitación, después perfil o términos. Confirmar el mail va en /verificar.
	const paso = $derived(cuenta.falta?.includes('invitacion') ? 'invitacion' : cuenta.falta?.includes('perfil') ? 'perfil' : cuenta.falta?.includes('terminos') ? 'terminos' : null);

	let codigo = $state('');
	let usuario = $state('');
	let nacimiento = $state('');
	let acepto = $state(false);
	let error = $state('');
	let ocupado = $state(false);
	const hoy = new Date().toISOString().slice(0, 10);

	onMount(async () => {
		if (!sesion.usuario) return goto('/entrar');
		await cargarEstado();
		if (cuenta.error) error = mensajeError(cuenta.error, t.errores);
		else if (!paso) await goto('/cuenta');
	});

	async function enviar(ev: SubmitEvent) {
		ev.preventDefault();
		error = '';
		if (paso === 'perfil') {
			error = traducir(errorUsuario(normalizarUsuario(usuario)) || errorEdad(nacimiento, new Date()), t.errores);
			if (!error && !acepto) error = t.errores.aceptar;
			if (error) return;
		}
		ocupado = true;
		try {
			if (paso === 'invitacion') await ponerInvitacion(codigo.trim());
			else if (paso === 'perfil') await completar({ username: normalizarUsuario(usuario), nacimiento, terminos: await leerTerminos() });
			else await aceptarTerminos(await leerTerminos());
			acepto = false;
			if (!paso) await goto('/cuenta');
		} catch (e) {
			error = mensajeError(e, t.errores);
		} finally {
			ocupado = false;
		}
	}
</script>

<PaginaCuenta titulo={t.completar.titulo}>
	{#if paso}
		<form onsubmit={enviar}>
			{#if paso === 'invitacion'}
				<p>{t.completar.invitacion}</p>
				<label>{t.completar.codigoInvitacion} <input bind:value={codigo} required autocomplete="off" /></label>
			{:else if paso === 'perfil'}
				<p>{t.completar.perfil}</p>
				<label>{t.comun.usuario} <input bind:value={usuario} required maxlength="20" autocomplete="username" /></label>
				<label>{t.comun.nacimiento} <input type="date" bind:value={nacimiento} required max={hoy} /></label>
				<Terminos bind:aceptado={acepto} />
			{:else}
				<p>{t.completar.terminos}</p>
				<Terminos bind:aceptado={acepto} />
			{/if}
			{#if error}<p role="alert">{error}</p>{/if}
			<button type="submit" class="button button-primary" disabled={!i18n.ready || ocupado || (paso === 'terminos' && !acepto)}>{t.completar.seguir}</button>
		</form>
	{:else if error}
		<p role="alert">{error}</p>
	{:else}
		<p>{t.cuenta.cargando}</p>
	{/if}
</PaginaCuenta>
