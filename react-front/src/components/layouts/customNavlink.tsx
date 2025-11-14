import type { ReactNode } from "react";
import { forwardRef } from "react";
import { NavLinkUI } from "simplekit-react";
import { Link as RouterLink } from "react-router-dom";

type NavVariant = "primary" | "secondary" | "tertiary" | "modern";

type CustomNavlinkProps = {
  to: string;
  id?: string;
  variant?: NavVariant;
  isActive?: boolean;
  className?: string;
  viewTransition?: boolean;
  children: ReactNode;
  onClick?: () => void;
};

const CustomNavlink = forwardRef<HTMLAnchorElement, CustomNavlinkProps>(({ className, isActive, children, ...props }, ref) => {
  const composedClassName = ["nav-link", className, isActive ? "is-active" : ""].filter(Boolean).join(" ");

  return (
    <NavLinkUI ref={ref} className={composedClassName} as={RouterLink} isActive={isActive} {...props}>
      {children}
    </NavLinkUI>
  );
});

CustomNavlink.displayName = "CustomNavlink";

export default CustomNavlink;
