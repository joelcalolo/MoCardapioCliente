import React, { createContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface AuthContextData {
  signed: boolean;
  user: string | null;
  token: string | null;
  signIn(user: string, token: string): Promise<void>;
  signOut(): void;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export const AuthProvider: React.FC = ({ children }) => {
  const [user, setUser] = useState<string | null>(null);
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    const loadStorageData = async () => {
      const storagedUser = await AsyncStorage.getItem('@MoCardapio:user');
      const storagedToken = await AsyncStorage.getItem('@MoCardapio:token');
      if (storagedUser && storagedToken) {
        setUser(storagedUser);
        setToken(storagedToken);
      }
    };

    loadStorageData();
  }, []);

  const signIn = async (user: string, token: string) => {
    await AsyncStorage.setItem('@MoCardapio:user', user);
    await AsyncStorage.setItem('@MoCardapio:token', token);
    setUser(user);
    setToken(token);
  };

  const signOut = async () => {
    await AsyncStorage.removeItem('@MoCardapio:user');
    await AsyncStorage.removeItem('@MoCardapio:token');
    setUser(null);
    setToken(null);
  };

  return (
    <AuthContext.Provider value={{ signed: !!user, user, token, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;