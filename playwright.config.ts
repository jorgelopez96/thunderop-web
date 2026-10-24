import { defineConfig } from '@playwright/test';

// Las pruebas no tocan el servidor real: la página apunta a esta dirección (no hay nada escuchando) y cada prueba responde con page.route.
export const PB_PRUEBA = 'http://127.0.0.1:8091';

export default defineConfig({
	testDir: './tests/browser',
	outputDir: './.tmp/test-results',
	fullyParallel: true, workers: 2,
	reporter: 'list',
	use: {
		baseURL: 'http://localhost:5174',
		browserName: 'chromium',
		channel: 'msedge',
		headless: true,
		viewport: { width: 1440, height: 1000 },
		trace: 'retain-on-failure'
	},
	webServer: [
		{
			command: 'npm.cmd run dev -- --host localhost --port 5174 --strictPort',
			url: 'http://localhost:5174',
			env: { ...(process.env as Record<string, string>), PUBLIC_PB_URL: PB_PRUEBA },
			// En otro puerto que el de desarrollo: ese usa el PocketBase de .env (el real) y no sirve para las pruebas.
			reuseExistingServer: false,
			timeout: 60000
		}
	]
});
