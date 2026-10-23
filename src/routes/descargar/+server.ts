import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { codigoValido, INSTALADOR } from '#lib/server/descarga.js';

// Con el código correcto devuelve el link del instalador. Un error tarda un poco: probar códigos a mano se hace lento.
export const POST: RequestHandler = async ({ request }) => {
	const { codigo } = await request.json().catch(() => ({ codigo: '' }));
	if (await codigoValido(codigo)) return json({ url: INSTALADOR });
	await new Promise((ok) => setTimeout(ok, 800));
	return json({ error: 'codigo' }, { status: 401 });
};
