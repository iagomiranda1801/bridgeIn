// src/components/LoadingScreen.tsx

import React from 'react';
import { ImageBackground, StyleSheet, View } from 'react-native';

const LoadingScreen = () => {
  return (
    <ImageBackground
      source={require('../../assets/images/Loading.png')}
      style={styles.background}
      resizeMode="cover"
    >
      {/* Você pode colocar um indicador de loading real aqui se quiser */}
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
});

export default LoadingScreen;
