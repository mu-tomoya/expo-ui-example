import type React from "react";

import UIBrowser, { type ExampleScreen } from "./UIBrowser";

export type ListElement = ExampleScreen;

type ComponentScreen = {
  name: string;
  route?: string;
  getComponent: () => React.ComponentType | null;
};

export function componentScreensToListElements(screens: ComponentScreen[]): ListElement[] {
  return screens.map(({ name, route, getComponent }) => ({ name, route, getComponent }));
}

export default function ComponentListScreen({ apis }: { apis: ListElement[]; sort?: boolean }) {
  return <UIBrowser screens={apis} />;
}
