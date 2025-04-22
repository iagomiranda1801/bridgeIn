import AsyncStorage from '@react-native-async-storage/async-storage';
export const getToken = () => AsyncStorage.getItem('token');

export const login = (token: string) => {
  AsyncStorage.setItem('token', token);
};

export const setUser = (user: string) => {
  AsyncStorage.setItem('user', JSON.stringify(user));
};

export const getUser =  async () => {
  return JSON.parse(await AsyncStorage.getItem('user'));
};

export const logout = () => {
  AsyncStorage.removeItem('token');
  AsyncStorage.removeItem('user');
};
