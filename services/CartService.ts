import api from './api';
import AsyncStorage from '@react-native-async-storage/async-storage';

const CART_STORAGE_KEY = '@MoCardapio:cart';

export interface CartItem {
  prato_id: string;
  quantidade: number;
  nome: string;
  preco: number;
}

const CartService = {
  async addToCart(item: CartItem) {
    try {
      const currentCart = await this.getCart();
      const existingItemIndex = currentCart.findIndex(
        (cartItem) => cartItem.prato_id === item.prato_id
      );

      if (existingItemIndex >= 0) {
        currentCart[existingItemIndex].quantidade += item.quantidade;
      } else {
        currentCart.push(item);
      }

      await AsyncStorage.setItem(CART_STORAGE_KEY, JSON.stringify(currentCart));
      return currentCart;
    } catch (error) {
      console.error('Erro ao adicionar ao carrinho:', error);
      throw error;
    }
  },

  async getCart(): Promise<CartItem[]> {
    try {
      const cart = await AsyncStorage.getItem(CART_STORAGE_KEY);
      return cart ? JSON.parse(cart) : [];
    } catch (error) {
      console.error('Erro ao obter carrinho:', error);
      return [];
    }
  },

  async clearCart() {
    try {
      await AsyncStorage.removeItem(CART_STORAGE_KEY);
    } catch (error) {
      console.error('Erro ao limpar carrinho:', error);
      throw error;
    }
  },

  async createOrder(fornecedor_id: string, items: CartItem[]) {
    try {
      const orderItems = items.map(item => ({
        prato_id: item.prato_id,
        quantidade: item.quantidade
      }));

      const response = await api.post('/orders', {
        fornecedor_id,
        itens: orderItems
      });

      await this.clearCart();
      return response.data;
    } catch (error) {
      console.error('Erro ao criar pedido:', error);
      throw error;
    }
  }
};

export default CartService;