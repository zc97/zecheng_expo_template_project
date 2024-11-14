import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import MapView from "react-native-maps";

export default function Map() {
  return (
    <MapView 
      initialRegion={{
        latitude: 37.78825,
        longitude: -122.4324,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      }}
      style={styles.map} 
    />
  )
}

const styles = StyleSheet.create({
  map: {
    flex: 1
  },
})