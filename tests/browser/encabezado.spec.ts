import { expect, test, type Page } from '@playwright/test';
import { elegirIdioma } from './elegir-idioma';

// Encabezado y portada (pedidos del 2026-10-25): logo con la T, sin "Descargar" arriba, login o app web + cuenta.
const conSesion = async (page: Page) => {
	const b64 = (o: object) => Buffer.from(JSON.stringify(o)).toString('base64url');
	const token = `${b64({ alg: 'HS256', typ: 'JWT' })}.${b64({ id: 'u1', type: 'auth', exp: Math.floor(Date.now() / 1000) + 3600 })}.firma`;
	await page.addInitScript((t) => localStorage.setItem('pocketbase_auth', JSON.stringify({ token: t, record: { id: 'u1', collectionName: 'users', username: 'jorge' } })), token);
};

test('marca: "Thunderop" sin punto y con el logo de la T', async ({ page }) => {
	await page.goto('/');
	const marca = page.locator('.site-header .brand');
	await expect(marca).toHaveText('Thunderop');
	await expect(marca.locator('svg.brand-logo')).toBeVisible();
});

test('sin sesión: arriba "Iniciar sesión" y nada de "Descargar"; la portada sin las etiquetas', async ({ page }) => {
	await page.setViewportSize({ width: 1280, height: 800 });
	await page.goto('/');
	await elegirIdioma(page, 'es');
	const acciones = page.locator('.header-actions');
	await expect(acciones.getByRole('link', { name: 'Iniciar sesión' })).toBeVisible();
	await expect(acciones.getByRole('button', { name: /Descargar/ })).toHaveCount(0);
	await expect(page.locator('.hero-benefits')).toHaveCount(0);
	await expect(page.getByText('Pensado para gamers')).toHaveCount(0);
});

test('con sesión: "Ir a la app web" y "Mi cuenta", también en el menú del celular (sin "Próximamente")', async ({ page }) => {
	await conSesion(page);
	await page.setViewportSize({ width: 1280, height: 800 });
	await page.goto('/');
	await elegirIdioma(page, 'es');
	const acciones = page.locator('.header-actions');
	await expect(acciones.getByRole('link', { name: 'Ir a la app web' })).toHaveAttribute('href', 'https://app.thunderop.com');
	await expect(acciones.getByRole('link', { name: 'Mi cuenta' })).toHaveAttribute('href', '/cuenta');
	await page.setViewportSize({ width: 390, height: 844 });
	await page.getByRole('button', { name: 'Abrir navegación', exact: true }).click();
	const pie = page.locator('.mobile-menu-footer');
	await expect(pie.getByRole('link', { name: 'Ir a la app web' })).toBeVisible();
	await expect(pie.getByRole('link', { name: 'Mi cuenta' })).toBeVisible();
	await expect(pie.getByRole('button', { name: /Descargar/ })).toHaveCount(0);
	await expect(pie).not.toContainText('Próximamente');
});

test('selector de idioma propio: lista con Español e Inglés, cambia el texto', async ({ page }) => {
	await page.goto('/');
	await expect(page.locator('.language-selector select')).toHaveCount(0);
	await elegirIdioma(page, 'en');
	await expect(page.locator('.language-selector').first()).toHaveAttribute('data-locale', 'en');
	await expect(page.locator('.header-actions').getByRole('link', { name: 'Log in' })).toBeVisible();
	await elegirIdioma(page, 'es');
	await expect(page.locator('.header-actions').getByRole('link', { name: 'Iniciar sesión' })).toBeVisible();
});
