import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from './pages/home/home.js';
import Dashboard from './pages/dashboard/dashboard.js';
import Bag from './pages/bag/bag.js';
import ScanBag from './pages/scan/scan-bag.js';
import { ShoppingBagProvider } from './pages/bag/bag-context.js'; // Import the provider

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <ShoppingBagProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Home">
          <Stack.Screen name="Home" component={Home} />
          <Stack.Screen name="Dashboard" component={Dashboard} />
          <Stack.Screen name="Bag" component={Bag} />
          <Stack.Screen name="Scan-Bag" component={ScanBag} />
        </Stack.Navigator>
      </NavigationContainer>
    </ShoppingBagProvider>
  );
}