import { StyleSheet, Text, View } from "react-native";

export default function ExtendingExpoUIScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Optional native module example</Text>
      <Text style={styles.body}>
        This demo requires the local test-expo-ui native module, which is not included in this app.
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", padding: 24 },
  title: { fontSize: 20, fontWeight: "600", marginBottom: 8 },
  body: { color: "#6B7280", fontSize: 16, lineHeight: 23 },
});
