import { Host } from '@expo/ui';
import { Column, OutlinedTextField, Text, useNativeState } from '@expo/ui/jetpack-compose';
import { fillMaxWidth, padding } from '@expo/ui/jetpack-compose/modifiers';

export default function NativeStateDemoScreen() {
  const phone = useNativeState('');
  const selection = useNativeState({ start: 0, end: 0 });

  return (
    <Host style={{ flex: 1 }}>
      <Column verticalArrangement={{ spacedBy: 16 }} modifiers={[padding(20, 20, 20, 20)]}>
        <Text style={{ typography: 'headlineLarge' }}>Format a phone number</Text>
        <Text style={{ typography: 'bodyMedium' }}>Enter digits to insert hyphens as you type.</Text>
        <Column verticalArrangement={{ spacedBy: 8 }}>
          <Text style={{ typography: 'titleMedium' }}>Phone number</Text>
          <OutlinedTextField
            value={phone}
            selection={selection}
            singleLine
            maxLength={13}
            keyboardOptions={{ keyboardType: 'phone' }}
            modifiers={[fillMaxWidth()]}
            onValueChange={(input) => {
              'worklet';
              const digits = input.replace(/\D/g, '').slice(0, 11);
              const formatted = digits.replace(/(\d{3})(?=\d)/g, '$1-');
              if (formatted !== input) {
                phone.value = formatted;
                selection.value = { start: formatted.length, end: formatted.length };
              }
            }}
          />
          <Text style={{ typography: 'bodySmall' }}>Up to 11 digits.</Text>
        </Column>
        <Text style={{ typography: 'bodyMedium' }}>
          useNativeState shares the text and selection with native UI. A worklet formats the value
          synchronously on the UI runtime, without waiting for a React render.
        </Text>
      </Column>
    </Host>
  );
}
