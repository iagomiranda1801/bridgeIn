// src/screens/LoginScreen.tsx

import React, { useState } from "react";
import Toast from "react-native-toast-message";
import { RFValue } from "react-native-responsive-fontsize";
import { NavigationProp, ParamListBase } from "@react-navigation/native";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  SafeAreaView,
  ScrollView,
  Dimensions,
  ActivityIndicator,
} from "react-native";

import api from "../config/index";
import LoadingScreen from "../loading/Index";
import InputLabel from "../components/InputLabel";
import InputTopLabel from "../components/InputTopLabel";

const { width, height } = Dimensions.get("window");

type RegisterProps = {
  navigation: NavigationProp<ParamListBase>;
};

const Register: React.FC<RegisterProps> = ({ navigation }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [gender, setGender] = useState("");
  const [address, setAddress] = useState("");
  const [password, setPassword] = useState("");
  const [province, setProvince] = useState("");
  const [loading, setLoading] = useState(false);
  const [birthDate, setBirthDate] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [profession, setProfession] = useState("");
  const [neighborhood, setNeighborhood] = useState("");
  const [experienceTime, setExperienceTime] = useState("");
  const [registrationNumber, setRegistrationNumber] = useState("");
  const [fieldErrors, setFieldErrors] = useState({
    name: false,
    email: false,
    gender: false,
    address: false,
    password: false,
    province: false,
    birthDate: false,
    postalCode: false,
    profession: false,
    neighborhood: false,
    experienceTime: false,
    registrationNumber: false,
  });

  const handleRegister = async () => {
    setLoading(true);

    const newErrors = {
      name: !name,
      email: !email,
      gender: !gender,
      address: !address,
      password: !password,
      province: !province,
      birthDate: !birthDate,
      postalCode: !postalCode,
      profession: !profession,
      neighborhood: !neighborhood,
      experienceTime: !experienceTime,
      registrationNumber: !registrationNumber,
    };

    setFieldErrors(newErrors);

    const hasErrors = Object.values(newErrors).some(Boolean);

    if (hasErrors) {
      Toast.show({
        type: "error",
        text1: "Inputs required",
        text2: "Fill in all the fields",
        position: "top",
      });
      setLoading(false);
      return;
    }

    console.log("email", email);

    const payload = {
      name,
      email,
      gender,
      address,
      password,
      province,
      profession,
      neighborhood,
      birth_date: birthDate,
      postal_code: postalCode,
      experience_time: experienceTime,
      registration_number: registrationNumber,
    };

    console.log("payload", payload);
    try {
      const response = await api.post("/mobile/users/insert", payload);
      console.log("response", response);
      const data = response.data;

      if (data.Status === 1) {
        Toast.show({
          type: "success",
          text1: "Register save with success",
        });
        setTimeout(() => {
          navigation.navigate("Login");
        }, 1500);
      } else {
        Toast.show({
          type: "error",
          text1: "Erro in register",
          text2: data.Message,
        });
      }
    } catch (error) {
      console.error("Erro ao Registrar:", error);
      Toast.show({
        type: "error",
        text1: "Erro in register",
        text2: "Contact your administrator",
      });
    } finally {
      setLoading(false);
    }
  };

  function createAPassword() {
    let total = 12;

    const numbers = "0123456789";
    const symbols = "!@#$%^&*()-_=+[]{}|;:,.<>?";
    const uppercase = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const lowercase = "abcdefghijklmnopqrstuvwxyz";

    const allChars = uppercase + lowercase + numbers + symbols;
    let password = "";

    password += uppercase[Math.floor(Math.random() * uppercase.length)];
    password += lowercase[Math.floor(Math.random() * lowercase.length)];
    password += numbers[Math.floor(Math.random() * numbers.length)];
    password += symbols[Math.floor(Math.random() * symbols.length)];

    for (let i = password.length; i < total; i++) {
      password += allChars[Math.floor(Math.random() * allChars.length)];
    }

    password
      .split("")
      .sort(() => 0.5 - Math.random())
      .join("");

    setPassword(password);
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        keyboardShouldPersistTaps="handled"
      >
        {loading && <LoadingScreen />}
        <Image
          source={require("../../assets/images/login.png")}
          style={styles.logo}
          resizeMode="contain"
        />

        <InputTopLabel
          keyboardType="numeric"
          value={registrationNumber}
          label="Registration Number"
          // hasError={fieldErrors.registrationNumber}
          placeholder="Enter your registration number"
          mask={['C', 'A', 'M', 'D', '-', /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]}
          onChangeText={(text) => {
            setRegistrationNumber(text);
            setFieldErrors((prev) => ({ ...prev, registrationNumber: false }));
          }}
        />

        <InputTopLabel
          label="Name"
          value={name}
          // hasError={fieldErrors.name}
          placeholder="Enter your name"
          onChangeText={(text) => {
            setName(text);
            setFieldErrors((prev) => ({ ...prev, name: false }));
          }}
        />

        <View style={styles.optionContainer}>
          <TouchableOpacity
            style={[styles.option, gender === "Male" && styles.selectedOption]}
            onPress={() => setGender("Male")}
          >
            <Text
              style={[
                styles.optionText,
                gender === "Male" && styles.optionTextOne,
              ]}
            >
              Male
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.option,
              gender === "Female" && styles.selectedOption,
            ]}
            onPress={() => setGender("Female")}
          >
            <Text
              style={[
                styles.optionText,
                gender === "Female" && styles.optionTextOne,
              ]}
            >
              Female
            </Text>
          </TouchableOpacity>
        </View>

        <InputTopLabel
          label="Email"
          value={email}
          // hasError={fieldErrors.email}
          placeholder="Enter your email"
          onChangeText={(text) => {
            setEmail(text);
            setFieldErrors((prev) => ({ ...prev, email: false }));
          }}
        />

        <InputTopLabel
          label="Address"
          value={address}
          // hasError={fieldErrors.address}
          placeholder="Enter your address"
          onChangeText={(text) => {
            setAddress(text);
            setFieldErrors((prev) => ({ ...prev, address: false }));
          }}
        />

        <InputTopLabel
          label="Neighborhood"
          value={neighborhood}
          // hasError={fieldErrors.neighborhood}
          placeholder="Enter your neighborhood"
          onChangeText={(text) => {
            setNeighborhood(text);
            setFieldErrors((prev) => ({ ...prev, neighborhood: false }));
          }}
        />

        <InputTopLabel
          label="Province"
          value={province}
          // hasError={fieldErrors.province}
          placeholder="Enter your province or state"
          onChangeText={(text) => {
            setProvince(text);
            setFieldErrors((prev) => ({ ...prev, province: false }));
          }}
        />

        <InputTopLabel
          value={postalCode}
          label="Postal Code"
          // hasError={fieldErrors.postalCode}
          placeholder="Enter your postal code (A1B-2A1)"
          mask={[/[A-Z]/, /\d/, /[A-Z]/, " ", /\d/, /[A-Z]/, /\d/]}
          onChangeText={(text) => {
            setPostalCode(text);
            setFieldErrors((prev) => ({ ...prev, postalCode: false }));
          }}
        />

        <InputTopLabel
          value={birthDate}
          label="Birth Date"
          keyboardType="numeric"
          // hasError={fieldErrors.birthDate}
          placeholder="Enter your birth date"
          mask={[/\d/, /\d/, /\d/, /\d/, "-", /\d/, /\d/, "-", /\d/, /\d/]}
          onChangeText={(text) => {
            setBirthDate(text);
            setFieldErrors((prev) => ({ ...prev, birthDate: false }));
          }}
        />

        <InputTopLabel
          label="Profession"
          value={profession}
          placeholder="Enter your profession"
          onChangeText={(text) => {
            setProfession(text);
            setFieldErrors((prev) => ({ ...prev, profession: false }));
          }}
        />

        <InputTopLabel
          value={experienceTime}
          keyboardType="numeric"
          label="Experience Time"
          placeholder="Enter your experience time"
          onChangeText={(text) => {
            setExperienceTime(text);
            setFieldErrors((prev) => ({ ...prev, experienceTime: false }));
          }}
          // hasError={fieldErrors.experienceTime}
        />

        <InputTopLabel
          label="Password"
          value={password}
          secureTextEntry
          placeholder="Enter your password"
          onChangeText={(text) => {
            setPassword(text);
            setFieldErrors((prev) => ({ ...prev, password: false }));
          }}
          // hasError={fieldErrors.password}
        />

        <TouchableOpacity onPress={createAPassword} style={styles.createPasswordButton}>
          <Text style={styles.forgotText}>Create a strong password?</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={handleRegister} style={styles.registerButtonText}>
          {loading ? (
            <ActivityIndicator
              size="large"
              style={{ flex: 1 }}
              color="white"
              animating={true}
            ></ActivityIndicator>
          ) : (
            <Text style={styles.loginText}>Register</Text>
          )}
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => navigation.navigate("Login")}
          style={styles.registerButton}
        >
          <Text style={styles.registerText}>Return</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Register;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#021E40",
  },
  createPasswordButton: {
    marginLeft: "auto",
  },
  scrollContainer: {
    padding: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  logo: {
    marginBottom: 5,
    width: width * 0.8,
    height: height * 0.25,
  },
  input: {
    width: "100%",
    marginBottom: 15,
    fontSize: RFValue(14),
  },
  forgotText: {
    marginBottom: 25,
    color: "#00BFFF",
    fontSize: RFValue(13),
    alignSelf: "flex-end",
  },
  registerButtonText: {
    width: "100%",
    borderRadius: 12,
    marginBottom: 20,
    paddingVertical: 15,
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
    fontWeight: "600",
    color: "#4285F4",
    fontSize: RFValue(14),
  },
  signUpText: {
    color: "#fff",
    marginBottom: 12,
    fontSize: RFValue(13),
  },
  registerButton: {
    width: "100%",
    marginTop: 20,
    borderWidth: 2,
    marginBottom: 20,
    borderRadius: 12,
    paddingVertical: 15,
    alignItems: "center",
    borderColor: "#1DBFFF",
  },
  optionContainer: {
    gap: 20,
    width: "100%",
    marginVertical: 15,
    flexDirection: "row",
    justifyContent: "flex-start",
  },
  option: {
    width: 120,
    borderWidth: 1,
    borderRadius: 8,
    paddingVertical: 12,
    borderColor: "white",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  selectedOption: {
    color: "black",
    borderColor: "white",
    backgroundColor: "white",
  },
  optionText: {
    color: "#fff",
    fontWeight: "500",
  },
  optionTextOne: {
    color: "black",
    fontWeight: "500",
  },
  registerText: {
    color: "#1DBFFF",
    fontWeight: "bold",
    fontSize: RFValue(15),
  },
});
