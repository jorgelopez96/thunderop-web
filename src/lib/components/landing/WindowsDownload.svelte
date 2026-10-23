<script lang="ts">
 import { getI18n } from '#lib/i18n/context.svelte.js';
 import { pageMessages } from '#lib/i18n/page-messages.js';
 import Icon from '#lib/components/ui/Icon.svelte';
 const i18n = getI18n();
 const t = $derived(pageMessages[i18n.locale].windows);
 let { onDownload }: { onDownload: () => void } = $props();
 const tiles = [{ key: 'desktop', icon: 'windows' }, { key: 'voice', icon: 'headphones' }, { key: 'play', icon: 'game' }] as const;
</script>
<section class="windows-section" id="download" aria-labelledby="windows-title">
 <div class="container windows-layout">
  <div class="windows-copy">
   <h2 id="windows-title">{t.title}<br /><span class="gradient-text">{t.accent}</span></h2>
   <p class="section-description">{t.description}</p>
   <button class="button button-primary" disabled={!i18n.ready} onclick={onDownload}><Icon name="windows" />{i18n.text.hero.download}<Icon name="down" size={18}/></button>
   <p class="release-status"><span></span>{t.status}</p>
   <a class="text-link" href="#faq">{t.faq}<Icon name="arrow" size={16}/></a>
  </div>
  <div class="windows-visual">
   <div class="visual-ring" aria-hidden="true"></div>
   <img src="/images/mascots/lightning-laptop.png" alt={t.mascot} loading="lazy" width="1254" height="1254" />
   <span class="visual-spark" aria-hidden="true">✦</span>
  </div>
  <div class="windows-points">
   {#each tiles as tile}<div class="windows-point"><span><Icon name={tile.icon} size={24}/></span><div><h3>{t.tiles[tile.key].title}</h3><p>{t.tiles[tile.key].body}</p></div></div>{/each}
  </div>
 </div>
</section>
<style>
 .windows-section{position:relative;isolation:isolate;overflow:clip;border-block:1px solid #7955d34a;background:radial-gradient(ellipse at 77% 45%,#57249c55,transparent 52%),linear-gradient(110deg,#11112b,#080d23);padding-block:64px}
 .windows-section::after{content:'';position:absolute;z-index:-1;inset:auto 0 0;height:1px;background:linear-gradient(90deg,transparent,#a254ff,#419cff,transparent)}
 .windows-layout{display:grid;grid-template-columns:minmax(0,1.2fr) minmax(0,.8fr);align-items:center;gap:20px 50px}
 .windows-copy{min-width:0}.windows-copy h2{max-width:20ch}
 .windows-copy .button{margin-top:8px}.release-status{display:flex;align-items:center;gap:8px;font-size:11px;color:#aaa7c3;margin:17px 0}
 .release-status span{width:5px;height:5px;background:#a286e7;border-radius:50%}
 .windows-visual{position:relative;min-width:0;grid-column:2;grid-row:1/3;align-self:center;display:grid;place-items:center}
 img{position:relative;width:100%;max-width:440px;height:auto;filter:drop-shadow(0 18px 30px #4b21ab55)}
 .visual-ring{position:absolute;width:90%;aspect-ratio:1;border:1px solid #9b63fa30;border-radius:50%;box-shadow:0 0 70px #5d28df22,inset 0 0 50px #5d28df15}
 .visual-spark{position:absolute;top:12%;right:4%;color:#b78cff;font-size:26px}
 .windows-points{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:12px;margin-top:16px}
 .windows-point{display:flex;flex-direction:column;gap:13px;min-width:0;border-left:1px solid #8758df55;padding-left:16px}
 .windows-point>span{color:#9c90ff;filter:drop-shadow(0 0 8px #8152f7)}h3{font-size:15px;line-height:1.4;margin:0 0 6px;font-weight:600}.windows-point p{font-size:12px;line-height:1.65;color:#a2a2bf;margin:0}
 @media(max-width:800px){.windows-layout{grid-template-columns:minmax(0,1fr) minmax(0,.8fr);gap:24px}.windows-visual{grid-row:1}.windows-points{grid-column:1/-1}img{max-width:330px}}
 @media(max-width:560px){.windows-section{padding-block:40px}.windows-layout{grid-template-columns:minmax(0,1fr);gap:26px}.windows-visual{grid-column:1;grid-row:2}img{max-width:290px}.windows-copy .button{width:100%;font-size:14px}.windows-points{gap:20px;grid-template-columns:minmax(0,1fr);margin-top:0}.windows-point{flex-direction:row;align-items:center;gap:15px;padding-left:14px}.windows-point p{font-size:14px}.windows-point h3{font-size:17px}}
</style>
