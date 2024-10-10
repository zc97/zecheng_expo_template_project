import { View, Text, StyleSheet, Button, Pressable } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native';
import PressableButton from './PressableButton';
import { MaterialIcons } from '@expo/vector-icons';

export default function GoalItem({ goalObj, deleteHandler }) {
	const navigation = useNavigation()

	return (
		<View key={goalObj.id} style={styles.textContainer}>
			<Pressable 
				onPress={() => {
						navigation.navigate('Details', { pressedGoal: goalObj })
						}}
				android_ripple = {{ color: 'white', borderless: true }}
				style = {({ pressed }) => {return [
					styles.horizontal,
					pressed ? styles.pressedStyle : null,
				]}}
			>
				<Text style={styles.text}>{goalObj.text}</Text>
				<PressableButton 
					pressedFunction={() => {
						deleteHandler(goalObj.id)
					}}
					componentStyle={styles.componentStyle}
					componentPressedStyle={styles.componentPressedStyle}
				>
					<Text style={styles.deleteText}>X</Text>
					{/* <MaterialIcons name="delete" size={24} color="white" style={styles.deleteIcon} /> */}
				</PressableButton>
			</Pressable>
		</View>
	);
}

const styles = StyleSheet.create({
	text: {
		color: "purple",
		padding: 15,
		fontSize: 20,
	},
	textContainer: {
		backgroundColor: "#aaa",
		borderRadius: 5,
		// marginTop: 20,
		marginHorizontal: 30,
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "center",
	},
	horizontal: {
		flexDirection: 'row',
		alignItems: 'center',
	},
	pressedStyle: {
		backgroundColor: 'white',
	},
	componentStyle: {
		backgroundColor: 'purple',
	},
	componentPressedStyle: {
		backgroundColor: 'white',
	},
	deleteText: {
		fontSize: 20,
		color: 'white',
	}
});