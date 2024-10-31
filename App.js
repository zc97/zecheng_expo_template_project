import { Button, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Home from './Components/Home'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import GoalDetails from './Components/GoalDetails';
import Login from './Components/Login';
import Signup from './Components/Signup';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName='Signup'
        screenOptions={{
          headerStyle: {
            backgroundColor: 'purple',
          },
          headerTintColor: 'white',
        }}
      >
        <Stack.Screen
          name='Home'
          component={Home}
          options={{
            title: "All My Goals",
          }}>
        </Stack.Screen>
        <Stack.Screen name='Details'
          component={GoalDetails}
          options={({ route }) => (
            // callback function for dynamic header
            {
              title: route.params ? route.params.pressedGoal.text : "More Details",
            }
          )}
        ></Stack.Screen>
        <Stack.Screen name='Login' component={Login}></Stack.Screen>
        <Stack.Screen name='Signup' component={Signup}></Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  )
}
