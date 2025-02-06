import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../navigation/types';

type TrackingScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Tracking'>;

const TrackingScreen = () => {
  const navigation = useNavigation<TrackingScreenNavigationProp>();
  const route = useRoute();
  const { orderId } = route.params;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Pedido #{orderId}</Text>
      <Text style={styles.status}>Status: Em preparação...</Text>

      <Button title="Voltar para Início" onPress={() => navigation.navigate('Home')} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 16 },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 16 },
  status: { fontSize: 18, marginBottom: 16 },
});

export default TrackingScreen;
