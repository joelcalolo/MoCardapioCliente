import React, { useContext, useEffect, useState } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import AuthContext from '../context/AuthContext';

const ProfileScreen: React.FC = () => {
  const { user, token, signOut } = useContext(AuthContext);
  const [userData, setUserData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/users/profile', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        const data = await response.json();
        setUserData(data.user);
      } catch (error) {
        console.error('Erro ao carregar dados do usuário', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [token]);

  if (loading) {
    return <Text>Carregando...</Text>;
  }

  if (!userData) {
    return <Text>Erro ao carregar dados do usuário</Text>;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Perfil</Text>
      <Text>Usuário: {user}</Text>
      <Text>Token: {token}</Text>
      <Text>Nome: {userData.nome}</Text>
      <Text>Email: {userData.email}</Text>
      <Button title="Sair" onPress={signOut} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 16 },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 16 },
});

export default ProfileScreen;
