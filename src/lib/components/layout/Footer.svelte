<script lang="ts">
 import { getI18n } from '#lib/i18n/context.svelte.js';
 import { pageMessages } from '#lib/i18n/page-messages.js';
 import Brand from '#lib/components/ui/Brand.svelte';
 import Icon from '#lib/components/ui/Icon.svelte';
 const i18n=getI18n();
 const t=$derived(pageMessages[i18n.locale].footer);
 const year=new Date().getFullYear();
</script>
<footer class="site-end">
 <div class="container">
  <div class="footer-top"><div class="footer-brand"><a href="#home" aria-label="Thunderop"><Brand/></a><p>{i18n.text.footer}</p><span>{t.note}</span></div>
   <nav aria-label={t.product}><h2>{t.product}</h2><a href="#experience">{t.features}</a><a href="#communities">{t.communities}</a><a href="#download">{t.windows}</a></nav>
   <nav aria-label={t.help}><h2>{t.help}</h2><a href="#faq">{t.faq}</a><a href="#support">{t.support}</a><a href="#home">{t.top}<Icon name="arrow" size={14}/></a></nav>
   <div class="footer-language"><h2>{t.language}</h2><div role="group" aria-label={i18n.text.language.label}><button disabled={!i18n.ready} aria-pressed={i18n.locale==='es'} onclick={()=>i18n.select('es')}>Español</button><button disabled={!i18n.ready} aria-pressed={i18n.locale==='en'} onclick={()=>i18n.select('en')}>English</button></div><span><Icon name="globe" size={14}/>Thunderop · Windows</span></div>
  </div>
  <div class="footer-bottom"><p>© {year} Thunderop. {t.rights}</p><span aria-hidden="true">✦ <span>CONNECT · PLAY · TOGETHER</span></span></div>
 </div>
</footer>
<style>
 .site-end{border-top:1px solid #7663aa40;background:#070815;padding-block:44px 22px}.footer-top{display:grid;grid-template-columns:minmax(0,1.2fr) repeat(2,minmax(0,.7fr)) minmax(0,.8fr);gap:30px;padding-bottom:34px}
 .footer-brand{min-width:0}.footer-brand>a{display:inline-flex}.footer-brand p{font-size:12px;color:#b2abc8;margin:18px 0 8px}.footer-brand>span{font-size:11px;color:#827c99}
 h2{font-family:var(--font-sans);font-size:12px;font-weight:700;line-height:1.5;color:#ddd5ef;margin:2px 0 14px}nav{display:flex;align-items:start;flex-direction:column}nav>a{display:flex;align-items:center;gap:8px;min-height:37px;font-size:12px;color:#a39ab8}nav>a:hover{color:#cfb4ff}nav>a:last-child :global(svg){transform:rotate(-90deg)}
 .footer-language>div{display:flex;gap:7px;flex-wrap:wrap}.footer-language button{min-height:44px;padding:9px 11px;border:1px solid #6c568e4d;border-radius:8px;background:transparent;color:#aaa1be;font-size:12px}.footer-language button[aria-pressed=true]{background:#5c2a9d33;border-color:#9d65e788;color:#d5baff}.footer-language>span{display:flex;gap:7px;align-items:center;color:#857c9c;font-size:10px;margin-top:15px}
 .footer-bottom{display:flex;align-items:center;justify-content:space-between;gap:20px;padding-top:20px;border-top:1px solid #9482b11f;color:#827c99;font-size:10px;line-height:1.6}.footer-bottom p{margin:0}.footer-bottom>span{display:flex;align-items:center;gap:10px;color:#a380d8}.footer-bottom>span>span{color:#8f85a5;letter-spacing:.15em;font-size:8px}
 @media(max-width:900px){.footer-top{grid-template-columns:repeat(3,minmax(0,1fr));gap:26px}.footer-brand{grid-column:1/-1}}
 @media(max-width:560px){.site-end{padding-top:32px}.footer-top{grid-template-columns:repeat(2,minmax(0,1fr));gap:28px 18px}.footer-language{grid-column:1/-1}.footer-language>span{font-size:11px}nav>a{font-size:14px;min-height:44px}h2{font-size:13px}.footer-language button{font-size:14px;padding-inline:15px}.footer-bottom{align-items:start;flex-direction:column;gap:14px;font-size:11px}}
</style>
