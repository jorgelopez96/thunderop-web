import { test, expect } from '@playwright/test';
import { elegirIdioma } from './elegir-idioma';

const viewports = [
	{ width: 320, height: 568 }, { width: 360, height: 800 },
	{ width: 390, height: 844 }, { width: 430, height: 932 },
	{ width: 557, height: 900 }, { width: 600, height: 900 }, { width: 768, height: 1024 },
	{ width: 820, height: 1180 }, { width: 1024, height: 768 },
	{ width: 1100, height: 900 }, { width: 1200, height: 900 },
	{ width: 1440, height: 1000 }, { width: 1875, height: 1000 }, { width: 1920, height: 1080 }
];

for (const viewport of viewports) {
	test('Readable typography and unclipped content at ' + viewport.width + 'px in both languages', async ({ page }) => {
		await page.setViewportSize(viewport);
		await page.emulateMedia({ reducedMotion: 'reduce' });
		await page.goto('/');
		for (const locale of ['es', 'en']) {
			await elegirIdioma(page, locale);
			await page.evaluate(() => document.fonts.ready);
			const metrics = await page.evaluate(() => {
				const box = (selector: string) => document.querySelector(selector)!.getBoundingClientRect();
				const viewportWidth = window.innerWidth;
				const selectors = ['.brand-link', '.header-actions', '#hero-title', '.hero-actions', '.hero-mascot', '.app-window'];
				const outside = selectors.filter((selector) => {
					const rect = box(selector);
					return rect.left < -1 || rect.right > viewportWidth + 1;
				});
				const heading = document.querySelector('#hero-title')!;
				const headingBox = heading.getBoundingClientRect();
				const headingTextOverflow = [...heading.children].some((line) => {
					const range = document.createRange();
					range.selectNodeContents(line);
					return [...range.getClientRects()].some(rect => rect.left < headingBox.left - 1 || rect.right > headingBox.right + 1);
				});
				const mascot = box('.hero-mascot');
				const preview = box('.app-window');
				// La mascota se apoya delante de la esquina de la ventana: puede pisarla, pero no taparla.
				const cruce = Math.max(0, Math.min(mascot.right, preview.right) - Math.max(mascot.left, preview.left))
					* Math.max(0, Math.min(mascot.bottom, preview.bottom) - Math.max(mascot.top, preview.top));
				const mascotCover = cruce / (preview.width * preview.height);
				const copy = box('.hero-copy');
				const art = box('.hero-art');
				const overlap = Math.min(copy.right, art.right) > Math.max(copy.left, art.left)
					&& Math.min(copy.bottom, art.bottom) > Math.max(copy.top, art.top);
				const buttons = [...document.querySelectorAll('.hero-actions .button')];
				return {
					overflow: document.documentElement.scrollWidth > viewportWidth,
					outside, headingTextOverflow, overlap, mascotCover,
                    mascotHeight: mascot.height, previewHeight: preview.height, previewRatio: preview.width / preview.height,
					headerOverlap: box('.brand-link').right > box('.header-actions').left,
					smallTargets: buttons.some(button => button.getBoundingClientRect().height < 44),
					smallSelector: box('.language-selector button.idioma').height < 44,
					bodySize: parseFloat(getComputedStyle(document.querySelector('.hero-description')!).fontSize),
					displayFont: getComputedStyle(heading).fontFamily,
					bodyFont: getComputedStyle(document.body).fontFamily,
					displayLoaded: document.fonts.check('700 32px "Space Grotesk Variable"'),
					bodyLoaded: document.fonts.check('400 16px "Manrope Variable"')
				};
			});
			expect(metrics.overflow, 'Page has horizontal overflow').toBe(false);
			expect(metrics.outside, 'Content is clipped at the viewport').toEqual([]);
			expect(metrics.headingTextOverflow, 'Heading text is clipped').toBe(false);
			expect(metrics.overlap, 'Illustration overlaps hero text').toBe(false);
            expect(metrics.mascotCover, 'Mascot covers too much of the app preview').toBeLessThan(.25);
			if (viewport.width > 1100) {
				expect(metrics.mascotHeight, 'Desktop mascot should have visual prominence').toBeGreaterThanOrEqual(metrics.previewHeight * .8);
                expect(metrics.previewRatio, 'Desktop preview should look like a desktop app window').toBeGreaterThan(1.2);
				expect(metrics.previewRatio, 'Desktop preview should not be stretched into a panoramic screen').toBeLessThan(1.9);
			}
			expect(metrics.headerOverlap, 'Header controls overlap the brand').toBe(false);
			expect(metrics.smallTargets, 'Hero buttons are too small to tap').toBe(false);
			expect(metrics.smallSelector, 'Language selector is too small to tap').toBe(false);
			expect(metrics.bodySize).toBeGreaterThanOrEqual(15);
			expect(metrics.displayFont).toContain('Space Grotesk Variable');
			expect(metrics.bodyFont).toContain('Manrope Variable');
			expect(metrics.displayLoaded && metrics.bodyLoaded).toBe(true);
			if ([320,390,557,820,1440,1875].includes(viewport.width)) {
				await page.screenshot({ path: '.tmp/responsive-' + viewport.width + '-' + locale + '.png', fullPage: true, animations: 'disabled' });
			}
		}
	});
}

test('Small-screen menu and dialog stay usable in portrait and landscape', async ({ page }) => {
	await page.setViewportSize({ width: 320, height: 568 });
	await page.goto('/');
	await elegirIdioma(page, 'es');
	const menu = page.getByRole('button', { name: 'Abrir navegación' });
	await menu.click();
	await expect(page.getByRole('link', { name: 'La experiencia', exact: true })).toBeVisible();
	await page.keyboard.press('Escape');
	await expect(menu).toBeFocused();
	await page.locator('.hero-actions button').click();
	const dialog = page.getByRole('dialog');
	await expect(dialog).toBeVisible();
	expect(await dialog.evaluate(element => element.scrollWidth <= element.clientWidth)).toBe(true);
	await page.setViewportSize({ width: 844, height: 390 });
	expect(await dialog.evaluate(element => element.getBoundingClientRect().height <= window.innerHeight)).toBe(true);
	await page.getByRole('button', { name: 'Cerrar información de descarga' }).click();
	await expect(dialog).not.toBeVisible();
});
