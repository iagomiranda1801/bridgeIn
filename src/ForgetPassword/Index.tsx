// src/screens/LoginScreen.tsx

import React, { useState } from 'react';
import Toast from 'react-native-toast-message';
import { RFValue } from 'react-native-responsive-fontsize';
import { NavigationProp, ParamListBase } from "@react-navigation/native";
import { Text, TouchableOpacity, StyleSheet, Image, SafeAreaView, ScrollView, Dimensions, ActivityIndicator } from 'react-native';

import api from '../config/index';
import InputLabel from '../components/InputLabel';
import InputTopLabel from '../components/InputTopLabel';

const { width, height } = Dimensions.get('window');

type ForgetPasswordProps = {
  navigation: NavigationProp<ParamListBase>;
};

const ForgetPassword: React.FC<ForgetPasswordProps> = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);

  const handleRecoveryPassword = async () => {
    setLoading(true)

    if (!email) {
      Toast.show({
        type: 'error',
        text1: 'Required fields',
        text2: 'Fill in all the fields',
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
      const response = await api.post('/mobile/password/forget', payload);
      console.log("response", response.data)
      const data = response.data;

      if (data.Status === 1) {
        Toast.show({
          type: 'success',
          text1: 'Email send successfully',
          text2: data.Message,
        });
      } else {
        Toast.show({
          type: 'error',
          text1: 'Error in send email',
          text2: data.Message,
        });
      }
    } catch (error) {
      Toast.show({
        type: 'error',
        text1: 'Error in send email',
        text2: 'Contact your administrator',
      });
    } finally {
      setLoading(false)
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer} keyboardShouldPersistTaps="handled">
        <Image source={require('../../assets/images/login.png')} style={styles.logo} resizeMode="contain" />

        <Text style={styles.instructionText}>Type your email and we will help you to reset your password.</Text>

        <InputTopLabel
          label="Email"
          value={email}
          onChangeText={setEmail}
          placeholder="Type your email here"
          />

        <TouchableOpacity onPress={handleRecoveryPassword} style={styles.sendRecorevyButton}>
          {loading ? (
            <ActivityIndicator size="small" color="white" animating={true}/>
          ) : (
            <Text style={styles.recoveryText}>Send</Text>
          )}
        </TouchableOpacity>

      </ScrollView>
      
      <TouchableOpacity 
        onPress={() => navigation.navigate('Login')} 
        style={styles.registerButton}
      >
        <Text style={styles.registerText}>Return</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

export default ForgetPassword;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#021E40',
  },
  forgotButton: {
    marginTop: -15,
    marginLeft: 'auto',
  },
  scrollContainer: {
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    marginBottom: 30,
    width: width * 0.8,
    height: height * 0.25,
  },
  input: {
    width: '100%',
    marginBottom: 15,
    fontSize: RFValue(14),
  },
  forgotText: {
    marginBottom: 25,
    color: '#00BFFF',
    fontSize: RFValue(13),
    alignSelf: 'flex-end',
  },
  sendRecorevyButton: {
    marginTop: 40,
    width: '100%',
    borderRadius: 12,
    paddingVertical: 12,
    alignItems: 'center',
    backgroundColor: '#1DBFFF',
  },
  recoveryText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: RFValue(16),
  },
  socialContainer: {
    width: '100%',
    marginBottom: 30,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  socialButton: {
    width: '48%',
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  socialText: {
    fontWeight: '600',
    color: '#1877F2',
    fontSize: RFValue(14),
  },
  socialTextGoogle: {
    color: '#4285F4',
    fontWeight: '600',
    fontSize: RFValue(14),
  },
  instructionText: {
    color: '#fff',
    textAlign: 'center',
    marginBottom: 20,
    fontSize: RFValue(16),
    paddingHorizontal: 20,
  },
  signUpText: {
    color: '#fff',
    marginBottom: 12,
    fontSize: RFValue(13),
  },
  registerButton: {
    width: '90%',
    borderWidth: 2,
    borderRadius: 12,
    paddingVertical: 12,
    alignItems: 'center',
    borderColor: '#1DBFFF',
    position: 'absolute',
    bottom: 30,
    alignSelf: 'center',
  },
  registerText: {
    color: '#1DBFFF',
    fontWeight: 'bold',
    fontSize: RFValue(15),
  },
});

