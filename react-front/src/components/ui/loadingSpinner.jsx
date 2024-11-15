import React from "react";
import { Spinner } from "@nextui-org/react";

const loadingStyles = {
  wrapStyle: {
    width: "100%",
    height: "100vh",
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center"
  },
  svg: {
    width: "2.5rem",
    height: "2.5rem",
    color: "rgb(209 213 219 / 1)"
  }
};
function LoadingSpinner() {
  return (
    <div style={loadingStyles.wrapStyle}>
      <div>
        <Spinner size="lg" color="default" />
      </div>
    </div>
  );
}

export default LoadingSpinner;
