import { redirect } from '@sveltejs/kit';

// La aplicación web ya está publicada: /web (links viejos) lleva directo ahí.
export const load = () => redirect(308, 'https://app.thunderop.com', { external: true });
