import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Home from './Components/Home'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator} from '@react-navigation/native-stack';
import GoalDetails from './Components/GoalDetails';

const Stack = createNativeStackNavigator();
// console.log(Stack)

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name='Home' component={Home}></Stack.Screen>
        <Stack.Screen name='Details' component={GoalDetails}></Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  )
}
