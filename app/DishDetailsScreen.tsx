import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import FloatingCartButton from '../components/FloatingCartButton';
import CartService from '../services/CartService';

const DishDetailsScreen = ({ route, navigation }) => {
  const { dish } = route.params;

  const handleAddToCart = async () => {
    try {
      await CartService.addToCart({
        prato_id: dish.id,
        quantidade: 1,
        nome: dish.nome,
        preco: dish.preco,
      });
      Alert.alert('Sucesso', 'Item adicionado ao carrinho!');
      // Navegar para a tela de carrinho
      navigation.navigate('Cart');
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível adicionar ao carrinho');
    }
  };

  return (
    <View style={styles.container}>
      <Image source={{ uri: dish.imagem }} style={styles.image} />
      <View style={styles.detailsContainer}>
        <Text style={styles.title}>{dish.nome}</Text>
        <Text style={styles.description}>{dish.descricao}</Text>
        <Text style={styles.price}>Preço: Kz {Number(dish.preco).toFixed(2)}</Text>
        <TouchableOpacity style={styles.addToCartButton} onPress={handleAddToCart}>
          <Text style={styles.buttonText}>Adicionar ao Carrinho</Text>
        </TouchableOpacity>
      </View>
      <FloatingCartButton />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  image: {
    width: '100%',
    height: 250, // Altura da imagem do prato
    resizeMode: 'cover',
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  detailsContainer: {
    padding: 16,
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#333',
  },
  description: {
    fontSize: 16,
    color: '#666',
    marginBottom: 12,
  },
  price: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#E44D26',
    marginBottom: 20,
  },
  addToCartButton: {
    backgroundColor: '#E44D26',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFF',
  },
});

export default DishDetailsScreen;
