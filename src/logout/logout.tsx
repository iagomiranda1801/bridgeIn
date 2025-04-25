import React, { useEffect } from 'react';
import { View, ActivityIndicator } from 'react-native';
import { logout } from '../services/auth';
const LogoutScreen = ({ navigation }) => {
  useEffect(() => {
    const doLogout = async () => {
      // 🧹 Aqui você limpa qualquer dado de autenticação se precisar
      // ex: await AsyncStorage.removeItem('token');
      logout();
      console.log('Logout realizado!');

      // Redireciona para Dashboard e limpa o histórico de navegação
      navigation.navigate('Login');
    };

    doLogout();
  }, []);

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'black' }}>
      <ActivityIndicator size="large" color="#B7FF00" />
    </View>
  );
};

export default LogoutScreen;
