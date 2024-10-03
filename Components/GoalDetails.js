import { Button, StyleSheet, Text, View } from 'react-native'
import React from 'react'

export default function GoalDetails({ navigation, route }) {
    // console.log(route.params.pressedGoal.text)
    const moreDetails = () => {
        navigation.push('Details')
    }

    return (
        <View>
            {/* <Text>GoalDetails</Text> */}
            {route.params ? (
                <Text>Details of {route.params.pressedGoal.text} goal with ID {route.params.pressedGoal.id}</Text>
            ) : (
                <Text> More Details</Text>
            )}
            <Button title='More Details' onPress={() => moreDetails()}></Button>
        </View>
    )
}

const styles = StyleSheet.create({})