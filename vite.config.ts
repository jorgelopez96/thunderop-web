import tailwindcss from '@tailwindcss/vite';
import adapter from '@sveltejs/adapter-auto';
import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig, loadEnv } from 'vite';

// CSP de la página: scripts solo propios (SvelteKit pone nonces/hashes a los suyos), conexiones solo a nuestro
// PocketBase (y al websocket de Vite en desarrollo), y que nadie la pueda meter en un iframe.
export default defineConfig(({ mode }) => {
	const pb = new URL(loadEnv(mode, '.', 'PUBLIC_').PUBLIC_PB_URL || 'https://thunderop.duckdns.org') // loadEnv también lee el entorno del proceso;
	const conexiones = ['self', pb.origin, `${pb.protocol === 'https:' ? 'wss' : 'ws'}://${pb.host}`, ...(mode === 'development' ? ['ws://localhost:*'] : [])];
	return {
	plugins: [
		tailwindcss(),
		sveltekit({
			compilerOptions: {
				// Force runes mode for the project, except for libraries. Can be removed in svelte 6.
				runes: ({ filename }) =>
					filename.split(/[/\\]/).includes('node_modules') ? undefined : true
			},

			// adapter-auto only supports some environments, see https://svelte.dev/docs/kit/adapter-auto for a list.
			// If your environment is not supported, or you settled on a specific environment, switch out the adapter.
			// See https://svelte.dev/docs/kit/adapters for more information about adapters.
			adapter: adapter(),
			csp: {
				mode: 'auto',
				directives: {
					'default-src': ['self'],
					'script-src': ['self'],
					'style-src': ['self', 'unsafe-inline'],
					'img-src': ['self', 'data:', 'blob:'],
					'font-src': ['self', 'data:'],
					'connect-src': conexiones as never,
					'worker-src': ['self', 'blob:'],
					'frame-ancestors': ['none'],
					'base-uri': ['self'],
					'form-action': ['self'],
					'object-src': ['none']
				}
			}
		})
	]
	};
});
