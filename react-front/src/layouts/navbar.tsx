import { useState } from "react";
import { ButtonUI } from "simplekit-react";
import CustomNavlink from "@/components/layouts/customNavlink";
import { useLocation, useNavigate } from "react-router-dom";

type MenuItem = {
  id: string;
  label: string;
  url: string;
};

const menuItems: MenuItem[] = [
  { id: "home", label: "Home", url: "/" },
  { id: "about-us", label: "About us", url: "/about-us" },
  { id: "services", label: "Services", url: "/services" },
  { id: "blog", label: "Blog", url: "/blog" },
  { id: "contact-us", label: "Contact us", url: "/contact-us" }
];

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const isActiveLink = (url: string) => {
    if (url === "/") {
      return pathname === url;
    }

    return pathname.startsWith(url);
  };

  const goTo = (url: string) => {
    navigate(url);
    setIsMenuOpen(false);
  };

  return (
    <header className="bg-white shadow">
      <div className="mx-auto flex max-w-[1440px] items-center justify-between px-6 py-4 lg:px-8">
        <div className="flex items-center gap-4">
          <button
            type="button"
            aria-label={isMenuOpen ? "Close navigation menu" : "Open navigation menu"}
            className="flex flex-col gap-1 rounded-md border border-slate-200 p-2 text-slate-700 transition hover:bg-slate-50 lg:hidden"
            onClick={() => setIsMenuOpen((prev) => !prev)}
          >
            <span className={`h-0.5 w-6 rounded ${isMenuOpen ? "translate-y-1 rotate-45" : ""} bg-current transition`} />
            <span className={`h-0.5 w-6 rounded ${isMenuOpen ? "opacity-0" : ""} bg-current transition`} />
            <span className={`h-0.5 w-6 rounded ${isMenuOpen ? "-translate-y-1 -rotate-45" : ""} bg-current transition`} />
          </button>
          <button type="button" onClick={() => goTo("/")} className="text-lg font-bold tracking-tight text-slate-900">
            React Front
          </button>
        </div>
        <nav className="hidden items-center gap-4 lg:flex">
          {menuItems.map((item) => (
            <CustomNavlink key={item.id} to={item.url} isActive={isActiveLink(item.url)} variant="modern">
              {item.label}
            </CustomNavlink>
          ))}
        </nav>
        <div className="hidden items-center gap-3 sm:flex">
          <ButtonUI variant="light" color="secondary" onClick={() => navigate("/sign-in")}>
            Sign in
          </ButtonUI>
          <ButtonUI color="primary" onClick={() => navigate("/sign-up")}>
            Sign up
          </ButtonUI>
        </div>
      </div>
      <div className={`border-t border-slate-200 px-6 pb-6 pt-4 lg:hidden ${isMenuOpen ? "block" : "hidden"}`}>
        <div className="flex flex-col gap-2">
          {menuItems.map((item) => (
            <CustomNavlink
              key={`mobile-${item.id}`}
              to={item.url}
              isActive={isActiveLink(item.url)}
              className="w-full justify-start"
              onClick={() => goTo(item.url)}
            >
              {item.label}
            </CustomNavlink>
          ))}
        </div>
        <div className="mt-4 flex flex-col gap-2">
          <ButtonUI variant="light" color="secondary" isFullWidth onClick={() => goTo("/sign-in")}>
            Sign in
          </ButtonUI>
          <ButtonUI color="primary" isFullWidth onClick={() => goTo("/sign-up")}>
            Sign up
          </ButtonUI>
        </div>
      </div>
    </header>
  );
}
