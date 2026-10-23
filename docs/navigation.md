# Menú de navegación

El menú hamburguesa de `Header.svelte` se muestra hasta 1000 px. En escritorio se conservan los enlaces horizontales.

- Panel con fondo oscuro, acentos violetas, iconos por sección y descripciones breves.
- Apertura animada y transformación del botón en una cruz. El movimiento reducido desactiva las animaciones mediante la regla global existente.
- Fondo desenfocado que permite cerrar al tocar afuera. No se trata como un diálogo modal: el foco puede salir del encabezado y el menú se cierra.
- El foco inicial va al primer enlace. Escape y el botón de cierre del fondo devuelven el foco al botón hamburguesa.
- Altura limitada por la ventana, con desplazamiento interno en pantallas pequeñas o en horizontal.
- La selección de una sección actualiza `aria-current` según el fragmento de URL.
- Botón de descarga conectado al aviso de disponibilidad existente. El cierre de ese aviso devuelve el foco al botón hamburguesa.
- Idiomas compartidos con el selector principal. Los textos del panel están en `page-messages.ts`.
- Al pasar a escritorio se limpia el estado del menú y se retira el fondo.

Verificación: `tests/browser/navigation.spec.ts` cubre cierre, foco, teclado, idiomas, descarga y tamaños de 320 a 1000 px, incluida orientación horizontal. Las pruebas de portada y distribución adaptable verifican la navegación existente y la presentación de escritorio. Capturas: `.tmp/menu-*.png`.
