import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  FlatList,
  TextInput,
  TouchableOpacity,
  Image,
  StyleSheet,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../navigation/types';
import api from '../services/api';
import FloatingCartButton from '../components/FloatingCartButton';

type HomeScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Home'>;

const HomeScreen = () => {
  const navigation = useNavigation<HomeScreenNavigationProp>();
  const [searchQuery, setSearchQuery] = useState('');
  const [dishes, setDishes] = useState([]);
  const [filteredDishes, setFilteredDishes] = useState([]);

  // Buscar pratos da API
  useEffect(() => {
    const fetchDishes = async () => {
      try {
        const response = await api.get('/menus');
        setDishes(response.data);
        setFilteredDishes(response.data); // Inicializa com todos os pratos
      } catch (error) {
        console.error('Erro ao buscar pratos:', error);
      }
    };
    fetchDishes();
  }, []);

  // Filtrar pratos com base na busca e disponibilidade
  useEffect(() => {
    const filtered = dishes.filter(
      (dish) =>
        dish.nome.toLowerCase().includes(searchQuery.toLowerCase()) &&
        dish.disponivel
    );
    setFilteredDishes(filtered);
  }, [searchQuery, dishes]);

  // Navegar para a tela de detalhes do prato
  const handleDishPress = (dish) => {
    navigation.navigate('DishDetails', { dish });
  };

  return (
    <View style={styles.container}>
      {/* Barra de busca */}
      <TextInput
        placeholder="Buscar pratos..."
        value={searchQuery}
        onChangeText={setSearchQuery}
        style={styles.searchBar}
      />

      {/* Lista de pratos */}
      <FlatList
        data={filteredDishes}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.card}
            onPress={() => handleDishPress(item)}
          >
            <View style={styles.textContainer}>
              <Text style={styles.dishName}>{item.nome}</Text>
              <Text style={styles.dishDescription}>{item.descricao}</Text>
              <Text style={styles.dishPrice}>
                Preço: Kz {parseFloat(item.preco || 0).toFixed(2)}
              </Text>
            </View>
            {item.imagem && (
              <Image
                source={{ uri: item.imagem }}
                style={styles.image}
                resizeMode="cover"
              />
            )}
          </TouchableOpacity>
        )}
      />

      {/* Botão para acessar o carrinho */}
      <FloatingCartButton />
    </View>
  );
};

// Estilos
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f5f5f5',
  },
  searchBar: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 8,
    marginBottom: 16,
    backgroundColor: '#fff',
  },
  card: {
    flexDirection: 'row', // Adiciona layout horizontal entre texto e imagem
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 8,
    marginBottom: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  textContainer: {
    flex: 1, // Faz com que o texto ocupe o máximo de espaço disponível
  },
  dishName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  dishDescription: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
  },
  dishPrice: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 10,
    marginLeft: 12, // Espaçamento entre o texto e a imagem
  },
});

export default HomeScreen;
