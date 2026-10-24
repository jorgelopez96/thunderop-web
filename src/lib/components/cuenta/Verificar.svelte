<script lang="ts">
	import { onMount } from 'svelte';
	import { getI18n } from '#lib/i18n/context.svelte.js';
	import { cuentaMessages } from '#lib/i18n/cuenta-messages.js';
	import { mensajeError, pedirCodigo, verificar } from '#lib/cuenta.svelte.js';
	import { soloDigitos } from '#lib/reglasCuenta.js';

	let { email: inicial = '', recienEnviado = false, alVerificar }: { email?: string; recienEnviado?: boolean; alVerificar: () => void | Promise<void> } = $props();
	const i18n = getI18n();
	const t = $derived(cuentaMessages[i18n.locale]);

	let escrito = $state('');
	const email = $derived(inicial || escrito);
	let codigo = $state('');
	let error = $state('');
	let aviso = $state('');
	let ocupado = $state(false);
	let espera = $state(0);
	let hecho = false; // el código ya se consumió: si falla lo que sigue, no se vuelve a pedir

	onMount(() => {
		if (recienEnviado) espera = 60;
		const reloj = setInterval(() => { if (espera > 0) espera--; }, 1000);
		return () => clearInterval(reloj);
	});

	async function confirmar(ev: SubmitEvent) {
		ev.preventDefault();
		error = aviso = '';
		ocupado = true;
		try {
			if (!hecho) { await verificar(email.trim(), codigo); hecho = true; }
			await alVerificar();
		} catch (e) {
			error = mensajeError(e, t.errores);
		} finally {
			ocupado = false;
		}
	}

	async function reenviar() {
		error = aviso = '';
		try {
			await pedirCodigo(email.trim(), 'verificar');
			aviso = t.verificar.nuevo;
			espera = 60;
		} catch (e) {
			error = mensajeError(e, t.errores);
		}
	}
</script>

<p>{t.verificar.cuerpo}</p>
<form onsubmit={confirmar}>
	{#if inicial}
		<p><small>{inicial}</small></p>
	{:else}
		<label>{t.comun.email} <input type="email" bind:value={escrito} required autocomplete="email" /></label>
	{/if}
	<label>{t.comun.codigo}
		<input bind:value={codigo} required inputmode="numeric" maxlength="6" oninput={() => (codigo = soloDigitos(codigo))} onpaste={(e) => { e.preventDefault(); codigo = soloDigitos(e.clipboardData?.getData('text') ?? ''); }} autocomplete="one-time-code" placeholder="123456" />
	</label>
	{#if error}<p role="alert">{error}</p>{/if}
	{#if aviso}<p role="status">{aviso}</p>{/if}
	<button type="submit" class="button button-primary" disabled={!i18n.ready || ocupado || codigo.length !== 6}>{t.verificar.enviar}</button>
</form>
<div class="enlaces">
	<button type="button" class="enlace" disabled={espera > 0 || !email.trim()} onclick={reenviar}>
		{t.comun.reenviar}{espera > 0 ? ` (${espera} ${t.comun.segundos})` : ''}
	</button>
</div>
