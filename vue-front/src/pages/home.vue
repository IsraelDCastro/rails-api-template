<template>
	<main class="space-y-20 pb-16">
		<section class="relative isolate overflow-hidden rounded-3xl bg-gradient-to-br from-slate-900 via-slate-800 to-primary-900 px-6 py-16 text-white shadow-2xl md:px-12">
			<div class="mx-auto flex max-w-6xl flex-col gap-12 lg:flex-row">
				<div class="flex-1 space-y-6">
					<div class="inline-flex items-center gap-2 rounded-full border border-white/20 px-4 py-1 text-xs uppercase tracking-[0.3em] text-white/80">
						Simplekit Vue + Rails API
					</div>
					<div class="space-y-4">
						<h1 class="text-4xl font-bold leading-tight md:text-5xl">
							Levanta tu next project con un frontend moderno y accesible.
						</h1>
						<p class="text-lg text-white/80">
							Este boilerplate combina Vue 3, Simplekit y Tailwind para lanzar productos hermosos con rutas autenticadas, formularios accesibles y
							analítica lista para producción.
						</p>
					</div>
					<div class="flex flex-wrap gap-4">
						<ButtonUI color="primary">Empieza ahora</ButtonUI>
						<ButtonUI variant="light" color="secondary">Ver documentación</ButtonUI>
					</div>
					<div class="rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur">
						<p class="text-sm text-white/80">Suscríbete para recibir novedades y nuevas plantillas.</p>
						<div class="mt-4 flex flex-col gap-4 md:flex-row">
							<InputUI v-model="newsletterEmail" type="email" label="Email address" placeholder="ejemplo@correo.com" class="flex-1" />
							<ButtonUI color="secondary" class="md:self-end" @click="handleSubscribe">
								Quiero estar al día
							</ButtonUI>
						</div>
					</div>
				</div>
				<div class="flex flex-1 flex-col gap-4 rounded-2xl border border-white/10 bg-white/5 p-6 shadow-lg backdrop-blur">
					<div class="flex items-center justify-between text-sm text-white/80">
						<span>Panel en vivo</span>
						<span>v0.3.0</span>
					</div>
					<div class="space-y-4 rounded-xl bg-white/10 p-6">
						<div class="flex items-center justify-between">
							<p class="text-sm text-white/70">Usuarios activos</p>
							<p class="text-2xl font-semibold">1.2K</p>
						</div>
						<div class="flex items-center justify-between">
							<p class="text-sm text-white/70">Integraciones conectadas</p>
							<p class="text-2xl font-semibold">14</p>
						</div>
						<div class="flex items-center justify-between">
							<p class="text-sm text-white/70">Tiempo medio de despliegue</p>
							<p class="text-2xl font-semibold">6 min</p>
						</div>
					</div>
					<p class="text-xs text-white/60">Render simulado con datos ficticios.</p>
				</div>
			</div>
			<div class="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.25),_transparent_55%)]" />
		</section>

		<section class="mx-auto w-11/12 max-w-6xl space-y-8">
			<div class="space-y-3 text-center">
				<p class="text-xs uppercase tracking-[0.4em] text-primary-600">¿Por qué Simplekit?</p>
				<h2 class="text-3xl font-semibold text-slate-900">Productividad sin sacrificar diseño</h2>
				<p class="text-slate-600">
					Componentes accesibles, tipado estricto y utilidades optimizadas te permiten iterar rápido desde el primer día.
				</p>
			</div>
			<div class="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
				<Card v-for="feature in features" :key="feature.title" class="h-full border border-slate-100 shadow-sm">
					<CardHeader class="space-y-2">
						<div class="flex h-10 w-10 items-center justify-center rounded-lg bg-primary-50 text-xl">{{ feature.icon }}</div>
						<CardTitle>{{ feature.title }}</CardTitle>
					</CardHeader>
					<CardContent>
						<p class="text-sm text-slate-600">{{ feature.description }}</p>
					</CardContent>
				</Card>
			</div>
		</section>

		<section class="mx-auto flex w-11/12 max-w-6xl flex-col gap-6 rounded-3xl border border-slate-100 bg-white p-8 shadow-xl md:flex-row">
			<div class="flex-1">
				<h3 class="text-2xl font-semibold text-slate-900">¿Listo para migrar tu stack?</h3>
				<p class="mt-2 text-slate-600">
					Suma tus endpoints Rails, define las vistas y el boilerplate se encarga del resto: tokens JWT, rutas protegidas y actualizaciones de SEO dinámico.
				</p>
				<ul class="mt-4 space-y-2 text-sm text-slate-600">
					<li v-for="item in checklist" :key="item" class="flex items-center gap-2">
						<span class="text-primary-600">✔</span>
						{{ item }}
					</li>
				</ul>
			</div>
			<div class="flex-1 rounded-2xl bg-slate-900 p-6 text-white">
				<p class="text-sm uppercase tracking-[0.3em] text-white/50">Lo que dicen los equipos</p>
				<blockquote class="mt-6 space-y-4">
					<p class="text-lg leading-relaxed text-white/90">
						“En una semana migramos nuestro panel antiguo. Los componentes responden bien, el rendimiento es excelente y el setup con Rails API fue
						intuitivo.”
					</p>
					<div>
						<p class="font-semibold">Carmen Dorado</p>
						<p class="text-sm text-white/70">CTO · AltoCielo Labs</p>
					</div>
				</blockquote>
			</div>
		</section>

		<section class="mx-auto w-11/12 max-w-4xl rounded-3xl bg-gradient-to-r from-primary-600 to-primary-400 px-8 py-10 text-white shadow-lg">
			<div class="flex flex-col items-center gap-6 text-center">
				<h3 class="text-2xl font-semibold">¿Necesitas otra plantilla?</h3>
				<p class="text-white/80">
					Agrega nuevas rutas, duplica este layout o crea tu lista de scaffolds personalizados. El objetivo es que tengas un punto de partida para cada
					tipo de proyecto.
				</p>
				<div class="flex flex-col gap-4 md:flex-row">
					<ButtonUI color="secondary">Descargar boilerplate</ButtonUI>
					<ButtonUI variant="light" color="primary">Hablar con el equipo</ButtonUI>
				</div>
			</div>
		</section>
	</main>
