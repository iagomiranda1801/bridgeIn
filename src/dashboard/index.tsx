import React from "react";
import { StyleSheet } from "react-native";

const Dashboard: React.FC = ({ navigation }) => {
  return <></>;
};

export default Dashboard;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#111",
    paddingHorizontal: 16,
    paddingTop: 40,
  },
  title: {
    color: "#B7FF00",
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
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
