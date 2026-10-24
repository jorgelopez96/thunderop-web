import type { Locale } from './locales.js';
const en = {
  "nav": {
    "communities": "Communities",
    "faq": "FAQ",
    "support": "Support",
    "download": "Download",
    "menuTitle": "Explore Thunderop",
    "menuTagline": "Your people. Your place.",
    "menuStatus": "Windows app · Coming soon",
    "dismissBackdrop": "Dismiss navigation",
    "experienceDescription": "Voice, video and shared moments",
    "communitiesDescription": "Find people who share your interests",
    "windowsDescription": "Your next desktop hangout",
    "faqDescription": "A few answers to get you started",
    "supportDescription": "A little help, whenever you need it"
  },
  "windows": {
    "eyebrow": "Built for Windows",
    "title": "Less in the way.",
    "accent": "More in the moment.",
    "description": "Your next game, your favorite people and a conversation that keeps going. Thunderop brings it all together on your desktop.",
    "status": "Windows app · Coming soon",
    "faq": "Questions before you jump in?",
    "mascot": "Thunderop’s lightning mascot holding a laptop",
    "tiles": {
      "desktop": {
        "title": "At home on Windows",
        "body": "Your crew, one click away."
      },
      "voice": {
        "title": "Stay in the conversation",
        "body": "Voice, video and screen sharing."
      },
      "play": {
        "title": "Made for your downtime",
        "body": "From the next round to the next idea."
      }
    }
  },
  "communities": {
    "eyebrow": "Find your people",
    "title": "A place for",
    "accent": "every kind of you.",
    "description": "One more round. A new favorite song. An idea worth sharing. There’s always a reason to get together.",
    "hint": "Explore your interests",
    "carouselLabel": "Community interests",
    "dragHint": "Drag or swipe to explore",
    "action": "Explore",
    "status": "Available in the app",
    "dialogBody": "Download Thunderop to try it with your friends.",
    "cards": {
      "gaming": {
        "title": "Gaming",
        "subtitle": "Play together, talk together",
        "body": "Voice rooms with noise suppression while you play, so your squad hears you clearly and nothing lags."
      },
      "music": {
        "title": "Music",
        "subtitle": "Listen with your friends",
        "body": "Put on songs or YouTube playlists and everyone in the room hears them at the same time."
      },
      "stream": {
        "title": "Screen sharing",
        "subtitle": "Your game in 1080p at 60 fps",
        "body": "Share your game or any window with your friends, sharp and smooth, using your graphics card."
      },
      "sounds": {
        "title": "Soundboard",
        "subtitle": "Your memes, one click away",
        "body": "Upload sounds with their own emoji and play them in the call for everyone."
      }
    }
  },
  "help": {
    "eyebrow": "We’re here to help",
    "title": "Got questions?",
    "accent": "We’ve got you.",
    "description": "A few quick answers, a little guidance and a friendly face. Let’s find what you need.",
    "mascot": "Thunderop’s support robot presenting a help panel",
    "faqTitle": "Frequently asked questions",
    "search": "Search questions",
    "placeholder": "Try “language” or “Windows”",
    "clear": "Clear search",
    "results": "answers",
    "empty": "No answers found. Try another word or explore the support options below.",
    "supportTitle": "A little more help",
    "center": "Help center",
    "centerBody": "Find an answer in our FAQ",
    "contact": "Contact support",
    "contactBody": "Learn how to reach the team",
    "community": "Community support",
    "communityBody": "Find your people",
    "contactTitle": "Let’s keep in touch.",
    "contactStatus": "Support channels coming soon",
    "contactDescription": "We’re preparing Thunderop’s official support channels. You’ll find the contact details here as soon as they’re available. In the meantime, the FAQ is a good place to start.",
    "questions": {
      "about": {
        "q": "What is Thunderop?",
        "a": "Thunderop is a communication app project for gamers and communities, bringing voice, video, screen sharing and shared spaces together."
      },
      "windows": {
        "q": "Which platforms is Thunderop being built for?",
        "a": "Windows is the focus for the first release. Supported versions and system requirements will be published alongside the installer."
      },
      "download": {
        "q": "Where can I download the app?",
        "a": "The Windows installer isn’t available on this site yet. The download buttons will show its availability, and the official link will be added here when it’s ready."
      },
      "servers": {
        "q": "Will I be able to create my own community?",
        "a": "Servers and channels are part of the Thunderop experience we’re building, so friends and communities can have a place of their own. More details will be shared with the release."
      },
      "language": {
        "q": "How do I change the website’s language?",
        "a": "Use the language selector at the top or the language buttons in the footer. The site initially follows your browser’s preferred supported language and remembers your manual choice in this browser. Spanish and English are currently available."
      },
      "support": {
        "q": "How can I get help?",
        "a": "Start with these questions or explore the support options below. Official contact and community channels will be linked here as they become available."
      }
    }
  },
  "footer": {
    "product": "Explore Thunderop",
    "help": "Need a hand?",
    "features": "Features",
    "communities": "Communities",
    "windows": "For Windows",
    "faq": "Frequently asked questions",
    "support": "Support",
    "language": "Make yourself at home",
    "top": "Back to top",
    "rights": "All rights reserved.",
    "note": "A little closer. A lot more fun.",
    "close": "Close",
    "back": "Got it"
  }
};
type Strings<T> = { [K in keyof T]: T[K] extends string ? string : Strings<T[K]> };
const es: Strings<typeof en> = {
  "nav": {
    "communities": "Comunidades",
    "faq": "FAQ",
    "support": "Soporte",
    "download": "Descarga",
    "menuTitle": "Explorá Thunderop",
    "menuTagline": "Tu gente. Tu lugar.",
    "menuStatus": "App para Windows · Próximamente",
    "dismissBackdrop": "Cerrar menú desde el fondo",
    "experienceDescription": "Voz, video y momentos compartidos",
    "communitiesDescription": "Encontrá gente con tus intereses",
    "windowsDescription": "Tu próximo punto de encuentro",
    "faqDescription": "Respuestas para empezar",
    "supportDescription": "Una mano cuando la necesitás"
  },
  "windows": {
    "eyebrow": "Hecho para Windows",
    "title": "Menos interrupciones.",
    "accent": "Más momentos juntos.",
    "description": "Tu próxima partida, tu gente favorita y una charla que sigue. Thunderop reúne todo en tu escritorio.",
    "status": "App para Windows · Próximamente",
    "faq": "¿Una duda antes de empezar?",
    "mascot": "La mascota rayo de Thunderop sosteniendo una laptop",
    "tiles": {
      "desktop": {
        "title": "En casa, en Windows",
        "body": "Tu equipo, a un clic de distancia."
      },
      "voice": {
        "title": "Que siga la charla",
        "body": "Voz, video y pantalla compartida."
      },
      "play": {
        "title": "Para tu tiempo libre",
        "body": "De la próxima ronda a la próxima idea."
      }
    }
  },
  "communities": {
    "eyebrow": "Encontrá a tu gente",
    "title": "Un lugar para",
    "accent": "cada versión de vos.",
    "description": "Una partida más. Una canción nueva. Una idea que merece compartirse. Siempre hay un motivo para juntarse.",
    "hint": "Explorá tus intereses",
    "carouselLabel": "Intereses de la comunidad",
    "dragHint": "Arrastrá o deslizá para explorar",
    "action": "Explorar",
    "status": "Ya está en la app",
    "dialogBody": "Descargá Thunderop para probarlo con tus amigos.",
    "cards": {
      "gaming": {
        "title": "Gaming",
        "subtitle": "Jugá y hablá con tu equipo",
        "body": "Salas de voz con supresión de ruido mientras jugás: tu equipo te escucha claro y sin lag."
      },
      "music": {
        "title": "Música",
        "subtitle": "Escuchala con tus amigos",
        "body": "Poné canciones o listas de YouTube y todos en la sala las escuchan al mismo tiempo."
      },
      "stream": {
        "title": "Transmití tu pantalla",
        "subtitle": "Tu partida en 1080p a 60 fps",
        "body": "Compartí el juego o cualquier ventana con tus amigos, nítido y fluido, usando tu placa de video."
      },
      "sounds": {
        "title": "Botonera de sonidos",
        "subtitle": "Tus memes, a un clic",
        "body": "Subí sonidos con su emoji y hacelos sonar en la llamada para todos."
      }
    }
  },
  "help": {
    "eyebrow": "Estamos para ayudarte",
    "title": "¿Tenés preguntas?",
    "accent": "Contá con nosotros.",
    "description": "Respuestas claras, un poco de orientación y una cara amiga. Encontremos lo que necesitás.",
    "mascot": "El robot de soporte de Thunderop presentando un panel de ayuda",
    "faqTitle": "Preguntas frecuentes",
    "search": "Buscar preguntas",
    "placeholder": "Probá con “idioma” o “Windows”",
    "clear": "Borrar búsqueda",
    "results": "respuestas",
    "empty": "No encontramos respuestas. Probá con otra palabra o explorá las opciones de soporte.",
    "supportTitle": "Un poco más de ayuda",
    "center": "Centro de ayuda",
    "centerBody": "Encontrá respuestas en las FAQ",
    "contact": "Contactar a soporte",
    "contactBody": "Conocé cómo hablar con el equipo",
    "community": "Soporte de la comunidad",
    "communityBody": "Encontrá a tu gente",
    "contactTitle": "Sigamos en contacto.",
    "contactStatus": "Canales de soporte próximamente",
    "contactDescription": "Estamos preparando los canales oficiales de soporte de Thunderop. Cuando estén disponibles, vas a encontrar los datos de contacto acá. Mientras tanto, podés consultar las preguntas frecuentes.",
    "questions": {
      "about": {
        "q": "¿Qué es Thunderop?",
        "a": "Thunderop es un proyecto de app de comunicación para gamers y comunidades que reúne voz, video, pantalla compartida y espacios para compartir."
      },
      "windows": {
        "q": "¿Para qué plataformas se está desarrollando?",
        "a": "Windows es la prioridad para el primer lanzamiento. Las versiones compatibles y los requisitos se van a publicar junto con el instalador."
      },
      "download": {
        "q": "¿Dónde puedo descargar la app?",
        "a": "El instalador para Windows todavía no está disponible en este sitio. Los botones de descarga muestran su disponibilidad y vamos a sumar el enlace oficial cuando esté listo."
      },
      "servers": {
        "q": "¿Voy a poder crear mi propia comunidad?",
        "a": "Los servidores y canales forman parte de la experiencia que estamos construyendo para que amigos y comunidades tengan su propio lugar. Vamos a compartir más detalles con el lanzamiento."
      },
      "language": {
        "q": "¿Cómo cambio el idioma de la página?",
        "a": "Usá el selector de idioma de arriba o los botones del pie de página. Al entrar, el sitio usa el idioma compatible preferido de tu navegador y recuerda tu elección manual en este navegador. Actualmente están disponibles español e inglés."
      },
      "support": {
        "q": "¿Cómo puedo pedir ayuda?",
        "a": "Podés empezar por estas preguntas o explorar las opciones de soporte de abajo. Vamos a agregar los canales oficiales de contacto y de la comunidad cuando estén disponibles."
      }
    }
  },
  "footer": {
    "product": "Explorá Thunderop",
    "help": "¿Te damos una mano?",
    "features": "Funciones",
    "communities": "Comunidades",
    "windows": "Para Windows",
    "faq": "Preguntas frecuentes",
    "support": "Soporte",
    "language": "Sentite como en casa",
    "top": "Volver arriba",
    "rights": "Todos los derechos reservados.",
    "note": "Más cerca. Mucho más divertido.",
    "close": "Cerrar",
    "back": "Entendido"
  }
};
export const pageMessages: Record<Locale, Strings<typeof en>> = { es, en };
export type CommunityKey = keyof typeof en.communities.cards;
