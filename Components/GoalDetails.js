import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

export default function GoalDetails({ navigation, route }) {
    // console.log(route.params.pressedGoal.text)
    return (
        <View>
            {/* <Text>GoalDetails</Text> */}
            <Text>{route.params.pressedGoal.text}</Text>
        </View>
    )
}

const styles = StyleSheet.create({})