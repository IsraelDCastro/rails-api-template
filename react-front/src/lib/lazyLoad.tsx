import type { ComponentType } from "react";
import React, { Suspense } from "react";
import LoadingSpinner from "@/components/ui/loadingSpinner";

type LazyImport<TProps> = () => Promise<{ default: ComponentType<TProps> }>;

function withSuspense<TProps>(LoadedComp: ComponentType<TProps>) {
  function SuspendedComponent(props: TProps) {
    return (
      <Suspense fallback={<LoadingSpinner />}>
        <LoadedComp {...props} />
      </Suspense>
    );
  }

  SuspendedComponent.displayName = `LazyLoaded(${LoadedComp.displayName ?? LoadedComp.name ?? "Component"})`;
  return SuspendedComponent;
}

export function LazyLoad<TProps = Record<string, never>>(importFunction: LazyImport<TProps>) {
  const LoadedComp = React.lazy(importFunction);
  return withSuspense(LoadedComp);
}
