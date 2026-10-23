<script lang="ts">
	import { onMount, tick } from 'svelte';
	import { getI18n } from '#lib/i18n/context.svelte.js';
	import { pageMessages } from '#lib/i18n/page-messages.js';
	import Brand from '#lib/components/ui/Brand.svelte';
	import Icon from '#lib/components/ui/Icon.svelte';
	import LanguageSelector from '#lib/components/ui/LanguageSelector.svelte';

	const i18n = getI18n();
	const t = $derived(i18n.text);
	const labels = $derived(pageMessages[i18n.locale].nav);
	let { onDownload, onLogin }: { onDownload: () => void; onLogin: () => void } = $props();
	let menuOpen = $state(false);
	let activeHash = $state('#home');
	let menuButton: HTMLButtonElement;
	let header: HTMLElement;
	let navigation: HTMLElement;

	const links = $derived([
		{ href: '#experience', title: t.nav.experience, description: labels.experienceDescription, icon: 'bolt' as const, accent: '#b38aff' },
		{ href: '#communities', title: labels.communities, description: labels.communitiesDescription, icon: 'users' as const, accent: '#d58bff' },
		{ href: '#download', title: t.nav.windows, description: labels.windowsDescription, icon: 'windows' as const, accent: '#7bb8ff' },
		{ href: '#faq', title: labels.faq, description: labels.faqDescription, icon: 'book' as const, accent: '#a39bff' },
		{ href: '#support', title: labels.support, description: labels.supportDescription, icon: 'headphones' as const, accent: '#6ed7f3' }
	]);

	function closeMenu(restoreFocus = false) {
		menuOpen = false;
		if (restoreFocus) menuButton?.focus({ preventScroll: true });
	}
	async function toggleMenu() {
		if (menuOpen) { closeMenu(); return; }
		menuOpen = true;
		await tick();
		if (menuOpen) navigation?.querySelector('a')?.focus({ preventScroll: true });
	}
	function handleKeys(event: KeyboardEvent) {
		if (event.key === 'Escape' && menuOpen) {
			event.preventDefault();
			closeMenu(true);
		}
	}
	function outsidePointer(event: PointerEvent) {
		if (!menuOpen || !(event.target instanceof Element)) return;
		if (!header.contains(event.target) && !event.target.closest('.menu-scrim')) closeMenu();
	}
	function outsideFocus(event: FocusEvent) {
		if (event.target instanceof Element && event.target.closest('.menu-scrim')) return;
		if (menuOpen && event.target instanceof Node && !header.contains(event.target)) closeMenu();
	}
	function syncHash() { activeHash = window.location.hash || '#home'; }
	async function loginFromMenu() {
		closeMenu(true);
		await tick();
		onLogin();
	}
	async function downloadFromMenu() {
		closeMenu(true);
		await tick();
		onDownload();
	}
	onMount(() => {
		syncHash();
		const desktop = matchMedia('(min-width: 1001px)');
		const resize = () => { if (desktop.matches) closeMenu(); };
		desktop.addEventListener('change', resize);
		return () => desktop.removeEventListener('change', resize);
	});
</script>

