// src/screens/LoginScreen.tsx

import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, SafeAreaView, ScrollView, Dimensions, ActivityIndicator } from 'react-native';
import api from '../config/index';
import Toast from 'react-native-toast-message';
import { RFValue } from 'react-native-responsive-fontsize';
import InputLabel from '../components/InputLabel';
import LoadingScreen from '../loading/Index';

const { width, height } = Dimensions.get('window');
const Login: React.FC = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);
  const [registrationNumber, setRegistrationNumber] = useState('');
  const [address, setAddress] = useState('');
  const [neighborhood, setNeighborhood] = useState('');
  const [province, setProvince] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [gender, setGender] = useState('');
  const [birthDate, setBirthDate] = useState('');
  const [profession, setProfession] = useState('');
  const [experienceTime, setExperienceTime] = useState('');
  const [fieldErrors, setFieldErrors] = useState({
    email: false,
    password: false,
    name: false,
    registrationNumber: false,
    address: false,
    neighborhood: false,
    province: false,
    postalCode: false,
    gender: false,
    birthDate: false,
    profession: false,
    experienceTime: false
    // Adicione os demais campos conforme necessário
  });

  const handleRegister = async () => {
    setLoading(true)

    const newErrors = {
      email: !email,
      password: !password,
      name: !name,
      registrationNumber: !registrationNumber,
      address: !address,
      neighborhood: !neighborhood,  // Adicione os demais campos conforme necessário
      province: !province,
      postalCode: !postalCode,
      gender: !gender,
      birthDate: !birthDate,
      profession: !profession,
      experienceTime: !experienceTime
      // Verifica os outros campos também
    };

    setFieldErrors(newErrors);

    const hasErrors = Object.values(newErrors).some(Boolean);
    if (hasErrors) {
      Toast.show({
        type: 'error',
        text1: 'Inputs required',
        text2: 'Fill in all the fields',
        position: 'top',
      });
      setLoading(false);
      return;
    }

    console.log("email", email)
    const payload = {
      email,
      password,
      name,
      registration_number: registrationNumber,
      address,
      neighborhood,
      province,
      postal_code: postalCode,
      gender,
      birth_date: birthDate,
      profession,
      experience_time: experienceTime
    };
    console.log("payload", payload)
    try {
      const response = await api.post('/mobile/users/insert', payload);
      console.log("response", response.data)
      const data = response.data;

      if (data.Status === 1) {
        Toast.show({
          type: 'success',
          text1: 'Register save with success',
        });
        setTimeout(() => {
          navigation.navigate('Login');
        }, 1500);

      } else {
        Toast.show({
          type: 'error',
          text1: 'Erro in register',
          text2: data.Message,
        });
      }
    } catch (error) {
      console.error('Erro ao Registrar:', error);
      Toast.show({
        type: 'error',
        text1: 'Erro in register',
        text2: 'Contact your administrator',
      });
    } finally {
      setLoading(false)
    }
  }

  function createAPassword() {
    let total = 12
    const uppercase = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const lowercase = "abcdefghijklmnopqrstuvwxyz";
    const numbers = "0123456789";
    const symbols = "!@#$%^&*()-_=+[]{}|;:,.<>?";

    const allChars = uppercase + lowercase + numbers + symbols;
    let password = "";

    // Garante que pelo menos um de cada tipo esteja na senha
    password += uppercase[Math.floor(Math.random() * uppercase.length)];
    password += lowercase[Math.floor(Math.random() * lowercase.length)];
    password += numbers[Math.floor(Math.random() * numbers.length)];
    password += symbols[Math.floor(Math.random() * symbols.length)];

    // Preenche o resto da senha com caracteres aleatórios
    console.log("i", password.length)
    console.log("total", total)
    for (let i = password.length; i < total; i++) {
      console.log("i", i)
      password += allChars[Math.floor(Math.random() * allChars.length)];
    }

    console.log("password", password);

    // Embaralha os caracteres (pra não ficar previsível)
    password
      .split('')
      .sort(() => 0.5 - Math.random())
      .join('');

    setPassword(password);
  }


  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer} keyboardShouldPersistTaps="handled">
        {loading && <LoadingScreen />}
        <Image source={require('../../assets/images/login.png')} style={styles.logo} resizeMode="contain" />

        <InputLabel
          label="Registration Number"
          value={registrationNumber}
          onChangeText={(text) => {
            setRegistrationNumber(text);
            setFieldErrors(prev => ({ ...prev, registrationNumber: false })); // limpa erro ao digitar
          }}
          placeholderText="Enter your registration number"
          secureTextEntry={false}
          hasError={fieldErrors.registrationNumber}
        />

        <InputLabel
          label="Name"
          value={name}
          onChangeText={(text) => {
            setName(text);
            setFieldErrors(prev => ({ ...prev, name: false })); // limpa erro ao digitar
          }}
          placeholderText="Enter your name"
          secureTextEntry={false}
          hasError={fieldErrors.name}
        />

        <InputLabel
          label="Email"
          value={email}
          hasError={fieldErrors.email}
          onChangeText={(text) => {
            setEmail(text);
            setFieldErrors(prev => ({ ...prev, email: false })); // limpa erro ao digitar
          }}
          placeholderText="Enter your email"
          secureTextEntry={false}
        />

        <InputLabel
          label="Address"
          value={address}
          hasError={fieldErrors.address}
          onChangeText={(text) => {
            setAddress(text);
            setFieldErrors(prev => ({ ...prev, address: false })); // limpa erro ao digitar
          }}
          placeholderText="Enter your address"
          secureTextEntry={false}
        />

        <InputLabel
          label="Neighborhood"
          value={neighborhood}
          hasError={fieldErrors.neighborhood}
          onChangeText={(text) => {
            setNeighborhood(text);
            setFieldErrors(prev => ({ ...prev, neighborhood: false })); // limpa erro ao digitar
          }}
          placeholderText="Enter your neighborhood"
          secureTextEntry={false}
        />

        <InputLabel
          label="Province"
          value={province}
          hasError={fieldErrors.province}
          onChangeText={(text) => {
            setProvince(text);
            setFieldErrors(prev => ({ ...prev, province: false })); // limpa erro ao digitar
          }}
          placeholderText="Enter your province or state"
          secureTextEntry={false}
        />

        <InputLabel
          label="Postal Code"
          value={postalCode}
          hasError={fieldErrors.postalCode}
          onChangeText={(text) => {
            setPostalCode(text);
            setFieldErrors(prev => ({ ...prev, postalCode: false })); // limpa erro ao digitar
          }}
          placeholderText="Enter your postal code (A1B-2A1)"
          secureTextEntry={false}
          isMasked={true}
          typeKeyboard="text"
          maskType="custom"
          maskOptions={{ mask: 'A9A 9A9' }}
        />


        <InputLabel
          label="Birth Date"
          value={birthDate}
          hasError={fieldErrors.birthDate}
          onChangeText={(text) => {
            setBirthDate(text);
            setFieldErrors(prev => ({ ...prev, birthDate: false })); // limpa erro ao digitar
          }}
          placeholderText="Enter your birth date"
          secureTextEntry={false}
          maskType="datetime"
          isMasked={true}
          maskOptions={{ format: 'YYYY-MM-DD' }}
        />

        <View style={styles.optionContainer}>
          <TouchableOpacity
            style={[
              styles.option,
              gender === 'Male' && styles.selectedOption,
            ]}
            onPress={() => setGender('Male')}
          >
            <Text style={[
              styles.optionText,
              gender === 'Male' && styles.optionTextOne,
            ]}>Male</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.option,
              gender === 'Female' && styles.selectedOption,
            ]}
            onPress={() => setGender('Female')}
          >
            <Text style={[
              styles.optionText,
              gender === 'Female' && styles.optionTextOne,
            ]}>Female</Text>
          </TouchableOpacity>
        </View>
        <InputLabel
          label="Profession"
          value={profession}
          hasError={fieldErrors.profession}
          onChangeText={(text) => {
            setProfession(text);
            setFieldErrors(prev => ({ ...prev, profession: false })); // limpa erro ao digitar
          }}
          placeholderText="Enter your profession"
          secureTextEntry={false}
        />

        <InputLabel
          label="Experience Time"
          value={experienceTime}
          onChangeText={(text) => {
            setExperienceTime(text);
            setFieldErrors(prev => ({ ...prev, experienceTime: false })); // limpa erro ao digitar
          }}
          placeholderText="Enter your experience time"
          hasError={fieldErrors.experienceTime}
          secureTextEntry={false}
        />


        <InputLabel
          label="Password"
          value={password}
          placeholderText="Enter your password"
          onChangeText={(text) => {
            setPassword(text);
            setFieldErrors(prev => ({ ...prev, password: false })); // limpa erro ao digitar
          }}
          hasError={fieldErrors.password}
          secureTextEntry={true} />

        <TouchableOpacity onPress={createAPassword} style={styles.forgotButton}>
          <Text style={styles.forgotText}>Create a strong password?</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={handleRegister} style={styles.loginButton}>
          {loading ? (
            <ActivityIndicator size="large" style={{ flex: 1 }} color="white" animating={true}></ActivityIndicator>
          ) : (
            <Text style={styles.loginText}>Register</Text>
          )}
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate('Login')} style={styles.registerButton}>
          <Text style={styles.registerText}>Return</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

export default Login;

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
    marginBottom: 5,
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
  optionContainer: {
    flexDirection: 'row',
    gap: 20,
    bottom: 5,
    marginTop: -10,
    marginRight: 170
  },
  option: {
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: 'white',
  },
  selectedOption: {
    backgroundColor: 'white',
    borderColor: 'white',
    color: 'black'
  },
  optionText: {
    color: '#fff',
    fontWeight: '500',
  },
  optionTextOne: {
    color: 'black',
    fontWeight: '500',
  },
  registerText: {
    color: '#1DBFFF',
    fontSize: RFValue(15),
    fontWeight: 'bold',
  },
});

