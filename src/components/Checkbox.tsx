import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Checkbox as PaperCheckbox } from 'react-native-paper';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

type CheckboxProps = {
  status?: 'checked' | 'unchecked' | 'indeterminate';
  label?: string;
  disabled?: boolean;
  onPress?: (newStatus: boolean) => void;
  color?: string;
  uncheckedColor?: string;
  size?: number;
  testID?: string;
};

/**
 * Checkbox component based on React Native Paper
 */
const Checkbox: React.FC<CheckboxProps> = ({
  status: initialStatus = 'unchecked',
  label,
  disabled = false,
  onPress,
  color,
  uncheckedColor,
  size = 24,
  testID,
}) => {
  const [status, setStatus] = useState<'checked' | 'unchecked' | 'indeterminate'>(initialStatus);

  const handlePress = () => {
    const newStatus = status === 'checked' ? 'unchecked' : 'checked';
    setStatus(newStatus);
    
    if (onPress) {
      onPress(newStatus === 'checked');
    }
  };

  return (
    <TouchableOpacity
      onPress={handlePress}
      disabled={disabled}
      style={styles.container}
      testID={testID}
    >
      <PaperCheckbox
        status={status}
        disabled={disabled}
        color={color}
        uncheckedColor={uncheckedColor}
        testID={`${testID}-checkbox`}
      />
      {label && (
        <Text style={[
          styles.label,
          disabled && styles.disabledLabel
        ]}>
          {label}
        </Text>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: hp(0.5),
  },
  label: {
    marginLeft: wp(2),
    fontSize: wp(3.5),
  },
  disabledLabel: {
    opacity: 0.5,
  },
});

export default Checkbox;
