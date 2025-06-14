import React, { useMemo } from 'react';
import { StyleSheet, StyleProp, ViewStyle, TextStyle } from 'react-native';
import { Button as PaperButton } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';

type ButtonVariant = 'primary' | 'secondary' | 'outlined' | 'text';
type ButtonSize = 'small' | 'medium' | 'large';

export interface ButtonProps {
  label: string;
  onPress: () => void;
  variant?: ButtonVariant;
  size?: ButtonSize;
  disabled?: boolean;
  loading?: boolean;
  icon?: keyof typeof MaterialCommunityIcons.glyphMap;
  style?: StyleProp<ViewStyle>;
  labelStyle?: StyleProp<TextStyle>;
  testID?: string;
}

const Button: React.FC<ButtonProps> = ({
  label,
  onPress,
  variant = 'primary',
  size = 'medium',
  disabled = false,
  loading = false,
  icon,
  style,
  labelStyle,
  testID,
}) => {
  const buttonMode = useMemo(() => {
    switch (variant) {
      case 'outlined':
        return 'outlined';
      case 'text':
        return 'text';
      default:
        return 'contained';
    }
  }, [variant]);

  const buttonStyle = useMemo(() => {
    const baseStyle: StyleProp<ViewStyle>[] = [styles.button];
    
    // Add size styles
    switch (size) {
      case 'small':
        baseStyle.push(styles.smallButton);
        break;
      case 'large':
        baseStyle.push(styles.largeButton);
        break;
      default:
        baseStyle.push(styles.mediumButton);
    }
    
    // Add variant specific styles
    switch (variant) {
      case 'primary':
        baseStyle.push(styles.primaryButton);
        break;
      case 'secondary':
        baseStyle.push(styles.secondaryButton);
        break;
      case 'outlined':
        baseStyle.push(styles.outlinedButton);
        break;
      case 'text':
        baseStyle.push(styles.textButton);
        break;
    }
    
    if (disabled) {
      baseStyle.push(styles.disabledButton);
    }
    
    if (style) {
      baseStyle.push(style);
    }
    
    return baseStyle;
  }, [variant, size, disabled, style]);

  const textStyle = useMemo(() => {
    const baseTextStyle: StyleProp<TextStyle>[] = [styles.label];
    
    switch (size) {
      case 'small':
        baseTextStyle.push(styles.smallLabel);
        break;
      case 'large':
        baseTextStyle.push(styles.largeLabel);
        break;
    }
    
    if (variant === 'outlined' || variant === 'text') {
      baseTextStyle.push(styles.outlinedLabel);
    }
    
    if (labelStyle) {
      baseTextStyle.push(labelStyle);
    }
    
    return baseTextStyle;
  }, [variant, size, labelStyle]);

  const iconComponent = useMemo(() => {
    if (icon) {
      return (props: { size: number; color: string }) => {
        const iconSize = props.size || (size === 'small' ? 16 : 20);
        const iconColor = props.color || (variant === 'outlined' || variant === 'text' ? '#007BFF' : '#FFFFFF');
        return <MaterialCommunityIcons name={icon} size={iconSize} color={iconColor} />;
      };
    }
    return undefined;
  }, [icon, size, variant]);

  return (
    <PaperButton
      mode={buttonMode}
      onPress={onPress}
      disabled={disabled}
      loading={loading}
      icon={iconComponent}
      style={buttonStyle}
      labelStyle={textStyle}
      contentStyle={styles.contentStyle}
      testID={testID}
    >
      {label}
    </PaperButton>
  );
};

const styles = StyleSheet.create({
  button: {
    borderRadius: 8,
  },
  smallButton: {
    height: 32,
    paddingHorizontal: 12,
  },
  mediumButton: {
    height: 40,
    paddingHorizontal: 16,
  },
  largeButton: {
    height: 48,
    paddingHorizontal: 24,
  },
  primaryButton: {
    backgroundColor: '#007BFF',
  },
  secondaryButton: {
    backgroundColor: '#6C757D',
  },
  outlinedButton: {
    borderWidth: 1,
    borderColor: '#007BFF',
  },
  textButton: {
    backgroundColor: 'transparent',
  },
  disabledButton: {
    opacity: 0.6,
  },
  contentStyle: {
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  label: {
    fontWeight: '600',
  },
  smallLabel: {
    fontSize: 12,
  },
  largeLabel: {
    fontSize: 16,
  },
  outlinedLabel: {
    color: '#007BFF',
  },
});

export default Button;
