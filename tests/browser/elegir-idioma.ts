import type { Page } from '@playwright/test';

/** Elige el idioma con el selector de la página (botón con su lista propia, no el <select> del navegador). */
export async function elegirIdioma(page: Page, locale: string) {
	const selector = page.locator('.language-selector').first();
	if ((await selector.getAttribute('data-locale')) === locale) return;
	await selector.getByRole('button').click();
	await page.locator(`.language-options [data-locale="${locale}"]`).click();
}
