import { useEffect } from "react";

type JsonLdInput = Record<string, unknown> | Record<string, unknown>[];

type SeoProps = {
  title: string;
  description?: string;
  canonical?: string;
  jsonLd?: JsonLdInput;
};

const APP_NAME = "React Front Boilerplate";

function upsertMeta(name: string, content: string) {
  let tag = document.querySelector(`meta[name="${name}"]`) as HTMLMetaElement | null;
  if (!tag) {
    tag = document.createElement("meta");
    tag.setAttribute("name", name);
    document.head.appendChild(tag);
  }
  tag.setAttribute("content", content);
}

function upsertLink(rel: string, href: string) {
  let tag = document.querySelector(`link[rel="${rel}"]`) as HTMLLinkElement | null;
  if (!tag) {
    tag = document.createElement("link");
    tag.setAttribute("rel", rel);
    document.head.appendChild(tag);
  }
  tag.setAttribute("href", href);
}

export function Seo({ title, description, canonical, jsonLd }: SeoProps) {
  useEffect(() => {
    const fullTitle = `${title} · ${APP_NAME}`;
    document.title = fullTitle;
    if (description) {
      upsertMeta("description", description);
      upsertMeta("og:description", description);
      upsertMeta("twitter:description", description);
    }
    upsertMeta("og:title", fullTitle);
    upsertMeta("twitter:title", fullTitle);

    if (canonical) {
      upsertLink("canonical", canonical);
      upsertMeta("og:url", canonical);
    }

    const scriptId = "structured-data-script";
    const existing = document.getElementById(scriptId);
    if (jsonLd) {
      const payload = Array.isArray(jsonLd) ? jsonLd : [jsonLd];
      const script = existing ?? document.createElement("script");
      script.type = "application/ld+json";
      script.id = scriptId;
      script.text = JSON.stringify(payload);
      if (!existing) {
        document.head.appendChild(script);
      }
    } else if (existing) {
      existing.remove();
    }
  }, [title, description, canonical, jsonLd]);

  return null;
}
