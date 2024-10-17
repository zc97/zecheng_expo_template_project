import { Button, StyleSheet, Text, View } from 'react-native'
import React, { useState, useLayoutEffect } from 'react'
import PressableButton from './PressableButton'
import AntDesign from '@expo/vector-icons/AntDesign';
import { setGoalWarning } from '../Firebase/firestoreHelper';

export default function GoalDetails({ navigation, route }) {
	const [isWarning, setIsWarning] = useState(false)
	const goalId = route.params.pressedGoal.id

	const moreDetails = () => {
		navigation.push('Details')
	}

	useLayoutEffect(() => {
		navigation.setOptions({
			headerRight: () => {
				return (
					<PressableButton
						pressedFunction={() => {
							setIsWarning(true)
							setGoalWarning(goalId)
							navigation.setOptions({ title: 'Warning!' })
						}}
						componentStyle={{backgroundColor: 'white'}}
					>
						<AntDesign name="warning" size={24} color="black"/>
					</PressableButton>
				)
			}
		})
	}, [navigation])

	return (
		<View>
			{/* <Text>GoalDetails</Text> */}
			{route.params ? (
				<Text style={{ color: isWarning ? 'red' : 'black' }} >Details of {route.params.pressedGoal.text} goal with ID {route.params.pressedGoal.id}</Text>
			) : (
				<Text style={{ color: isWarning ? 'red' : 'black' }}> More Details</Text>
			)}
			{/* <Button title='More Details' onPress={() => moreDetails()}></Button> */}
			<PressableButton
				pressedFunction={() => moreDetails()}
			>
				<Text> More Details </Text>
			</PressableButton>
		</View>
	)
}

// const styles = StyleSheet.create({})