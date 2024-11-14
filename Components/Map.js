import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import MapView, { Marker } from "react-native-maps";

export default function Map() {
  const [selectedLocation, setSelectedLocation] = React.useState(null);
  return (
    <MapView 
      initialRegion={{
        latitude: 37.78825,
        longitude: -122.4324,
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
  )
}

const styles = StyleSheet.create({
  map: {
    flex: 1
  },
})