<script lang="ts">
	import { getI18n } from '#lib/i18n/context.svelte.js';
	import { cuentaMessages } from '#lib/i18n/cuenta-messages.js';

	// Campo de contraseña con el ojito para verla.
	let { etiqueta, value = $bindable(''), autocomplete }: { etiqueta: string; value?: string; autocomplete: 'current-password' | 'new-password' } = $props();
	const i18n = getI18n();
	const t = $derived(cuentaMessages[i18n.locale]);
	let ver = $state(false);
</script>

<div class="campo">
	<label>{etiqueta} <input type={ver ? 'text' : 'password'} bind:value required {autocomplete} /></label>
	<button type="button" class="ojo" aria-label={ver ? t.comun.ocultar : t.comun.ver} aria-pressed={ver} onclick={() => (ver = !ver)}>
		<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
			<path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12Z" /><circle cx="12" cy="12" r="3" />
			{#if ver}<path d="M3 3l18 18" />{/if}
		</svg>
	</button>
</div>

<style>
	.campo { position: relative; display: grid; }
	.campo input { padding-right: 48px !important; }
	.ojo { position: absolute; right: 6px; bottom: 6px; display: grid; place-items: center; width: 36px; height: 36px; border-radius: 8px; background: none; color: #a99bd6; }
	.ojo:hover { color: #fff; background: #ffffff10; }
	.ojo:focus-visible { outline: 2px solid #8c43ff; }
</style>
