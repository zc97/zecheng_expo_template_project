import { StyleSheet, Text, View, TextInput, Button, Alert } from 'react-native'
import React from 'react'
import { useState } from 'react'
import { auth } from '../Firebase/firebaseSetup';
import { createUserWithEmailAndPassword } from 'firebase/auth';

export default function Signup({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSignup = async () => {
    try {
      if (password !== confirmPassword) {
        Alert.alert('Passwords do not match');
        return;
      }
      if (email.length === 0 || password.length === 0 || confirmPassword.length === 0) {
        Alert.alert('Please fill in all fields');
        return;
      }
      const userCred = await createUserWithEmailAndPassword(auth, email, password);
      console.log(userCred);
    } catch (error) { 
      console.log(error);
      if (error.code === 'auth/email-already-in-use') {
        Alert.alert('Email already in use');
        return;
      } else if (error.code === 'auth/weak-password') {
        Alert.alert('Password is too weak, please make sure at least 6 characters');
        return;
      }
    }
  };

  loginHandler = () => {
    navigation.replace('Login')
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Signup</Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <TextInput
        style={styles.input}
        placeholder="Confirm Password"
        value={confirmPassword}
        onChangeText={setConfirmPassword}
        secureTextEntry
      />
      <Button title="Signup" onPress={handleSignup} />
      <Button title="Go to Login" onPress={loginHandler} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 16,
  },
  title: {
    fontSize: 24,
    marginBottom: 16,
    textAlign: 'center',
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 12,
    paddingHorizontal: 8,
  },
});