import type { CSSProperties } from "react";
import { Spinner } from "simplekit-react";

const wrapStyle: CSSProperties = {
  width: "100%",
  height: "100vh",
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center"
};

export default function LoadingSpinner() {
  return (
    <div style={wrapStyle}>
      <Spinner size="lg" color="default" />
    </div>
  );
}
