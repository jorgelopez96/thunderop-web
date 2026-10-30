import { expect, test, type Page } from '@playwright/test';
import { PB_PRUEBA } from '../../playwright.config';

const idioma = (page: Page, locale: 'es' | 'en') =>
	page.context().addCookies([{ name: 'thunderop_locale', value: locale, url: 'http://localhost:5174' }]);

// Token con vencimiento en una hora (el SDK de PocketBase solo mira `exp`).
const b64 = (o: object) => Buffer.from(JSON.stringify(o)).toString('base64url');
const TOKEN = `${b64({ alg: 'HS256', typ: 'JWT' })}.${b64({ id: 'u1', type: 'auth', exp: Math.floor(Date.now() / 1000) + 3600 })}.firma`;
const USUARIO = { id: 'u1', collectionName: 'users', username: 'jorge', email: 'jorge@ejemplo.com', name: 'Jorge' };

/** Responde las llamadas del navegador a PocketBase; `rutas` mapea "MÉTODO /ruta" a [status, cuerpo]. */
async function pocketbase(page: Page, rutas: Record<string, [number, object]>) {
	const pedidos: { ruta: string; cuerpo: any; auth?: string }[] = [];
	await page.route(PB_PRUEBA + '/**', async (route) => {
		const req = route.request();
		const cors = { 'access-control-allow-origin': '*', 'access-control-allow-headers': '*', 'access-control-allow-methods': '*' };
		if (req.method() === 'OPTIONS') return route.fulfill({ status: 204, headers: cors });
		const ruta = `${req.method()} ${new URL(req.url()).pathname}`;
		pedidos.push({ ruta, cuerpo: req.postDataJSON(), auth: req.headers().authorization });
		const [status, cuerpo] = rutas[ruta] ?? [404, { message: 'no existe' }];
		await route.fulfill({ status, headers: cors, contentType: 'application/json', body: JSON.stringify(cuerpo) });
	});
	return pedidos;
}

test('Crear cuenta tilda los requisitos de la contraseña y manda la versión de términos del servidor', async ({ page }) => {
	await idioma(page, 'es');
	const pedidos = await pocketbase(page, {
		'GET /api/cuenta/terminos': [200, { version: 7 }],
		'POST /api/collections/users/records': [200, USUARIO],
		'POST /api/cuenta/codigo': [200, {}]
	});
	await page.goto('/crear-cuenta');
	const requisitos = page.getByRole('list', { name: 'Requisitos de la contraseña' });
	await expect(requisitos.locator('li.ok')).toHaveCount(0);
	await page.getByLabel('Contraseña', { exact: true }).fill('abcdefgh');
	await expect(requisitos.locator('li.ok')).toHaveText(['8 caracteres o más']);
	await page.getByLabel('Contraseña', { exact: true }).fill('Abcdefg1!');
	await expect(requisitos.locator('li.ok')).toHaveCount(4);

	await page.getByLabel('Email').fill('jorge@ejemplo.com');
	await page.getByLabel('Usuario').fill('  Jorge ');
	await page.getByLabel('Apodo').fill('Jorge');
	await page.getByLabel('Fecha de nacimiento').fill('2000-05-01');
	await page.getByLabel('Repetí la contraseña').fill('Abcdefg1?');
	await page.getByRole('button', { name: 'Crear cuenta' }).click();
	await expect(page.getByRole('alert')).toContainText('no coinciden');
	await page.getByLabel('Repetí la contraseña').fill('Abcdefg1!');
	await page.getByRole('button', { name: 'Mostrar contraseña' }).first().click();
	await expect(page.getByLabel('Contraseña', { exact: true })).toHaveAttribute('type', 'text');
	await page.getByRole('button', { name: 'Crear cuenta' }).click();
	await expect(page.getByRole('alert')).toContainText('aceptar los términos');
	await page.getByRole('checkbox').check();
	await page.getByRole('button', { name: 'Crear cuenta' }).click();
	await expect(page.getByRole('heading', { name: 'Confirmá tu cuenta' })).toBeVisible();
	const alta = pedidos.find((p) => p.ruta === 'POST /api/collections/users/records')!.cuerpo;
	expect(alta).toMatchObject({ email: 'jorge@ejemplo.com', username: 'jorge', nacimiento: '2000-05-01', terminos: 7, passwordConfirm: 'Abcdefg1!' });
	expect(pedidos.find((p) => p.ruta === 'POST /api/cuenta/codigo')!.cuerpo).toEqual({ email: 'jorge@ejemplo.com', tipo: 'verificar' });
});

