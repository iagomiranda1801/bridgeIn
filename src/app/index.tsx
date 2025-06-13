// App.js
import React, { useState, useEffect } from 'react';
import Toast, { BaseToast, BaseToastProps } from 'react-native-toast-message';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Login from '../login/Index';
import Register from '../register/Index';
import Drawer from '../navigation/drawer';
import LogoutScreen from '../logout/logout';
import ProfileScreen from '../profile/Index';
import LoadingScreen from '../loading/Index';
import ForgetPassword from '../ForgetPassword/Index';

const Stack = createNativeStackNavigator();

const toastConfig = {
  success: (props: BaseToastProps) => (
    <BaseToast
      {...props}
      style={{
        width: '90%',
        marginBottom: 60,
        borderRadius: 10,
        backgroundColor: '#f0fff0',
        borderLeftColor: '#4BB543',
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

  error: (props: BaseToastProps) => (
    <BaseToast
      {...props}
      style={{
        width: '100%',
        marginBottom: 60,
        borderRadius: 10,
        backgroundColor: '#fff0f0',
        borderLeftColor: '#D32F2F',
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
        <Stack.Screen name="Register" component={Register} />
        <Stack.Screen name="ForgetPassword" component={ForgetPassword} />
      </Stack.Navigator>
      <Toast config={toastConfig} topOffset={50} />
    </>

  );
}
