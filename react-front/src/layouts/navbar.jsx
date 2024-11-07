import React, { useState } from "react";
import { Navbar, NavbarBrand, NavbarContent, NavbarItem, NavbarMenuToggle, NavbarMenu, NavbarMenuItem } from "@nextui-org/react";
import CustomNavlink from "@/components/layouts/customNavlink";
import { useLocation, useNavigate } from "react-router-dom";
import CustomLink from "@/components/ui/customLink";

export default function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();
  const route = useLocation();

  const isActiveLink = (url) => {
    if (url === "/") {
      return route.pathname === `${url}`;
    }

    return route.pathname.startsWith(`${url}`);
  };

  const menuItems = [
    { id: "home", name: "Home", url: "/", icon: "" },
    { id: "about-us", name: "About us", url: "/about-us", icon: "" },
    { id: "services", name: "Services", url: "/services", icon: "" },
    { id: "blog", name: "Blog", url: "/blog", icon: "" },
    { id: "contact-us", name: "Contact us", url: "/contact-us", icon: "" }
  ];

  return (
    <Navbar classNames={{ wrapper: "p-0 max-w-[1440px]" }} className="px-8 shadow" maxWidth="full" onMenuOpenChange={setIsMenuOpen}>
      <NavbarContent>
        <NavbarMenuToggle aria-label={isMenuOpen ? "Close menu" : "Open menu"} className="sm:hidden" />
        <NavbarBrand>
          <h6 className="font-bold">React Front</h6>
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent className="hidden gap-4 sm:flex" justify="center">
        {menuItems.map((item, index) => (
          <NavbarItem key={index}>
            <CustomNavlink
              variant={isActiveLink(item.url) ? "solid" : "flat"}
              color="primary"
              id={item.id}
              onClick={() => navigate(item.url)}
              to={item.url}
            >
              {item.name}
            </CustomNavlink>
          </NavbarItem>
        ))}
      </NavbarContent>
      <NavbarContent justify="end">
        <NavbarItem>
          <CustomNavlink variant="light" color="secondary" id="sign-in" onClick={() => navigate("/sign-in")}>
            Sign in
          </CustomNavlink>
        </NavbarItem>
        <NavbarItem>
          <CustomNavlink color="primary" id="sing-up" onClick={() => navigate("/sign-up")}>
            Sign in
          </CustomNavlink>
        </NavbarItem>
      </NavbarContent>
      <NavbarMenu className="gap-4">
        {menuItems.map((item, index) => (
          <NavbarMenuItem key={`${item.id}-${index}`}>
            <CustomLink
              color={isActiveLink(item.url) ? "primary" : "foreground"}
              onClick={() => navigate(item.url)}
              href={item.url}
              size="lg"
            >
              {item.name}
            </CustomLink>
          </NavbarMenuItem>
        ))}
      </NavbarMenu>
    </Navbar>
  );
}
