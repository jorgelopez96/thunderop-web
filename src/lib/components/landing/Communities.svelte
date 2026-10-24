<script lang="ts">
 import { getI18n } from '#lib/i18n/context.svelte.js';
 import { pageMessages, type CommunityKey } from '#lib/i18n/page-messages.js';
 import Icon from '#lib/components/ui/Icon.svelte';
 import { dragScroll } from '#lib/actions/drag-scroll.js';
 const i18n = getI18n();
 const t = $derived(pageMessages[i18n.locale].communities);
 let { onExplore }: { onExplore: (key: CommunityKey) => void } = $props();
 const cards = [{ key:'gaming',icon:'game',color:'#8c9cff',position:'0% 0%' },{key:'music',icon:'headphones',color:'#d77eff',position:'100% 0%'},{key:'stream',icon:'monitor',color:'#80d3ff',position:null},{key:'sounds',icon:'volume',color:'#ffc28c',position:null}] as const;
</script>

<section id="communities" class="communities-section" aria-labelledby="communities-title">
 <div class="container">
  <div class="community-intro"><div><h2 id="communities-title">{t.title}<br/><span>{t.accent}</span></h2></div><p class="section-description">{t.description}</p></div>
  <div class="community-tools"><span>{t.hint}</span><span class="drag-hint">{t.dragHint}</span></div>
  <!-- svelte-ignore a11y_no_noninteractive_tabindex (Scrollable region supports arrow keys, Home and End.) -->
  <div class="communities-track" role="region" aria-label={t.carouselLabel} tabindex="0" use:dragScroll>
   {#each cards as card}{@const content=t.cards[card.key]}
    <article class="community-card" style:--card-color={card.color}>
     {#if card.position}<div class="community-art" style:background-position={card.position} aria-hidden="true"></div>
     {:else}<div class="community-art sin-foto" aria-hidden="true"><Icon name={card.icon} size={64}/></div>{/if}
     <div class="community-content"><div class="community-title"><Icon name={card.icon} size={23}/><h3>{content.title}</h3></div><p>{content.subtitle}</p><button disabled={!i18n.ready} onclick={()=>onExplore(card.key)} aria-label={t.action+' '+content.title}>{t.action}<Icon name="arrow" size={16}/></button></div>
    </article>
   {/each}
  </div>
 </div>
</section>
<style>
 .communities-section{padding-block:72px;background:radial-gradient(ellipse at 5% 10%,#29185838,transparent 50%)}
 .community-intro{display:grid;grid-template-columns:1fr 1fr;gap:30px 80px;align-items:end}.community-intro h2>span{color:#c6b8ed}.community-intro .section-description{margin-bottom:0}
 .community-tools{display:flex;align-items:center;justify-content:space-between;gap:16px;margin:28px 0 15px;color:#a5a0bc;font-size:12px}.drag-hint{color:#8e81ac;font-size:11px}
 .communities-track{display:grid;grid-auto-flow:column;grid-auto-columns:calc((100% - 54px)/4);gap:18px;overflow-x:auto;scroll-snap-type:x mandatory;scrollbar-width:thin;scrollbar-color:#6546a9 transparent;padding:3px 0 18px;margin-inline:0}
 .communities-track:global(.is-draggable){cursor:grab;user-select:none;-webkit-user-select:none}
 .communities-track:global(.is-dragging){scroll-snap-type:none;scroll-behavior:auto}
 .communities-track:global(.is-dragging),.communities-track:global(.is-dragging) :global(*){cursor:grabbing!important}
 .communities-track:focus-visible{outline:2px solid #75c9ff;outline-offset:5px;border-radius:15px}
 @media(min-width:1101px){.drag-hint{display:none}}
 .community-card{min-width:0;overflow:hidden;scroll-snap-align:start;border:1px solid #62509b66;border-radius:15px;background:linear-gradient(150deg,#17162e,#0c1122);transition:border-color .2s,transform .2s}
 .community-art{height:auto;aspect-ratio:1.9;background-image:url('/images/communities/interests-atlas.png');background-size:200% 200%;background-repeat:no-repeat;border-bottom:1px solid #8b6bbb33}
 .community-art.sin-foto{display:grid;place-items:center;background:radial-gradient(circle at 50% 40%,color-mix(in srgb,var(--card-color) 45%,transparent),transparent 65%),linear-gradient(150deg,#1d1840,#0c1122);color:var(--card-color)}
 .community-content{padding:20px}.community-title{display:flex;gap:11px;align-items:center;color:var(--card-color)}h3{color:#f1ecff;font-size:20px;line-height:1.25;letter-spacing:-.035em;font-weight:650;margin:0}
 .community-content p{color:#a9a4c0;font-size:12px;min-height:2.8em;line-height:1.6;margin:12px 0}
 .community-content button{display:flex;align-items:center;justify-content:space-between;width:100%;min-height:44px;padding:10px 0 0;border-top:1px solid #9785b629;background:none;text-align:left;font-size:12px;font-weight:650;color:#d9c2ff}
 @media(hover:hover){.community-card:hover{border-color:var(--card-color);transform:translateY(-2px)}}
 @media(max-width:1100px){.communities-track{grid-auto-columns:calc((100% - 36px)/2.7)}}
 @media(max-width:700px){.community-intro{grid-template-columns:minmax(0,1fr);gap:18px}.communities-track{grid-auto-columns:calc((100% - 18px)/1.7)}.communities-section{padding-block:44px}.community-content{padding:18px}.community-content p{font-size:14px}.community-content button{font-size:14px}}
 @media(max-width:430px){.communities-track{grid-auto-columns:86%}.community-tools{margin-top:20px}}
</style>
