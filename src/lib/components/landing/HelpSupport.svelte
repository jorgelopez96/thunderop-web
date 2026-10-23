<script lang="ts">
 import { getI18n } from '#lib/i18n/context.svelte.js';
 import { pageMessages } from '#lib/i18n/page-messages.js';
 import Icon from '#lib/components/ui/Icon.svelte';
 const i18n = getI18n();
 const t = $derived(pageMessages[i18n.locale].help);
 let { onContact }: { onContact: () => void } = $props();
 let query = $state('');
 let search: HTMLInputElement;
 const keys = ['about','windows','download','servers','language','support'] as const;
 function normalize(value:string){return value.normalize('NFD').replace(/\p{M}/gu,'').toLowerCase().trim()}
 const answers = $derived(keys.filter(key=>normalize(t.questions[key].q+' '+t.questions[key].a).includes(normalize(query))));
</script>
<section id="support" class="help-section" aria-labelledby="help-title">
 <div class="container help-layout">
  <div class="help-intro"><h2 id="help-title">{t.title}<br/><span>{t.accent}</span></h2><p class="section-description">{t.description}</p><div class="helper-art"><img src="/images/mascots/support-helper.png" alt={t.mascot} loading="lazy" width="1254" height="1254"/><span aria-hidden="true">✦</span></div></div>
  <div class="help-panel">
   <section id="faq" aria-labelledby="faq-title">
    <h3 id="faq-title">{t.faqTitle}</h3>
    <div class="faq-search"><label class="sr-only" for="faq-search">{t.search}</label><Icon name="search" size={18}/><input bind:this={search} bind:value={query} id="faq-search" type="search" placeholder={t.placeholder}/>{#if query}<button aria-label={t.clear} onclick={()=>{query='';search?.focus()}}><Icon name="close" size={17}/></button>{/if}</div>
    <p class="faq-count" aria-live="polite">{answers.length} {t.results}</p>
    <div class="faq-answers">
     {#each answers as key (key)}<details name="thunderop-faq" open={key==='about' && !query}><summary>{t.questions[key].q}<span><Icon name="plus" size={17}/></span></summary><p>{t.questions[key].a}</p></details>{:else}<p class="faq-empty">{t.empty}</p>{/each}
    </div>
   </section>
   <div class="support-options"><h3>{t.supportTitle}</h3><div class="support-links">
    <a href="#faq" onclick={()=>{query='';search?.focus({preventScroll:true})}}><span class="support-icon"><Icon name="book" size={22}/></span><span><strong>{t.center}</strong><small>{t.centerBody}</small></span><Icon name="arrow" size={16}/></a>
    <button disabled={!i18n.ready} onclick={onContact}><span class="support-icon purple"><Icon name="mail" size={22}/></span><span><strong>{t.contact}</strong><small>{t.contactBody}</small></span><Icon name="arrow" size={16}/></button>
    <a href="#communities"><span class="support-icon cyan"><Icon name="users" size={22}/></span><span><strong>{t.community}</strong><small>{t.communityBody}</small></span><Icon name="arrow" size={16}/></a>
   </div></div>
  </div>
 </div>
</section>
<style>
 .help-section{padding-block:64px 70px;border-top:1px solid #7658b438;background:radial-gradient(ellipse at 10% 80%,#35156b4d,transparent 48%),linear-gradient(180deg,#0a0c1e,#090a1b);overflow:clip}
 .help-layout{display:grid;grid-template-columns:minmax(0,.8fr) minmax(0,1.2fr);gap:60px;align-items:start}
 .help-intro{min-width:0}.help-intro h2>span{color:#cabcf4}.help-intro .section-description{max-width:36ch}
 .helper-art{position:relative;width:min(100%,355px);margin:20px auto 0}.helper-art::before{content:'';position:absolute;inset:18% 6% 0;border-radius:50%;background:radial-gradient(ellipse,#5128ab44,transparent 70%)}.helper-art img{position:relative;width:100%;height:auto;filter:drop-shadow(0 12px 18px #7234cf25)}.helper-art>span{position:absolute;top:4%;left:4%;color:#b97aff;font-size:25px}
 .help-panel{min-width:0;padding:28px;border:1px solid #6457b066;border-radius:22px;background:linear-gradient(145deg,#12142bcc,#0c1020e6);box-shadow:0 12px 50px #02030f44}
 #faq{scroll-margin-top:24px}h3{font-size:21px;line-height:1.35;letter-spacing:-.035em;margin:0 0 20px;font-weight:650}
 .faq-search{display:flex;align-items:center;gap:11px;border:1px solid #7564b250;border-radius:10px;background:#090c1f;min-height:48px;padding:0 13px;color:#a290cd}
 .faq-search:focus-within{outline:2px solid #7dafff;outline-offset:2px}.faq-search input{min-width:0;width:100%;font:inherit;font-size:13px;min-height:48px;outline:0;background:none;color:#f1edff;border:0}
 input::-webkit-search-cancel-button{display:none}input::placeholder{color:#8784a0}.faq-search button{display:grid;place-items:center;min-width:44px;min-height:44px;background:none;color:#bdb0db;margin-right:-10px}
 .faq-count{font-size:10px;color:#918aa8;margin:11px 0}
 .faq-answers{display:grid;gap:9px}details{border:1px solid #65568b55;border-radius:9px;background:linear-gradient(100deg,#211b3c66,#12182b80);overflow:hidden}
 summary{display:flex;align-items:center;justify-content:space-between;gap:16px;min-height:49px;padding:12px 14px;list-style:none;cursor:pointer;font-size:13px;font-weight:650;line-height:1.5;color:#e2dcf4}
 summary::-webkit-details-marker{display:none}summary>span{flex-shrink:0;color:#b99be9;transition:transform .2s}details[open] summary>span{transform:rotate(45deg)}
 summary:focus-visible{outline:2px solid #75c9ff;outline-offset:-3px;border-radius:8px}details[open]{border-color:#8870c485;background:linear-gradient(120deg,#28204777,#15182b)}
 details p{font-size:13px;line-height:1.8;color:#b1abc9;padding:0 14px 16px;margin:0}.faq-empty{font-size:14px;line-height:1.8;color:#b3accb;padding:20px 4px}
 .support-options{border-top:1px solid #8470b72b;margin-top:27px;padding-top:24px}.support-options h3{font-size:17px;margin-bottom:14px}
 .support-links{display:grid;gap:9px}.support-links a,.support-links button{min-width:0;width:100%;min-height:72px;display:flex;align-items:center;gap:14px;padding:13px;border:1px solid #6f5a9b4a;border-radius:10px;background:linear-gradient(110deg,#1a1c3a80,#13172b);text-align:left;transition:border-color .2s}
 .support-links a:hover,.support-links button:hover{border-color:#a181d8}.support-icon{display:grid;place-items:center;width:39px;height:39px;flex-shrink:0;border:1px solid #6b77e566;border-radius:10px;background:#4243c526;color:#99a4ff}.support-icon.purple{background:#842dd026;border-color:#b35fff66;color:#bf85ff}.support-icon.cyan{background:#1878b126;border-color:#3cafe466;color:#63d5ff}
 .support-links strong{font-size:13px;font-weight:650;display:block;color:#ede7ff}.support-links small{display:block;font-size:11px;line-height:1.6;color:#a19bbd;margin-top:3px}.support-links > a > :global(svg:last-child),.support-links > button > :global(svg:last-child){margin-left:auto;color:#bba7e6}
 @media(min-width:1200px){.support-links{grid-template-columns:1fr 1fr}.support-links>a:last-child{grid-column:1/-1}}
 @media(max-width:900px){.help-layout{gap:28px;grid-template-columns:minmax(0,.75fr) minmax(0,1.25fr)}.help-panel{padding:22px}.help-intro h2{font-size:30px}}
 @media(max-width:700px){.help-section{padding-block:44px}.help-layout{grid-template-columns:minmax(0,1fr);gap:28px}.help-intro{display:grid;grid-template-columns:minmax(0,1fr) minmax(0,.55fr);column-gap:12px;align-items:center}.help-intro h2,.help-intro .section-description{grid-column:1}.helper-art{grid-column:2;grid-row:1/4;margin:0;width:100%}.helper-art>span{display:none}.help-intro h2{font-size:clamp(25px,5vw,35px)}.help-intro .section-description{font-size:14px}.help-panel{padding:22px 18px}.faq-search input{font-size:16px}summary{font-size:14px}details p{font-size:14px}.support-links strong{font-size:14px}.support-links small{font-size:12px}}
 @media(max-width:420px){.help-intro{grid-template-columns:minmax(0,1fr)}.helper-art{grid-column:1;grid-row:4;width:210px;margin:15px auto 0}.help-intro .section-description{font-size:15px}.help-intro h2{font-size:30px}.help-panel{padding:22px 14px}h3{font-size:20px}}
</style>