</template>

<script setup lang="ts">
import { ButtonUI, Card, CardContent, CardHeader, CardTitle, InputUI } from "simplekit-vue";
import { ref } from "vue";
import { useSeo } from "@/composable/useSeo";

const newsletterEmail = ref("");
const features = [
	{
		title: "Componentes accesibles",
		description: "Simplekit respeta ARIA, focus visible y patrones navegables con teclado para acelerar la conformidad AA.",
		icon: "✨",
	},
	{
		title: "Tipado flexible",
		description: "Vue + TypeScript con configuraciones estrictas para detectar errores antes de deploy.",
		icon: "🧠",
	},
	{
		title: "Listo para analytics",
		description: "Integración opcional con Plausible o GA4 y scripts preparados para cookies opt-in.",
		icon: "📈",
	},
	{
		title: "SEO dinámico",
		description: "Hooks para actualizar `<title>`, metadatos y JSON-LD en cada ruta sin duplicar lógica.",
		icon: "⚙️",
	},
	{
		title: "Diseño responsive",
		description: "Layouts fluidos y grid utilities para crear dashboards o landings sin esfuerzo extra.",
		icon: "📱",
	},
	{
		title: "Integración Rails",
		description: "Autenticación JWT, seeds y endpoints listos para conectarse a tus vistas.",
		icon: "🛠️",
	},
];

const checklist = ["UI dark/light incluida", "Tailwind v4 configurado", "Stores y rutas base ya definidas"];

const websiteSchema = {
	"@context": "https://schema.org",
	"@type": "WebSite",
	name: "Vue Front Boilerplate",
	url: "https://example.com/",
	potentialAction: {
		"@type": "SearchAction",
		target: "https://example.com/search?q={search_term_string}",
		"query-input": "required name=search_term_string",
	},
};

useSeo({
	title: "Inicio",
	description: "Landing preparada con Simplekit Vue y Tailwind para arrancar tu next project sobre Rails API.",
	canonical: "https://example.com/",
	jsonLd: websiteSchema,
});

function handleSubscribe() {
	newsletterEmail.value = "";
}
</script>
