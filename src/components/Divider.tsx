import React from 'react';
import { View, StyleSheet } from 'react-native';

type DividerProps = {
  color?: string;
  thickness?: number;
  marginVertical?: number;
};

const Divider: React.FC<DividerProps> = ({ 
  color = '#E0E0E0', 
  thickness = 1, 
  marginVertical = 16 
}) => {
  return (
    <View 
      style={[
        styles.divider, 
        { 
          backgroundColor: color,
          height: thickness,
          marginVertical: marginVertical 
        }
      ]} 
    />
  );
};

const styles = StyleSheet.create({
  divider: {
    width: '100%',
  },
});

export default Divider;
