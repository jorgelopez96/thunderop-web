// Por ahora el instalador se comparte con un código que pasa Jorge. Acá va solo su hash SHA-256 (el código no queda en el repo)
// y el link real, que nunca llega al navegador de quien no lo sabe. Para cambiarlo: el hash del código nuevo.
// ponytail: el instalador sigue en una URL pública del servidor (la usa el actualizador de la app); esto lo saca de la página, no lo oculta del todo.
const HASH = '33c93a9ed42ea7dc8fe8bc40c10173549cea0fa62ab06c05f131d09034ce0c48';
export const INSTALADOR = 'https://thunderop.duckdns.org/descargas/thunderop-setup.exe';

export async function codigoValido(codigo: unknown): Promise<boolean> {
	if (typeof codigo !== 'string' || codigo.length > 100) return false;
	const bytes = new Uint8Array(await crypto.subtle.digest('SHA-256', new TextEncoder().encode(codigo.trim())));
	const hex = [...bytes].map((b) => b.toString(16).padStart(2, '0')).join('');
	// Comparación sin cortar en la primera diferencia (no da pistas por el tiempo de respuesta).
	let distinto = 0;
	for (let i = 0; i < HASH.length; i++) distinto |= hex.charCodeAt(i) ^ HASH.charCodeAt(i);
	return distinto === 0;
}
