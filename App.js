import { Button, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Home from './Components/Home'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import GoalDetails from './Components/GoalDetails';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
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
      </Stack.Navigator>
    </NavigationContainer>
  )
}
