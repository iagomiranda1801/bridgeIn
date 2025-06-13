import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Slider } from '@miblanchard/react-native-slider';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';

interface SingleSliderProps {
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
   * Initial value for the slider
   */
  initialValue: number;
  /**
   * Format function for the displayed value
   */
  formatValue?: (value: number) => string;
  /**
   * Callback when value changes
   */
  onValueChange?: (value: number) => void;
  /**
   * Container style
   */
  containerStyle?: object;
  /**
   * Show value label
   */
  showValue?: boolean;
}

const SingleSlider: React.FC<SingleSliderProps> = ({
  title,
  min,
  max,
  step = 1,
  initialValue,
  formatValue = (value) => `${value}km`,
  onValueChange,
  containerStyle,
  showValue = true,
}) => {
  const [value, setValue] = useState<number>(initialValue);

  const handleValueChange = (newValue: number | number[]) => {
    // Ensure we're working with a single number
    const singleValue = Array.isArray(newValue) ? newValue[0] : newValue;
    
    setValue(singleValue);
    
    if (onValueChange) {
      onValueChange(singleValue);
    }
  };

  return (
    <View style={[styles.container, containerStyle]}>
      {title && (
        <Text style={styles.title}>
          {title}
        </Text>
      )}
      
      <View style={styles.sliderContainer}>
        {showValue && (
          <Text style={styles.valueLabel}>{formatValue(value)}</Text>
        )}
        
        <Slider
          animateTransitions
          minimumValue={min}
          maximumValue={max}
          step={step}
          value={value}
          onValueChange={handleValueChange}
          containerStyle={styles.slider}
          trackStyle={styles.track}
          minimumTrackStyle={styles.selectedTrack}
          thumbStyle={styles.thumb}
          thumbTintColor="#0F172A"
        />
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
  sliderContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
  valueLabel: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#0F172A',
    marginBottom: 8,
    textAlign: 'center',
  },
  slider: {
    width: '100%',
    height: 40,
  },
  track: {
    height: 4,
    backgroundColor: '#E2E8F0',
    borderRadius: 2,
  },
  selectedTrack: {
    height: 4,
    backgroundColor: '#38BDF8',
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

export default SingleSlider;
