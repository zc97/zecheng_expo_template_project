import { StyleSheet, Text, View, Pressable } from 'react-native'
import React from 'react'

export default function PressableButton({ children, componentStyle, pressedFunction }) {
	return (
		<Pressable 
			style={componentStyle}
			onPress={pressedFunction}
		>
			<View>
				{children}
			</View>
		</Pressable>
	)
}

const styles = StyleSheet.create({})