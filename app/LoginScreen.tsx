// App/LoginScreen.js
import React, { useContext, useState } from 'react';
import { View, Text, TextInput, Button, Alert, StyleSheet } from 'react-native';
import AuthContext from '../context/AuthContext';

const LoginScreen: React.FC = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const { signIn } = useContext(AuthContext);

  const handleLogin = async () => {
    try {
      const response = await fetch('http://localhost:3000/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, senha }),
      });

      if (response.ok) {
        const data = await response.json();
        await signIn(data.user.nome, data.token);
        navigation.navigate('Home');
      } else {
        Alert.alert('Erro', 'Credenciais inválidas');
      }
    } catch (error) {
      Alert.alert('Erro', 'Ocorreu um erro ao fazer login');
    }
  };

  return (
    <View>
      <Text>Login</Text>
      <TextInput placeholder="Email" value={email} onChangeText={setEmail} />
      <TextInput placeholder="Senha" value={senha} onChangeText={setSenha} secureTextEntry />
      <Button title="Login" onPress={handleLogin} />
      <Button title="Criar Conta" onPress={() => navigation.navigate('Register')} />
    </View>
  );
};

export default LoginScreen;