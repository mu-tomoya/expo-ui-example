import { Host, Icon, List, ListItem, Row, Text as ExpoText } from "@expo/ui";
import { type Href, Link } from "expo-router";
import { type ComponentType, useMemo, useState } from "react";
import { Platform, StyleSheet, Text, TextInput, useColorScheme, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const CHEVRON = Icon.select({
  ios: "chevron.right",
  android: require("@expo/material-symbols/chevron_right.xml"),
});

export type ExampleScreen = {
  name: string;
  route: string;
  getComponent: () => ComponentType | null;
  universal?: boolean;
  disabled?: boolean;
};

type Props = {
  screens: ExampleScreen[];
  title?: string;
  showSearch?: boolean;
};

export default function UIBrowser({
  screens,
  title = `Expo UI Components (${Platform.OS})`,
  showSearch = true,
}: Props) {
  const dark = useColorScheme() === "dark";
  const colors = dark ? darkColors : lightColors;
  const [query, setQuery] = useState("");

  const visibleScreens = useMemo(() => {
    const normalizedQuery = query.trim().toLocaleLowerCase();
    return [...screens]
      .filter((screen) => screen.name.toLocaleLowerCase().includes(normalizedQuery))
      .sort((a, b) => a.name.localeCompare(b.name));
  }, [query, screens]);

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={styles.titleContainer}>
        <Text style={[styles.title, { color: colors.text }]}>{title}</Text>
        <Text style={[styles.subtitle, { color: colors.secondaryText }]}>
          {screens.length} examples · Universal works across platforms
        </Text>
      </View>
      {showSearch && (
        <TextInput
          accessibilityLabel="Search components"
          autoCapitalize="none"
          autoCorrect={false}
          clearButtonMode="while-editing"
          onChangeText={setQuery}
          placeholder="Search components"
          placeholderTextColor={colors.secondaryText}
          style={[styles.search, { backgroundColor: colors.searchBackground, color: colors.text }]}
          value={query}
        />
      )}
      <Host style={styles.listHost}>
        <List>
          {visibleScreens.length > 0 ? (
            visibleScreens.map((screen) => <ScreenListItem key={screen.route} screen={screen} />)
          ) : (
            <ListItem>
              <ExpoText textStyle={{ color: colors.secondaryText }}>No components found.</ExpoText>
            </ListItem>
          )}
        </List>
      </Host>
    </SafeAreaView>
  );
}

function ScreenListItem({ screen }: { screen: ExampleScreen }) {
  const row = (
    <ListItem
      trailing={
        <Row alignment="center" spacing={8}>
          {screen.universal && (
            <ExpoText textStyle={{ color: "#1769AA", fontSize: 12, fontWeight: "600" }}>
              Universal
            </ExpoText>
          )}
          <Icon name={CHEVRON} size={14} color="gray" />
        </Row>
      }
    >
      <ExpoText numberOfLines={1} textStyle={screen.disabled ? { color: "#9CA3AF" } : undefined}>
        {screen.name}
      </ExpoText>
    </ListItem>
  );

  if (screen.disabled) {
    return row;
  }

  return (
    <Link href={`/${screen.route}` as Href} asChild>
      {row}
    </Link>
  );
}

const lightColors = {
  background: "#FFFFFF",
  text: "#151515",
  secondaryText: "#6B7280",
  searchBackground: "#F1F3F5",
};
const darkColors = {
  background: "#111214",
  text: "#F9FAFB",
  secondaryText: "#9CA3AF",
  searchBackground: "#25282D",
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  titleContainer: { paddingHorizontal: 20, paddingBottom: 12, paddingTop: 12 },
  title: { fontSize: 26, fontWeight: "700" },
  subtitle: { fontSize: 13, marginTop: 4 },
  search: {
    borderRadius: 12,
    fontSize: 16,
    marginBottom: 8,
    marginHorizontal: 16,
    paddingHorizontal: 14,
    paddingVertical: Platform.OS === "ios" ? 10 : 8,
  },
  listHost: { flex: 1 },
});
