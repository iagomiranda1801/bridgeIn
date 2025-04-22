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

const FloatingLabelInput = ({
  label,
  value,
  onChangeText,
  placeholderText,
  inputStyle = {},
  containerStyle = {},
  secureTextEntry = false,
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
      <View style={styles.inputWrapper}>
        <TextInput
          value={value}
          onChangeText={onChangeText}
          placeholder={placeholderText}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          secureTextEntry={secureTextEntry && !showPassword}
          placeholderTextColor="#ffffff"
          style={[styles.input, inputStyle]}
          {...rest}
        />
        {secureTextEntry && (
          <TouchableOpacity
            style={styles.icon}
            onPress={togglePasswordVisibility}
          >
            <Ionicons
              name={showPassword ? 'eye-off' : 'eye'}
              size={22}
              color="#ffffff"
            />
          </TouchableOpacity>
        )}
      </View>
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
