import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { Ionicons } from '@expo/vector-icons';
import HomeScreen from './HomeScreen';
import DishDetailsScreen from './DishDetailsScreen';
import CartScreen from './CartScreen';
import CheckoutScreen from './CheckoutScreen';
import TrackingScreen from './TrackingScreen';
import LoginScreen from './LoginScreen';
import ProfileScreen from './ProfileScreen';
import RegisterScreen from './RegisterScreen';
import OrderHistoryScreen from './OrderHistoryScreen';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

// Stack Navigator para as telas que não fazem parte do Tab
const MainStack = () => (
  <Stack.Navigator>
    <Stack.Screen 
      name="TabNavigator" 
      component={TabNavigator} 
      options={{ headerShown: false }}
    />
    <Stack.Screen name="DishDetails" component={DishDetailsScreen} />
    <Stack.Screen name="Checkout" component={CheckoutScreen} />
    <Stack.Screen name="Tracking" component={TrackingScreen} />
    <Stack.Screen name="OrderHistory" component={OrderHistoryScreen} />
  </Stack.Navigator>
);

// Tab Navigator para as telas principais
const TabNavigator = () => (
  <Tab.Navigator screenOptions={{ headerShown: false }}>
    <Tab.Screen
      name="Home"
      component={HomeScreen}
      options={{
        tabBarIcon: ({ color }) => <Ionicons name="home" size={24} color={color} />,
      }}
    />
    <Tab.Screen
      name="Cart"
      component={CartScreen}
      options={{
        tabBarIcon: ({ color }) => <Ionicons name="cart" size={24} color={color} />,
      }}
    />
    <Tab.Screen
      name="Profile"
      component={ProfileScreen}
      options={{
        tabBarIcon: ({ color }) => <Ionicons name="person" size={24} color={color} />,
      }}
    />
  </Tab.Navigator>
);

// Auth Stack para telas de autenticação
const AuthStack = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="Login" component={LoginScreen} />
    <Stack.Screen name="Register" component={RegisterScreen} />
  </Stack.Navigator>
);

// Root Navigator que controla a navegação principal
const RootNavigator = () => {
  // Aqui você pode adicionar lógica para verificar se o usuário está autenticado
  const isAuthenticated = true; // Substitua por sua lógica de autenticação

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {isAuthenticated ? (
        <Stack.Screen name="Main" component={MainStack} />
      ) : (
        <Stack.Screen name="Auth" component={AuthStack} />
      )}
    </Stack.Navigator>
  );
};

export default RootNavigator;