<script lang="ts">
	import { getI18n } from '#lib/i18n/context.svelte.js';
	import { cuentaMessages } from '#lib/i18n/cuenta-messages.js';
	import { requisitosClave } from '#lib/reglasCuenta.js';

	let { clave }: { clave: string } = $props();
	const i18n = getI18n();
	const t = $derived(cuentaMessages[i18n.locale].requisitos);
	const req = $derived(requisitosClave(clave));
</script>

<ul aria-label={t.titulo}>
	<li class:ok={req.largo}>{t.largo}</li>
	<li class:ok={req.mayuscula}>{t.mayuscula}</li>
	<li class:ok={req.numero}>{t.numero}</li>
	<li class:ok={req.especial}>{t.especial}</li>
</ul>

<style>
	ul { list-style: none; margin: -4px 0 0; padding: 0; display: grid; gap: 3px; font-size: 13px; color: #9a96b4; }
	li::before { content: '○ '; }
	li.ok { color: #8fe3b0; }
	li.ok::before { content: '✓ '; }
</style>
