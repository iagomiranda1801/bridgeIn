// App.js
import React, { useState, useEffect } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Login from '../login/Index';
import SignUp from '../register/Index';
import ForgetPassowrd from '../ForgetPassword/Index';
import Toast from 'react-native-toast-message';
import Drawer from '../navigation/drawer';
import { BaseToast } from 'react-native-toast-message';
import LogoutScreen from '../logout/logout';
import ProfileScreen from '../profile/Index';
import Dashboard from '../dashboard';
import LoadingScreen from '../loading/Index';
const Stack = createNativeStackNavigator();





const toastConfig = {
  success: (props) => (
    <BaseToast
      {...props}
      style={{
        borderLeftColor: '#4BB543',
        borderRadius: 10,
        backgroundColor: '#f0fff0',
        marginBottom: 60,
        width: '90%'
      }}
      contentContainerStyle={{ paddingHorizontal: 15, width: '90%' }}
      text1Style={{
        fontSize: 18,
        fontWeight: '600',
        color: '#2e7d32',
      }}
      text2Style={{
        fontSize: 16,
        color: '#4caf50',
      }}
    />
  ),

  error: (props) => (
    <BaseToast
      {...props}
      style={{
        borderLeftColor: '#D32F2F',
        borderRadius: 10,
        backgroundColor: '#fff0f0',
        marginBottom: 60,
        width: '100%'
      }}
      contentContainerStyle={{ paddingHorizontal: 15 }}
      text1Style={{
        fontSize: 18,
        fontWeight: '600',
        color: '#b71c1c',
      }}
      text2Style={{
        fontSize: 16,
        color: '#f44336',
      }}
    />
  ),
};


export default function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simula o tempo de carregamento (ex: 2 segundos)
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);
  if (isLoading) return <LoadingScreen />;
  
  return (
    <>
      <Stack.Navigator initialRouteName="Login" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Profile" component={ProfileScreen} options={{ headerShown: true, title: 'Perfil' }} />
        <Stack.Screen name="Logout" component={LogoutScreen} />
        <Stack.Screen name="Dashboard" component={Drawer} />
        <Stack.Screen name="SignUp" component={SignUp} />
        <Stack.Screen name="ForgetPassowrd" component={ForgetPassowrd} />
      </Stack.Navigator>
      <Toast config={toastConfig} />
    </>

  );
}
