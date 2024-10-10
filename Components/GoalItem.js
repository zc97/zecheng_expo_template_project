import { View, Text, StyleSheet, Button, Pressable } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native';


export default function GoalItem({ goalObj, deleteHandler }) {
	const navigation = useNavigation()

	function handleDelete() {
		deleteHandler(goalObj.id);
	}

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
				<Button title='X' color="#292929" onPress={handleDelete} />
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
	}
});