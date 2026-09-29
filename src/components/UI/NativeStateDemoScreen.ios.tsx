import { Host } from "@expo/ui";
import {
  Section,
  Text,
  TextField,
  type TextFieldSelection,
  VStack,
  useNativeState,
} from "@expo/ui/swift-ui";
import { font, foregroundStyle, keyboardType, padding } from "@expo/ui/swift-ui/modifiers";

export default function NativeStateDemoScreen() {
  const phone = useNativeState("");
  const selection = useNativeState<TextFieldSelection>({ start: 0, end: 0 });

  return (
    <Host style={{ flex: 1 }}>
      <VStack spacing={16} modifiers={[padding({ all: 20 })]}>
        <Text modifiers={[font({ size: 28, weight: "bold" })]}>Format a phone number</Text>
        <Text modifiers={[foregroundStyle({ type: "hierarchical", style: "secondary" })]}>
          Enter digits to insert hyphens as you type.
        </Text>
        <Section title="Phone number">
          <TextField
            text={phone}
            selection={selection}
            placeholder="555-123-4567"
            modifiers={[keyboardType("phone-pad")]}
            onTextChange={(input) => {
              "worklet";
              const digits = input.replace(/\D/g, "").slice(0, 11);
              const formatted = digits.replace(/(\d{3})(?=\d)/g, "$1-");
              if (formatted !== input) {
                phone.value = formatted;
                selection.value = { start: formatted.length, end: formatted.length };
              }
            }}
          />
        </Section>
      </VStack>
    </Host>
  );
}
