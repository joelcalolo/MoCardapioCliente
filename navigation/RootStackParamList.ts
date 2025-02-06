// src/navigation/RootStackParamList.ts
export type RootStackParamList = {
    Login: undefined;
    Register: undefined;
    Home: undefined;
    DishDetails: { dish: any };
    Cart: { newDish?: any } | undefined;
    Checkout: { cartItems: any[]; total: number };
    Tracking: { orderId: string };
    Profile: undefined;
    OrderHistory: undefined;
  };
  