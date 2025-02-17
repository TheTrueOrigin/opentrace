import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './screens/HomeScreen';
import SearchScreen from './screens/SearchScreen'
import InfoScreen from './screens/InfoScreen'

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false, gestureEnabled: false}}>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Search" component={SearchScreen} options={{
          animation: 'slide_from_right',  // Slide from left
        }}/>
        <Stack.Screen name="Info" component={InfoScreen} options={{
          animation: 'slide_from_right',  // Slide from left
        }}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}