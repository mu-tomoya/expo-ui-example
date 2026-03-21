import React from "react";
import { FlatList, Pressable, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

type ScreenItem = {
  name: string;
  component: React.ComponentType;
};

export const screens: ScreenItem[] = [
  { name: "Button", component: require("@/components/UI/ButtonScreen").default },
  { name: "Picker", component: require("@/components/UI/PickerScreen").default },
  { name: "DatePicker", component: require("@/components/UI/DatePickerScreen").default },
  { name: "Toggle", component: require("@/components/UI/ToggleScreen").default },
  { name: "Form", component: require("@/components/UI/FormScreen").default },
  { name: "ShareLink", component: require("@/components/UI/ShareLinkScreen").default },
  { name: "Slider", component: require("@/components/UI/SliderScreen").default },
  { name: "Stepper", component: require("@/components/UI/StepperScreen").default },
  { name: "Menu", component: require("@/components/UI/MenuScreen").default },
  {
    name: "ConfirmationDialog",
    component: require("@/components/UI/ConfirmationDialogScreen").default,
  },
  { name: "ContextMenu", component: require("@/components/UI/ContextMenuScreen").default },
  { name: "ColorPicker", component: require("@/components/UI/ColorPickerScreen").default },
  { name: "TextInput", component: require("@/components/UI/TextInputScreen").default },
  { name: "ProgressView", component: require("@/components/UI/ProgressViewScreen").default },
  { name: "List", component: require("@/components/UI/ListScreen").default },
  { name: "Section", component: require("@/components/UI/SectionScreen").default },
  { name: "BottomSheet", component: require("@/components/UI/BottomSheetScreen").default },
  { name: "Gauge", component: require("@/components/UI/GaugeScreen").default },
  { name: "Chart", component: require("@/components/UI/ChartScreen").default },
  { name: "HostingRNViews", component: require("@/components/UI/HostingRNViewsScreen").default },
  { name: "Modifiers", component: require("@/components/UI/ModifiersScreen").default },
  {
    name: "AnimationModifier",
    component: require("@/components/UI/AnimationModifierScreen").default,
  },
  {
    name: "ContentTransition",
    component: require("@/components/UI/ContentTransitionScreen").default,
  },
  { name: "GlassEffect", component: require("@/components/UI/GlassEffectScreen").default },
  {
    name: "MatchedGeometryEffect",
    component: require("@/components/UI/MatchedGeometryEffectScreen").default,
  },
  { name: "ScrollView", component: require("@/components/UI/ScrollViewScreen").default },
  { name: "Shapes", component: require("@/components/UI/ShapesScreen").default },
  { name: "Image", component: require("@/components/UI/ImageScreen").default },
  { name: "Text", component: require("@/components/UI/TextScreen").default },
  { name: "Link", component: require("@/components/UI/LinkScreen").default },
  { name: "Popover", component: require("@/components/UI/PopoverScreen").default },
  { name: "RTL", component: require("@/components/UI/RTLScreen").default },
  { name: "Grid", component: require("@/components/UI/GridScreen").default },
  {
    name: "HostIgnoreSafeAreaKeyboard",
    component: require("@/components/UI/HostIgnoreSafeAreaKeyboardScreen").default,
  },
  {
    name: "Rotation3DEffect",
    component: require("@/components/UI/Rotation3DEffectScreen").default,
  },
  { name: "Carousel", component: require("@/components/UI/CarouselScreen").default },
  { name: "AlertDialog", component: require("@/components/UI/AlertDialogScreen").default },
];

export function UIScreen() {
  const [selectedScreen, setSelectedScreen] = React.useState<ScreenItem | null>(null);

  if (selectedScreen) {
    const Component = selectedScreen.component;
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <Pressable onPress={() => setSelectedScreen(null)} style={styles.backButton}>
            <Text style={styles.backText}>Back</Text>
          </Pressable>
          <Text style={styles.headerTitle}>{selectedScreen.name}</Text>
          <View style={styles.backButton} />
        </View>
        <View style={styles.content}>
          <Component />
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Expo UI Components (iOS)</Text>
      <FlatList
        data={screens}
        keyExtractor={(item) => item.name}
        renderItem={({ item }) => (
          <Pressable
            style={({ pressed }) => [styles.item, pressed && styles.itemPressed]}
            onPress={() => setSelectedScreen(item)}
          >
            <Text style={styles.itemText}>{item.name}</Text>
            <Text style={styles.chevron}>›</Text>
          </Pressable>
        )}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    padding: 16,
    textAlign: "center",
  },
  item: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
    backgroundColor: "#fff",
  },
  itemPressed: {
    backgroundColor: "#f0f0f0",
  },
  itemText: {
    fontSize: 16,
  },
  chevron: {
    fontSize: 20,
    color: "#999",
  },
  separator: {
    height: 1,
    backgroundColor: "#eee",
    marginLeft: 16,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 8,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  backButton: {
    width: 60,
    padding: 8,
  },
  backText: {
    color: "#007AFF",
    fontSize: 16,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "600",
    flex: 1,
    textAlign: "center",
  },
  content: {
    flex: 1,
  },
});
