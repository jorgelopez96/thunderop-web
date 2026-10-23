import type { Locale } from './locales.js';

const en = {
	meta: { title: 'Thunderop — Good chats. Brighter connections.', description: 'Your people, one place. Discover Thunderop: voice, video, screen sharing and communities for the moments you share.' },
	nav: { label: 'Main navigation', home: 'Home', experience: 'The experience', windows: 'For Windows', menu: 'Open navigation', close: 'Close navigation', skip: 'Skip to content', login: 'Log in' },
	language: { label: 'Choose your language', es: 'Español', en: 'English' },
	hero: {
		eyebrow: 'CONNECT · PLAY · TOGETHER',
		lineOne: 'Voice, video &',
		lineTwo: 'communities.',
		tagline: 'Good chats. Brighter connections.',
		description: 'The best moments happen together. Talk, share your screen and find your people — all in one place, before, during and after the game.',
		download: 'Download for Windows',
		explore: 'Discover Thunderop',
		windows: 'Made for Windows', gamers: 'Built for gamers', together: 'Better together',
		mascot: 'Thunderop’s purple lightning mascot wearing headphones and giving a thumbs up',
		floatingTop: 'Your whole crew. One place.',
		floatingBottom: 'A little closer. A lot more fun.',
		preview: 'A glimpse of the Thunderop experience',
		scroll: 'Meet your next favorite hangout'
	},
	features: {
		"eyebrow": "Everything you need",
		"titleLineOne": "Powerful features.",
		"titleLineTwo": "Real connections.",
		"description": "From casual hangouts to your next gaming session, bring your people together with tools that keep the conversation going.",
		"cards": {
			"voice": {
				"title": "Voice chat",
				"description": "Keep your crew close with voice channels, in the game and beyond."
			},
			"video": {
				"title": "Video calls",
				"description": "Share the moment face to face, even when your friends are miles away."
			},
			"screen": {
				"title": "Screen sharing",
				"description": "Show your game, share an idea or watch something together."
			},
			"communities": {
				"title": "Communities",
				"description": "Make a place for your people, with servers and channels for every interest."
			},
			"resources": {
				"title": "Low resource usage",
				"description": "More room for your game, with an app designed to stay out of your way."
			},
			"connection": {
				"title": "Fast & stable",
				"description": "Stay connected from the first hello to the last round, with a smooth experience."
			}
		}
	},
	preview: {
		online: 'Online', server: 'The crew', general: 'general', gaming: 'gaming', music: 'music', voice: 'The hangout',
		members: 'YOUR PEOPLE', connected: 'Voice connected', now: 'now', messageOne: 'One more game? 🎮',
		messageTwo: 'Always. Let’s go!', messageThree: 'I’m sharing my screen ✨', input: 'Message #general',
		sharing: 'Sharing a screen', live: 'LIVE', you: 'You', call: 'In good company',
		voiceRooms: 'VOICE ROOMS', chats: 'CHATS', inVoice: 'in voice', empty: 'empty', participants: 'Participants', stop: 'Stop watching', watch: 'Watch', clips: 'clips'
	},
	login: {
		status: 'Coming soon', title: 'Thunderop in your browser.',
		body: 'Soon you will be able to log in and use Thunderop right from the browser, with no installation. In the meantime, the Windows app has it all.'
	},
	download: {
		title: 'Thunderop for Windows.',
		body: 'For now Thunderop is shared by invitation. Enter the code you were given to download the installer; after that it keeps itself up to date.',
		status: 'Invitation only', close: 'Download installer', dismiss: 'Close download information',
		code: 'Invitation code', checking: 'Checking…', wrong: 'That code is not right. Ask whoever invited you.', failed: 'Could not check the code. Try again.'
	},
	footer: 'Good chats. Brighter connections.'
};

type TranslationShape<T> = { [K in keyof T]: T[K] extends string ? string : TranslationShape<T[K]> };
export type Messages = TranslationShape<typeof en>;

