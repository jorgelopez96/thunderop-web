import { expect, test } from '@playwright/test';

// La página sale con cabeceras de seguridad: CSP sin scripts de terceros, sin poder meterla en otra página, etc.
test('la página trae las cabeceras de seguridad', async ({ request }) => {
	const r = await request.get('/');
	const h = r.headers();
	expect(h['content-security-policy']).toContain("frame-ancestors 'none'");
	expect(h['content-security-policy']).toContain("object-src 'none'");
	expect(h['content-security-policy']).toMatch(/script-src 'self'/);
	expect(h['x-content-type-options']).toBe('nosniff');
	expect(h['referrer-policy']).toBe('strict-origin-when-cross-origin');
	expect(h['permissions-policy']).toContain('microphone=()');
	expect(h['strict-transport-security']).toContain('max-age=');
});
