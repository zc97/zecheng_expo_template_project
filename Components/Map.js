import { Button, StyleSheet, Text, View } from 'react-native'
import React, { useEffect } from 'react'
import MapView, { Marker } from "react-native-maps";

export default function Map({navigation, route}) {
  const [selectedLocation, setSelectedLocation] = React.useState(null);
  function confirmCoordinateHandler() {
    navigation.navigate('Profile', {selectedLocation});
  }

  useEffect(() => {
    if (route.params?.initialLocation) {
      setSelectedLocation(route.params.initialLocation);
    }
  }, []);

  return (
    <>
      <MapView 
        initialRegion={{
          latitude: selectedLocation?selectedLocation.latitude:37.78825,
          longitude: selectedLocation?selectedLocation.longitude:-122.4324,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
        style={styles.map}
        onPress={(event) => {
          console.log(event.nativeEvent.coordinate)
          setSelectedLocation({
            latitude: event.nativeEvent.coordinate.latitude, 
            longitude: event.nativeEvent.coordinate.longitude});
        }}
      >
        { selectedLocation && <Marker coordinate={selectedLocation} />}
      </MapView>
      <Button
        disabled={!selectedLocation}
        title="Comfirm Selected Coordinate" 
        onPress={confirmCoordinateHandler} />
    </>
  )
}

const styles = StyleSheet.create({
  map: {
    flex: 1
  },
})