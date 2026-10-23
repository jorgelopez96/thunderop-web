<script lang="ts">
 import { getI18n } from '#lib/i18n/context.svelte.js';
 import { pageMessages } from '#lib/i18n/page-messages.js';
 import Icon from './Icon.svelte';
 const i18n=getI18n();
 const t=$derived(pageMessages[i18n.locale].footer);
 let { title, eyebrow, body }: { title:string; eyebrow:string; body:string } = $props();
 let dialog:HTMLDialogElement;
 export function open(){dialog?.showModal()}
 function close(){dialog?.close()}
</script>
<dialog bind:this={dialog} class="download-dialog" aria-labelledby="info-title">
 <button class="dialog-close" aria-label={t.close} onclick={close}><Icon name="close"/></button>
 <span class="dialog-hero-icon"><Icon name="users" size={32}/></span>
 <span class="eyebrow">{eyebrow}</span><h2 id="info-title">{title}</h2><p>{body}</p>
 <button class="button button-primary" onclick={close}>{t.back}<Icon name="arrow" size={18}/></button>
</dialog>
