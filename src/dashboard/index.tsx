import React, { useState } from "react";
import { StyleSheet, View, Text, SafeAreaView, ScrollView } from "react-native";
import { Icon } from "../utils";
import { NavigationProp, ParamListBase } from "@react-navigation/native";
import RangeSlider from "../components/RangeSlider";
import SingleSlider from "../components/SingleSlider";

type DashboardProps = {
  navigation: NavigationProp<ParamListBase>;
};

const Dashboard: React.FC<DashboardProps> = ({ navigation }) => {
  const [salaryRange, setSalaryRange] = useState<[number, number]>([500, 1500]);
  const [experienceRange, setExperienceRange] = useState<[number, number]>([1, 5]);
  const [distance, setDistance] = useState<number>(100);

  const handleSalaryChange = (values: [number, number]) => {
    setSalaryRange(values);
    console.log('Faixa salarial alterada:', values);
  };

  const handleExperienceChange = (values: [number, number]) => {
    setExperienceRange(values);
    console.log('Faixa de experiência alterada:', values);
  };

  const handleDistanceChange = (value: number) => {
    setDistance(value);
    console.log('Distância alterada:', value);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        
        <View style={styles.iconsContainer}>
        
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Dashboard;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingHorizontal: 16,
    paddingTop: 40,
  },
  title: {
    color: "#B7FF00",
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 24,
  },
  subtitle: {
    color: "#B7FF00",
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 16,
  },
  iconsContainer: {
    marginTop: 24,
    marginBottom: 24,
  },
  iconRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    marginHorizontal: 8,
  },
  iconItem: {
    alignItems: "center",
    marginBottom: 20,
    width: "18%",
  },
  iconLabel: {
    color: "#FFF",
    fontSize: 12,
    marginTop: 8,
    marginBottom: 20,
    textAlign: "center",
  },
  sliderContainer: {
    backgroundColor: "#FFFFFF",
    borderRadius: 10,
    marginVertical: 10,
    padding: 10,
  },
  row: {
    flexDirection: "row",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#333",
  },
  header: {
    borderBottomWidth: 2,
    borderBottomColor: "#B7FF00",
  },
  cell: {
    flex: 1,
    color: "#fff",
    textAlign: "center",
  },
  nome: {
    flex: 1.2,
  },
  acao: {
    flex: 0.8,
    textAlign: "center",
    alignItems: "center",
  },
  botaoTexto: {
    color: "#B7FF00",
    fontWeight: "bold",
    alignItems: "center",
  },
  headerText: {
    color: "#B7FF00",
    fontWeight: "bold",
  },
});
