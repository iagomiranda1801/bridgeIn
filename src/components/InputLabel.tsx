import React, { useState, useEffect } from 'react';
import {
  View,
  TextInput,
  Animated,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import { Ionicons, FontAwesome5 } from '@expo/vector-icons';
import { TextInputMask } from 'react-native-masked-text';
import { Text } from 'react-native';

  const FloatingLabelInput = ({
    label,
    hasError = false,
    value,
    onChangeText,
    placeholderText,
    inputStyle = {},
    containerStyle = {},
    secureTextEntry = false,
    isMasked = false,
    maskType = '', // Ex: 'datetime'
    typeKeyboard = 'text',
    maskOptions = {}, // Ex: { format: 'DD/MM/YYYY' }
    ...rest
  }) => {
    const [isFocused, setIsFocused] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const animatedIsFocused = new Animated.Value(value ? 1 : 0);

    useEffect(() => {
      Animated.timing(animatedIsFocused, {
        toValue: isFocused || value ? 1 : 0,
        duration: 200,
        useNativeDriver: false,
      }).start();
    }, [isFocused, value]);

    const labelStyle = {
      position: 'absolute',
      left: 12,
      zIndex: 999,
      marginTop: -10,
      top: animatedIsFocused.interpolate({
        inputRange: [0, 1],
        outputRange: [18, 4],
      }),
      fontSize: animatedIsFocused.interpolate({
        inputRange: [0, 1],
        outputRange: [16, 12],
      }),
      color: '#FFFFFF',
    };

    const togglePasswordVisibility = () => {
      setShowPassword(!showPassword);
    };

    return (
      <View style={[styles.container, containerStyle]}>
        <Animated.Text style={labelStyle}>{label}</Animated.Text>
        <View style={[styles.inputWrapper, hasError && { borderColor: 'red' }]}>
          {isMasked ? (
            <TextInputMask
              type={maskType}
              options={maskOptions}
              value={value}
              onChangeText={onChangeText}
              placeholder={placeholderText}
              placeholderTextColor="#ffffff"
              style={[styles.input, inputStyle]}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
              keyboardType={typeKeyboard}
              {...rest}
            />
          ) : (
            <TextInput
              value={value}
              onChangeText={onChangeText}
              placeholder={placeholderText}
              placeholderTextColor="#ffffff"
              style={[styles.input, inputStyle, hasError && { borderColor: 'red' }]}
              secureTextEntry={secureTextEntry && !showPassword}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
              {...rest}
            />
          )}
          {secureTextEntry && (
            <TouchableOpacity style={styles.icon} onPress={togglePasswordVisibility}>
              <Ionicons
                name={showPassword ? 'eye-off' : 'eye'}
                size={22}
                color="#ffffff"
              />
            </TouchableOpacity>
          )}
        </View>
        {hasError && (
          <View style={{ marginTop: 5 }}>
          <Text style={{ color: 'red' }}>Digit this field</Text>
          </View>
        )}
      </View>
    );
  };


  const styles = StyleSheet.create({
    container: {
      paddingTop: 20,
      marginBottom: 25,
      width: '100%',
    },
    inputWrapper: {
      flexDirection: 'row',
      alignItems: 'center',
      borderBottomWidth: 1,
      borderBottomColor: '#FFFFFF',
      borderRadius: 8,
    },
    input: {
      flex: 1,
      height: 48,
      fontSize: RFValue(16),
      color: '#FFFFFF',
      paddingHorizontal: 10,
    },
    icon: {
      paddingHorizontal: 10,
    },
  });

  export default FloatingLabelInput;
