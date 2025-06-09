// src/screens/LoginScreen.tsx

import React, { useState } from "react";
import Toast from "react-native-toast-message";
import { ActivityIndicator } from "react-native-paper";
import { RFValue } from "react-native-responsive-fontsize";
import { NavigationProp, ParamListBase } from "@react-navigation/native";
import {
  View,
  Text,
  Image,
  StyleSheet,
  Dimensions,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
} from "react-native";


import api from "../config/index";
import { login } from "../services/auth";
import InputTopLabel from "../components/InputTopLabel";


const { width, height } = Dimensions.get("window");

type LoginProps = {
  navigation: NavigationProp<ParamListBase>;
};

const Login: React.FC<LoginProps> = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    setLoading(true);

    if (!email || !senha) {
      Toast.show({
        type: "error",
        position: "top",
        text1: "Required fields",
        text2: "Fill in all the fields",
      });
      setLoading(false);
      return;
    }

    console.log("email", email);
    const payload = {
      login: email,
      password: senha,
    };

    console.log("payload", payload);
    try {
      const response = await api.post("/mobile/login", payload);
      console.log("response", response.status);
      const data = response.data;

      if (data.Status === 1) {
        Toast.show({
          type: "success",
          text1: "Login ready to go!",
        });

        console.log("data", data.Token);
        login(data.Token);
        setTimeout(() => {
          navigation.navigate("Dashboard");
        }, 1500);
      } else {
        Toast.show({
          type: "error",
          text1: "Error in login",
          text2: data.Mensagem,
        });
      }
    } catch (error) {
      console.error("Erro ao logar:", error);
      Toast.show({
        type: "error",
        text1: "Error in login",
        text2: "Contact your administrator",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        keyboardShouldPersistTaps="handled"
      >
        <Image
          source={require("../../assets/images/login.png")}
          style={styles.logo}
          resizeMode="contain"
        />

        <InputTopLabel
          label="email"
          value={email}
          onChangeText={setEmail}
          placeholder="Type your email here"
        />

        <InputTopLabel
          value={senha}
          label="password"
          secureTextEntry
          onChangeText={setSenha}
          placeholder="Type your password here"
        />

        <View style={{ width: "100%", marginBottom: 10, alignItems: "flex-end" }}>
          <TouchableOpacity
            onPress={() => navigation.navigate("ForgetPassword")}
          >
            <Text style={styles.forgotText}>Forgot your password?</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity onPress={handleLogin} style={styles.loginButton}>
          {loading ? (
            <ActivityIndicator
              size="large"
              color="white"
              animating={true}
              style={{ flex: 1 }}
            ></ActivityIndicator>
          ) : (
            <Text style={styles.loginText}>Login</Text>
          )}
        </TouchableOpacity>

        <View style={styles.socialContainer}>
          <TouchableOpacity style={styles.socialButton}>
            <Text style={styles.socialText}>Facebook</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.socialButton}>
            <Text style={styles.socialTextGoogle}>Google</Text>
          </TouchableOpacity>
        </View>

      </ScrollView>
      
      <View style={styles.footerContainer}>
        <Text style={styles.signUpText}>New here? Sign up!</Text>

        <TouchableOpacity
          onPress={() => navigation.navigate("Register")}
          style={styles.registerButton}
        >
          <Text style={styles.registerText}>Register</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#021E40",
  },
  scrollContainer: {
    padding: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  logo: {
    marginBottom: 30,
    width: width * 0.8,
    height: height * 0.25,
  },
  forgotText: {
    marginBottom: 25,
    color: "#00BFFF",
    textAlign: "right",
    fontSize: RFValue(13),
  },
  loginButton: {
    width: "100%",
    borderRadius: 12,
    marginBottom: 20,
    paddingVertical: 12,
    alignItems: "center",
    backgroundColor: "#1DBFFF",
  },
  loginText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: RFValue(16),
  },
  socialContainer: {
    width: "100%",
    marginBottom: 30,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  socialButton: {
    width: "48%",
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: "center",
    backgroundColor: "#fff",
  },
  socialText: {
    fontWeight: "600",
    color: "#1877F2",
    fontSize: RFValue(14),
  },
  socialTextGoogle: {
    color: "#4285F4",
    fontWeight: "600",
    fontSize: RFValue(14),
  },
  footerContainer: {
    width: "100%",
    padding: 20,
    paddingBottom: 30,
    alignItems: "center",
    position: "absolute",
    bottom: 0,
  },
  signUpText: {
    color: "#fff",
    marginBottom: 12,
    fontSize: RFValue(13),
    textAlign: "center",
  },
  registerButton: {
    width: "90%",
    borderWidth: 2,
    borderRadius: 12,
    paddingVertical: 12,
    alignItems: "center",
    borderColor: "#1DBFFF",
  },
  registerText: {
    color: "#1DBFFF",
    fontWeight: "bold",
    fontSize: RFValue(15),
  },
});
