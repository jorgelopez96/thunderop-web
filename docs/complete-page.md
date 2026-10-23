# Página principal completa

La composición está en `src/routes/+page.svelte`. Conserva la portada aprobada y agrega las secciones completas de Windows, comunidades, FAQ, soporte y pie de página.

## Componentes

- `landing/Hero.svelte`, `AppPreview.svelte`: portada y demostración ilustrativa de la app.
- `landing/Features.svelte`: seis funciones.
- `landing/WindowsDownload.svelte`: presentación de Windows, mascota con laptop y acceso a disponibilidad.
- `landing/Communities.svelte`: cuatro intereses ilustrados, arrastre con mouse o lápiz, desplazamiento táctil nativo y navegación por teclado. Se quitaron las flechas. Respeta movimiento reducido y evita activar Explorar al terminar un arrastre.
- `landing/HelpSupport.svelte`: buscador que ignora mayúsculas y acentos, respuestas con details/summary nativos, estado sin resultados y opciones de ayuda.
- `layout/Header.svelte`, `Footer.svelte`: navegación por anclas y selección de idioma.
- `ui/DownloadDialog.svelte`, `InfoDialog.svelte`: diálogos nativos con cierre por Escape y devolución de foco al botón.

## Traducciones

`src/lib/i18n/messages.ts` conserva la portada, la demostración y las funciones. `page-messages.ts` contiene las secciones nuevas. Ambos diccionarios comprueban el mismo esquema entre español e inglés con TypeScript. La negociación del idioma y su persistencia siguen centralizadas en el contexto existente.

## Enlaces pendientes

No se proporcionaron un instalador, invitaciones oficiales ni datos de contacto. Los botones correspondientes muestran información de disponibilidad. No se simulan descargas, envíos de mensajes ni membresías. Las tarjetas de comunidades representan intereses; no muestran cantidades de miembros ficticias. Las FAQ no afirman requisitos, precios ni garantías de seguridad sin confirmar.

Para conectar servicios reales, cambiar las acciones centralizadas `openDownload`, `openCommunity` y `openContact` de la página y actualizar las traducciones de disponibilidad. Publicar la web y elegir un adaptador de hosting son pasos posteriores.

## Imágenes

Las mascotas y el atlas de comunidades están en `static/images`. Las imágenes de secciones inferiores usan carga diferida y dimensiones explícitas. Sus fuentes y prompts están documentados en [landing-artwork.md](landing-artwork.md). Las ilustraciones originales del usuario se conservaron.

## Verificación

- `npm.cmd run check`: Svelte y TypeScript.
- `npm.cmd test`: ocho verificaciones de negociación de idioma.
- `npm.cmd run build`: compilación de producción.
- `npm.cmd run test:e2e`: pruebas de interfaz en Edge. Cubren portada, funciones, cambios de idioma, navegación, FAQ, arrastre en ambas direcciones, gestos táctiles, teclado, diálogos, imágenes y distribución entre 320 y 1920 px. Los diálogos también se revisan en orientación horizontal.
- Las capturas y trazas se guardan en `.tmp`, excluido del repositorio.

## Desarrollo local

Desde PowerShell:

~~~powershell
Set-Location -LiteralPath 'D:\Proyectos\Thunderop-Website'
npm.cmd run dev -- --host localhost --port 5173 --strictPort
~~~

Abrir http://localhost:5173. Mantener esa terminal abierta; Ctrl+C detiene el servidor.
