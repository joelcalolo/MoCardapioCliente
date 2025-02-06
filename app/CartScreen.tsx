import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, Button, StyleSheet, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CartService, { CartItem } from '../services/CartService';

const CartScreen = () => {
  const navigation = useNavigation();
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    loadCart();
  }, []);

  const loadCart = async () => {
    const items = await CartService.getCart();
    setCartItems(items);
  };

  const updateQuantity = async (id: string, action: 'increase' | 'decrease') => {
    const updatedCart = cartItems.map(item =>
      item.prato_id === id
        ? { ...item, quantidade: action === 'increase' ? item.quantidade + 1 : Math.max(1, item.quantidade - 1) }
        : item
    );
    await AsyncStorage.setItem('@MoCardapio:cart', JSON.stringify(updatedCart));
    setCartItems(updatedCart);
  };

  const handleCheckout = async () => {
    try {
      setIsLoading(true);

      if (cartItems.length === 0) {
        Alert.alert('Erro', 'Seu carrinho está vazio');
        return;
      }

      // Criar o pedido
      const orderData = {
        fornecedor_id: cartItems[0].fornecedor_id,
        itens: cartItems.map(item => ({
          prato_id: item.prato_id,
          quantidade: item.quantidade
        }))
      };

      const response = await CartService.createOrder(orderData.fornecedor_id, cartItems);
      await CartService.clearCart();
      setCartItems([]);
      Alert.alert('Sucesso', 'Pedido realizado com sucesso!', [
        { text: 'OK', onPress: () => navigation.navigate('Checkout', { orderId: response.id }) }
      ]);
    } catch (error) {
      console.error('Erro ao finalizar pedido: ', error);
      Alert.alert('Erro', 'Não foi possível finalizar o pedido. Tente novamente.');
    } finally {
      setIsLoading(false);
    }
  };

  const total = cartItems.reduce((acc, item) => acc + item.preco * item.quantidade, 0);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Carrinho</Text>
      <FlatList
        data={cartItems}
        keyExtractor={item => item.prato_id}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Text style={styles.itemText}>{item.nome}</Text>
            <Text style={styles.itemPrice}>Kz {item.preco}</Text>
            <View style={styles.quantityContainer}>
              <TouchableOpacity onPress={() => updateQuantity(item.prato_id, 'decrease')} style={styles.button}>
                <Text>-</Text>
              </TouchableOpacity>
              <Text style={styles.quantity}>{item.quantidade}</Text>
              <TouchableOpacity onPress={() => updateQuantity(item.prato_id, 'increase')} style={styles.button}>
                <Text>+</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      />
      <View style={styles.summary}>
        <Text style={styles.totalText}>Total: Kz {total.toFixed(2)}</Text>
        <Button title={isLoading ? "Processando..." : "Finalizar Pedido"} onPress={handleCheckout} disabled={isLoading || cartItems.length === 0} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 12,
    marginBottom: 8,
    borderWidth: 1,
    borderRadius: 8,
    borderColor: '#ddd',
  },
  itemText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  itemPrice: {
    fontSize: 14,
    color: '#555',
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  button: {
    padding: 8,
    borderWidth: 1,
    borderRadius: 4,
    marginHorizontal: 8,
  },
  quantity: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  summary: {
    marginTop: 16,
    padding: 16,
    borderTopWidth: 1,
    borderColor: '#ddd',
  },
  totalText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
});

export default CartScreen;