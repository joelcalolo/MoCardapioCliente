// FloatingCartButton.js
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; 
import { useNavigation } from '@react-navigation/native';

const FloatingCartButton = () => {
  const navigation = useNavigation();

  return (
    <TouchableOpacity style={styles.fab} onPress={() => navigation.navigate('Cart')}>
      <Ionicons name="cart" size={24} color="white" />
      <Text style={styles.text}>2</Text> {/* Número de itens no carrinho */}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  fab: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    backgroundColor: '#FF5722',
    padding: 15,
    borderRadius: 30,
    shadowOpacity: 0.3,
    shadowRadius: 5,
  },
  text: {
    position: 'absolute',
    top: -5,
    right: -5,
    backgroundColor: 'red',
    color: 'white',
    fontSize: 12,
    padding: 5,
    borderRadius: 10,
  },
});

export default FloatingCartButton;
