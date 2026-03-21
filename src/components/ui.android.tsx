import React from "react";
import { FlatList, Pressable, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

type ScreenItem = {
  name: string;
  component: React.ComponentType;
};

export const screens: ScreenItem[] = [
  {
    name: "AnimatedVisibility",
    component: require("@/components/UI/AnimatedVisibilityScreen").default,
  },
  { name: "AlertDialog", component: require("@/components/UI/AlertDialogScreen").default },
  {
    name: "BasicAlertDialog",
    component: require("@/components/UI/BasicAlertDialogScreen").default,
  },
  { name: "Card", component: require("@/components/UI/CardScreen").default },
  { name: "Button", component: require("@/components/UI/ButtonScreen").default },
  { name: "Checkbox", component: require("@/components/UI/CheckboxScreen").default },
  { name: "IconButton", component: require("@/components/UI/IconButtonScreen").default },
  { name: "RadioButton", component: require("@/components/UI/RadioButtonScreen").default },
  {
    name: "SegmentedControl",
    component: require("@/components/UI/SegmentedControlScreen").default,
  },
  { name: "DateTimePicker", component: require("@/components/UI/DateTimePickerScreen").default },
  { name: "Switch", component: require("@/components/UI/SwitchScreen").default },
  { name: "Shape", component: require("@/components/UI/ShapeScreen").default },
  { name: "Form", component: require("@/components/UI/FormScreen").default },
  { name: "Slider", component: require("@/components/UI/SliderScreen").default },
  { name: "DropdownMenu", component: require("@/components/UI/DropdownMenuScreen").default },
  { name: "ColorPicker", component: require("@/components/UI/ColorPickerScreen").default },
  { name: "TextInput", component: require("@/components/UI/TextInputScreen").default },
  { name: "Progress", component: require("@/components/UI/ProgressScreen").default },
  { name: "List", component: require("@/components/UI/ListScreen").default },
  { name: "BottomSheet", component: require("@/components/UI/BottomSheetScreen").default },
  { name: "Chip", component: require("@/components/UI/ChipScreen").default },
  { name: "Carousel", component: require("@/components/UI/CarouselScreen").default },
  {
    name: "JetpackComposePrimitives",
    component: require("@/components/UI/JetpackComposePrimitivesScreen").default,
  },
  { name: "HostingRNViews", component: require("@/components/UI/HostingRNViewsScreen").default },
  { name: "ToggleButton", component: require("@/components/UI/ToggleButtonScreen").default },
  {
    name: "FloatingActionButton",
    component: require("@/components/UI/FloatingActionButtonScreen").default,
  },
  { name: "GraphicsLayer", component: require("@/components/UI/GraphicsLayerScreen").default },
  {
    name: "HorizontalFloatingToolbar",
    component: require("@/components/UI/HorizontalFloatingToolbarScreen").default,
  },
  { name: "Modifiers", component: require("@/components/UI/ModifiersScreen").default },
  { name: "Gauge", component: require("@/components/UI/GaugeScreen").default },
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
      <Text style={styles.title}>Expo UI Components (Android)</Text>
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
