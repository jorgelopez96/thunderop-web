<script lang="ts">
	import { getI18n } from '#lib/i18n/context.svelte.js';
	import Icon from '#lib/components/ui/Icon.svelte';
	import AppPreview from './AppPreview.svelte';
	const i18n = getI18n();
	const t = $derived(i18n.text);
	let { onDownload }: { onDownload: () => void } = $props();
	// La mascota rebota en su lugar (app.css) y salta con un giro al tocarla.
	let salta = $state(false);
	function saltar() { salta = false; requestAnimationFrame(() => (salta = true)); }
</script>

<section class="hero" id="home" aria-labelledby="hero-title">
	<div class="hero-aurora" aria-hidden="true"></div>
	<div class="hero-grid" aria-hidden="true"></div>
	<div class="hero-inner container">
		<div class="hero-copy">
			<h1 id="hero-title"><span class="hero-title-line">{t.hero.lineOne}</span><span class="hero-title-line gradient-text">{t.hero.lineTwo}</span></h1>
			<p class="hero-tagline">{t.hero.tagline}</p>
			<p class="hero-description">{t.hero.description}</p>
			<div class="hero-actions">
				<button disabled={!i18n.ready} type="button" class="button button-primary" onclick={onDownload}><Icon name="windows" size={21} />{t.hero.download}<Icon name="arrow" size={18} /></button>
				<a class="button button-secondary" href="#experience"><span class="play-icon">▶</span>{t.hero.explore}</a>
			</div>
		</div>
		<div class="hero-art">
			<div class="preview-position"><AppPreview /></div>
			<button type="button" class="hero-mascot" class:salta onclick={saltar} onanimationend={() => (salta = false)} title={t.hero.mascot}><img src="/images/mascots/lightning-hero.png" alt={t.hero.mascot} width="1280" height="1280" fetchpriority="high" /></button>
		</div>
		<a class="hero-scroll" href="#experience"><span class="scroll-line"></span>{t.hero.scroll}<Icon name="down" size={14} /></a>
	</div>
</section>
