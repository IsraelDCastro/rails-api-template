const TRACKING_ID = import.meta.env.VITE_PLAUSIBLE_DOMAIN;

export function initAnalytics() {
  if (!TRACKING_ID || document.getElementById("plausible-script")) {
    return;
  }

  const script = document.createElement("script");
  script.setAttribute("defer", "true");
  script.setAttribute("data-domain", TRACKING_ID);
  script.src = "https://plausible.io/js/plausible.js";
  script.id = "plausible-script";
  document.head.appendChild(script);
}

export function trackPageView(pathname: string) {
  if (typeof window === "undefined" || !(window as any).plausible) {
    return;
  }
  (window as any).plausible("pageview", { u: `${window.location.origin}${pathname}` });
}
