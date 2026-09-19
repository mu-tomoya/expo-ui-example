import type { ComponentProps } from "react";
import { Text } from "react-native";

export function BodyText({ style, ...props }: ComponentProps<typeof Text>) {
  return <Text {...props} style={[{ fontSize: 16 }, style]} />;
}
