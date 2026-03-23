import { Host, Text } from "@expo/ui/swift-ui";
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";
import { View } from "react-native";

function HostIgnoreSafeAreaKeyboardScreen() {
  const bottomOffset = useBottomTabBarHeight();
  return (
    <View style={{ flex: 1, backgroundColor: "black" }}>

        <Host matchContents ignoreSafeArea="keyboard" style={{ backgroundColor: "red" }}>
          <Text>This is a test</Text>
        </Host>
    </View>
  );
}

export default function HostIgnoreSafeAreaKeyboardScreenWrapper() {
  return (
      <HostIgnoreSafeAreaKeyboardScreen />
  );
}
