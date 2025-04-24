import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import Dashboard from '../dashboard/index';
import ProfileScreen from '../profile/Index';
import LogoutScreen from '../logout/logout';

const Drawer = createDrawerNavigator();

const DrawerNavigation: React.FC = () => {
  return (
    <Drawer.Navigator
      screenOptions={{
        drawerStyle: {
          backgroundColor: '#021E40',
        },
        headerStyle: {
          backgroundColor: '#021E40',
        },
        headerTintColor: 'white',
        drawerLabelStyle: {
          color: 'white',
        },
      }}
    >
      <Drawer.Screen name="Menu" component={Dashboard} />
      <Drawer.Screen name="Profile" component={ProfileScreen} />
      <Drawer.Screen name="LogOut" component={LogoutScreen} />
      {/* <Drawer.Screen name="Perfil" component={Perfil} /> */}
    </Drawer.Navigator>
  );
};

export default DrawerNavigation;
