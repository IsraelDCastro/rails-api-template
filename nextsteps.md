## Fase 1 · Fundamentos del boilerplate

- [x] Inventariar las vistas esenciales (home, onboarding, auth, marketing) para React y Vue; definir qué mockups o componentes faltan. _Ver `docs/boilerplate-foundations.md`.*
- [x] Crear páginas base con layout reutilizable (header, navbar responsive, footer, estados vacíos) y documentar su jerarquía de rutas. _Se añadió `<Footer />` en React + documentación centralizada._
- [x] Revisar el backend Rails API: validar modelos, seeds iniciales y endpoints necesarios para la experiencia mínima; añadir fixtures o factories. _Resumen y pendientes en `docs/boilerplate-foundations.md`.*
- [x] Configurar workflows de QA (linters, type-check, pruebas mínimas) en ambos frontends y la API para asegurar coherencia desde el arranque. _README actualizado con comandos oficiales._

## Fase 2 · Experiencia y SEO

- [x] Completar formularios clave (registro, inicio de sesión, recuperación) con validaciones y manejo de errores consistentes entre React/Vue. _React `signIn.tsx` y las vistas Vue `signIn.vue`/`signUp.vue` ahora incluyen validaciones básicas y feedback._
- [x] Añadir metadatos SEO por ruta: `<title>`, `<meta name="description">`, `og:*`, `twitter:*` y enlaces canónicos; definir una API para actualizar metadata desde el router. _Nuevos helpers `react-front/src/lib/seo.tsx` y `vue-front/src/composable/useSeo.ts` usados en home/404/auth._
- [x] Implementar esquemas JSON-LD: `WebSite` en la home, `BreadcrumbList` para rutas profundas y esquemas específicos (Product, Article) si aplica. _JSON-LD añadido en React y Vue home + breadcrumbs en páginas de auth/404._
- [x] Integrar analítica (por ejemplo, Plausible o GA4) con respeto a privacidad y capacidad de opt-out. _Módulos `src/lib/analytics` en ambos frontends con hooks en `main`/router._

## Fase 3 · Accesibilidad y rendimiento

- [x] Auditar accesibilidad con axe/ Lighthouse: verificar contraste, labels, orden de tabulación, focus visible y ARIA en componentes de Simplekit.
- [x] Implementar patrones de navegación accesibles (skip links, anuncios para lectores de pantalla) y asegurar compatibilidad con teclado.
- [x] Optimizar performance inicial: code-splitting, compresión de assets, lazy loading de imágenes/hero, prefetch selectivo en rutas populares.
