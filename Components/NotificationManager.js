import { StyleSheet, Text, View, Button, Alert } from 'react-native'
import React from 'react'
import * as Notification from 'expo-notifications'

export default function NotificationManager() {
  async function verifyPermisson() {
    try {
      const permissionResponse = await Notification.getPermissionsAsync();
      if (permissionResponse.granted) {
        return true
      }
      const newPermission = await Notification.requestPermissionsAsync();
      return newPermission.granted
    } catch (error) {
      console.log("Error in getting notification permissions:", error)
    }
  }
  async function scheduleNotificationHandler() {
    try {
      const hasPermission = await verifyPermisson()
      console.log("Permission: ", hasPermission)
      if (!hasPermission) {
        Alert.alert("You need to give notification permission to schedule a notification.")
        return
      }
      console.log("Scheduling Notification")
      Notification.scheduleNotificationAsync({
        content: {
          title: 'Daily Goals Reminder',
          body: 'Don\'t forget to add your daily goals.'
        },
        trigger: {
          seconds: 3,
        }
      })
    } catch (error) {
      console.log("Error in scheduling notification: ", error)
    }
  }

  return (
    <View>
      <Button title='Remind me to add my daily goals' onPress={scheduleNotificationHandler}></Button>
    </View>
  )
}

const styles = StyleSheet.create({})