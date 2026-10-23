export const locales = ['es', 'en'] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = 'en';
export const localeCookie = 'thunderop_locale';

export function isLocale(value: unknown): value is Locale {
	return typeof value === 'string' && locales.includes(value as Locale);
}

/** Honor a saved choice first, then the browser's ordered language preferences. */
export function resolveLocale(saved: unknown, acceptLanguage: string | null): Locale {
	if (isLocale(saved)) return saved;
	const preferences = (acceptLanguage ?? '').split(',').map((entry, order) => {
		const [tag, ...parameters] = entry.trim().toLowerCase().split(';');
		const qualityParameter = parameters.find((parameter) => parameter.trim().startsWith('q='));
		const quality = qualityParameter === undefined ? 1 : Number(qualityParameter.trim().slice(2));
		return { language: tag.split('-')[0], quality, order };
	}).filter(({ quality }) => Number.isFinite(quality) && quality > 0 && quality <= 1)
		.sort((a, b) => b.quality - a.quality || a.order - b.order);

	for (const preference of preferences) {
		if (isLocale(preference.language)) return preference.language;
	}
	return defaultLocale;
}