test('Entrar lleva a la cuenta y el encabezado pasa a "Mi cuenta"', async ({ page }) => {
	await idioma(page, 'en');
	await pocketbase(page, {
		'POST /api/collections/users/auth-with-password': [200, { token: TOKEN, record: USUARIO }],
		'POST /api/collections/users/auth-refresh': [200, { token: TOKEN, record: USUARIO }],
		'GET /api/cuenta/estado': [200, { falta: [], menor: false, terminosVigente: 1, username: 'jorge' }]
	});
	await page.goto('/');
	await page.locator('.header-actions').getByRole('link', { name: 'Log in' }).click();
	await expect(page).toHaveURL(/\/entrar$/);
	await page.getByLabel('Username or email').fill('jorge');
	await page.getByLabel('Password', { exact: true }).fill('Abcdefg1!');
	await page.getByRole('button', { name: 'Log in', exact: true }).click();
	await expect(page).toHaveURL(/\/cuenta$/);
	await expect(page.getByRole('main')).toContainText('jorge');
	await page.goto('/');
	await expect(page.locator('.header-actions').getByRole('link', { name: 'My account' })).toHaveAttribute('href', '/cuenta');
});

test('La cuenta incompleta muestra lo que falta', async ({ page }) => {
	await idioma(page, 'es');
	await page.addInitScript((token) => localStorage.setItem('pocketbase_auth', JSON.stringify({ token, record: { id: 'u1', collectionName: 'users', username: 'u123' } })), TOKEN);
	await pocketbase(page, {
		'POST /api/collections/users/auth-refresh': [200, { token: TOKEN, record: USUARIO }],
		'GET /api/cuenta/estado': [200, { falta: ['invitacion', 'terminos', 'perfil'], menor: false, terminosVigente: 1, username: 'u123' }]
	});
	await page.goto('/cuenta');
	await expect(page.getByRole('link', { name: 'Completar mi cuenta' })).toHaveAttribute('href', '/completar');
});

for (const [ruta, es, en] of [['/terminos', 'Términos y condiciones', 'Terms of Service'], ['/privacidad', 'Política de privacidad', 'Privacy Policy']]) {
	test(`${ruta} carga en castellano e inglés`, async ({ page }) => {
		await idioma(page, 'es');
		await page.goto(ruta);
		await expect(page.getByRole('heading', { level: 1 })).toHaveText(es);
		await expect(page.getByRole('main')).toContainText('Borrador — pendiente de revisión legal');
		await expect(page.getByRole('main')).toContainText('Versión 1 · 23 de octubre de 2026');
		await expect(page.getByRole('main')).toContainText('soporte@thunderop.com');
		await idioma(page, 'en');
		await page.goto(ruta);
		await expect(page.getByRole('heading', { level: 1 })).toHaveText(en);
		await expect(page.getByRole('main')).toContainText('Draft — pending legal review');
		await expect(page.getByRole('main')).toContainText('soporte@thunderop.com');
	});
}

const INSTALADOR = PB_PRUEBA + '/descargas/thunderop-setup.exe';

test('Con el código correcto, PocketBase da el link y el navegador baja el instalador', async ({ page }) => {
	await idioma(page, 'es');
	const pedidos = await pocketbase(page, { 'POST /api/descarga/validar': [200, { url: INSTALADOR }] });
	await page.goto('/');
	await page.locator('.hero-actions').getByRole('button', { name: 'Descargar para Windows' }).click();
	expect(await page.content()).not.toContain('thunderop-setup');
	await page.getByLabel('Código de invitación').fill('  BUEN-CODIGO ');
	const bajada = page.waitForRequest(INSTALADOR);
	await page.getByRole('button', { name: 'Descargar 0.6.1 · Estable' }).click();
	await bajada;
	expect(pedidos.find((p) => p.ruta === 'POST /api/descarga/validar')!.cuerpo).toEqual({ codigo: 'BUEN-CODIGO' });
});

