import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Basket, Home, Scanner } from './src/screens';
import { NativeBaseProvider } from 'native-base';
import { RootNavigationProps } from './src/Navigation';
import { BasketContext, BasketProvider } from './src/context';

export default function App() {
  const Stack = createNativeStackNavigator<RootNavigationProps>();

  return (
    <BasketProvider>
      <NativeBaseProvider>
        <NavigationContainer>
          <Stack.Navigator initialRouteName={'Home'}>
            <Stack.Screen name="Home" component={Home}/>
            <Stack.Screen name="Scanner" component={Scanner}/>
            <Stack.Screen name="Basket" component={Basket}/>
          </Stack.Navigator>
        </NavigationContainer>
      </NativeBaseProvider>
    </BasketProvider>
  );
}
