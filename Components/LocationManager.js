import { Alert, Button, StyleSheet, Text, View, Image } from 'react-native'
import React from 'react'
import * as Location from 'expo-location'


export default function LocationManager() {
  const [location, setLocation] = React.useState(null);
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
      setLocation(locationResponse.coords);
      console.log("Location Response: ", locationResponse)
    } catch (error) {
      console.log("Error in getting the location: ", error)
    }
  }
  return (
    <View>
      <Button title="Locate Me" onPress={locateUserHandler} />
      {location && 
            <Image source={{ uri: `https://maps.googleapis.com/maps/api/staticmap?center=${location.latitude},${location.longitude}&zoom=14&size=400x200&maptype=roadmap&markers=color:red%7Clabel:L%7C${location.latitude},${location.longitude}&key=${process.env.EXPO_PUBLIC_API_mapKey}` }} style={styles.image} />
}
    </View>
  )
}

const styles = StyleSheet.create({
  image:{
    width: 100,
    height: 100
  },
})