import React, { Suspense } from "react";
import LoadingSpinner from "@/components/ui/loadingSpinner";

function LazyLoad(importFunction) {
  const LoadedComp = React.lazy(importFunction);

  return (props) => (
    <Suspense fallback={<LoadingSpinner />}>
      <LoadedComp {...props} />
    </Suspense>
  );
}

LazyLoad.displayName = "LazyLoad";

export { LazyLoad };
