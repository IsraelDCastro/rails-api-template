const TRACKING_DOMAIN = import.meta.env.VITE_PLAUSIBLE_DOMAIN;

export function initAnalytics() {
	if (!TRACKING_DOMAIN || document.getElementById("plausible-script")) {
		return;
	}
	const script = document.createElement("script");
	script.setAttribute("defer", "true");
	script.src = "https://plausible.io/js/plausible.js";
	script.dataset.domain = TRACKING_DOMAIN;
	script.id = "plausible-script";
	document.head.appendChild(script);
}

export function trackPageView(url: string) {
	const plausible = (window as any)?.plausible;
	if (typeof plausible !== "function") return;
	plausible("pageview", { u: url });
}
