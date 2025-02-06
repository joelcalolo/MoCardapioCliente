// App/LoginScreen.js
import React, { useState } from 'react';
import { View, TextInput, Button, Alert,  StyleSheet } from 'react-native';
import AuthService from '../services/AuthService';

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');

  const handleLogin = async () => {
    try {
      const response = await AuthService.login(email, senha);
      navigation.navigate('Home');
    } catch (error) {
      Alert.alert('Erro', 'Falha no login');
    }
  };

  return (
    <View>
      <TextInput placeholder="Email" value={email} onChangeText={setEmail} />
      <TextInput placeholder="Senha" value={senha} onChangeText={setSenha} secureTextEntry />
      <Button title="Login" onPress={handleLogin} />
      <Button title="Criar Conta" onPress={() => navigation.navigate('Register')} />
    </View>
  );
};

export default LoginScreen;