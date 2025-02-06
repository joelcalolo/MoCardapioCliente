// src/navigation/types.ts
import { StackNavigationProp } from '@react-navigation/stack';

export type RootStackParamList = {
  Login: undefined;
  Register: undefined;
  Home: undefined;
  DishDetails: { dish: any }; // Defina o tipo correto para `dish`
  Cart: undefined;
  Checkout: { item: any }; // Defina o tipo correto para `item`
  Tracking: { orderId: string };
  Profile: undefined;
};

export type HomeScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Home'>;
export type DishDetailsScreenNavigationProp = StackNavigationProp<RootStackParamList, 'DishDetails'>;
export type CheckoutScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Checkout'>;
export type TrackingScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Tracking'>;
export type ProfileScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Profile'>;