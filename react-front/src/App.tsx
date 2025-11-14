import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { routes } from "./routes";
import "./assets/main.css";

const router = createBrowserRouter(routes);

export default function App() {
  return <RouterProvider router={router} />;
}
