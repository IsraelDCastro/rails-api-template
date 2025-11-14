import { useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import Navbar from "./navbar";
import Footer from "./footer";
import { trackPageView } from "@/lib/analytics";

export default function PageLayout() {
  const { pathname } = useLocation();

  useEffect(() => {
    document.documentElement.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth"
    });
    trackPageView(pathname);
  }, [pathname]);

  return (
    <div className="wrapper">
      <Navbar />
      <main className="container">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
