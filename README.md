# Rails API Template VueJS/ReactJS

This is a rails template with <a href="https://vuejs.org/" target="_blank">VueJS</a> or <a href="https://react.dev/learn" target="_blank">ReactJS</a>. The frontend starters ship with <a href="https://tailwindcss.com/" target="_blank">Tailwind CSS</a> plus the matching <a href="https://www.npmjs.com/package/simplekit-vue" target="_blank">Simplekit Vue</a> or <a href="https://www.npmjs.com/package/simplekit-react" target="_blank">Simplekit React</a> component suites.

This is the best option to start a project with Rails 7 API + VueJS/ReactJS. You can make a fast project and start working on it without any problem. Now you can choose between Tailwind CSS + Simplekit Vue (For VueJS) or Tailwind CSS + Simplekit React (For ReactJS), both configured with TypeScript out of the box.

This template starts with Active Storage by default when you create it. If you don't want, just remove it.

### JS Frameworks

- `VueJS 3` to start a project with VueJS just add the flag `--vue` to command line.
- `ReactJS 19` to start a project with ReactJS just add the flag `--react` to command line.

### CSS Frameworks

- `template.rb` has <a href="https://tailwindcss.com/" target="_blank">Tailwind CSS</a> as default Framework CSS. [Start](https://github.com/IsraelDCastro/rails-vite-tailwindcss-template#rails-tailwind-css-template)

## Installation

Make sure you have `vips` in your brew list, or run `brew install vips`

## Rails 7 + VueJS 3 + ViteJS + Tailwind CSS + Simplekit Vue

##### From GitHub with vue

```bash
rails new my_app --api -d <database_you_want> -m https://raw.githubusercontent.com/IsraelDCastro/rails-api-template/master/template.rb --vue
```

##### Making a git clone of the project with vue

```bash
rails new my_app --api -d <database_you_want> -m template.rb --vue
```

When you clone the repo just be sure to be inside the project when you run the command, from outside be sure to put the correct file direction `./template-api/template.rb`.

## Rails 7 + ReactJS 19 + ViteJS + Tailwind CSS + Simplekit React

##### From GitHub with react

```bash
rails new my_app --api -d <database_you_want> -m https://raw.githubusercontent.com/IsraelDCastro/rails-api-template/master/template.rb --react
```

##### Making a git clone of the project with react

```bash
rails new my_app --api -d <database_you_want> -m template.rb --react
```

When you clone the repo just be sure to be inside the project when you run the command, from outside be sure to put the correct file direction `./template-api/template.rb`.

### Default Vue/React dependencies

> - simplekit-vue (Only with flag `--vue`)
> - vue (Only with flag `--vue`)
> - vue-router (Only with flag `--vue`)
> ---
> - react (Only with flag `--react`)
> - react-dom (Only with flag `--react`)
> - simplekit-react (Only with flag `--react`)

---

### Default VueJS dev dependencies

> - typescript
> - vue-tsc
> - @vitejs/plugin-vue
> - autoprefixer
> - eslint
> - eslint-config-prettier
> - eslint-plugin-prettier
> - eslint-plugin-vue
> - path
> - postcss
> - prettier
> - tailwindcss
> - vite

### Default ReactJS dev dependencies

> - typescript
> - @types/react
> - @types/react-dom
> - eslint
> - eslint-plugin-tailwindcss (Only the template with Tailwind CSS has this package).
> - path
> - prettier
> - eslint-plugin-prettier
> - eslint-config-prettier
> - vite
> - autoprefixer
> - postcss
> - tailwindcss
> - @vitejs/plugin-react-refresh (Only with flag `--react`)
> - eslint-plugin-react (Only with flag `--react`)

### Default gems

> - gem "image_processing", "~> 1.2"
> - gem 'ruby-vips', '~> 2.1', '>= 2.1.4'
> - gem "rack-cors"
> - gem 'jwt'
> - gem 'bcrypt', '~> 3.1.18'
> - gem "annotate", group: :development
> - gem 'solargraph', group: :development

## QA / Automatización

Los módulos incluyen scripts listos para validar el estado del proyecto:

| Proyecto                | Lint / formato                           | Tipos / pruebas rápidas            |
|------------------------|-------------------------------------------|------------------------------------|
| `modules/react-front`  | `bun run lint`                            | `bun run typecheck`                |
| `modules/vue-front`    | `bun run lint`                            | `bun run typecheck`                |
| Rails API              | `bin/rails test` (o `rspec`)              | `bin/rails test` / `bundle exec rspec` |

> Recomendado: crear un workflow de GitHub Actions que ejecute los comandos anteriores en cada push/PR (ver `docs/boilerplate-foundations.md`).

### Analítica y SEO

- Ambos frontends exponen un helper de SEO (React `Seo`, Vue `useSeo`) que actualiza títulos, descripciones, enlaces canónicos y JSON-LD.
- Para habilitar el script de Plausible, define la variable `VITE_PLAUSIBLE_DOMAIN` en cada módulo (por ejemplo, `example.com`). El script se ignora si la variable no existe.

### Thank you ⭐️

If you have any questions, just make an issue, I'll answer you as soon as possible.
