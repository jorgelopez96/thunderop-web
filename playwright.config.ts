import { defineConfig } from '@playwright/test';

export default defineConfig({
	testDir: './tests/browser',
	outputDir: './.tmp/test-results',
	fullyParallel: true, workers: 2,
	reporter: 'list',
	use: {
		baseURL: 'http://localhost:5173',
		browserName: 'chromium',
		channel: 'msedge',
		headless: true,
		viewport: { width: 1440, height: 1000 },
		trace: 'retain-on-failure'
	},
	webServer: {
		command: 'npm.cmd run dev -- --host localhost --port 5173 --strictPort',
		url: 'http://localhost:5173',
		reuseExistingServer: !process.env.CI,
		timeout: 30000
	}
});
