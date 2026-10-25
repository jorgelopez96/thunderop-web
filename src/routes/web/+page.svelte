<script lang="ts">
	import { getI18n } from '#lib/i18n/context.svelte.js';
	import PaginaCuenta from '#lib/components/cuenta/PaginaCuenta.svelte';

	// Lugar de la aplicación web: hasta que salga, avisa que viene y deja descargar la de Windows.
	const i18n = getI18n();
	const TEXTOS = {
		es: { titulo: 'Aplicación web', pronto: 'Próximamente', cuerpo: 'Muy pronto vas a poder usar Thunderop desde el navegador y el celular, sin instalar nada. Mientras tanto, descargá la app para Windows.', volver: 'Volver al inicio' },
		en: { titulo: 'Web app', pronto: 'Coming soon', cuerpo: 'Soon you will be able to use Thunderop from your browser and phone, with nothing to install. Meanwhile, download the Windows app.', volver: 'Back to home' }
	};
	const t = $derived(TEXTOS[i18n.locale]);
</script>

<svelte:head><title>{t.titulo} · Thunderop</title></svelte:head>

<PaginaCuenta titulo={t.titulo}>
	<span class="pronto">{t.pronto}</span>
	<p>{t.cuerpo}</p>
	<a class="button button-primary" href="/#download">{t.volver}</a>
</PaginaCuenta>

<style>
	.pronto { justify-self: start; padding: 4px 12px; border-radius: 999px; background: #7fe0c41f; color: #7fe0c4; font-size: 13px; font-weight: 650; }
	p { margin: 0; color: #cfc6ea; line-height: 1.6; }
</style>
