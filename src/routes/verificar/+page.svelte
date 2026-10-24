<script lang="ts">
	import { goto } from '$app/navigation';
	import { getI18n } from '#lib/i18n/context.svelte.js';
	import { cuentaMessages } from '#lib/i18n/cuenta-messages.js';
	import { sesion } from '#lib/cuenta.svelte.js';
	import PaginaCuenta from '#lib/components/cuenta/PaginaCuenta.svelte';
	import Verificar from '#lib/components/cuenta/Verificar.svelte';

	const i18n = getI18n();
	const t = $derived(cuentaMessages[i18n.locale]);
	let listo = $state(false);

	// Con sesión (cuenta sin confirmar que ya entró) vuelve a la cuenta; si no, a entrar.
	async function verificado() {
		if (sesion.usuario) await goto('/cuenta');
		else listo = true;
	}
</script>

<PaginaCuenta titulo={t.verificar.titulo}>
	{#if listo}
		<p role="status">{t.verificar.listo}</p>
		<a class="button button-primary" href="/entrar">{t.comun.irEntrar}</a>
	{:else}
		<Verificar email={sesion.usuario?.email ?? ''} alVerificar={verificado} />
	{/if}
</PaginaCuenta>