const es: Messages = {
	meta: { title: 'Thunderop — Buenas charlas. Mejores conexiones.', description: 'Tu gente, en un solo lugar. Descubrí Thunderop: voz, video, pantalla compartida y comunidades para compartir más momentos.' },
	nav: { label: 'Navegación principal', home: 'Inicio', experience: 'La experiencia', windows: 'Para Windows', menu: 'Abrir navegación', close: 'Cerrar navegación', skip: 'Ir al contenido', login: 'Iniciar sesión' },
	language: { label: 'Elegí tu idioma', es: 'Español', en: 'English' },
	hero: {
		eyebrow: 'CONECTÁ · JUGÁ · COMPARTÍ',
		lineOne: 'Voz, video y',
		lineTwo: 'comunidades.',
		tagline: 'Buenas charlas. Mejores conexiones.',
		description: 'Los mejores momentos se viven juntos. Hablá, compartí tu pantalla y encontrá a tu gente: todo en un lugar, antes, durante y después de cada partida.',
		download: 'Descargar para Windows',
		explore: 'Descubrí Thunderop',
		windows: 'Hecho para Windows', gamers: 'Pensado para gamers', together: 'Mejor en compañía',
		mascot: 'La mascota de Thunderop, un rayo violeta con auriculares y el pulgar arriba',
		floatingTop: 'Todo tu equipo. Un solo lugar.',
		floatingBottom: 'Más cerca. Mucho más divertido.',
		preview: 'Un vistazo a la experiencia Thunderop',
		scroll: 'Tu próximo punto de encuentro'
	},
	features: {
		"eyebrow": "Todo lo que necesitás",
		"titleLineOne": "Grandes funciones.",
		"titleLineTwo": "Conexiones reales.",
		"description": "De una charla entre amigos a la próxima partida, reuní a tu gente con herramientas para seguir conectados.",
		"cards": {
			"voice": {
				"title": "Chat de voz",
				"description": "Charlá con tu equipo en canales de voz, durante la partida y después también."
			},
			"video": {
				"title": "Videollamadas",
				"description": "Compartí el momento cara a cara, aunque tus amigos estén lejos."
			},
			"screen": {
				"title": "Pantalla compartida",
				"description": "Mostrá tu partida, compartí una idea o miren algo juntos."
			},
			"communities": {
				"title": "Comunidades",
				"description": "Creá un lugar para tu gente, con servidores y canales para cada interés."
			},
			"resources": {
				"title": "Bajo consumo",
				"description": "Más espacio para tu juego, con una app pensada para acompañarte sin interponerse."
			},
			"connection": {
				"title": "Rápido y estable",
				"description": "Seguí conectado del primer saludo a la última ronda, con una experiencia fluida."
			}
		}
	},
	preview: {
		online: 'En línea', server: 'El equipo', general: 'general', gaming: 'juegos', music: 'música', voice: 'Punto de encuentro',
		members: 'TU GENTE', connected: 'Voz conectada', now: 'ahora', messageOne: '¿Una partida más? 🎮',
		messageTwo: 'Siempre. ¡Vamos!', messageThree: 'Comparto mi pantalla ✨', input: 'Mensaje en #general',
		sharing: 'Compartiendo pantalla', live: 'EN VIVO', you: 'Vos', call: 'En buena compañía',
		voiceRooms: 'SALAS DE VOZ', chats: 'CHATS', inVoice: 'en voz', empty: 'vacía', participants: 'Participantes', stop: 'Dejar de ver', watch: 'Ver', clips: 'clips'
	},
	login: {
		status: 'Próximamente', title: 'Thunderop en tu navegador.',
		body: 'Muy pronto vas a poder iniciar sesión y usar Thunderop desde el navegador, sin instalar nada. Mientras tanto, la app para Windows ya tiene todo.'
	},
	download: {
		title: 'Thunderop para Windows.',
		body: 'Por ahora Thunderop se comparte por invitación. Ingresá el código que te pasaron para bajar el instalador; después se actualiza solo.',
		status: 'Solo con invitación', close: 'Descargar instalador', dismiss: 'Cerrar información de descarga',
		code: 'Código de invitación', checking: 'Revisando…', wrong: 'Ese código no es correcto. Pedíselo a quien te invitó.', failed: 'No se pudo revisar el código. Probá de nuevo.'
	},
	footer: 'Buenas charlas. Mejores conexiones.'
};

export const messages: Record<Locale, Messages> = { es, en };
