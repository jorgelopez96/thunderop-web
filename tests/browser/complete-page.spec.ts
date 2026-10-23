import { test, expect } from '@playwright/test';

test('Complete page translates, loads its artwork and navigates to each section', async ({ page }) => {
 const errors:string[]=[];
 page.on('pageerror',error=>errors.push(error.message));
 await page.emulateMedia({reducedMotion:'reduce'});
 await page.goto('/');
 await page.getByRole('combobox').selectOption('es');
 for(const id of ['download','communities','support','faq']){
  await page.locator('#main-navigation a[href="#'+id+'"]').click();
  await expect(page).toHaveURL(new RegExp('#'+id+'$'));
 }
 await expect(page.locator('#windows-title')).toContainText('Menos interrupciones');
 await expect(page.locator('#communities-title')).toContainText('Un lugar para');
 await expect(page.locator('#faq-title')).toHaveText('Preguntas frecuentes');
 for(const image of await page.locator('main img').all()){
  await image.scrollIntoViewIfNeeded();
  await expect.poll(()=>image.evaluate((img:HTMLImageElement)=>img.complete&&img.naturalWidth>0)).toBe(true);
 }
 const art=await page.request.get('/images/communities/interests-atlas.png');
 expect(art.ok()).toBe(true);
 await page.getByRole('combobox').selectOption('en');
 await expect(page.locator('#windows-title')).toContainText('Less in the way');
 await expect(page.locator('#communities-title')).toContainText('A place for');
 await expect(page.locator('#faq-title')).toHaveText('Frequently asked questions');
 await page.locator('.footer-language button').filter({hasText:'Español'}).click();
 await expect(page.locator('html')).toHaveAttribute('lang','es');
 await page.reload();
 await expect(page.getByRole('combobox')).toHaveValue('es');
 expect(errors).toEqual([]);
});

test('FAQ supports accent-insensitive search, clear and keyboard accordion controls',async({page})=>{
 await page.goto('/');
 await page.getByRole('combobox').selectOption('es');
 const search=page.getByRole('searchbox',{name:'Buscar preguntas'});
 await search.fill('idioma');
 await expect(page.locator('.faq-answers details')).toHaveCount(1);
 await expect(page.locator('.faq-answers summary')).toContainText('idioma');
 await page.locator('.faq-answers summary').focus();
 await page.keyboard.press('Enter');
 await expect(page.locator('.faq-answers details')).toHaveAttribute('open','');
 await expect(page.locator('.faq-answers details p')).toBeVisible();
 await search.fill('comunicacion');
 await expect(page.locator('.faq-answers summary')).toContainText('Qué es Thunderop');
 await search.fill('xyzxyz');
 await expect(page.locator('.faq-empty')).toBeVisible();
 await expect(page.locator('.faq-count')).toHaveText('0 respuestas');
 await page.getByRole('button',{name:'Borrar búsqueda'}).click();
 await expect(search).toBeFocused();
 await expect(page.locator('.faq-answers details')).toHaveCount(6);
 await page.getByRole('combobox').selectOption('en');
 await expect(page.getByRole('searchbox',{name:'Search questions'})).toBeVisible();
 await expect(page.locator('.faq-answers summary').first()).toHaveText('What is Thunderop?');
});

test('Community exploration and support expose honest availability and restore focus',async({page})=>{
 await page.goto('/');
 await page.getByRole('combobox').selectOption('en');
 const explore=page.getByRole('button',{name:'Explore Music',exact:true});
 await explore.click();
 const dialog=page.getByRole('dialog');
 await expect(dialog).toContainText('Music');
 await expect(dialog).toContainText('invitation links will appear here');
 await page.keyboard.press('Escape');
 await expect(explore).toBeFocused();
 const contact=page.getByRole('button',{name:/Contact support/});
 await contact.click();
 await expect(dialog).toContainText('Support channels coming soon');
 await page.getByRole('button',{name:'Got it',exact:true}).click();
 await expect(contact).toBeFocused();
 await page.locator('#download .button-primary').click();
 await expect(dialog).toContainText('Available now');
 await page.keyboard.press('Escape');
 await expect(page.locator('#download .button-primary')).toBeFocused();
});

