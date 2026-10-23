# Sección de funciones

Features.svelte es independiente de Hero.svelte. La portada aprobada conserva su contenido y distribución; la sección reemplaza las tres tarjetas provisionales que antes estaban dentro de Hero.

Las seis tarjetas siguen la referencia de diseño: voz, videollamadas, pantalla compartida, comunidades, bajo consumo y conexiones estables. Los textos están en features.cards en ambos diccionarios de src/lib/i18n/messages.ts. Los iconos son parte del componente SVG existente.

La cuadrícula usa seis columnas en escritorio amplio, tres en pantallas medianas, dos en tablets pequeñas y una en celulares. El contenido se ajusta a su altura, sin recortar descripciones.

Se conserva el ancla #experience para la navegación del encabezado y los enlaces de la portada.

Validación: npm.cmd run check, npm.cmd run build y npm.cmd run test:e2e. Las pruebas de funciones verifican las traducciones, el enlace de navegación, la presencia de las seis tarjetas y la ausencia de recortes o superposiciones en siete anchos. Las capturas quedan en .tmp/features-<ancho>-<idioma>.png.
