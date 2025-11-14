import React from "react";
import ReactDOM from "react-dom/client";
import { LazyLoad } from "./lib/lazyLoad";
import { initAnalytics } from "./lib/analytics";

const App = LazyLoad(() => import("./App"));
const rootElement = document.getElementById("root");

if (!rootElement) {
  throw new Error("Failed to find the root element");
}

initAnalytics();

ReactDOM.createRoot(rootElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
