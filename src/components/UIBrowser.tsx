import { Column, Host, Icon, List, ListItem, Row, Text, TextInput } from "@expo/ui";
import { type Href, Link } from "expo-router";
import { type ComponentType, useMemo, useState } from "react";
import { Platform, StyleSheet, useColorScheme } from "react-native";
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
      <Host style={styles.host}>
        <List>
          <Column spacing={6} style={styles.header}>
            <Text textStyle={{ color: colors.text, fontSize: 26, fontWeight: "700" }}>{title}</Text>
            <Text textStyle={{ color: colors.secondaryText, fontSize: 13 }}>
              {`${screens.length} examples · Universal works across platforms`}
            </Text>
            {showSearch && (
              <TextInput
                autoCapitalize="none"
                autoCorrect={false}
                onChangeText={setQuery}
                placeholder="Search components"
                selectionColor={colors.text}
                textStyle={{ color: colors.text, fontSize: 16 }}
                style={{
                  padding: 8,
                  borderRadius: 8,
                  backgroundColor: colors.searchBackground,
                  borderWidth: 1,
                  borderColor: colors.searchBorder,
                }}
              />
            )}
          </Column>
          {visibleScreens.length > 0 ? (
            visibleScreens.map((screen) => <ScreenListItem key={screen.route} screen={screen} />)
          ) : (
            <ListItem>
              <Text textStyle={{ color: colors.secondaryText }}>No components found.</Text>
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
            <Text textStyle={{ color: "#1769AA", fontSize: 12, fontWeight: "600" }}>Universal</Text>
          )}
          <Icon name={CHEVRON} size={14} color="gray" />
        </Row>
      }
    >
      <Text numberOfLines={1} textStyle={screen.disabled ? { color: "#9CA3AF" } : undefined}>
        {screen.name}
      </Text>
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
  searchBorder: "#D1D5DB",
};
const darkColors = {
  background: "#111214",
  text: "#F9FAFB",
  secondaryText: "#9CA3AF",
  searchBackground: "#25282D",
  searchBorder: "#4B5563",
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  host: { flex: 1 },
  header: { paddingHorizontal: 4, paddingVertical: 8 },
});
