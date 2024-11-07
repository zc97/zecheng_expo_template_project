import { Button, StyleSheet, Text, View } from 'react-native'
import React, { useEffect } from 'react'
import { useState } from 'react'
import Home from './Components/Home'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import GoalDetails from './Components/GoalDetails';
import Login from './Components/Login';
import Signup from './Components/Signup';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { auth } from './Firebase/firebaseSetup';
import Profile from './Components/Profile';
import PressableButton from './Components/PressableButton';
import Ionicons from '@expo/vector-icons/Ionicons';

const Stack = createNativeStackNavigator();

const AuthStack = <>
  <Stack.Screen name="Login" component={Login} />
  <Stack.Screen name="Signup" component={Signup} />
</>;

const AppStack = <>
  <Stack.Screen
    name='Home'
    component={Home}
    options={({ navigation }) => {
      return {
        title: "All My Goals",
        headerRight: () => {
          return (
            <PressableButton title="Profile" pressedFunction={() => navigation.navigate('Profile')}>
              <Ionicons name="person" size={24} color="white" />
            </PressableButton>
          );
        }
      }
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
  <Stack.Screen
    name='Profile'
    component={Profile}
    options={({ navigation }) => {
      return {
        title: "Profile",
        headerRight: () => {
          return (
            <PressableButton title="Signout" pressedFunction={() => signOut(auth)} >
              <Ionicons name="exit-outline" size={24} color="black" />
            </PressableButton>
          );
        }
      }
    }}
  >
  </Stack.Screen>
</>

export default function App() {
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsUserLoggedIn(true);
      } else {
        setIsUserLoggedIn(false);
      }
    });
    return () => { unsubscribe() };
  }
    , []);

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
        {isUserLoggedIn ? AppStack : AuthStack}
      </Stack.Navigator>
    </NavigationContainer>
  )
}
