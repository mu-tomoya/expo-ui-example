import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  BackHandler,
  FlatList,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  useColorScheme,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export type ExampleScreen = {
  name: string;
  route?: string;
  getComponent: () => React.ComponentType | null;
  universal?: boolean;
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
  const [selectedScreen, setSelectedScreen] = useState<ExampleScreen | null>(null);
  const listRef = useRef<FlatList<ExampleScreen>>(null);
  const scrollOffset = useRef(0);
  const shouldRestoreScroll = useRef(false);

  const returnToList = useCallback(() => {
    shouldRestoreScroll.current = true;
    setSelectedScreen(null);
  }, []);

  useEffect(() => {
    if (!selectedScreen) {
      return;
    }

    const subscription = BackHandler.addEventListener("hardwareBackPress", () => {
      returnToList();
      return true;
    });
    return () => subscription.remove();
  }, [returnToList, selectedScreen]);

  const restoreScrollPosition = () => {
    if (!shouldRestoreScroll.current) {
      return;
    }
    listRef.current?.scrollToOffset({ animated: false, offset: scrollOffset.current });
    shouldRestoreScroll.current = false;
  };

  const visibleScreens = useMemo(() => {
    const normalizedQuery = query.trim().toLocaleLowerCase();
    return [...screens]
      .filter((screen) => screen.name.toLocaleLowerCase().includes(normalizedQuery))
      .sort((a, b) => a.name.localeCompare(b.name));
  }, [query, screens]);

  if (selectedScreen) {
    const Component = selectedScreen.getComponent();
    return (
      <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
        <View style={[styles.header, { borderBottomColor: colors.separator }]}>
          <Pressable
            accessibilityRole="button"
            accessibilityLabel="Back to component list"
            hitSlop={8}
            onPress={returnToList}
            style={({ pressed }) => [styles.backButton, pressed && styles.pressed]}
          >
            <Text style={[styles.backText, { color: colors.tint }]}>‹ Back</Text>
          </Pressable>
          <View style={styles.headerTitleContainer}>
            <Text numberOfLines={1} style={[styles.headerTitle, { color: colors.text }]}>
              {selectedScreen.name}
            </Text>
            {selectedScreen.universal && <UniversalBadge />}
          </View>
          <View style={styles.backButton} />
        </View>
        <View style={styles.content}>
          {Component ? (
            <Component />
          ) : (
            <View style={styles.unavailableContainer}>
              <Text style={[styles.unavailableText, { color: colors.secondaryText }]}>
                This example is unavailable on the current platform.
              </Text>
            </View>
          )}
        </View>
      </SafeAreaView>
    );
  }

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
      <FlatList
        ref={listRef}
        contentContainerStyle={styles.listContent}
        data={visibleScreens}
        keyboardDismissMode="on-drag"
        keyboardShouldPersistTaps="handled"
        onContentSizeChange={restoreScrollPosition}
        onScroll={(event) => {
          scrollOffset.current = event.nativeEvent.contentOffset.y;
        }}
        scrollEventThrottle={16}
        keyExtractor={(item) =>
          `${item.universal ? "universal" : "native"}:${item.route ?? item.name}`
        }
        renderItem={({ item }) => (
          <Pressable
            accessibilityRole="button"
            onPress={() => setSelectedScreen(item)}
            style={({ pressed }) => [
              styles.item,
              { backgroundColor: colors.background },
              pressed && { backgroundColor: colors.pressedBackground },
            ]}
          >
            <View style={styles.itemLabel}>
              <Text style={[styles.itemText, { color: colors.text }]}>{item.name}</Text>
              {item.universal && <UniversalBadge />}
            </View>
            <Text style={[styles.chevron, { color: colors.secondaryText }]}>›</Text>
          </Pressable>
        )}
        ItemSeparatorComponent={() => (
          <View style={[styles.separator, { backgroundColor: colors.separator }]} />
        )}
        ListEmptyComponent={
          <Text style={[styles.emptyText, { color: colors.secondaryText }]}>
            No components found.
          </Text>
        }
      />
    </SafeAreaView>
  );
}

function UniversalBadge() {
  return (
    <View style={styles.badge}>
      <Text style={styles.badgeText}>Universal</Text>
    </View>
  );
}

const lightColors = {
  background: "#FFFFFF",
  text: "#151515",
  secondaryText: "#6B7280",
  tint: "#007AFF",
  separator: "#E5E7EB",
  searchBackground: "#F1F3F5",
  pressedBackground: "#F3F4F6",
};
const darkColors = {
  background: "#111214",
  text: "#F9FAFB",
  secondaryText: "#9CA3AF",
  tint: "#5AC8FA",
  separator: "#2D3035",
  searchBackground: "#25282D",
  pressedBackground: "#202329",
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
  listContent: { paddingBottom: 24 },
  item: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    minHeight: 52,
    paddingHorizontal: 20,
    paddingVertical: 12,
  },
  itemLabel: { alignItems: "center", flex: 1, flexDirection: "row", gap: 8 },
  itemText: { flexShrink: 1, fontSize: 16 },
  badge: { backgroundColor: "#E8F2FF", borderRadius: 6, paddingHorizontal: 7, paddingVertical: 3 },
  badgeText: { color: "#1769AA", fontSize: 11, fontWeight: "700" },
  chevron: { fontSize: 22, marginLeft: 12 },
  separator: { height: StyleSheet.hairlineWidth, marginLeft: 20 },
  emptyText: { padding: 32, textAlign: "center" },
  header: {
    alignItems: "center",
    borderBottomWidth: StyleSheet.hairlineWidth,
    flexDirection: "row",
    minHeight: 52,
    paddingHorizontal: 8,
  },
  backButton: { minWidth: 72, padding: 8 },
  backText: { fontSize: 16 },
  headerTitleContainer: {
    alignItems: "center",
    flex: 1,
    flexDirection: "row",
    gap: 7,
    justifyContent: "center",
  },
  headerTitle: { flexShrink: 1, fontSize: 17, fontWeight: "600" },
  pressed: { opacity: 0.55 },
  content: { flex: 1 },
  unavailableContainer: { alignItems: "center", flex: 1, justifyContent: "center", padding: 24 },
  unavailableText: { fontSize: 16, textAlign: "center" },
});
