import { watchEffect, onBeforeUnmount } from "vue";

type JsonLdInput = Record<string, unknown> | Record<string, unknown>[];

interface SeoOptions {
	title: string;
	description?: string;
	canonical?: string;
	jsonLd?: JsonLdInput;
}

const APP_NAME = "Vue Front Boilerplate";

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

export function useSeo(options: SeoOptions) {
	const scriptId = "structured-data-script";

	const stop = watchEffect(() => {
		const title = `${options.title} · ${APP_NAME}`;
		document.title = title;
		if (options.description) {
			upsertMeta("description", options.description);
			upsertMeta("og:description", options.description);
			upsertMeta("twitter:description", options.description);
		}
		upsertMeta("og:title", title);
		upsertMeta("twitter:title", title);

		if (options.canonical) {
			upsertLink("canonical", options.canonical);
			upsertMeta("og:url", options.canonical);
		}

		const existing = document.getElementById(scriptId);
		if (options.jsonLd) {
			const payload = Array.isArray(options.jsonLd) ? options.jsonLd : [options.jsonLd];
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
	});

	onBeforeUnmount(() => {
		stop();
	});
}
