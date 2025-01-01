import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import HomeScreen from '../screens/HomeScreen';
import NoteDetailScreen from '../screens/NoteDetailScreen';

const Stack = createStackNavigator();

const AppNavigator = () => (
  <NavigationContainer>
    <Stack.Navigator
      screenOptions={{
        headerShown: true,
        headerStyle: { backgroundColor: '#121212' },
        headerTintColor: '#fff',
      }}
    >
      <Stack.Screen name="Home" component={HomeScreen} options={{ title: 'Minhas Notas' }} />
      <Stack.Screen name="NoteDetail" component={NoteDetailScreen} options={{ title: 'Nota Detalhada' }} />
    </Stack.Navigator>
  </NavigationContainer>
);

export default AppNavigator;
