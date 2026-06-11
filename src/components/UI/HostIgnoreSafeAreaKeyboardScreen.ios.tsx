import { Host, Text } from "@expo/ui/swift-ui";
import { View } from "react-native";

function HostIgnoreSafeAreaKeyboardScreen() {
  return (
    <View style={{ flex: 1, backgroundColor: "black" }}>
      <Host matchContents ignoreSafeArea="keyboard" style={{ backgroundColor: "red" }}>
        <Text>This is a test</Text>
      </Host>
    </View>
  );
}

export default function HostIgnoreSafeAreaKeyboardScreenWrapper() {
  return <HostIgnoreSafeAreaKeyboardScreen />;
}
