<script lang="ts">
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';
	import { getI18n } from '#lib/i18n/context.svelte.js';
	import { cuentaMessages } from '#lib/i18n/cuenta-messages.js';
	import { cargarEstado, cuenta, mensajeError, pedirDescarga, salir, sesion } from '#lib/cuenta.svelte.js';
	import { ClientResponseError } from 'pocketbase';
	import PaginaCuenta from '#lib/components/cuenta/PaginaCuenta.svelte';

	const i18n = getI18n();
	const t = $derived(cuentaMessages[i18n.locale]);
	const aCompletar = $derived(cuenta.falta?.some((f) => f !== 'verificar') ?? false);
	let errorDescarga = $state('');
	let descargando = $state(false);

	onMount(() => {
		if (!sesion.usuario) return void goto('/entrar');
		void cargarEstado();
	});

	// Con la cuenta completa alcanza la sesión: el servidor valida el token y da el link.
	async function descargar() {
		errorDescarga = '';
		descargando = true;
		try {
			window.location.href = await pedirDescarga();
		} catch (e) {
			errorDescarga = e instanceof ClientResponseError ? mensajeError(e, t.errores) : t.cuenta.falloDescarga;
		}
		finally { descargando = false; }
	}

	async function cerrar() {
		salir();
		await goto('/');
	}
</script>

<PaginaCuenta titulo={t.cuenta.titulo}>
	{#if sesion.usuario}
		<p><strong>@{sesion.usuario.username}</strong>{#if sesion.usuario.email} · {sesion.usuario.email}{/if}</p>
	{/if}
	{#if cuenta.falta === null}
		{#if cuenta.error}
			<p role="alert">{mensajeError(cuenta.error, t.errores)}</p>
			<button type="button" class="button button-secondary" onclick={cargarEstado}>{t.cuenta.reintentar}</button>
		{:else}
			<p>{t.cuenta.cargando}</p>
		{/if}
	{:else if cuenta.falta.length}
		<p>{t.cuenta.incompleta}</p>
		<ul>{#each cuenta.falta as f}<li>{t.cuenta.falta[f]}</li>{/each}</ul>
		{#if cuenta.falta.includes('verificar')}<a class="button button-primary" href="/verificar">{t.cuenta.verificar}</a>{/if}
		{#if aCompletar}<a class="button button-primary" href="/completar">{t.cuenta.completar}</a>{/if}
	{:else}
		<p role="status">{t.cuenta.lista}</p>
		<button type="button" class="button button-primary" disabled={!i18n.ready || descargando} onclick={descargar}>{descargando ? t.cuenta.descargando : t.cuenta.descargar}</button>
		{#if errorDescarga}<p role="alert">{errorDescarga}</p>{/if}
	{/if}
	<button type="button" class="button button-secondary" onclick={cerrar}>{t.cuenta.salir}</button>
</PaginaCuenta>

<style>
	ul { margin: 0; padding-left: 20px; color: #d9d2f2; line-height: 1.8; }
</style>
