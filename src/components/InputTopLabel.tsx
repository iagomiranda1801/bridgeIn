import React, { useState } from 'react';
import { View, StyleSheet, Platform } from 'react-native';
import { TextInput, Text } from 'react-native-paper';
import { RFValue } from 'react-native-responsive-fontsize';
import MaskInput from 'react-native-mask-input';

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
  mask?: (string | RegExp)[];
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
  mask,
}: InputTopLabelProps) => {
  const [passwordVisible, setPasswordVisible] = useState(false);
  return (
    <View style={styles.container}>
      <View style={styles.inputWrapper}>
        <TextInput
          value={value}
          error={error}
          mode="outlined"
          multiline={false}
          numberOfLines={1}
          disabled={disabled}
          style={styles.input}
          outlineColor="#FFFFFF"
          placeholder={placeholder}
          keyboardType={keyboardType}
          activeOutlineColor="#FFFFFF"
          autoCapitalize={autoCapitalize}
          contentStyle={styles.contentStyle}
          outlineStyle={styles.outlineStyle}
          label={<Text style={styles.label}>{label}</Text>}
          secureTextEntry={secureTextEntry && !passwordVisible}
          right={secureTextEntry ? (
            <TextInput.Icon
              icon={passwordVisible ? 'eye-off' : 'eye'}
              onPress={() => setPasswordVisible(!passwordVisible)}
              color="#B2BCC6"
            />
          ) : undefined}
          theme={{
            colors: {
              text: '#B2BCC6',
              placeholder: '#B2BCC6',
              onSurfaceVariant: '#B2BCC6',
            },
          }}
          render={props => (
            mask ? (
              <MaskInput
                {...props}
                mask={mask}
                value={value}
                style={[props.style, styles.contentStyle]}
                onChangeText={(masked, unmasked) => {
                  onChangeText(masked);
                }}
              />
            ) : (
              <View style={props.style}>
                <MaskInput
                  {...props}
                  value={value}
                  mask={undefined}
                  style={[props.style, styles.contentStyle]}
                  onChangeText={(text) => onChangeText(text)}
                />
              </View>
            )
          )}
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