test('Community cards drag in both directions and mobile navigation still works',async({page})=>{
 await page.emulateMedia({reducedMotion:'reduce'});
 await page.goto('/');
 await page.getByRole('combobox').selectOption('es');
 for(const width of [390,1024]){
  await page.setViewportSize({width,height:900});
  const track=page.getByRole('region',{name:'Intereses de la comunidad'});
  await track.scrollIntoViewIfNeeded();
  await track.focus();
  await page.keyboard.press('Home');
  await expect.poll(()=>track.evaluate(el=>el.scrollLeft)).toBe(0);
  const box=(await track.boundingBox())!;
  const y=box.y+60;
  await page.mouse.move(box.x+box.width*.85,y);
  await page.mouse.down();
  await page.mouse.move(box.x+box.width*.15,y,{steps:12});
  await expect(track).toHaveClass(/is-dragging/);
  await expect.poll(()=>track.evaluate(el=>el.scrollLeft)).toBeGreaterThan(100);
  await page.mouse.up();
  await expect(track).not.toHaveClass(/is-dragging/);
  await expect(page.getByRole('dialog')).not.toBeVisible();
  await page.mouse.move(box.x+box.width*.15,y);
  await page.mouse.down();
  await page.mouse.move(box.x+box.width+10,y,{steps:12});
  await page.mouse.up();
  await expect.poll(()=>track.evaluate(el=>el.scrollLeft)).toBe(0);
 }
 await page.setViewportSize({width:390,height:844});
 await page.getByRole('button',{name:'Abrir navegación'}).click();
 await page.locator('#main-navigation a[href="#communities"]').click();
 await expect(page.getByRole('button',{name:'Abrir navegación'})).toHaveAttribute('aria-expanded','false');
 await expect(page).toHaveURL(/#communities$/);
});

for(const width of [320,390,557,768,1024,1200,1440,1920]){
 test('All sections fit at '+width+'px in Spanish and English',async({page})=>{
  await page.setViewportSize({width,height:1000});
  await page.emulateMedia({reducedMotion:'reduce'});
  await page.goto('/');
  for(const lang of ['es','en']){
   await page.getByRole('combobox').selectOption(lang);
   await page.evaluate(()=>document.fonts.ready);
   const issues=await page.evaluate(()=>{
    const problems:string[]=[];
    if(document.documentElement.scrollWidth>innerWidth)problems.push('page overflow');
    const selectors=['.windows-copy','.windows-visual','.windows-points','.community-intro','.communities-track','.help-intro','.help-panel','.footer-top'];
    for(const selector of selectors){
     const el=document.querySelector(selector)!;const b=el.getBoundingClientRect();
     if(b.left < -1 || b.right>innerWidth+1)problems.push(selector+' outside viewport');
     if(el.scrollWidth>el.clientWidth+1 && selector!=='.communities-track')problems.push(selector+' content overflow');
    }
    for(const el of document.querySelectorAll('#windows-title,#communities-title,#help-title,#faq-title,.windows-point h3,.community-title h3,.support-links strong')){
     const parent=el.getBoundingClientRect();const range=document.createRange();range.selectNodeContents(el);
     if([...range.getClientRects()].some(r=>r.left<parent.left-1||r.right>parent.right+1))problems.push('clipped heading '+el.textContent);
    }
    const visibleNav=document.querySelector('#main-navigation')!;if(getComputedStyle(visibleNav).display!=='none'){
     const brand=document.querySelector('.brand-link')!.getBoundingClientRect();
     const nav=visibleNav.getBoundingClientRect();const actions=document.querySelector('.header-actions')!.getBoundingClientRect();
     if(brand.right>nav.left || nav.right>actions.left)problems.push('header navigation overlaps');
    }
    return problems;
   });
   expect(issues).toEqual([]);
   if([390,1440].includes(width)){
    for(const image of await page.locator('main img').all()){
     await image.scrollIntoViewIfNeeded();
     await expect.poll(()=>image.evaluate((img:HTMLImageElement)=>img.complete&&img.naturalWidth>0)).toBe(true);
    }
    await page.locator('#support').scrollIntoViewIfNeeded();
    for(const selector of ['.windows-section','.help-section','.communities-section']){
     await page.locator(selector).screenshot({path:'.tmp/section-'+selector.slice(1)+'-'+width+'-'+lang+'.png',animations:'disabled'});
    }
    await page.screenshot({path:'.tmp/complete-'+width+'-'+lang+'.png',fullPage:true,animations:'disabled'});
   }
  }
 });
}


test('Dragging over Explore does not open it, while clicks and keyboard navigation still work',async({page})=>{
 await page.setViewportSize({width:820,height:1100});
 await page.emulateMedia({reducedMotion:'reduce'});
 await page.goto('/');
 await page.getByRole('combobox').selectOption('en');
 const track=page.getByRole('region',{name:'Community interests'});
 await track.scrollIntoViewIfNeeded();
 await expect(page.locator('.carousel-arrow')).toHaveCount(0);
 const button=page.getByRole('button',{name:'Explore Gaming',exact:true});
 const box=(await button.boundingBox())!;
 await page.mouse.move(box.x+box.width*.8,box.y+box.height/2);
 await page.mouse.down();
 await page.mouse.move(box.x+box.width*.8-100,box.y+box.height/2,{steps:10});
 await page.mouse.up();
 await expect(page.getByRole('dialog')).not.toBeVisible();
 await track.focus();
 await page.keyboard.press('End');
 await expect.poll(()=>track.evaluate(el=>Math.abs(el.scrollWidth-el.clientWidth-el.scrollLeft))).toBeLessThan(2);
 await page.keyboard.press('Home');
 await expect.poll(()=>track.evaluate(el=>el.scrollLeft)).toBe(0);
 await button.click();
 await expect(page.getByRole('dialog')).toContainText('Gaming');
 await page.keyboard.press('Escape');
 await expect(button).toBeFocused();
 // A small hand movement should still count as a normal click.
 const clickBox=(await button.boundingBox())!;
 await page.mouse.move(clickBox.x+40,clickBox.y+20);
 await page.mouse.down();
 await page.mouse.move(clickBox.x+42,clickBox.y+20);
 await page.mouse.up();
 await expect(page.getByRole('dialog')).toBeVisible();
});

test('Touch keeps native horizontal swiping and vertical page scrolling',async({browser})=>{
 const context=await browser.newContext({viewport:{width:390,height:844},isMobile:true,hasTouch:true,locale:'es-AR',reducedMotion:'reduce'});
 try{
  const page=await context.newPage();
  await page.goto('/');
  await expect(page.getByRole('combobox')).toBeEnabled();
  const track=page.locator('.communities-track');
  await track.scrollIntoViewIfNeeded();
  const box=(await track.boundingBox())!;
  const session=await context.newCDPSession(page);
  async function swipe(x:number,y:number,deltaX:number,deltaY:number){
   await session.send('Input.dispatchTouchEvent',{type:'touchStart',touchPoints:[{x,y}]});
   for(let step=1;step<=12;step++){
    await session.send('Input.dispatchTouchEvent',{type:'touchMove',touchPoints:[{x:x+deltaX*step/12,y:y+deltaY*step/12}]});
    await page.evaluate(()=>new Promise<void>(resolve=>requestAnimationFrame(()=>resolve())));
   }
   await session.send('Input.dispatchTouchEvent',{type:'touchEnd',touchPoints:[]});
  }
  await swipe(box.x+box.width*.8,box.y+60,-220,0);
  await expect.poll(()=>track.evaluate(el=>el.scrollLeft)).toBeGreaterThan(100);
  await expect(track).not.toHaveClass(/is-dragging/);
  const scrollY=await page.evaluate(()=>window.scrollY);
  await swipe(box.x+box.width/2,box.y+130,0,-180);
  await expect.poll(()=>page.evaluate(()=>window.scrollY)).toBeGreaterThan(scrollY+50);
  await session.detach();
 }finally{await context.close()}
});
