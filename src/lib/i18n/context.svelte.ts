import { createContext } from 'svelte';
import { isLocale, localeCookie, type Locale } from './locales.js';
import { messages } from './messages.js';

export class I18n {
    ready = $state(false);
	locale = $state<Locale>('en');

	constructor(initialLocale: Locale) {
		this.locale = initialLocale;
	}

	get text() {
		return messages[this.locale];
	}

	select(value: string) {
		if (!isLocale(value)) return;
		this.locale = value;
		if (typeof document !== 'undefined') {
			document.documentElement.lang = value;
			const secure = location.protocol === 'https:' ? '; Secure' : '';
			document.cookie = localeCookie + '=' + value + '; Path=/; Max-Age=31536000; SameSite=Lax' + secure;
		}
	}
}

// A separate instance per layout avoids sharing a visitor's language on the server.
export const [getI18n, setI18n] = createContext<I18n>();
