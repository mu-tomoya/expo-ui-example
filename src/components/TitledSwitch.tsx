import React from "react";
import { StyleSheet, Switch, Text, View, TextStyle, ViewStyle } from "react-native";

type Props = {
  style?: ViewStyle;
  titleStyle?: TextStyle;
  title?: string;
  value: boolean;
  disabled?: boolean;
  testID?: string;
  setValue: (value: boolean) => void;
};

const TitleSwitch = ({ style, titleStyle, title, value, setValue, disabled, testID }: Props) => {
  const outputTitle = disabled ? `${title} (Disabled)` : title;
  return (
    <View style={[styles.container, style]}>
      <Text style={[styles.title, titleStyle]}>{outputTitle}</Text>
      <Switch
        testID={testID}
        disabled={disabled}
        value={value}
        onValueChange={(value) => setValue(value)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 12,
    justifyContent: "space-between",
  },
  title: {
    fontWeight: "bold",
    marginRight: 12,
  },
  text: {
    marginVertical: 15,
    maxWidth: "80%",
    marginHorizontal: 10,
  },
});

export default TitleSwitch;
