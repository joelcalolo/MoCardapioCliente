import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const ProfileScreen = () => {
  const navigation = useNavigation();
  const [user, setUser] = useState({
    name: 'Joel Calolo',
    email: 'joelcalolo@email.com',
    phone: '+244 923 456 789',
  });

  const [editing, setEditing] = useState(false);
  const [updatedUser, setUpdatedUser] = useState(user);

  const handleSave = () => {
    setUser(updatedUser);
    setEditing(false);
    Alert.alert('Perfil atualizado com sucesso!');
  };

  const handleLogout = async () => {
    Alert.alert(
      'Sair',
      'Tem certeza que deseja sair?',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Sair',
          onPress: async () => {
            try {
              await AuthService.logout();
              navigation.replace('Login');
            } catch (error) {
              Alert.alert('Erro', 'Não foi possível fazer logout');
            }
          },
        },
      ]
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Perfil</Text>

      <View style={styles.profileSection}>
        <Text style={styles.label}>Nome</Text>
        {editing ? (
          <TextInput
            style={styles.input}
            value={updatedUser.name}
            onChangeText={(text) => setUpdatedUser({ ...updatedUser, name: text })}
          />
        ) : (
          <Text style={styles.text}>{user.name}</Text>
        )}
      </View>

      <View style={styles.profileSection}>
        <Text style={styles.label}>E-mail</Text>
        {editing ? (
          <TextInput
            style={styles.input}
            value={updatedUser.email}
            onChangeText={(text) => setUpdatedUser({ ...updatedUser, email: text })}
          />
        ) : (
          <Text style={styles.text}>{user.email}</Text>
        )}
      </View>

      <View style={styles.profileSection}>
        <Text style={styles.label}>Telefone</Text>
        {editing ? (
          <TextInput
            style={styles.input}
            value={updatedUser.phone}
            onChangeText={(text) => setUpdatedUser({ ...updatedUser, phone: text })}
          />
        ) : (
          <Text style={styles.text}>{user.phone}</Text>
        )}
      </View>

      {editing ? (
        <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
          <Text style={styles.buttonText}>Salvar</Text>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity style={styles.editButton} onPress={() => setEditing(true)}>
          <Text style={styles.buttonText}>Editar Perfil</Text>
        </TouchableOpacity>
      )}

      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Text style={styles.buttonText}>Sair</Text>
      </TouchableOpacity>
    </View>
  );
};

// Estilos
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  profileSection: {
    marginBottom: 15,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  text: {
    fontSize: 16,
    color: '#333',
    padding: 10,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    backgroundColor: '#f5f5f5',
  },
  input: {
    fontSize: 16,
    padding: 10,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    backgroundColor: '#fff',
  },
  editButton: {
    marginTop: 20,
    padding: 12,
    backgroundColor: '#007AFF',
    borderRadius: 8,
    alignItems: 'center',
  },
  saveButton: {
    marginTop: 20,
    padding: 12,
    backgroundColor: '#28A745',
    borderRadius: 8,
    alignItems: 'center',
  },
  logoutButton: {
    marginTop: 20,
    padding: 12,
    backgroundColor: '#FF3B30',
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default ProfileScreen;
