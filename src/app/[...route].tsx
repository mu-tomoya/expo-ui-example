import { Stack, useLocalSearchParams } from "expo-router";
import { StyleSheet, Text, useColorScheme, View } from "react-native";

import { screens } from "@/components/ui";

export default function ExampleScreen() {
  const { route: routeParam } = useLocalSearchParams<{ route: string | string[] }>();
  const route = Array.isArray(routeParam) ? routeParam.join("/") : routeParam;
  const screen = screens.find((candidate) => candidate.route === route);
  const Component = screen && !screen.disabled ? screen.getComponent() : null;
  const dark = useColorScheme() === "dark";

  return (
    <View style={[styles.container, { backgroundColor: dark ? "#111214" : "#FFFFFF" }]}>
      <Stack.Screen
        options={{
          headerBackTitle: "Back",
          headerShown: true,
          title: screen?.name ?? "Example unavailable",
        }}
      />
      {Component ? (
        <Component />
      ) : (
        <View style={styles.unavailableContainer}>
          <Text style={[styles.unavailableText, { color: dark ? "#9CA3AF" : "#6B7280" }]}>
            This example is unavailable on the current platform.
          </Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  unavailableContainer: { alignItems: "center", flex: 1, justifyContent: "center", padding: 24 },
  unavailableText: { fontSize: 16, textAlign: "center" },
});
