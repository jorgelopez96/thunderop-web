import { test, expect } from '@playwright/test';
import { elegirIdioma } from './elegir-idioma';

const titles = {
	es: ['Chat de voz', 'Videollamadas', 'Pantalla compartida', 'Comunidades', 'Bajo consumo', 'Rápido y estable'],
	en: ['Voice chat', 'Video calls', 'Screen sharing', 'Communities', 'Low resource usage', 'Fast & stable']
};

test('Discover navigation reaches all six features and language changes translate them', async ({ page }) => {
	await page.goto('/');
	for (const locale of ['es', 'en'] as const) {
		await elegirIdioma(page, locale);
		const section = page.locator('#experience');
		await expect(section.getByRole('heading', { level: 3 })).toHaveText(titles[locale]);
		await expect(section.getByRole('heading', { level: 2 })).toContainText(locale === 'es' ? 'Conexiones reales.' : 'Real connections.');
		for (const description of await section.locator('article p').allTextContents()) {
			expect(description.length).toBeGreaterThan(30);
		}
	}
	await page.locator('.hero-actions').getByRole('link', { name: 'Discover Thunderop' }).click();
	await expect(page).toHaveURL(/#experience$/);
	await expect(page.locator('#features-title')).toBeInViewport();
});

for (const width of [320,390,557,768,1024,1440,1920]) {
	test('Feature cards remain readable and separated at ' + width + 'px', async ({ page }) => {
		await page.setViewportSize({ width, height: 1000 });
		await page.emulateMedia({ reducedMotion: 'reduce' });
		await page.goto('/');
		for (const locale of ['es', 'en'] as const) {
			await elegirIdioma(page, locale);
			await page.evaluate(() => document.fonts.ready);
			await expect(page.locator('#experience article')).toHaveCount(6);
			const metrics = await page.locator('#experience').evaluate(section => {
				const cards = [...section.querySelectorAll('article')];
				const rects = cards.map(card => card.getBoundingClientRect());
				const overlap = rects.some((a, i) => rects.slice(i + 1).some(b =>
					Math.min(a.right, b.right) > Math.max(a.left, b.left) + 1
					&& Math.min(a.bottom, b.bottom) > Math.max(a.top, b.top) + 1));
				const clippedCards = rects.some(rect => rect.left < 0 || rect.right > innerWidth + 1);
				const clippedText = cards.some(card => {
					const rect = card.getBoundingClientRect();
					return [...card.querySelectorAll('h3,p')].some(text => {
						const textRect = text.getBoundingClientRect();
						return text.scrollWidth > text.clientWidth + 1 || textRect.bottom > rect.bottom;
					});
				});
				return { overlap, clippedCards, clippedText, overflow: document.documentElement.scrollWidth > innerWidth };
			});
			expect(metrics).toEqual({ overlap: false, clippedCards: false, clippedText: false, overflow: false });
			if ([390,1440].includes(width)) {
				await page.locator('#experience').screenshot({ path: '.tmp/features-' + width + '-' + locale + '.png', animations: 'disabled' });
			}
		}
	});
}
