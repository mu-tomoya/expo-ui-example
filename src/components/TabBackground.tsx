import { useColorScheme, View } from "react-native";

import { Colors } from "@/constants/theme";

export function TabBackground() {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme === "dark" ? "dark" : "light"];
  return <View style={{ flex: 1, backgroundColor: colors.background }} />;
}