test('La Beta pide el instalador de prueba con el mismo código', async ({ page }) => {
	await idioma(page, 'es');
	const pedidos = await pocketbase(page, { 'POST /api/descarga/validar': [200, { url: INSTALADOR }] });
	await page.goto('/');
	await page.locator('.hero-actions').getByRole('button', { name: 'Descargar para Windows' }).click();
	await page.getByLabel('Código de invitación').fill('BUEN-CODIGO');
	const bajada = page.waitForRequest(INSTALADOR);
	await page.getByRole('button', { name: 'Descargar 0.7.2 · Beta' }).click();
	await bajada;
	expect(pedidos.find((p) => p.ruta === 'POST /api/descarga/validar')!.cuerpo).toEqual({ version: 'beta', codigo: 'BUEN-CODIGO' });
});

test('Con la cuenta completa, la descarga va con la sesión y sin código', async ({ page }) => {
	await idioma(page, 'es');
	await page.addInitScript((token) => localStorage.setItem('pocketbase_auth', JSON.stringify({ token, record: { id: 'u1', collectionName: 'users', username: 'jorge' } })), TOKEN);
	const pedidos = await pocketbase(page, {
		'POST /api/collections/users/auth-refresh': [200, { token: TOKEN, record: USUARIO }],
		'GET /api/cuenta/estado': [200, { falta: [], menor: false, terminosVigente: 1, username: 'jorge' }],
		'POST /api/descarga/validar': [200, { url: INSTALADOR }]
	});
	await page.goto('/cuenta');
	const bajada = page.waitForRequest(INSTALADOR);
	await page.getByRole('button', { name: 'Descargar 0.6.1 · Estable' }).click();
	await bajada;
	const validar = pedidos.find((p) => p.ruta === 'POST /api/descarga/validar')!;
	expect(validar.cuerpo).toEqual({});
	expect(validar.auth).toBe(TOKEN);
});

for (const url of ['javascript:alert(1)', 'https://otro.example/thunderop-setup.exe']) {
	test(`Un link de descarga que no es del servidor no se abre: ${url}`, async ({ page }) => {
		await idioma(page, 'es');
		await pocketbase(page, { 'POST /api/descarga/validar': [200, { url }] });
		await page.goto('/');
		await page.locator('.hero-actions').getByRole('button', { name: 'Descargar para Windows' }).click();
		await page.getByLabel('Código de invitación').fill('BUEN-CODIGO');
		await page.getByRole('button', { name: 'Descargar 0.6.1 · Estable' }).click();
		await expect(page.getByRole('alert')).toContainText('No se pudo revisar el código');
		await expect(page).toHaveURL('http://localhost:5174/');
	});
}

// window.open de mentira: la "ventana" se cierra sola enseguida y anota cuando el código la cierra.
const ventanaFalsa = () => {
	(window as any).open = () => {
		const w = { closed: false, location: { href: '' }, close() { (window as any).__cerrada = true; } };
		setTimeout(() => { w.closed = true; }, 100);
		return w;
	};
};

test('Cerrar la ventana de Google sin terminar no muestra un error', async ({ page }) => {
	await idioma(page, 'es');
	await page.addInitScript(ventanaFalsa);
	await pocketbase(page, {
		'GET /api/collections/users/auth-methods': [200, { oauth2: { enabled: true, providers: [{ name: 'google', authURL: 'https://accounts.example/auth?x=1&redirect_uri=', codeVerifier: 'v' }] } }]
	});
	await page.route(PB_PRUEBA + '/api/realtime**', () => { /* la conexión en tiempo real queda esperando, como con el popup abierto */ });
	await page.goto('/entrar');
	await page.getByRole('button', { name: 'Entrar con Google' }).click();
	await page.waitForFunction(() => (window as any).__cerrada === true);
	await expect(page.getByRole('alert')).toHaveCount(0);
	await expect(page).toHaveURL(/\/entrar$/);
});

test('Si el navegador bloquea la ventana, lo avisa', async ({ page }) => {
	await idioma(page, 'es');
	await page.addInitScript(() => { (window as any).open = () => null; });
	await page.goto('/entrar');
	await page.getByRole('button', { name: 'Entrar con Google' }).click();
	await expect(page.getByRole('alert')).toHaveText('Permití las ventanas emergentes para entrar con Google.');
});
