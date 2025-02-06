import api from './api';
import AsyncStorage from '@react-native-async-storage/async-storage';

const TOKEN_KEY = '@MoCardapio:token';

const AuthService = {
  async login(email: string, senha: string) {
    const response = await api.post('/auth/login', { email, senha });
    await AsyncStorage.setItem(TOKEN_KEY, response.data.token);
    return response.data;
  },

  async register(userData: any) {
    const response = await api.post('/auth/register', userData);
    await AsyncStorage.setItem(TOKEN_KEY, response.data.token);
    return response.data;
  },

  async logout() {
    await AsyncStorage.removeItem(TOKEN_KEY);
  },

  async getProfile() {
    const response = await api.get('/users/profile');
    return response.data;
  },

  async updateProfile(userData: any) {
    const response = await api.put('/users/profile', userData);
    return response.data;
  },

  async deleteProfile() {
    const response = await api.delete('/users/profile');
    return response.data;
  },
};

export default AuthService;