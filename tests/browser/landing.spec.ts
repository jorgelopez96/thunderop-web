import { test, expect } from '@playwright/test';

test('Spanish is rendered on the server from the browser language', async ({ browser }) => {
	const context = await browser.newContext({ locale: 'es-AR', viewport: { width: 1440, height: 1000 } });
	const page = await context.newPage();
	const response = await page.goto('/');
	expect(response?.status()).toBe(200);
	await expect(page.locator('html')).toHaveAttribute('lang', 'es');
	await expect(page.getByRole('heading', { level: 1 })).toContainText('Voz, video y');
	await expect(page).toHaveTitle(/Buenas charlas/);
	await expect(page.getByRole('combobox')).toBeEnabled();
    const image = page.locator('.hero-mascot img');
	await expect(image).toBeVisible();
	expect(await image.evaluate((element: HTMLImageElement) => element.complete && element.naturalWidth > 0)).toBe(true);
	await page.screenshot({ path: '.tmp/preview-desktop.png', fullPage: true });
	await context.close();
});

test('A manual language choice updates all visible text and survives reload', async ({ page, context }) => {
	await page.goto('/');
	const selector = page.getByRole('combobox');
	await selector.selectOption('es');
	await expect(page.getByRole('heading', { level: 1 })).toContainText('Voz, video y');
	await expect(page.locator('html')).toHaveAttribute('lang', 'es');
	await page.reload();
	await expect(page.getByRole('combobox')).toHaveValue('es');
	await selector.selectOption('en');
	await expect(page.getByRole('heading', { level: 1 })).toContainText('Voice, video &');
	await expect(page).toHaveTitle(/Good chats/);
	expect((await context.cookies()).find((cookie) => cookie.name === 'thunderop_locale')?.value).toBe('en');
	await page.reload();
	await expect(page.locator('html')).toHaveAttribute('lang', 'en');
	await expect(page.getByRole('combobox')).toHaveValue('en');
});

test('Download asks for the invitation code and closes with Escape', async ({ page }) => {
	await page.goto('/');
	await page.getByRole('combobox').selectOption('en');
	await page.locator('.hero-actions').getByRole('button', { name: 'Download for Windows' }).click();
	await expect(page.getByRole('dialog')).toBeVisible();
	await expect(page.getByRole('dialog')).toContainText('Invitation only');
	// El link del instalador no está en la página: lo da el servidor solo con el código correcto.
	expect(await page.content()).not.toContain('thunderop-setup.exe');
	await page.getByLabel('Invitation code').fill('cualquiera');
	await page.getByRole('button', { name: 'Download installer' }).click();
	await expect(page.getByRole('alert')).toContainText('That code is not right');
	const ok = await page.request.post('/descargar', { data: { codigo: 'Tunderopi' } });
	expect((await ok.json()).url).toBe('https://thunderop.duckdns.org/descargas/thunderop-setup.exe');
	expect((await page.request.post('/descargar', { data: { codigo: 'tunderopi' } })).status()).toBe(401);
	await page.keyboard.press('Escape');
	await expect(page.getByRole('dialog')).not.toBeVisible();
	await expect(page.locator('.hero-actions').getByRole('button')).toBeFocused();
});

test('Mobile navigation works without horizontal overflow', async ({ browser }) => {
	const context = await browser.newContext({ locale: 'es-AR', viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true });
	const page = await context.newPage();
	await page.goto('/');
	await expect(page.locator('.hero-mascot')).toBeVisible();
	expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true);
	await page.getByRole('button', { name: 'Abrir navegación' }).click();
	await expect(page.getByRole('button', { name: 'Cerrar navegación' })).toHaveAttribute('aria-expanded', 'true');
	await page.getByRole('link', { name: 'La experiencia', exact: true }).click();
	await expect(page.getByRole('button', { name: 'Abrir navegación' })).toHaveAttribute('aria-expanded', 'false');
	await page.getByRole('button', { name: 'Abrir navegación' }).click();
	await page.keyboard.press('Escape');
	await expect(page.getByRole('button', { name: 'Abrir navegación' })).toBeFocused();
	await page.screenshot({ path: '.tmp/preview-mobile.png', fullPage: true });
	await context.close();
});

test('Server fallback and stored preference follow the language priority', async ({ request }) => {
	const unsupported = await request.get('/', { headers: { 'Accept-Language': 'fr-FR,fr;q=0.9' } });
	expect(await unsupported.text()).toContain('<html lang="en">');
	const preferred = await request.get('/', { headers: { 'Accept-Language': 'en-US', Cookie: 'thunderop_locale=es' } });
	expect(await preferred.text()).toContain('<html lang="es">');
});

test('Log in opens a coming-soon dialog', async ({ page }) => {
	await page.goto('/');
	await page.getByRole('combobox').selectOption('es');
	await page.locator('.header-actions').getByRole('button', { name: 'Iniciar sesión' }).click();
	await expect(page.getByRole('dialog')).toContainText('Próximamente');
	await expect(page.getByRole('dialog')).toContainText('navegador');
	await page.keyboard.press('Escape');
	await expect(page.getByRole('dialog')).not.toBeVisible();
});
