<script lang="ts">
	import { getI18n } from '#lib/i18n/context.svelte.js';
	import { cuentaMessages } from '#lib/i18n/cuenta-messages.js';

	let { aceptado = $bindable(false) }: { aceptado: boolean } = $props();
	const i18n = getI18n();
	const t = $derived(cuentaMessages[i18n.locale].terminos);
</script>

<label class="casilla">
	<input type="checkbox" bind:checked={aceptado} />
	<span>{t.antes} <a href="/terminos" target="_blank">{t.terminos}</a> {t.medio} <a href="/privacidad" target="_blank">{t.privacidad}</a></span>
</label>
