import { defineEnvVars } from '@sveltejs/kit/env';

export const variables = defineEnvVars({
	PUBLIC_PB_URL: { public: true, static: true, description: 'Dirección pública del servidor de Thunderop (PocketBase), p. ej. https://thunderop.duckdns.org.' }
});
