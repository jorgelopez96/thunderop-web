<script lang="ts">
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';
	import { getI18n } from '#lib/i18n/context.svelte.js';
	import { cuentaMessages } from '#lib/i18n/cuenta-messages.js';
	import { emailRecordado, entrar, entrarCon, mensajeError } from '#lib/cuenta.svelte.js';
	import { ClientResponseError } from 'pocketbase';
	import PaginaCuenta from '#lib/components/cuenta/PaginaCuenta.svelte';
	import Clave from '#lib/components/cuenta/Clave.svelte';
	import BotonGoogle from '#lib/components/cuenta/BotonGoogle.svelte';

	const i18n = getI18n();
	const t = $derived(cuentaMessages[i18n.locale]);
	let identidad = $state('');
	let pass = $state('');
	let recordar = $state(true);
	let error = $state('');
	let ocupado = $state(false);
	onMount(() => { identidad ||= emailRecordado(); });

	async function enviar(ev: SubmitEvent) {
		ev.preventDefault();
		error = '';
		ocupado = true;
		try {
			await entrar(identidad.trim(), pass, recordar);
			await goto('/cuenta');
		} catch (e) {
			error = mensajeError(e, t.errores);
		} finally {
			ocupado = false;
		}
	}

	async function conProveedor(p: 'google' | 'microsoft') {
		error = '';
		const ventana = window.open('', 'thunderop-oauth', 'width=500,height=650');
		if (!ventana) { error = t.errores.popup; return; }
		try {
			await entrarCon(p, ventana, recordar);
			await goto('/cuenta');
		} catch (e) {
			if (e instanceof ClientResponseError && e.isAbort) return; // cerró el popup: no es un error
			error = mensajeError(e, t.errores);
		}
	}
</script>

<PaginaCuenta titulo={t.entrar.titulo}>
	<form onsubmit={enviar}>
		<label>{t.entrar.identidad} <input bind:value={identidad} required autocomplete="username" /></label>
		<Clave etiqueta={t.comun.clave} bind:value={pass} autocomplete="current-password" />
		<div class="fila">
			<label class="casilla"><input type="checkbox" bind:checked={recordar} /> {t.entrar.recordar}</label>
			<a href="/olvide">{t.entrar.olvide}</a>
		</div>
		{#if error}<p role="alert">{error}</p>{/if}
		<button type="submit" class="button button-primary" disabled={!i18n.ready || ocupado}>{t.entrar.enviar}</button>
	</form>
	<div class="separador"><span>{t.entrar.o}</span></div>
	<BotonGoogle etiqueta={t.entrar.google} disabled={!i18n.ready} onclick={() => conProveedor('google')} />
	<div class="enlaces centro">
		<span>{t.entrar.sinCuenta} <a href="/crear-cuenta">{t.entrar.crear}</a></span>
		<a href="/verificar">{t.entrar.confirmar}</a>
	</div>
</PaginaCuenta>

<style>
	.fila { display: flex; align-items: center; justify-content: space-between; gap: 12px; flex-wrap: wrap; font-size: 13px; }
</style>
