import { forwardRef } from "react";
import { useLink } from "@nextui-org/react";

const CustomLink = forwardRef((props, ref) => {
  const { domRef, getLinkProps, children, showAnchorIcon, anchorIcon } = useLink({
    ref,
    ...props
  });

  console.log(
    "hola",
    useLink({
      ref,
      ...props
    })
  );

  return (
    <a id={props?.id} aria-label={children} ref={domRef} {...getLinkProps()} href="#">
      {children}
      {showAnchorIcon && <span>{anchorIcon}</span>}
    </a>
  );
});

CustomLink.displayName = "CustomLink";

export default CustomLink;
