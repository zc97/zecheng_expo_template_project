import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { getAuth } from "firebase/auth";


export default function Profile() {
  const [user, setUser] = useState(null);
  
  useEffect(() => {
    const auth = getAuth();
    setUser(auth.currentUser.email);
  }, []);
  return (
    <View>
      <Text>{user}</Text>
    </View>
  )
}

const styles = StyleSheet.create({})