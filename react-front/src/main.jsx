import React from "react";
import ReactDOM from "react-dom/client";
import { LazyLoad } from "./lib/lazyLoad";

const App = LazyLoad(() => import("./App"));

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
