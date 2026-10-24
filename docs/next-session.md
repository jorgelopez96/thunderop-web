# Punto de continuación — Thunderop

Guardado el 19 de octubre de 2026, al cerrar la sesión por pedido del usuario.

## Proyecto

Carpeta confirmada: `D:\Proyectos\Thunderop-Website`.
La carpeta abierta en el editor puede ser `D:\PROYECTOS\Thunderop - web page`; no confundirlas. Trabajar en el proyecto confirmado.

SvelteKit, Svelte 5, TypeScript y Tailwind CSS. Interfaz en español e inglés con detección del idioma del navegador y elección manual recordada.

## Estado actual

Página principal completa: portada, seis funciones, Windows, comunidades, FAQ con buscador, soporte y pie de página.

Cambios más recientes:
- Se quitó la numeración 01–06 de las tarjetas de funciones.
- Se centraron los tres iconos de las opciones de ayuda, limitando el estilo de alineación de flechas a los SVG hijos directos.
- El carrusel permite arrastrar con mouse o lápiz; se retiraron las flechas. Mantiene deslizamiento táctil, navegación por teclado y clic normal en Explorar. Un arrastre no activa Explorar por accidente.
- Menú hamburguesa rediseñado: panel violeta, fondo desenfocado, iconos, descripciones, animación, sección activa y descarga. Cierra con Escape, al tocar el fondo, elegir un enlace o mover el foco fuera del encabezado. Devuelve el foco al botón cuando corresponde.
- Se conservó la composición de portada aprobada: mascota prominente y ventana de demostración inclinada, sin superposición con la mascota. En móvil, ambos elementos tienen sus propias filas.

## Verificaciones recientes

- Svelte y TypeScript: sin errores ni advertencias.
- Compilación de producción: correcta.
- Carrusel: pruebas de arrastre, clic, teclado y gestos táctiles aprobadas.
- Menú nuevo: ocho pruebas aprobadas en ambos idiomas, de 320 a 1000 px y en horizontal.
- Pruebas existentes de portada y distribución adaptable aprobadas durante el rediseño.
- Última comprobación de http://localhost:5173: HTTP 200.

Capturas y trazas: `.tmp`. Documentación relevante: `docs/navigation.md`, `docs/complete-page.md`, `docs/landing-artwork.md`.

## Pendiente

No hay una modificación nueva solicitada para la siguiente sesión. Esperar la próxima indicación del usuario para seguir ajustando el diseño.

Faltan los enlaces reales del instalador, contacto e invitaciones a comunidades. Actualmente se muestran avisos de disponibilidad. No inventar datos de contacto, métricas, precios, requisitos ni cuentas oficiales.

## Retomar localmente

~~~powershell
Set-Location -LiteralPath 'D:\Proyectos\Thunderop-Website'
npm.cmd run dev -- --host localhost --port 5173 --strictPort
~~~

Abrir http://localhost:5173. Si el servidor ya está activo, usarlo sin iniciar otro. Mantener abierta su terminal. No cambiar la política de ejecución de PowerShell: usar npm.cmd.

## Actualización 22 de octubre de 2026

- Descarga real conectada: `site.downloadUrl` (src/lib/config/site.ts) apunta a https://thunderop.duckdns.org/descargas/thunderop-setup.exe. El diálogo dice "Disponible" y su botón principal baja el instalador.
- Fondo 3D (`FloatingScene.svelte`, three.js cargado aparte): rayos, esferas, anillos y cápsulas con los colores de la marca, flotando detrás del contenido; acompañan el scroll con distinta profundidad y siguen un poco al mouse. El fondo de la página pasó de `body` a `:root`, y `#main` y `.site-end` van con z-index 1 encima del lienzo. Con "reducir movimiento" quedan quietos.
- Mascota de la portada: ahora es un botón; sube, se inclina y se achica con el scroll (`--s` en Hero.svelte, propiedades translate/rotate/scale en app.css) y salta con un giro al tocarla.
- Pruebas actualizadas al texto nuevo de descarga y a la mascota como botón: 50 aprobadas.
- Referencia del efecto pedido: https://huella-topaz.vercel.app/ (GSAP + three.js).

## Actualización 22 de octubre de 2026 (noche)

- Sin etiquetas tipo píldora en ninguna sección (portada, funciones, Windows, comunidades, ayuda); los diálogos conservan su estado.
- Logo del encabezado y del pie: solo "Thunderop." (sin el rayo).
- Portada: ventana de ejemplo rehecha como la sala de voz real de Thunderop 0.4 (barra de salas con "N en voz", transmisión en vivo con espectadores, tarjetas 16:9 y dock), con los colores de la app. La mascota es más grande y se apoya delante de la esquina inferior izquierda de la ventana. Sin órbitas, notas flotantes ni chispas. Reglas en app.css ("Portada: la ventana...").
- Objetos 3D hacia los costados para no pasar detrás del texto; en pantallas chicas, la mitad y más chicos.
- Prueba responsive adaptada: la mascota puede pisar la ventana pero no tapar más del 25 %; la ventana mantiene proporción de escritorio. 50 pruebas aprobadas.
- Mascota 3D que recorre la página: postergada (requiere un modelo .glb).

## Actualización 22 de octubre de 2026 (cierre)

- Botón "Iniciar sesión" (cartel "Próximamente": Thunderop en el navegador).
- Descarga con código de invitación validado en el servidor (POST /descargar, hash en src/lib/server/descarga.ts). El instalador sigue en una URL pública del servidor de Thunderop (la usa el actualizador); cerrarlo del todo queda para después.
- Mascota de la portada más grande (57 %), con rebote suave en el lugar; se quitó el movimiento atado al scroll. Al tocarla sigue saltando con un giro.
- La ventana de ejemplo volvió a ir en diagonal hacia adentro (perspective + rotateY -17°, más suave en pantallas medianas), con el diseño actual de la app.
- 51 pruebas aprobadas. Sin subir a GitHub todavía.

## Actualización 24 de octubre de 2026 (rama cuentas-login, sin push)

- Cuentas con PocketBase (`PUBLIC_PB_URL`, definida en `src/env.ts`; local en `.env`, falta cargarla en Vercel o el build falla): /entrar, /crear-cuenta, /verificar, /olvide, /completar, /cuenta. Reglas copiadas de la app (`src/lib/reglasCuenta.ts`).
- "Iniciar sesión" lleva a /entrar; con sesión dice "Mi cuenta" y va a /cuenta. Se quitó el cartel "Próximamente".
- /terminos y /privacidad: borrador versión 1 (23/10/2026), es/en, con aviso de revisión legal.
- Descarga: el navegador manda el código (o la sesión de una cuenta completa) a `POST /api/descarga/validar` de PocketBase, que devuelve el link del instalador. Ya no existe la ruta /descargar ni el hash; el link no está en el HTML ni en el código de la página.
- Pruebas: corren en el puerto 5174 con `PUBLIC_PB_URL` apuntando a una dirección vacía; cada prueba responde las llamadas a PocketBase con page.route. 58 aprobadas.
