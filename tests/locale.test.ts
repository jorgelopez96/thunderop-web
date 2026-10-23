import test from 'node:test';
import assert from 'node:assert/strict';
import { resolveLocale } from '../src/lib/i18n/locales.ts';

test('Spanish browser variants resolve to Spanish', () => {
	for (const tag of ['es', 'es-AR', 'es-ES', 'ES-mx']) assert.equal(resolveLocale(undefined, tag), 'es');
});
test('English browser variants resolve to English', () => {
	assert.equal(resolveLocale(undefined, 'en-US,en;q=0.9'), 'en');
});
test('The explicit choice overrides browser language', () => {
	assert.equal(resolveLocale('en', 'es-AR'), 'en');
	assert.equal(resolveLocale('es', 'en-US'), 'es');
});
test('Unsupported preferred languages use the next supported language', () => {
	assert.equal(resolveLocale(undefined, 'fr-FR,pt-BR;q=0.9,es-AR;q=0.8,en;q=0.7'), 'es');
});
test('Quality weights override header order', () => {
	assert.equal(resolveLocale(undefined, 'es;q=0.4,en;q=0.9'), 'en');
});
test('Excluded or malformed preferences are ignored', () => {
	assert.equal(resolveLocale(undefined, 'es;q=0,en;q=0.8'), 'en');
	assert.equal(resolveLocale(undefined, 'es;q=nope,en'), 'en');
	assert.equal(resolveLocale(undefined, 'es;q=1.5,en'), 'en');
});
test('Invalid saved choices cannot bypass the supported language list', () => {
	assert.equal(resolveLocale('<script>', 'es-AR'), 'es');
});
test('Missing and unsupported languages fall back to English', () => {
	for (const header of [null, '', 'fr-FR', '*']) assert.equal(resolveLocale(undefined, header), 'en');
});
