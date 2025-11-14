import { ButtonUI, Card, CardContent, CardHeader, CardTitle, NavLinkUI } from "simplekit-react";
import { Link as RouterLink } from "react-router-dom";
import { Seo } from "@/lib/seo";

const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "React Front Boilerplate",
  url: "https://example.com",
  potentialAction: {
    "@type": "SearchAction",
    target: "https://example.com/search?q={search_term_string}",
    "query-input": "required name=search_term_string"
  }
};

export default function Home() {
  return (
    <>
      <Seo
        title="Inicio"
        description="Starter de React + Simplekit listo para consumir tu API Rails con tipado estricto y UI moderna."
        canonical="https://example.com/"
        jsonLd={websiteSchema}
      />
      <section className="flex flex-col gap-6 py-16">
        <div className="space-y-4">
          <p className="text-sm uppercase tracking-[0.3em] text-primary-600">Rails + Simplekit</p>
          <h1 className="text-4xl font-bold text-slate-900">React starter powered by Simplekit React + Tailwind CSS.</h1>
          <p className="text-lg text-slate-600">
            Este boilerplate conectará tu API de forma segura, con rutas protegidas, formularios accesibles y componentes listos para escalar.
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-4">
          <ButtonUI color="primary" as={RouterLink} to="/sign-in">
            Sign in
          </ButtonUI>
          <ButtonUI variant="light" color="secondary" as={RouterLink} to="/sign-up">
            Create account
          </ButtonUI>
          <NavLinkUI as={RouterLink} to="/about-us" variant="modern" className="text-sm font-semibold text-primary-700">
            Conoce el stack
          </NavLinkUI>
        </div>
      </section>

      <section className="grid gap-6 py-8 md:grid-cols-3">
        {["Integración API", "Accesibilidad", "Performance"].map((feature) => (
          <Card key={feature}>
            <CardHeader>
              <CardTitle>{feature}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-slate-600">
                Documenta el flujo correspondiente y reemplaza este bloque con beneficios reales de tu producto.
              </p>
            </CardContent>
          </Card>
        ))}
      </section>
    </>
  );
}
