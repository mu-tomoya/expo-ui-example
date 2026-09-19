import { Picker } from "@react-native-picker/picker";
import React from "react";
import { StyleSheet, Text, View, TextStyle, ViewStyle } from "react-native";

type Props = {
  style?: ViewStyle;
  titleStyle?: TextStyle;
  title?: string;
  value: string;
  items: { key: string; value: string }[];
  disabled?: boolean;
  setValue: (value: string) => void;
};

const TitledPicker = ({ style, titleStyle, title, value, setValue, items, disabled }: Props) => {
  const outputTitle = disabled ? `${title} (Disabled)` : title;
  return (
    <View style={[styles.container, style]}>
      <Text style={[styles.title, titleStyle]}>{outputTitle}</Text>
      <Picker
        selectedValue={value}
        enabled={!disabled}
        onValueChange={(value) => setValue(`${value}`)}
      >
        {items.map(({ key, value }) => (
          <Picker.Item label={value} value={key} key={key} />
        ))}
      </Picker>
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

export default TitledPicker;
