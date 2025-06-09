import React from 'react';
import { View, StyleSheet, Platform } from 'react-native';
import { TextInput, Text } from 'react-native-paper';
import { RFValue } from 'react-native-responsive-fontsize';

interface InputTopLabelProps {
  label: string;
  value: string;
  error?: boolean;
  disabled?: boolean;
  placeholder?: string;
  secureTextEntry?: boolean;
  onChangeText: (text: string) => void;
  autoCapitalize?: 'none' | 'sentences' | 'words' | 'characters';
  keyboardType?: 'default' | 'numeric' | 'email-address' | 'phone-pad';
}

const InputTopLabel = ({
  label,
  value,
  placeholder,
  onChangeText,
  error = false,
  disabled = false,
  secureTextEntry = false,
  autoCapitalize = 'none',
  keyboardType = 'default',
}: InputTopLabelProps) => {
  return (
    <View style={styles.container}>
      <View style={styles.inputWrapper}>
        <TextInput
          value={value}
          error={error}
          mode="outlined"
          disabled={disabled}
          style={styles.input}
          outlineColor="#FFFFFF"
          placeholder={placeholder}
          onChangeText={onChangeText}
          keyboardType={keyboardType}
          activeOutlineColor="#FFFFFF"
          autoCapitalize={autoCapitalize}
          secureTextEntry={secureTextEntry}
          outlineStyle={styles.outlineStyle}
          label={<Text style={styles.label}>{label}</Text>}
          contentStyle={styles.contentStyle}
          multiline={false}
          numberOfLines={1}
          theme={{
            colors: {
              onSurfaceVariant: '#B2BCC6',
              text: '#B2BCC6',
              placeholder: '#B2BCC6',
            },
          }}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    marginVertical: 8,
  },
  inputWrapper: {
    width: '100%',
  },
  label: {
    fontWeight: '700',
    color: '#13AEE9',
    paddingHorizontal: 4,
    fontSize: RFValue(18),
    backgroundColor: '#021E40',
  },
  input: {
    paddingHorizontal: 0,
    backgroundColor: 'transparent',
    minHeight: Platform.OS === 'ios' ? 56 : 60,
  },
  contentStyle: {
    color: '#B2BCC6',
    paddingHorizontal: 8,
    fontSize: RFValue(14),
    includeFontPadding: true,
    textAlignVertical: 'center',
    paddingVertical: Platform.OS === 'ios' ? 12 : 10,
    lineHeight: Platform.OS === 'android' ? RFValue(24) : undefined,
  },
  outlineStyle: {
    borderWidth: 2,
    borderRadius: 15,
  },
});

export default InputTopLabel;
