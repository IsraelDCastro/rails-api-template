## Inventario de vistas críticas

### React (`modules/react-front`)

| Vista / Ruta                           | Estado actual                       | Próximos pasos clave                                                                                 |
|---------------------------------------|-------------------------------------|-------------------------------------------------------------------------------------------------------|
| `/` Home                              | Hero + CTA listos                   | Conectar a datos reales (productos/posts) y añadir secciones reutilizables (testimonios, features).  |
| `/sign-in`, `/sign-up`                | Formularios base en progreso        | Añadir validaciones con Formik/React Hook Form y feedback UI.                                        |
| `/about-us`, `/services`, `/blog`, `/contact-us` | Stub compartido a través de `<HomePage />` | Crear componentes dedicados + contenido estático para SEO.                                           |
| Onboarding / Dashboard (pendientes)   | No existen                          | Definir estructura modular (sidebar, cards) una vez se definan entidades en la API.                  |

### Vue (`modules/vue-front`)

| Vista / Ruta                           | Estado actual                                     | Próximos pasos clave                                                                           |
|---------------------------------------|---------------------------------------------------|-------------------------------------------------------------------------------------------------|
| `/` Home                              | Landing con CTA + formulario simple               | Integrar datos reales y componentes compartidos entre módulos de marketing.                    |
| `/sign-in`, `/sign-up`                | Formularios completos (Simplekit)                 | Validaciones+mensajes conectados con la API; gestionar estados de carga/éxito.                 |
| `/profile/*`                          | Secciones básicas de perfil/ajustes               | Añadir placeholders para actividad reciente y estados vacíos.                                  |
| Reset password / request reset        | Vistas implementadas                              | Conectar con la API real y ajustar copy.                                                       |
| Rutas públicas adicionales (blog, pricing, etc.) | No existen                                | Duplicar patrones del home y documentar contenido requerido.                                   |

## Backend Rails API · Ajustes recomendados

1. **Modelos y seeds**
   - Completar `User` con estados (`role`, `confirmed_at`) según necesidades.
   - Preparar `db/seeds.rb` con cuentas demo, tokens y cualquier catálogo requerido por los frontends.
2. **Autenticación**
   - Definir endpoints JWT (sign in/out, refresh) y documentarlos en `/docs/api.md`.
   - Añadir `remember_me` y renovación automática para sincronizar con la lógica front.
3. **CORS y seguridad**
   - Configurar `rack-cors` para permitir los dominios del frontend y agregar rate limiting (Rack Attack).
4. **Observabilidad**
   - Integrar logging estructurado y un job de verificación de salud (`/up` o similar).

## QA inicial · Scripts compartidos

| Ubicación           | Comando                                    | Propósito                                     |
|---------------------|---------------------------------------------|-----------------------------------------------|
| `modules/react-front` | `bun run lint` / `bun run typecheck`      | ESLint + TypeScript (React).                  |
| `modules/vue-front`   | `bun run lint` / `bun run typecheck`      | ESLint + vue-tsc (Vue).                       |
| Rails root            | `bin/rails test` / `bin/rails spec` (si rspec) | Garantizar integridad de la API.          |
| Global (pendiente)    | GitHub Actions workflow                   | Ejecutar linters+tests en cada push/PR.       |

> **Siguiente paso**: añadir un workflow de GitHub Actions que ejecute los comandos anteriores y adjuntar badges en el README.
