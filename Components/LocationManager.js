import { Alert, Button, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import * as Location from 'expo-location'


export default function LocationManager() {
  const [response, requestPermission] = Location.useForegroundPermissions();

  async function verifyPermisson() {
    try {
      if (response.granted) {
        return true;
      }
      const permission = await requestPermission();
      return permission.granted
    } catch (error) {
      console.log("Error in requestCameraPermissionsAsync: ", error)
    }
  }

  async function locateUserHandler() {
    try{
      const hasPermission = await verifyPermisson();
      if (!hasPermission) {
        Alert.alert("You need to give location permission to use this feature.");
        return;
      }
      const locationResponse = await Location.getCurrentPositionAsync();
      console.log("Location Response: ", locationResponse)
    } catch (error) {
      console.log("Error in getting the location: ", error)
    }
  }
  return (
    <View>
      <Button title="Locate Me" onPress={locateUserHandler} />
    </View>
  )
}

const styles = StyleSheet.create({})