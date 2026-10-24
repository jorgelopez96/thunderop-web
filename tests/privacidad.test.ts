import test from 'node:test';
import assert from 'node:assert/strict';
import { cuentaMessages } from '../src/lib/i18n/cuenta-messages.ts';

for (const locale of ['es', 'en'] as const) {
	test(`privacy policy (${locale}) mentions the technical stream log and 30 days`, () => {
		const text = cuentaMessages[locale].legal.privacidad.secciones.flatMap((s) => s.parrafos).join('\n');
		assert.match(text, locale === 'es' ? /registro técnico/ : /technical log/);
		assert.match(text, locale === 'es' ? /30 días/ : /30 days/);
	});
}
