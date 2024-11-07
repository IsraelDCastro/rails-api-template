import { forwardRef } from "react";
import { useButton, Ripple, Spinner } from "@nextui-org/react";

const CustomNavlink = forwardRef((props, ref) => {
  const {
    domRef,
    spinnerSize,
    spinner = <Spinner color="current" size={spinnerSize} />,
    spinnerPlacement,
    startContent,
    endContent,
    isLoading,
    disableRipple,
    getButtonProps,
    getRippleProps,
    children,
    onClick,
    styles
  } = useButton({
    ref,
    ...props
  });

  const { ripples, onClear } = getRippleProps();
  return (
    <button onClick={onClick} id={props?.id} className={styles} aria-label={children} type="button" ref={domRef} {...getButtonProps()}>
      {startContent && <span className="start-content">{startContent}</span>}
      {isLoading && spinnerPlacement === "start" && spinner}
      {children}
      {isLoading && spinnerPlacement === "end" && spinner}
      {endContent && <span className="end-content">{endContent}</span>}
      {!disableRipple && <Ripple ripples={ripples} onClear={onClear} />}
    </button>
  );
});

CustomNavlink.displayName = "CustomNavlink";

export default CustomNavlink;
