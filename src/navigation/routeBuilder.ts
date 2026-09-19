import type { ComponentType } from "react";

type ComponentModule = ComponentType | { default?: ComponentType };

/** Load an optional example without crashing the component catalogue. */
export function optionalRequire(loader: () => ComponentModule): ComponentType | null {
  try {
    const module = loader();
    return typeof module === "function" ? module : (module.default ?? null);
  } catch (error) {
    console.warn("Unable to load example screen", error);
    return null;
  }
}
