import { test, expect } from '@playwright/test';

test('Mobile menu supports focus, backdrop dismissal, section selection and download',async({page})=>{
 await page.setViewportSize({width:390,height:844});
 await page.emulateMedia({reducedMotion:'reduce'});
 await page.goto('/');
 await page.getByRole('combobox').selectOption('es');
 const opener=page.getByRole('button',{name:'Abrir navegación',exact:true});
 const nav=page.locator('#main-navigation');
 await opener.click();
 await expect(nav.getByRole('link',{name:'La experiencia',exact:true})).toBeFocused();
 await expect(page.getByRole('button',{name:'Cerrar navegación',exact:true})).toHaveAttribute('aria-expanded','true');
 await page.getByRole('button',{name:'Cerrar menú desde el fondo'}).click({position:{x:5,y:800}});
 await expect(nav).not.toBeVisible();
 await expect(opener).toBeFocused();
 await opener.click();
 await page.keyboard.press('Escape');
 await expect(opener).toBeFocused();
 await opener.click();
 await nav.getByRole('link',{name:'Comunidades',exact:true}).click();
 await expect(page).toHaveURL(/#communities$/);
 await expect(nav).not.toBeVisible();
 await opener.click();
 await expect(nav.getByRole('link',{name:'Comunidades',exact:true})).toHaveAttribute('aria-current','location');
 await nav.getByRole('button',{name:'Descargar para Windows',exact:true}).click();
 await expect(page.getByRole('dialog')).toContainText('Disponible');
 await page.keyboard.press('Escape');
 await expect(opener).toBeFocused();
 await opener.click();
 await page.setViewportSize({width:1440,height:1000});
 await expect(page.locator('.menu-scrim')).toHaveCount(0);
 await expect(nav).toBeVisible();
 await expect(nav.locator('.mobile-menu-footer')).not.toBeVisible();
});

test('Keyboard can enter and leave the menu, and language changes translate it while open',async({page})=>{
 await page.setViewportSize({width:557,height:900});
 await page.emulateMedia({reducedMotion:'reduce'});
 await page.goto('/');
 await page.getByRole('combobox').selectOption('es');
 const opener=page.getByRole('button',{name:'Abrir navegación',exact:true});
 await opener.focus();
 await page.keyboard.press('Enter');
 const links=page.locator('#main-navigation > a');
 await expect(links.first()).toBeFocused();
 await page.keyboard.press('Tab');
 await expect(links.nth(1)).toBeFocused();
 await page.getByRole('combobox').selectOption('en');
 await expect(page.locator('.menu-kicker')).toHaveText('Explore Thunderop');
 await expect(links.first()).toHaveAccessibleName('The experience');
 await expect(page.locator('.mobile-menu-footer button')).toHaveText('Download for Windows');
 await page.locator('.hero-actions button').focus();
 await expect(page.locator('#main-navigation')).not.toBeVisible();
});

for(const viewport of [{width:320,height:568},{width:390,height:844},{width:557,height:900},{width:820,height:1180},{width:1000,height:800},{width:844,height:390}]){
 test('Menu fits '+viewport.width+'x'+viewport.height+' in both languages',async({page})=>{
  await page.setViewportSize(viewport);
  await page.emulateMedia({reducedMotion:'reduce'});
  await page.goto('/');
  await page.getByRole('combobox').selectOption('es');
  await page.getByRole('button',{name:'Abrir navegación',exact:true}).click();
  for(const locale of ['es','en']){
   await page.getByRole('combobox').selectOption(locale);
   await page.evaluate(()=>document.fonts.ready);
   const metrics=await page.locator('#main-navigation').evaluate(nav=>{
    const box=nav.getBoundingClientRect();
    const clipped=[...nav.querySelectorAll('.nav-copy > span,.nav-copy small,.menu-kicker,.mobile-menu-intro p')].filter(el=>{
     const b=el.getBoundingClientRect();const range=document.createRange();range.selectNodeContents(el);
     return [...range.getClientRects()].some(r=>r.left<b.left-1||r.right>b.right+1);
    }).map(el=>el.textContent);
    return {left:box.left,right:box.right,top:box.top,bottom:box.bottom,overflow:nav.scrollWidth>nav.clientWidth+1,clipped,smallTargets:[...nav.querySelectorAll('a,button')].some(el=>el.getBoundingClientRect().height<44)};
   });
   expect(metrics.left).toBeGreaterThanOrEqual(0);
   expect(metrics.right).toBeLessThanOrEqual(viewport.width);
   expect(metrics.top).toBeGreaterThanOrEqual(0);
   expect(metrics.bottom).toBeLessThanOrEqual(viewport.height);
   expect(metrics.overflow).toBe(false);
   expect(metrics.clipped).toEqual([]);
   expect(metrics.smallTargets).toBe(false);
   expect(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth)).toBe(false);
   await page.locator('#main-navigation .menu-download').scrollIntoViewIfNeeded();
   await expect(page.locator('#main-navigation .menu-download')).toBeInViewport();
   // Restore the top of the independently scrollable menu for a useful preview.
   await page.locator('#main-navigation').evaluate(nav=>nav.scrollTop=0);
   await page.screenshot({path:'.tmp/menu-'+viewport.width+'x'+viewport.height+'-'+locale+'.png',animations:'disabled'});
  }
 });
}
