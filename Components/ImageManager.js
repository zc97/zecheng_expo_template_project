import { Alert, Button, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import * as ImagePicker from 'expo-image-picker'

export default function ImageManager() {
  const [response, requestPermission] = ImagePicker.useCameraPermissions();
  async function verifyPermisson() {
    // check if user has granted permission return true or false
    // else ask for permission
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
  async function takeImageHandler() {
    try {
      // call verifyPermisson() to check if user has granted permission
      // only proceed if user has granted permission
      const hasPermission = await verifyPermisson()
      if (!hasPermission) {
        Alert.alert("You need to give camera permission to use this feature.");
        return;
      }
      const result = await ImagePicker.launchCameraAsync({
        allowsEditing: true,
      })
      console.log(result)
    } catch (error) {
      console.log("Error in taking an picture: ", error)
    }
  }

  return (
    <View>
      <Button title="Take a photo" onPress={takeImageHandler} />
    </View>
  )
}

const styles = StyleSheet.create({})