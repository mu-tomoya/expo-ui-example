import { UIScreens } from "@/components/UI/UIScreen";
import { UIUniversalScreens } from "@/components/UIUniversal/UIUniversalScreen";

import UIBrowser, { type ExampleScreen } from "./UIBrowser";

const universalScreens: ExampleScreen[] = UIUniversalScreens.map((screen) => ({
  ...screen,
  name: screen.name.replace(/^UI Universal /, ""),
  universal: true,
}));

export const screens: ExampleScreen[] = [...UIScreens, ...universalScreens];

export function UIScreen() {
  return <UIBrowser screens={screens} title="Expo UI Components" />;
}
