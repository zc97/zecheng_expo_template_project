import { Alert, Button, StyleSheet, Text, View, Image, Dimensions } from 'react-native'
import React, { useEffect } from 'react'
import * as Location from 'expo-location'
import { useNavigation, useRoute } from '@react-navigation/native';

const screenWidth = Dimensions.get('window').width;

export default function LocationManager() {
  const [location, setLocation] = React.useState(null);
  const [response, requestPermission] = Location.useForegroundPermissions();
  const navigation = useNavigation();

  const route = useRoute();
  useEffect(() => {
    if (route.params?.selectedLocation) {
      setLocation(route.params.selectedLocation);
    }
  }, [route]);

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

  function chooseLocationHandle() {
    //navigate to the Map.js
    navigation.navigate('Map');
  }

  return (
    <View>
      <Button title="Locate Me" onPress={locateUserHandler} />
      <Button title="Let me choose my location" onPress={chooseLocationHandle} />
      {location && 
            <Image source={{ uri: `https://maps.googleapis.com/maps/api/staticmap?center=${location.latitude},${location.longitude}&zoom=14&size=400x200&maptype=roadmap&markers=color:red%7Clabel:L%7C${location.latitude},${location.longitude}&key=${process.env.EXPO_PUBLIC_API_mapKey}` }} style={styles.image} />
}
    </View>
  )
}

const styles = StyleSheet.create({
  image:{
    width: screenWidth,
    height: 200
  },
})