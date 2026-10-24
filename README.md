# Thunderop Website

Sitio oficial de Thunderop con portada, funciones, presentación para Windows, comunidades, preguntas frecuentes y soporte. Adaptado a escritorio y celular, con español e inglés.

## Requisitos

- Node.js 22.17 o superior (entorno verificado con 22.20.0).
- npm (entorno verificado con 10.9.3).
- Git (entorno verificado con 2.51.0).

## Ejecutar en Windows PowerShell

~~~powershell
Set-Location -LiteralPath 'M:\THUNDEROP\Pagina web'
npm.cmd run dev
~~~

Abrí la URL que muestra Vite, normalmente http://localhost:5173. Para detener el servidor, presioná Ctrl+C.

Las dependencias ya están instaladas. Al descargar otra copia del repositorio, ejecutá primero:

~~~powershell
npm.cmd ci
~~~

Se usa npm.cmd porque PowerShell puede bloquear npm.ps1 con su política de ejecución. No hace falta cambiar esa política.

## Comandos

| Comando | Uso |
| --- | --- |
| npm.cmd run dev | Servidor local con recarga automática. |
| npm.cmd run check | Verificación de Svelte y TypeScript. |
| npm.cmd run check:watch | Verificación continua durante el desarrollo. |
| npm.cmd run build | Compilación de producción. |
| npm.cmd run preview | Revisión local de la compilación, después de build. |

## Estructura

~~~text
src/
  lib/
    assets/             Recursos procesados por Vite.
    components/
      ui/               Componentes de interfaz reutilizables.
      layout/           Componentes de estructura de la web.
    config/
      site.ts           Nombre y descripción del sitio.
    server/             Código exclusivo del servidor.
    types/              Tipos compartidos de la aplicación.
    utils/              Funciones reutilizables.
    index.ts            Exportaciones compartidas cuando sean necesarias.
  routes/
    +layout.svelte      Layout raíz, metadatos y CSS global.
    +page.svelte        Composición de la página principal completa.
  app.css               Entrada global de Tailwind CSS.
  app.d.ts              Tipos globales de SvelteKit.
  app.html              Documento HTML raíz.
static/
  images/               Imágenes servidas sin procesamiento.
  fonts/                Fuentes estáticas cuando se definan.
docs/
  architecture.md       Convenciones de organización.
~~~

Las carpetas vacías contienen .gitkeep para conservarlas cuando se use Git.

## Configuración

- SvelteKit y Svelte con TypeScript estricto.
- Tailwind CSS integrado mediante @tailwindcss/vite y src/app.css.
- La configuración de SvelteKit está en vite.config.ts, como genera la versión actual del CLI.
- Alias #lib/* para importar desde src/lib.
- package-lock.json conserva las versiones resueltas para instalaciones reproducibles.
- .npmrc guarda la caché de npm dentro del proyecto; .npm-cache, .tmp, dependencias y archivos generados se excluyen de Git.
- El adaptador automático queda pendiente de una decisión de hosting. La compilación local no publica el sitio.

## Referencias oficiales

- Svelte CLI: https://svelte.dev/docs/cli/sv-create
- Tailwind con SvelteKit: https://tailwindcss.com/docs/installation/framework-guides/sveltekit

## Portada e idiomas

La portada y el encabezado están implementados. La detección por navegador, la selección recordada, los archivos de traducción y los comandos de pruebas se documentan en [docs/i18n.md](docs/i18n.md). La mascota y su prompt se documentan en [docs/mascot-hero.md](docs/mascot-hero.md). El botón de descarga muestra un aviso de disponibilidad hasta contar con un instalador oficial.

La tipografía y la distribución adaptable se documentan en [docs/typography-responsive.md](docs/typography-responsive.md). Las fuentes se sirven desde el proyecto y las pruebas cubren celulares, tablets y escritorio en ambos idiomas.

La sección de funciones está implementada en su propio componente y se documenta en [docs/features.md](docs/features.md). Incluye seis tarjetas, traducciones completas y pruebas de distribución para móvil, tablet y escritorio.


## Página completa

Las secciones, interacciones, enlaces pendientes y pruebas de la página completa se documentan en [docs/complete-page.md](docs/complete-page.md). Los recursos visuales nuevos y sus prompts están en [docs/landing-artwork.md](docs/landing-artwork.md).
