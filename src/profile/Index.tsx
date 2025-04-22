import React, { useState, useEffect }	 from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { Ionicons, FontAwesome5 } from '@expo/vector-icons';
import { logout } from '../services/auth';
import api from '../config';
const ProfileScreen: React.FC = ({ navigation }) => {

  const [loading, setLoading] = useState(true);
  const [userData, setUserData] = useState({
    name: '',
    cpf: '',
    email: '',
    telefone: '',
    genero: '',
    tipo_chave_pix: '',
    chave_pix: '',
    data_nascimento: '',
    imagem: '',
    value: '',
  });

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        // Simulação de chamada de API (troque pela sua URL real)
        const response = await api.get('/mobile/users/dados');
        const data = await response.data.mensagem
        console.log("data", data)
        setUserData({
          name: data.nome,
          cpf: data.cpf,
          email: data.email,
          telefone: data.telefone,
          genero: data.genero,
          tipo_chave_pix: data.tipo_chave_pix,
          chave_pix: data.chave_pix,
          data_nascimento: data.data_nascimento,
          imagem: data.imagem,
          value: data.value
        });
      } catch (error) {
        console.error('Erro ao buscar dados do perfil', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  const handleLogout = () => {
    logout();
    navigation.navigate('Login');
  };

  const navigateForDash = () => {
    navigation.navigate('Menu');
  };

  return (
    <View style={styles.container}>
      <View style={styles.topIcons}>
        <TouchableOpacity onPress={navigateForDash} style={styles.iconButton}>
          <Ionicons name="home" size={24} color="#fff" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.iconButton}>
          <Ionicons name="settings" size={24} color="#fff" />
        </TouchableOpacity>
      </View>

      <View style={styles.profileSection}>
        <View style={styles.profileImageContainer}>
          <FontAwesome5 name="user-circle" size={100} color="#fff" />
          <TouchableOpacity style={styles.editIcon}>
            <Ionicons name="pencil" size={16} color="#fff" />
          </TouchableOpacity>
        </View>
        <Text style={styles.name}>{userData.name}</Text>
        <View style={styles.separator} />
      </View>

      <View style={styles.statsRow}>
        <View style={styles.statBox}>
          <Text style={styles.statValue}>{userData.value ? userData.value : '3.830,00'}</Text>
          <Text style={styles.statLabel}>Saldo Atual</Text>
        </View>
        <View style={styles.statBox}>
          <Text style={styles.statValue}>125</Text>
          <Text style={styles.statLabel}>Cliques Totais</Text>
        </View>
        <View style={styles.statBox}>
          <Text style={styles.statValue}>3.830,00</Text>
          <Text style={styles.statLabel}>Valor Retirado</Text>
        </View>
      </View>

      <View style={styles.infoSection}>
        <Text style={styles.label}>CPF</Text>
        <Text style={styles.info}>{userData.cpf}</Text>

        <TouchableOpacity onPress={handleLogout}>
          <Text style={styles.logout}>Log Out</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1f1f1f',
    paddingHorizontal: 20,
    paddingTop: 40,
  },
  topIcons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  iconButton: {
    backgroundColor: '#064f3b',
    padding: 12,
    borderRadius: 30,
    elevation: 5,
  },
  profileSection: {
    alignItems: 'center',
    marginVertical: 30,
  },
  profileImageContainer: {
    position: 'relative',
    marginBottom: 10,
  },
  editIcon: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: '#064f3b',
    borderRadius: 20,
    padding: 6,
    elevation: 3,
  },
  name: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#fff',
  },
  separator: {
    width: 80,
    height: 2,
    backgroundColor: '#B7FF00',
    marginTop: 6,
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 20,
  },
  statBox: {
    backgroundColor: '#123c36',
    borderRadius: 8,
    padding: 20,
    flex: 1,
    marginHorizontal: 5,
    alignItems: 'center',
  },
  statValue: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',

  },
  statLabel: {
    fontSize: 15,
    color: '#B7FF00',
    width: '100%',
    height: 'auto',
  },
  infoSection: {
    marginTop: 20,
  },
  label: {
    color: '#fff',
    fontWeight: 'bold',
    marginTop: 12,
  },
  info: {
    color: '#ccc',
    marginTop: 2,
  },
  logout: {
    color: '#B7FF00',
    fontWeight: 'bold',
    marginTop: 30,
    fontSize: 16,
  },
});

export default ProfileScreen;
