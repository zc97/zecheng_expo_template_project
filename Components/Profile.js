import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { getAuth } from "firebase/auth";
import LocationManager from './LocationManager';
import NotificationManager from './NotificationManager';

export default function Profile() {
  const [user, setUser] = useState(null);
  
  useEffect(() => {
    const auth = getAuth();
    setUser(auth.currentUser.email);
  }, []);
  return (
    <View>
      <Text>{user}</Text>
      <LocationManager />
      <NotificationManager /> 
    </View>
  )
}

const styles = StyleSheet.create({})