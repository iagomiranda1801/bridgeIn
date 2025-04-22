import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import Dashboard from '../dashboard/index';
import ProfileScreen from '../profile/Index';

const Drawer = createDrawerNavigator();

const DrawerNavigation: React.FC = () => {
  return (
    <Drawer.Navigator
      screenOptions={{
        drawerStyle: {
          backgroundColor: '#111',
        },
        headerStyle: {
          backgroundColor: '#111',
        },
        headerTintColor: '#B7FF00',
        drawerLabelStyle: {
          color: '#B7FF00',
        },
      }}
    >
      <Drawer.Screen name="Menu" component={Dashboard} />
      <Drawer.Screen name="Perfil" component={ProfileScreen} />
      {/* <Drawer.Screen name="LogOut" component={LogoutScreen} /> */}
      {/* <Drawer.Screen name="Perfil" component={Perfil} /> */}
    </Drawer.Navigator>
  );
};

export default DrawerNavigation;
