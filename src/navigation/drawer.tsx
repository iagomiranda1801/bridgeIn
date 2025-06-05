import React from 'react';
import { createDrawerNavigator, DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer';
import { View, Text, Image, StyleSheet } from 'react-native';
import Dashboard from '../dashboard/index';
import ProfileScreen from '../profile/Index';
import LogoutScreen from '../logout/logout';
// Importe seus ícones (exemplo com react-native-vector-icons)
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const Drawer = createDrawerNavigator();

function CustomDrawerContent(props) {
  return (
    <DrawerContentScrollView {...props} contentContainerStyle={{ flex: 1, backgroundColor: '#021E40' }}>
      <View style={styles.logoContainer}>
        <Image source={require('../../assets/images/login.png')} style={styles.logo} resizeMode="contain" />
        {/* <Text style={styles.logoText}>BridgeIn</Text> */}
      </View>
      <DrawerItem
        label="My profile"
        labelStyle={styles.label}
        icon={({ color, size }) => <Icon name="account-circle-outline" color="#C2A14A" size={32} style={{ marginLeft: 24 }} />}
        style={styles.menuItem}
        onPress={() => props.navigation.navigate('Profile')}
      />
      <DrawerItem
        label="Home"
        labelStyle={styles.label}
        icon={({ color, size }) => <Icon name="home-outline" color="#C2A14A" size={32} style={{ marginLeft: 24 }} />}
        style={styles.menuItem}
        onPress={() => props.navigation.navigate('Menu')}
      />
      <DrawerItem
        label="Open Vacancy"
        labelStyle={styles.label}
        icon={({ color, size }) => <Icon name="bullhorn-outline" color="#C2A14A" size={32} style={{ marginLeft: 24 }} />}
        style={styles.menuItem}
        onPress={() => {/* navegação */}}
      />
      <DrawerItem
        label="Send Invite"
        labelStyle={styles.label}
        icon={({ color, size }) => <Icon name="email-outline" color="#C2A14A" size={32} style={{ marginLeft: 24 }} />}
        style={styles.menuItem}
        onPress={() => {/* navegação */}}
      />
      <DrawerItem
        label="Contracts"
        labelStyle={styles.label}
        icon={({ color, size }) => <Icon name="file-document-outline" color="#C2A14A" size={32} style={{ marginLeft: 24 }} />}
        style={styles.menuItem}
        onPress={() => {/* navegação */}}
      />
      <DrawerItem
        label="Applications"
        labelStyle={styles.label}
        icon={({ color, size }) => <Icon name="clipboard-list-outline" color="#C2A14A" size={32} style={{ marginLeft: 24 }} />}
        style={styles.menuItem}
        onPress={() => {/* navegação */}}
      />
      <DrawerItem
        label="Chat"
        labelStyle={styles.label}
        icon={({ color, size }) => <Icon name="chat-outline" color="#C2A14A" size={32} style={{ marginLeft: 24 }} />}
        style={styles.menuItem}
        onPress={() => {/* navegação */}}
      />
      <DrawerItem
        label="Reviews"
        labelStyle={styles.label}
        icon={({ color, size }) => <Icon name="star-outline" color="#C2A14A" size={32} style={{ marginLeft: 24 }} />}
        style={styles.menuItem}
        onPress={() => {/* navegação */}}
      />
      <DrawerItem
        label="Logout"
        labelStyle={styles.label}
        icon={({ color, size }) => <Icon name="logout" color="#C2A14A" size={32} style={{ marginLeft: 24 }} />}
        style={styles.menuItem}
        onPress={() => props.navigation.navigate('LogOut')}
      />
    </DrawerContentScrollView>
  );
}

const styles = StyleSheet.create({
  logoContainer: {
    alignItems: 'flex-start', // Alinha a logo à esquerda
    marginVertical: 30,
    width: '100%',
    paddingLeft: 20,
  },
  logo: {
    width: 100,
    height: 100,
    marginBottom: 10,
  },
  logoText: {
    color: '#FFD700',
    fontSize: 22,
    fontWeight: 'bold',
  },
  label: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'left',
    marginLeft: 0,
    marginRight: 24,
    backgroundColor: 'transparent',
  },
  menuItem: {
    // flexDirection: 'row',
    justifyContent: 'space-between',
    // alignItems: 'center',
    marginBottom: 5,
    // paddingLeft: 0,
    // paddingRight: 0,
  },
});

const DrawerNavigation: React.FC = () => {
  return (
    <Drawer.Navigator
      drawerContent={props => <CustomDrawerContent {...props} />}
      screenOptions={{
        headerStyle: { backgroundColor: '#021E40' },
        headerTintColor: 'white',
      }}
    >
      <Drawer.Screen name="Menu" component={Dashboard} />
      <Drawer.Screen name="Profile" component={ProfileScreen} />
      <Drawer.Screen name="LogOut" component={LogoutScreen} />
    </Drawer.Navigator>
  );
};

export default DrawerNavigation;
