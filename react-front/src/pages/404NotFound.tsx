import { ButtonUI } from "simplekit-react";
import { Link as RouterLink } from "react-router-dom";
import { Seo } from "@/lib/seo";
import type { JsonLdInput } from "@/lib/seo";

export default function NotFound() {
  const breadcrumbSchema = [
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Inicio",
          item: "https://example.com/"
        },
        {
          "@type": "ListItem",
          position: 2,
          name: "404"
        }
      ]
    }
  ];
  return (
    <>
      <Seo title="Página no encontrada" description="La ruta solicitada no existe." canonical="https://example.com/404" jsonLd={breadcrumbSchema} />
      <section className="relative flex min-h-[70vh] flex-col items-center justify-center overflow-hidden px-8 py-16 text-center">
        <div aria-hidden className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-950" />
        <div className="relative z-10 max-w-2xl space-y-4 text-white">
          <p className="text-sm uppercase tracking-[0.4em] text-primary-200">Error 404</p>
          <h2 className="text-4xl font-bold">Whooops! We think you are lost</h2>
          <p className="text-lg text-slate-200">Don’t worry, the main navigation is just one click away.</p>
        </div>
        <div className="relative z-10 mt-10 flex flex-wrap justify-center gap-4">
          <ButtonUI as={RouterLink} to="/" color="secondary">
            Go back home
          </ButtonUI>
        </div>
      </section>
    </>
  );
}
