import React from "react";
import {
  DrawerItem,
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerContentComponentProps,
} from "@react-navigation/drawer";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { View, Image, StyleSheet, TouchableOpacity, Text } from "react-native";

import Dashboard from "../dashboard/index";
import LogoutScreen from "../logout/logout";
import ProfileScreen from "../profile/Index";

const Drawer = createDrawerNavigator();

const CustomDrawerContent = (props: DrawerContentComponentProps) => {
  return (
    <DrawerContentScrollView
      {...props}
      contentContainerStyle={{ flex: 1, backgroundColor: "#10365F" }}
    >
      <View style={styles.logoContainer}>
        <Image
          style={styles.logo}
          resizeMode="contain"
          source={require("../assets/extended-logo.png")}
        />
        <TouchableOpacity
          style={styles.closeButton}
          onPress={() => props.navigation.closeDrawer()}
        >
          <Icon name="close" size={24} color="#FFFFFF" />
        </TouchableOpacity>
      </View>

      <DrawerItem
        label="My profile"
        style={styles.menuItem}
        labelStyle={styles.label}
        onPress={() => props.navigation.navigate("Profile")}
        icon={() => (
          <Icon
            name="account-circle-outline"
            color="#A57B2F"
            size={32}
            style={{ marginRight: 10 }}
          />
        )}
      />

      <DrawerItem
        label="Home"
        style={styles.menuItem}
        labelStyle={styles.label}
        onPress={() => props.navigation.navigate("Menu")}
        icon={() => (
          <Icon
            name="home-outline"
            color="#A57B2F"
            size={32}
            style={{ marginRight: 10 }}
          />
        )}
      />

      <DrawerItem
        label="Open Vacancy(In Development)"
        labelStyle={styles.label}
        icon={() => (
          <Icon
            name="bullhorn-outline"
            color="#A57B2F"
            size={32}
            style={{ marginRight: 10 }}
          />
        )}
        style={styles.menuItem}
        onPress={() => {
          /* navegação */
        }}
      />
      <DrawerItem
        label="Send Invite(In Development)"
        labelStyle={styles.label}
        icon={() => (
          <Icon
            name="email-outline"
            color="#A57B2F"
            size={32}
            style={{ marginRight: 10 }}
          />
        )}
        style={styles.menuItem}
        onPress={() => {
          /* navegação */
        }}
      />
      <DrawerItem
        label="Contracts(In Development)"
        labelStyle={styles.label}
        icon={() => (
          <Icon
            name="file-document-outline"
            color="#A57B2F"
            size={32}
            style={{ marginRight: 10 }}
          />
        )}
        style={styles.menuItem}
        onPress={() => {
          /* navegação */
        }}
      />
      <DrawerItem
        label="Applications(In Development)"
        labelStyle={styles.label}
        icon={() => (
          <Icon
            name="clipboard-list-outline"
            color="#A57B2F"
            size={32}
            style={{ marginRight: 10 }}
          />
        )}
        style={styles.menuItem}
        onPress={() => {
          /* navegação */
        }}
      />
      <DrawerItem
        label="Chat(In Development)"
        labelStyle={styles.label}
        icon={() => (
          <Icon
            name="chat-outline"
            color="#A57B2F"
            size={32}
            style={{ marginRight: 10 }}
          />
        )}
        style={styles.menuItem}
        onPress={() => {
          /* navegação */
        }}
      />
      <DrawerItem
        label="Reviews(In Development)"
        labelStyle={styles.label}
        icon={() => (
          <Icon
            name="star-outline"
            color="#A57B2F"
            size={32}
            style={{ marginRight: 10 }}
          />
        )}
        style={styles.menuItem}
        onPress={() => {
          /* navegação */
        }}
      />
      <DrawerItem
        label="Logout"
        style={styles.menuItem}
        labelStyle={styles.label}
        onPress={() => props.navigation.navigate("LogOut")}
        icon={() => (
          <Icon
            size={32}
            name="logout"
            color="#A57B2F"
            style={{ marginRight: 10 }}
          />
        )}
      />
    </DrawerContentScrollView>
  );
};

const styles = StyleSheet.create({
  logoContainer: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  logo: {
    width: 150,
    height: 150,
    marginLeft: 16,
  },
  logoText: {
    fontSize: 22,
    color: "#FFD700",
    fontWeight: "bold",
  },
  label: {
    fontSize: 24,
    marginLeft: -16,
    color: "#fff",
    textAlign: "left",
    fontWeight: "bold",
    backgroundColor: "transparent",
  },
  menuItem: {
    paddingLeft: 8,
    marginBottom: 5,
    justifyContent: "flex-start",
  },
  closeButton: {
    width: 40,
    height: 40,
    marginRight: 16,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#1DA1F2",
  },
  headerContainer: {
    height: 56,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    backgroundColor: "#fff",
    justifyContent: "space-between",
  },
  headerTitle: {
    flex: 1,
    fontSize: 18,
    color: "#000",
    fontWeight: "bold",
    textAlign: "center",
  },
  headerButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  drawerButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#1DA1F2",
  },
});

type CustomHeaderProps = {
  title: string;
  navigation: any;
  showBackButton?: boolean;
  isProfileScreen?: boolean;
};

const CustomHeader: React.FC<CustomHeaderProps> = ({ title, navigation, showBackButton = false, isProfileScreen = false }) => {
  return (
    <View style={styles.headerContainer}>
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
        {isProfileScreen && (
          <TouchableOpacity 
            style={styles.drawerButton} 
            onPress={() => {
              // Navegar para a tela de edição de perfil
              navigation.navigate('Profile', { editing: true });
            }}
          >
            <Icon name="pencil" size={24} color="#FFFFFF" />
          </TouchableOpacity>
        )}
        {!isProfileScreen && <View style={{ width: 40 }} />}
      </View>
      
      <Text style={styles.headerTitle}>{title}</Text>
      
      <TouchableOpacity 
        style={styles.drawerButton} 
        onPress={() => navigation.openDrawer()}
      >
        <Icon name="menu" size={24} color="#FFFFFF" />
      </TouchableOpacity>
    </View>
  );
};

const DrawerNavigation: React.FC = () => {
  return (
    <Drawer.Navigator
      drawerContent={(props) => <CustomDrawerContent {...props} />}
      screenOptions={{
        drawerPosition: "right",
        header: ({ navigation, route }) => {
          let isProfileScreen = route.name === "Profile";
          return <CustomHeader 
            title={route.name} 
            navigation={navigation} 
            showBackButton={false} 
            isProfileScreen={isProfileScreen} 
          />;
        },
      }}
    >
      <Drawer.Screen name="Menu" component={Dashboard} />
      <Drawer.Screen name="Profile" component={ProfileScreen} initialParams={{ editing: false }} />
      <Drawer.Screen name="LogOut" component={LogoutScreen} />
    </Drawer.Navigator>
  );
};

export default DrawerNavigation;
