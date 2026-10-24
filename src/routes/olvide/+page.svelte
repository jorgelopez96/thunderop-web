<script lang="ts">
	import { onMount } from 'svelte';
	import { getI18n } from '#lib/i18n/context.svelte.js';
	import { cuentaMessages } from '#lib/i18n/cuenta-messages.js';
	import { mensajeError, pedirCodigo, restablecer, traducir } from '#lib/cuenta.svelte.js';
	import { errorClave, soloDigitos } from '#lib/reglasCuenta.js';
	import PaginaCuenta from '#lib/components/cuenta/PaginaCuenta.svelte';
	import Requisitos from '#lib/components/cuenta/Requisitos.svelte';

	const i18n = getI18n();
	const t = $derived(cuentaMessages[i18n.locale]);
	let paso = $state<'mail' | 'codigo' | 'listo'>('mail');
	let email = $state('');
	let codigo = $state('');
	let pass = $state('');
	let error = $state('');
	let ocupado = $state(false);
	let espera = $state(0);

	onMount(() => {
		const reloj = setInterval(() => { if (espera > 0) espera--; }, 1000);
		return () => clearInterval(reloj);
	});

	async function pedir(ev?: SubmitEvent) {
		ev?.preventDefault();
		error = '';
		ocupado = true;
		try {
			await pedirCodigo(email.trim(), 'restablecer');
			paso = 'codigo';
			espera = 60;
		} catch (e) {
			error = mensajeError(e, t.errores);
		} finally {
			ocupado = false;
		}
	}

	async function cambiar(ev: SubmitEvent) {
		ev.preventDefault();
		error = traducir(errorClave(pass), t.errores);
		if (error) return;
		ocupado = true;
		try {
			await restablecer(email.trim(), codigo, pass);
			paso = 'listo';
		} catch (e) {
			error = mensajeError(e, t.errores);
		} finally {
			ocupado = false;
		}
	}
</script>

<PaginaCuenta titulo={t.olvide.titulo}>
	{#if paso === 'mail'}
		<p>{t.olvide.pedir}</p>
		<form onsubmit={pedir}>
			<label>{t.comun.email} <input type="email" bind:value={email} required autocomplete="email" /></label>
			{#if error}<p role="alert">{error}</p>{/if}
			<button type="submit" class="button button-primary" disabled={!i18n.ready || ocupado}>{t.olvide.mandar}</button>
		</form>
	{:else if paso === 'codigo'}
		<p>{t.olvide.llego}</p>
		<form onsubmit={cambiar}>
			<label>{t.comun.codigo}
				<input bind:value={codigo} required inputmode="numeric" maxlength="6" oninput={() => (codigo = soloDigitos(codigo))} onpaste={(e) => { e.preventDefault(); codigo = soloDigitos(e.clipboardData?.getData('text') ?? ''); }} autocomplete="one-time-code" placeholder="123456" />
			</label>
			<label>{t.olvide.nueva} <input type="password" bind:value={pass} required autocomplete="new-password" /></label>
			<Requisitos clave={pass} />
			{#if error}<p role="alert">{error}</p>{/if}
			<button type="submit" class="button button-primary" disabled={!i18n.ready || ocupado || codigo.length !== 6}>{t.olvide.cambiar}</button>
		</form>
		<div class="enlaces">
			<button type="button" class="enlace" disabled={espera > 0 || ocupado} onclick={() => pedir()}>
				{t.comun.reenviar}{espera > 0 ? ` (${espera} ${t.comun.segundos})` : ''}
			</button>
		</div>
	{:else}
		<p role="status">{t.olvide.listo}</p>
		<a class="button button-primary" href="/entrar">{t.comun.irEntrar}</a>
	{/if}
</PaginaCuenta>
