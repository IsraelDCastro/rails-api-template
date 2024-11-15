import { useEffect } from "react";
import Navbar from "./navbar";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
// import Footer from "./footer";
import { NextUIProvider } from "@nextui-org/react";

export default function PageLayout() {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  useEffect(() => {
    document.documentElement.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth"
    });
  }, [pathname]);

  return (
    <div className="wrapper">
      <NextUIProvider navigate={navigate}>
        <Navbar />
        <main>
          <Outlet />
        </main>
        {/* <Footer /> */}
      </NextUIProvider>
    </div>
  );
}
