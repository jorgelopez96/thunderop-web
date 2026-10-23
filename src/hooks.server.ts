import type { Handle } from '@sveltejs/kit/hooks';
import { localeCookie, resolveLocale } from '#lib/i18n/locales.js';

export const handle: Handle = async ({ event, resolve }) => {
	event.locals.locale = resolveLocale(event.cookies.get(localeCookie), event.request.headers.get('accept-language'));
	return resolve(event, {
		transformPageChunk: ({ html }) => html.replace('%thunderop.lang%', event.locals.locale)
	});
};
