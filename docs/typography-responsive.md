# Tipografía y diseño adaptable

Se usan Space Grotesk Variable para títulos y marca, y Manrope Variable para párrafos y controles. Las fuentes se instalan mediante Fontsource y Vite las sirve desde el proyecto; no se solicitan a Google Fonts. Las licencias OFL se conservan en los paquetes instalados y se fijan las versiones en package-lock.json.

- Fuentes: importadas en src/routes/+layout.svelte.
- Tokens de tipografía y distribución: src/app.css.
- Vista ilustrativa de la app: src/lib/styles/app-preview.css.
- Pruebas visuales y de distribución: tests/browser/responsive.spec.ts.

## Distribución

La portada usa dos columnas en flujo normal en escritorio. Desde 1100px pasa a una columna para evitar que la mascota y la ventana se superpongan con los textos. Desde 1000px se activa el menú desplegable. En celulares los botones se apilan, conservando un área de toque de al menos 44px.

La ilustración usa posiciones porcentuales sobre un contenedor con proporción definida. El tamaño de todos los detalles de la ventana se calcula a partir de su propio contenedor mediante unidades cqw. No se ocultan recortes de la ventana con overflow: hidden en el contenedor general.

Se verifican los dos idiomas en 320, 360, 390, 430, 600, 768, 820, 1024, 1100, 1200, 1440 y 1920px, además del diálogo en orientación horizontal. Las pruebas comprueban desbordes de la página, recortes de contenido, superposición entre texto e ilustración, encabezado y tamaños de controles. Las capturas quedan en .tmp/responsive-<ancho>-<idioma>.png.

Se mantiene la preferencia de movimiento reducido.

Referencias:
- https://fontsource.org/fonts/space-grotesk
- https://fontsource.org/fonts/manrope

En pantallas de hasta 1100px, la mascota y la ventana de la aplicación se distribuyen en filas propias: mascota arriba y vista previa completa abajo. Las pruebas también comprueban que no se superpongan, incluyendo el ancho de 557px del caso reportado.

En escritorio, desde 1101px, la mascota y la ventana tienen columnas independientes con separación para una ventana en perspectiva. La mascota tiene mayor altura y su encuadre CSS elimina únicamente los márgenes laterales transparentes, sin modificar el PNG original. Las pruebas verifican también su protagonismo y la presentación inclinada de la ventana. La comprobación de que ninguna se superponga se aplica a todos los anchos, incluyendo 1875px.

La ventana de escritorio conserva el encuadre inicial: un ancho de referencia de 470px, proporciones de la interfaz calculadas sobre esa referencia y perspectiva de 17 grados con origen a la izquierda. Se reserva margen para su proyección y se reduce proporcionalmente cuando falta espacio. La distribución móvil continúa separando la mascota y la ventana en filas.
