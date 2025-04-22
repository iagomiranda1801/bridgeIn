// src/screens/LoginScreen.tsx

import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, SafeAreaView, ScrollView, Dimensions } from 'react-native';
import api from '../config/index';
import Toast from 'react-native-toast-message';
import { login } from '../services/auth';
import { RFValue } from 'react-native-responsive-fontsize';
import { TextInput } from 'react-native-paper';
import InputLabel from '../components/InputLabel';

const { width, height } = Dimensions.get('window');
const ForgetPassowrd: React.FC = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [loading, setLoading] = useState(false);
  const handleLogin = async () => {
    setLoading(true)

    if (!email) {
      Toast.show({
        type: 'error',
        text1: 'Campos obrigatórios',
        text2: 'Preencha todos os campos para continuar.',
        position: 'top',
      });
      setLoading(false)
      return;
    }
    console.log("email", email)
    const payload = {
      email: email
    };
    console.log("payload", payload)
    try {
      const response = await api.post('/mobile/register', payload);
      console.log("response", response.data)
      const data = response.data;

      if (data.status === 1) {
        Toast.show({
          type: 'success',
          text1: 'Login Realizado com sucesso!',
          text2: 'Seja bem-vindo ao Last Click!',
        });
        login(data.token);
        setTimeout(() => {
          navigation.navigate('Dashboard');
        }, 1500);
      } else {
        Toast.show({
          type: 'error',
          text1: 'Erro ao ao fazer login',
          text2: data.mensagem,
        });
      }
    } catch (error) {
      console.error('Erro ao logar:', error);
      Toast.show({
        type: 'error',
        text1: 'Erro ao cadastrar',
        text2: 'Contate o suporte',
      });
    } finally {
      setLoading(false)
    }
  }



  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer} keyboardShouldPersistTaps="handled">
        <Image source={require('../../assets/images/login.png')} style={styles.logo} resizeMode="contain" />

        <InputLabel
          label="Email"
          value={email}
          placeholderText="Type your email here"
          onChangeText={setEmail}
          secureTextEntry={true} />
          
        <TouchableOpacity style={styles.loginButton}>
          <Text style={styles.loginText}>Send</Text>
        </TouchableOpacity>


      </ScrollView>
    </SafeAreaView>
  );
}

export default ForgetPassowrd;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#021E40',
  },
  forgotButton: {
    marginLeft: 'auto',
    marginTop: -15,
  },
  scrollContainer: {
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    width: width * 0.8,
    height: height * 0.25,
    marginBottom: 30,
  },
  input: {
    width: '100%',
    // paddingVertical: Platform.OS === 'ios' ? 14 : 10,
    // paddingHorizontal: 15,
    fontSize: RFValue(14),
    marginBottom: 15,
  },
  forgotText: {
    color: '#00BFFF',
    fontSize: RFValue(13),
    alignSelf: 'flex-end',
    marginBottom: 25,
  },
  loginButton: {
    width: '100%',
    backgroundColor: '#1DBFFF',
    borderRadius: 12,
    paddingVertical: 15,
    alignItems: 'center',
    marginBottom: 20,
  },
  loginText: {
    color: '#fff',
    fontSize: RFValue(16),
    fontWeight: 'bold',
  },
  socialContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 30,
  },
  socialButton: {
    backgroundColor: '#fff',
    width: '48%',
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
  },
  socialText: {
    color: '#1877F2',
    fontSize: RFValue(14),
    fontWeight: '600',
  },
  socialTextGoogle: {
    color: '#4285F4',
    fontSize: RFValue(14),
    fontWeight: '600',
  },
  signUpText: {
    color: '#fff',
    fontSize: RFValue(13),
    marginBottom: 12,
  },
  registerButton: {
    borderWidth: 2,
    borderColor: '#1DBFFF',
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 30,
  },
  registerText: {
    color: '#1DBFFF',
    fontSize: RFValue(15),
    fontWeight: 'bold',
  },
});

