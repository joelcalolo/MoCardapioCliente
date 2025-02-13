import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const API_URL = 'http://localhost:3000/api'; // Atualize com o URL da sua API

const createOrder = async (orderData) => {
  try {
    const token = await AsyncStorage.getItem('token'); // Obter o token de autenticação
    const response = await axios.post(`${API_URL}/orders`, orderData, {
      headers: {
        Authorization: `Bearer ${token}`, // Incluir o token nos cabeçalhos
      },
    });
    return response.data;
  } catch (error) {
    throw new Error('Erro ao criar pedido');
  }
};

export default {
  createOrder,
};