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
        <Stack.Screen 
          name='Home' 
          component={Home} 
          options={{
            title:"All My Goals", 
            headerStyle: { backgroundColor: 'purple'}, 
            headerTintColor: 'white'}}>
        </Stack.Screen>
        <Stack.Screen name='Details' component={GoalDetails} options={({ route }) => ({ title: route.params.pressedGoal.text })}></Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  )
}
