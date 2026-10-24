<script lang="ts">
	import '@fontsource-variable/space-grotesk';
    import '@fontsource-variable/manrope';
    import '../app.css';
	import { onMount, untrack } from 'svelte';
	import { I18n, setI18n } from '#lib/i18n/context.svelte.js';
	import { validarSesionAlIniciar } from '#lib/cuenta.svelte.js';
	import type { LayoutProps } from './$types';

	let { data, children }: LayoutProps = $props();
	// Capture the initial server preference; subsequent changes belong to the visitor.
	const i18n = setI18n(new I18n(untrack(() => data.locale)));
	const t = $derived(i18n.text);
    onMount(() => { i18n.ready = true; void validarSesionAlIniciar(); });
</script>

<svelte:head>
	<title>{t.meta.title}</title>
	<meta name="description" content={t.meta.description} />
	<meta name="theme-color" content="#070817" />
	<link rel="icon" type="image/svg+xml" href="/favicon.svg" />
</svelte:head>

<a class="skip-link" href="#main">{t.nav.skip}</a>
{@render children()}
