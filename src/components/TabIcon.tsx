import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import React from "react";
import { Platform, useColorScheme } from "react-native";

import { Colors } from "@/constants/theme";

type Props = {
  name: string;
  focused?: boolean;
  size?: number;
};

const TabIcon = ({ size = 27, name, focused }: Props) => {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme === "dark" ? "dark" : "light"];
  const color = focused ? "#3c87f7" : colors.textSecondary;
  const platformSize = Platform.select({
    ios: size,
    default: size - 2,
  });
  return <MaterialCommunityIcons name={name as any} size={platformSize} color={color} />;
};

export default TabIcon;