<svelte:window onkeydown={handleKeys} onhashchange={syncHash} />
<svelte:document onpointerdown={outsidePointer} onfocusin={outsideFocus} />
{#if menuOpen}
	<button type="button" class="menu-scrim" tabindex="-1" aria-label={labels.dismissBackdrop} onclick={() => closeMenu(true)}></button>
{/if}
<header class="site-header" bind:this={header}>
	<div class="header-inner container">
		<a class="brand-link" href="#home" aria-label="Thunderop" onclick={() => closeMenu()}><Brand /></a>
		<nav class:open={menuOpen} bind:this={navigation} id="main-navigation" class="main-navigation" aria-label={t.nav.label}>
			<div class="mobile-menu-intro">
				<div><span class="menu-kicker">{labels.menuTitle}</span><p>{labels.menuTagline}</p></div>
				<span class="menu-emblem" aria-hidden="true"><Icon name="bolt" size={25} /></span>
			</div>
			{#each links as link}
				<a class="nav-link" class:help-start={link.href === '#faq'} href={link.href} aria-label={link.title} aria-current={activeHash === link.href ? 'location' : undefined} style:--nav-accent={link.accent} onclick={() => { activeHash = link.href; closeMenu(); }}>
					<span class="nav-icon"><Icon name={link.icon} size={21} /></span>
					<span class="nav-copy"><span>{link.title}</span><small>{link.description}</small></span>
					<span class="nav-arrow"><Icon name="arrow" size={16} /></span>
				</a>
			{/each}
			<div class="mobile-menu-footer">
				<button disabled={!i18n.ready} type="button" class="button button-secondary menu-login" onclick={loginFromMenu}>{t.nav.login}</button>
				<button disabled={!i18n.ready} type="button" class="button button-primary menu-download" onclick={downloadFromMenu}>
					<Icon name="windows" size={19} />{t.hero.download}<Icon name="down" size={17} />
				</button>
				<p><span></span>{labels.menuStatus}</p>
			</div>
		</nav>
		<div class="header-actions">
			<LanguageSelector />
			<button disabled={!i18n.ready} type="button" class="button button-secondary header-login" onclick={onLogin}>{t.nav.login}</button>
			<button disabled={!i18n.ready} type="button" class="button button-primary header-download" onclick={onDownload}>
				<Icon name="windows" size={18} />{t.hero.download}
			</button>
			<button disabled={!i18n.ready} bind:this={menuButton} type="button" class="menu-toggle" class:active={menuOpen} aria-label={menuOpen ? t.nav.close : t.nav.menu} aria-expanded={menuOpen} aria-controls="main-navigation" onclick={toggleMenu}>
				<span class="menu-lines" aria-hidden="true"><span></span><span></span><span></span></span>
			</button>
		</div>
	</div>
</header>

<style>
	.mobile-menu-intro, .mobile-menu-footer, .menu-login, .nav-icon, .nav-arrow, .nav-copy small { display: none; }
	.nav-copy { min-width: 0; }
	.main-navigation > a[aria-current='location'] { color: #d9bfff; }
	.menu-scrim { display: none; }
	.menu-lines { position: relative; display: block; width: 19px; height: 18px; }
	.menu-lines > span { position: absolute; left: 0; width: 19px; height: 2px; border-radius: 2px; background: currentColor; transition: transform .22s ease, opacity .16s ease, width .22s ease; }
	.menu-lines > span:nth-child(1) { top: 2px; }
	.menu-lines > span:nth-child(2) { top: 8px; width: 14px; }
	.menu-lines > span:nth-child(3) { top: 14px; }
	.active .menu-lines > span:nth-child(1) { transform: translateY(6px) rotate(45deg); }
	.active .menu-lines > span:nth-child(2) { opacity: 0; transform: translateX(5px); }
	.active .menu-lines > span:nth-child(3) { transform: translateY(-6px) rotate(-45deg); }

	@media (max-width: 1000px) {
		.menu-toggle { position: relative; border-color: #8c69c85c; border-radius: 12px; background: linear-gradient(145deg, #4930754d, #171a354d); color: #e0d0ff; box-shadow: inset 0 1px 0 #d4b8ff0d; transition: border-color .2s, box-shadow .2s, background .2s; }
		.menu-toggle:hover, .menu-toggle.active { border-color: #af7affad; background: linear-gradient(145deg, #60319466, #25224b80); box-shadow: 0 0 20px #9251e226, inset 0 1px 0 #d4b8ff14; }
		.menu-scrim { display: block; position: fixed; inset: 0; z-index: 19; padding: 0; background: #040513a6; backdrop-filter: blur(7px); cursor: default; touch-action: none; animation: scrim-reveal .2s ease both; }
		.main-navigation { z-index: 2; left: auto; right: clamp(16px, 4vw, 40px); top: calc(100% + 10px); width: min(440px, calc(100% - 32px)); max-height: calc(100dvh - 104px); overflow-y: auto; overscroll-behavior: contain; scrollbar-width: thin; scrollbar-color: #7953b1 transparent; padding: 18px; gap: 5px; border: 1px solid #aa7af361; border-radius: 22px; background: radial-gradient(ellipse at 100% 0, #5b2b8b3b, transparent 50%), linear-gradient(155deg, #17152cfa, #0c1022fa); box-shadow: 0 25px 70px #01020c99, 0 0 40px #7139d51a, inset 0 1px 0 #d1b7ff14; white-space: normal; transform-origin: top right; }
		.main-navigation.open { animation: menu-reveal .23s cubic-bezier(.2,.75,.3,1) both; }
		.mobile-menu-intro { display: flex; justify-content: space-between; align-items: center; gap: 18px; padding: 5px 8px 18px; margin-bottom: 5px; border-bottom: 1px solid #a283c72b; }
		.menu-kicker { color: #c29af7; font-size: 9px; font-weight: 750; line-height: 1.6; letter-spacing: .16em; text-transform: uppercase; }
		.mobile-menu-intro p { font-family: var(--font-display); font-size: 20px; line-height: 1.25; letter-spacing: -.035em; color: #eee6ff; margin: 7px 0 0; font-weight: 600; }
		.menu-emblem { flex-shrink: 0; display: grid; place-items: center; width: 43px; height: 43px; border: 1px solid #9b6be66b; border-radius: 13px; background: linear-gradient(140deg, #7137bd4d, #24448826); color: #c7a4ff; filter: drop-shadow(0 0 9px #9a55ed30); transform: rotate(7deg); }
		.main-navigation .nav-link { position: relative; display: flex; gap: 13px; min-height: 68px; padding: 11px 10px; border: 1px solid transparent; border-radius: 13px; color: #e6def5; transition: background .18s, border-color .18s, transform .18s; }
		.main-navigation .nav-link:hover { background: #9c6bdb0d; border-color: #9c6bdb30; }
		.main-navigation .nav-link[aria-current='location'] { background: linear-gradient(100deg, #8f49d827, #7950ba0a); border-color: #9e6be44d; }
		.nav-icon { display: grid; place-items: center; width: 39px; height: 39px; flex-shrink: 0; border: 1px solid color-mix(in srgb, var(--nav-accent) 28%, transparent); border-radius: 11px; background: color-mix(in srgb, var(--nav-accent) 9%, transparent); color: var(--nav-accent); }
		.nav-copy { display: block; flex: 1; }
		.nav-copy > span { display: block; font-family: var(--font-display); font-size: 16px; font-weight: 600; letter-spacing: -.02em; line-height: 1.4; }
		.nav-copy small { display: block; font-size: 10px; font-weight: 450; line-height: 1.6; color: #9f96b6; margin-top: 2px; }
		.nav-arrow { display: grid; place-items: center; flex-shrink: 0; color: #8d7baa; transition: transform .18s, color .18s; }
		.nav-link:hover .nav-arrow, .nav-link[aria-current='location'] .nav-arrow { color: #c4a0f1; transform: translateX(2px); }
		.main-navigation .help-start { border-top-color: #a283c71f; margin-top: 5px; }
		.header-login { display: none; }
		.main-navigation .menu-login { display: flex; width: 100%; min-height: 50px; justify-content: center; margin-bottom: 10px; font-size: 13px; border-radius: 11px; }
		.mobile-menu-footer { display: block; border-top: 1px solid #a283c72b; padding: 17px 7px 3px; margin-top: 10px; }
		.main-navigation .menu-download { width: 100%; min-height: 50px; justify-content: center; gap: 10px; padding: 12px 14px; color: white; font-size: 13px; border-radius: 11px; border: 1px solid #ae75ff; border-right-color: #48c7ff; background: linear-gradient(105deg, #9228ef, #6329f8 48%, #087aff); }
		.menu-download > :global(svg:last-child) { margin-left: auto; }
		.mobile-menu-footer p { display: flex; justify-content: center; align-items: center; gap: 6px; font-size: 10px; font-weight: 450; color: #9286aa; margin: 12px 0 0; }
		.mobile-menu-footer p > span { width: 4px; height: 4px; background: #a384d8; border-radius: 50%; }
	}
	@media (max-width: 360px) {
		.main-navigation { padding: 13px; }
		.main-navigation .nav-link { padding-inline: 7px; gap: 10px; }
		.nav-copy > span { font-size: 15px; }
		.main-navigation .menu-download { font-size: 12px; gap: 8px; padding-inline: 10px; }
	}
	@keyframes menu-reveal { from { opacity: 0; transform: translateY(-9px) scale(.98); } to { opacity: 1; transform: translateY(0) scale(1); } }
	@keyframes scrim-reveal { from { opacity: 0; } to { opacity: 1; } }
</style>
