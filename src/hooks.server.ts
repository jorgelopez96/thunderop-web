import type { Handle } from '@sveltejs/kit/hooks';
import { localeCookie, resolveLocale } from '#lib/i18n/locales.js';

export const handle: Handle = async ({ event, resolve }) => {
	event.locals.locale = resolveLocale(event.cookies.get(localeCookie), event.request.headers.get('accept-language'));
	const respuesta = await resolve(event, {
		transformPageChunk: ({ html }) => html.replace('%thunderop.lang%', event.locals.locale)
	});
	// Cabeceras de seguridad (la CSP la pone SvelteKit con nonces, ver vite.config.ts).
	for (const [k, v] of Object.entries(SEGURIDAD)) respuesta.headers.set(k, v);
	return respuesta;
};

const SEGURIDAD = {
	'Strict-Transport-Security': 'max-age=63072000; includeSubDomains',
	'X-Content-Type-Options': 'nosniff',
	'Referrer-Policy': 'strict-origin-when-cross-origin',
	'Permissions-Policy': 'microphone=(), camera=(), geolocation=(), payment=(), display-capture=()',
	// El popup de Google (entrar con Google) tiene que poder avisarle a la página.
	'Cross-Origin-Opener-Policy': 'same-origin-allow-popups'
};
