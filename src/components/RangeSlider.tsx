import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Slider } from '@miblanchard/react-native-slider';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';

interface RangeSliderProps {
  /**
   * Title displayed above the slider
   */
  title?: string;
  /**
   * Minimum possible value
   */
  min: number;
  /**
   * Maximum possible value
   */
  max: number;
  /**
   * Step between values
   */
  step?: number;
  /**
   * Initial values for the slider [min, max]
   */
  initialValues: [number, number];
  /**
   * Format function for the displayed values
   */
  formatValue?: (value: number) => string;
  /**
   * Callback when values change
   */
  onValuesChange?: (values: [number, number]) => void;
  /**
   * Container style
   */
  containerStyle?: object;
}

const RangeSlider: React.FC<RangeSliderProps> = ({
  title = 'Salary range/hour',
  min,
  max,
  step = 1,
  initialValues,
  formatValue = (value) => `$${value}`,
  onValuesChange,
  containerStyle,
}) => {
  const [values, setValues] = useState<[number, number]>(initialValues);

  const handleValueChange = (newValues: number | number[]) => {
    // Ensure we're working with an array
    const valueArray = Array.isArray(newValues) ? newValues : [newValues, newValues];
    const typedValues: [number, number] = [valueArray[0], valueArray[1]];
    
    setValues(typedValues);
    
    if (onValuesChange) {
      onValuesChange(typedValues);
    }
  };

  return (
    <View style={[styles.container, containerStyle]}>
      {title && (
        <Text style={styles.title}>
          {title} <Text style={styles.triangle}>▲</Text>
        </Text>
      )}
      
      <View style={styles.sliderContainer}>
        <Text style={styles.valueLabel}>{formatValue(values[0])}</Text>
        
        <View style={styles.sliderWrapper}>
          <Slider
            animateTransitions
            minimumValue={min}
            maximumValue={max}
            step={step}
            value={values}
            onValueChange={handleValueChange}
            containerStyle={styles.slider}
            trackStyle={styles.track}
            minimumTrackStyle={styles.selectedTrack}
            thumbStyle={styles.thumb}
            thumbTintColor="#0F172A"
          />
        </View>
        
        <Text style={styles.valueLabel}>{formatValue(values[1])}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    paddingHorizontal: wp('4%'),
    paddingVertical: wp('3%'),
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#0F172A',
  },
  triangle: {
    fontSize: 14,
  },
  sliderContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
  },
  valueLabel: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#0F172A',
    minWidth: 50,
    textAlign: 'center',
  },
  sliderWrapper: {
    flex: 1,
    marginHorizontal: 10,
  },
  slider: {
    height: 40,
  },
  track: {
    height: 4,
    backgroundColor: '#E2E8F0',
    borderRadius: 2,
  },
  selectedTrack: {
    height: 4,
    backgroundColor: '#94A3B8',
    borderRadius: 2,
  },
  thumb: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: '#0F172A',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 2,
  },
});

export default RangeSlider;
