import React, { useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const pastOrders = [
  {
    id: '1',
    date: '02/02/2025',
    items: ['Pizza de Calabresa', 'Suco de Laranja'],
    total: '3.500 Kz',
  },
  {
    id: '2',
    date: '28/01/2025',
    items: ['Hambúrguer', 'Batata Frita', 'Coca-Cola'],
    total: '4.200 Kz',
  },
  {
    id: '3',
    date: '25/01/2025',
    items: ['Sushi Combo', 'Chá Verde'],
    total: '6.800 Kz',
  },
];

const OrderHistoryScreen = () => {
  const navigation = useNavigation();
  const [orders, setOrders] = useState(pastOrders);

  const reorder = (order) => {
    // Aqui você pode adicionar lógica para recriar o pedido no carrinho
    console.log('Reordenando:', order);
    navigation.navigate('Cart', { reorderedItems: order.items });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Histórico de Pedidos</Text>

      <FlatList
        data={orders}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.orderItem}>
            <Text style={styles.date}>{item.date}</Text>
            <Text style={styles.items}>{item.items.join(', ')}</Text>
            <Text style={styles.total}>Total: {item.total}</Text>
            <TouchableOpacity style={styles.reorderButton} onPress={() => reorder(item)}>
              <Text style={styles.reorderText}>Reordenar</Text>
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
};

// Estilos
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  orderItem: {
    padding: 12,
    marginVertical: 6,
    borderWidth: 1,
    borderRadius: 8,
    borderColor: '#ddd',
    backgroundColor: '#f5f5f5',
  },
  date: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  items: {
    fontSize: 14,
    color: '#333',
  },
  total: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 6,
  },
  reorderButton: {
    marginTop: 8,
    padding: 8,
    backgroundColor: '#007AFF',
    borderRadius: 8,
    alignItems: 'center',
  },
  reorderText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
  },
});

export default OrderHistoryScreen;
