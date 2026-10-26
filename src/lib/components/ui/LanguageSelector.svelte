<script lang="ts">
	import { getI18n } from '#lib/i18n/context.svelte.js';
	import Icon from './Icon.svelte';
	const i18n = getI18n();
	const t = $derived(i18n.text);

	// Selector propio (el <select> del navegador no seguía la estética de la página): botón + lista en un popover.
	const IDIOMAS = [['es', 'Español'], ['en', 'English']] as const;
	// Hay uno en el encabezado y otro en las páginas de cuenta: id estable entre servidor y navegador.
	const uid = $props.id();
	const id = `idiomas-${uid}`;
	let boton = $state<HTMLElement>();
	let lista = $state<HTMLElement>();
	// La lista se abre debajo del botón, alineada a su derecha.
	function ubicar(e: ToggleEvent) {
		if (e.newState !== 'open' || !boton || !lista) return;
		const r = boton.getBoundingClientRect();
		lista.style.top = `${r.bottom + 8}px`;
		lista.style.right = `${Math.max(8, innerWidth - r.right)}px`;
	}
	function elegir(locale: string) {
		i18n.select(locale);
		lista?.hidePopover();
	}
</script>

<div class="language-selector" data-locale={i18n.locale}>
	<button type="button" class="idioma" bind:this={boton} disabled={!i18n.ready} popovertarget={id} aria-haspopup="listbox" aria-label={t.language.label} title={t.language.label}>
		<Icon name="globe" size={17} /><span class="codigo">{i18n.locale.toUpperCase()}</span><Icon name="chevron" size={13} />
	</button>
	<div popover id={id} class="language-options" role="listbox" aria-label={t.language.label} bind:this={lista} onbeforetoggle={ubicar}>
		{#each IDIOMAS as [locale, nombre] (locale)}
			<button type="button" role="option" lang={locale} data-locale={locale} aria-selected={i18n.locale === locale} onclick={() => elegir(locale)}>
				<span class="codigo">{locale.toUpperCase()}</span>{nombre}
				{#if i18n.locale === locale}<Icon name="check" size={13} />{/if}
			</button>
		{/each}
	</div>
</div>

<style>
	.language-selector { display: flex; align-items: center; }
	.idioma { display: flex; align-items: center; gap: 6px; min-height: 44px; padding: 0 10px; border: 1px solid #7a62c744; border-radius: 10px; background: #15152a99; color: #d9d2f2; font: inherit; font-size: 13px; font-weight: 650; cursor: pointer; transition: border-color .15s, background .15s; }
	.idioma:hover:not(:disabled), .idioma:focus-visible { border-color: #af7affad; background: #25224b80; }
	.idioma:focus-visible { outline: 2px solid #8c43ff; outline-offset: 2px; }
	.language-options { position: fixed; inset: auto; margin: 0; padding: 6px; min-width: 170px;
		border: 1px solid #aa7af361; border-radius: 14px; background: linear-gradient(155deg, #17152cfa, #0c1022fa); box-shadow: 0 18px 50px #01020c99, 0 0 30px #7139d51a; color: #eee6ff; }
	.language-options:popover-open { display: grid; gap: 2px; }
	.language-options button { display: flex; align-items: center; gap: 10px; min-height: 44px; padding: 0 12px; border: 0; border-radius: 10px; background: none; color: inherit; font: inherit; font-size: 14px; text-align: left; cursor: pointer; }
	.language-options button:hover, .language-options button:focus-visible { background: #9c6bdb1f; outline: none; }
	.language-options button[aria-selected='true'] { color: #d9bfff; }
	.language-options button :global(svg) { margin-left: auto; }
	.codigo { font-size: 11px; font-weight: 750; letter-spacing: .06em; color: #b983ff; }
</style>
