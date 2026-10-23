<script lang="ts">
	import { getI18n } from '#lib/i18n/context.svelte.js';
	import Icon from './Icon.svelte';
	import { site } from '#lib/config/site.js';
	const i18n = getI18n();
	const t = $derived(i18n.text);
	let dialog: HTMLDialogElement;
	export function open() { dialog?.showModal(); }
	function close() { dialog?.close(); }
</script>

<dialog bind:this={dialog} class="download-dialog" aria-labelledby="download-title">
	<button type="button" class="dialog-close" aria-label={t.download.dismiss} onclick={close}><Icon name="close" /></button>
	<span class="dialog-hero-icon"><Icon name="windows" size={35} /></span>
	<span class="eyebrow"><span class="status-dot"></span>{t.download.status}</span>
	<h2 id="download-title">{t.download.title}</h2>
	<p>{t.download.body}</p>
	<a class="button button-primary" href={site.downloadUrl} download onclick={close}>{t.download.close}<Icon name="arrow" size={18} /></a>
</dialog>
