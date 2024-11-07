import { routes } from "./routes";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import "./assets/main.css";

function App() {
  return <RouterProvider router={createBrowserRouter(routes)} />;
}

export default App;
