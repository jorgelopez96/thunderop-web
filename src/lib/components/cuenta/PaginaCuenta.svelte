<script lang="ts">
	import type { Snippet } from 'svelte';
	import { getI18n } from '#lib/i18n/context.svelte.js';
	import { cuentaMessages } from '#lib/i18n/cuenta-messages.js';
	import Brand from '#lib/components/ui/Brand.svelte';
	import LanguageSelector from '#lib/components/ui/LanguageSelector.svelte';

	// Marco de las páginas de cuenta y de las legales: barra con la marca y el idioma, y una tarjeta con el título.
	let { titulo, ancho = false, children }: { titulo: string; ancho?: boolean; children: Snippet } = $props();
	const i18n = getI18n();
	const t = $derived(cuentaMessages[i18n.locale]);
</script>

<header class="site-header">
	<div class="header-inner container">
		<a class="brand-link" href="/" aria-label={t.comun.volver}><Brand /></a>
		<div class="header-actions barra-idioma"><LanguageSelector /></div>
	</div>
</header>
<main id="main" tabindex="-1" class="container">
	<div class="tarjeta" class:ancho>
		<h1>{titulo}</h1>
		{@render children()}
	</div>
</main>

<style>
	.barra-idioma { margin-left: auto; }
	main { display: grid; justify-items: center; padding-block: clamp(28px, 6vw, 64px); }
	.tarjeta { width: min(440px, 100%); display: grid; gap: 16px; padding: clamp(22px, 5vw, 36px); border: 1px solid #9960f16b; border-radius: 23px; background: radial-gradient(ellipse at top, #362057, transparent 65%), #101121; box-shadow: 0 25px 100px #0009; color: #f7f2ff; }
	.tarjeta.ancho { width: min(760px, 100%); }
	h1 { margin: 0; font-size: clamp(25px, 5vw, 30px); font-weight: 650; line-height: 1.2; letter-spacing: -.04em; }
	.tarjeta :global(p) { margin: 0; color: #b3b0cb; font-size: 15px; line-height: 1.7; }
	.tarjeta :global(form) { display: grid; gap: 14px; }
	.tarjeta :global(label) { display: grid; gap: 6px; font-size: 13px; font-weight: 650; color: #d9d2f2; }
	.tarjeta :global(label.casilla) { display: flex; align-items: center; gap: 9px; font-weight: 500; }
	.tarjeta :global(input:not([type='checkbox'])) { min-height: 48px; padding: 0 14px; border-radius: 10px; border: 1px solid #7a62c766; background: #0d0e22; color: #fff; font: inherit; font-size: 16px; color-scheme: dark; }
	.tarjeta :global(input[type='checkbox']) { flex-shrink: 0; width: 20px; height: 20px; accent-color: #8c43ff; }
	.tarjeta :global(input:focus-visible) { outline: 2px solid #8c43ff; outline-offset: 1px; }
	.tarjeta :global(.button) { width: 100%; }
	.tarjeta :global(.button:disabled) { opacity: .6; transform: none; }
	.tarjeta :global(a:not(.button)), .tarjeta :global(.enlace) { color: #c9a6ff; text-decoration: underline; text-underline-offset: 3px; background: none; padding: 0; font: inherit; }
	.tarjeta :global(.enlace:disabled) { opacity: .6; text-decoration: none; }
	.tarjeta :global(.enlaces) { display: flex; flex-wrap: wrap; gap: 10px 18px; font-size: 14px; color: #b3b0cb; }
	.tarjeta :global([role='alert']) { color: #ff8fa3; font-size: 14px; }
	.tarjeta :global([role='status']) { color: #8fe3b0; font-size: 14px; }
</style>
