import { Ionicons } from '@expo/vector-icons';
import { navigate } from 'expo-router/build/global-state/routing';
import React from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';

const salas = [
  { id: '1', nome: 'Sala 1', horario: '14:00', valor: 'R$ 50,00' },
  { id: '2', nome: 'Sala 2', horario: '15:30', valor: 'R$ 60,00' },
  { id: '3', nome: 'Sala 3', horario: '16:00', valor: 'R$ 70,00' },
];

const Dashboard: React.FC = ({ navigation}) => {

  function handleVerSala(sala: any) {
    console.log("Sala", sala)
    navigation.navigate('Play', { sala });
  }

  const renderItem = ({ item }) => (
    <View style={styles.row}>
      <Text style={[styles.cell, styles.nome]}>{item.nome}</Text>
      <Text style={styles.cell}>{item.horario}</Text>
      <Text style={styles.cell}>{item.valor}</Text>
      <TouchableOpacity onPress={() => handleVerSala(item)} style={[styles.cell, styles.acao]}>
        <Text style={styles.botaoTexto}> <Ionicons name="log-in-outline" size={32} color="#B7FF00" /></Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Salas Disponíveis</Text>

      {/* Cabeçalho da Tabela */}
      <View style={[styles.row, styles.header]}>
        <Text style={[styles.cell, styles.nome, styles.headerText]}>Sala</Text>
        <Text style={[styles.cell, styles.headerText]}>Início</Text>
        <Text style={[styles.cell, styles.headerText]}>Valor</Text>
        <Text style={[styles.cell, styles.headerText]}>Ação</Text>
      </View>

      <FlatList
        data={salas}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={{ paddingBottom: 30 }}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

export default Dashboard;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#111',
    paddingHorizontal: 16,
    paddingTop: 40,
  },
  title: {
    color: '#B7FF00',
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  row: {
    flexDirection: 'row',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#333',
  },
  header: {
    borderBottomWidth: 2,
    borderBottomColor: '#B7FF00',
  },
    cell: {
    flex: 1,
    color: '#fff',
    textAlign: 'center',
  },
  nome: {
    flex: 1.2,
  },
  acao: {
    flex: 0.8,
    textAlign: 'center',
    alignItems: 'center',
  },
  botaoTexto: {
    color: '#B7FF00',
    fontWeight: 'bold',
    alignItems: 'center',
  },
  headerText: {
    color: '#B7FF00',
    fontWeight: 'bold',
  },
});
