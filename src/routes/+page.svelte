<script lang="ts">
 import { tick } from 'svelte';
 import { getI18n } from '#lib/i18n/context.svelte.js';
 import { pageMessages, type CommunityKey } from '#lib/i18n/page-messages.js';
 import Header from '#lib/components/layout/Header.svelte';
 import Footer from '#lib/components/layout/Footer.svelte';
 import Hero from '#lib/components/landing/Hero.svelte';
 import FloatingScene from '#lib/components/landing/FloatingScene.svelte';
 import Features from '#lib/components/landing/Features.svelte';
 import WindowsDownload from '#lib/components/landing/WindowsDownload.svelte';
 import Communities from '#lib/components/landing/Communities.svelte';
 import HelpSupport from '#lib/components/landing/HelpSupport.svelte';
 import DownloadDialog from '#lib/components/ui/DownloadDialog.svelte';
 import InfoDialog from '#lib/components/ui/InfoDialog.svelte';
 const i18n=getI18n();
 const t=$derived(pageMessages[i18n.locale]);
 let downloadDialog:DownloadDialog;
 let infoDialog:InfoDialog;
 let selected=$state<CommunityKey|null>(null);
 const infoTitle=$derived(selected?t.communities.cards[selected].title:t.help.contactTitle);
 const infoStatus=$derived(selected?t.communities.status:t.help.contactStatus);
 const infoBody=$derived(selected?t.communities.cards[selected].body+' '+t.communities.dialogBody:t.help.contactDescription);
 function openDownload(){downloadDialog?.open()}
 async function openCommunity(key:CommunityKey){selected=key;await tick();infoDialog?.open()}
 async function openContact(){selected=null;await tick();infoDialog?.open()}
</script>
<FloatingScene/>
<Header />
<main id="main" tabindex="-1">
 <Hero onDownload={openDownload}/>
 <Features/>
 <WindowsDownload onDownload={openDownload}/>
 <Communities onExplore={openCommunity}/>
 <HelpSupport onContact={openContact}/>
</main>
<Footer/>
<DownloadDialog bind:this={downloadDialog}/>
<InfoDialog bind:this={infoDialog} title={infoTitle} eyebrow={infoStatus} body={infoBody}/>
