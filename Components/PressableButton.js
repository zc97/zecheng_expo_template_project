import { StyleSheet, Text, View, Pressable } from 'react-native'
import React from 'react'

export default function PressableButton({ children, componentStyle, componentPressedStyle, pressedFunction }) {
	return (
		<Pressable 
			style={({ pressed }) => {return [
				styles.defaultStyle,
				componentStyle,
				pressed ? styles.defultPressedStyle : null,
				pressed ? componentPressedStyle : null,
			]}}
			onPress={pressedFunction}
		>
			<View>
				{children}
			</View>
		</Pressable>
	)
}

const styles = StyleSheet.create({
	defaultStyle: {
		borderRadius: 5,
		padding: 5,
		margin: 5,
		backgroundColor: 'white',
		alignItems: 'center',
	},
	defultPressedStyle: {
		backgroundColor: 'beige',
		opacity: 0.8,
	}
})