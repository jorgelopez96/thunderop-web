# Organización del proyecto

Usar las convenciones nativas de SvelteKit y agregar módulos a medida que exista una necesidad concreta.

- src/routes: páginas, layouts y endpoints. Mantener aquí la composición de cada ruta.
- src/lib/components/ui: componentes reutilizables de interfaz.
- src/lib/components/layout: encabezado, pie y otros componentes de estructura cuando se diseñen.
- src/lib/config: configuración pública y metadatos compartidos.
- src/lib/server: módulos exclusivos del servidor. No importar desde componentes del navegador.
- src/lib/types: tipos compartidos. Los tipos usados por un único módulo deben permanecer cerca de ese módulo.
- src/lib/utils: funciones compartidas sin dependencias de presentación.
- src/lib/assets: recursos que deben pasar por Vite.
- static: archivos servidos directamente desde la raíz, por ejemplo /images/archivo.webp.
- docs: decisiones y convenciones que necesiten conservarse.

## Convenciones

Usar TypeScript estricto y componentes Svelte con <script lang="ts"> cuando necesiten lógica. Importar módulos compartidos con #lib/*.

La entrada de Tailwind es src/app.css. Contiene los tokens de color y el diseño adaptable del encabezado y la portada. Los idiomas se documentan en docs/i18n.md.

No almacenar secretos en archivos de configuración pública ni en static. Cuando se agreguen variables de entorno, documentar sus nombres en .env.example sin valores privados y acceder a los secretos desde módulos de servidor.

Crear carpetas por funcionalidad dentro de src/lib cuando una funcionalidad real lo justifique; evitar capas o abstracciones sin uso.

Antes de entregar cambios, ejecutar npm.cmd run check y npm.cmd run build. Elegir el adaptador de producción cuando se defina dónde alojar la web.

Las importaciones mediante #lib deben incluir la extensión del módulo, por ejemplo #lib/config/site.js para site.ts, o #lib/components/ui/Button.svelte para un componente.
