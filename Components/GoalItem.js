import { View, Text, StyleSheet, Pressable, Alert } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native';
import PressableButton from './PressableButton';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

export default function GoalItem({ goalObj, deleteHandler, itemSeparator }) {
	const navigation = useNavigation()

  const handleLongPress = () => {
    Alert.alert(
      "Delete Goal",
      "Are you sure you want to delete this goal?",
      [
        {
          text: "Cancel",
          style: "cancel"
        },
        {
          text: "Delete",
          onPress: () => deleteHandler(goalObj.id)
        }
      ],
      { cancelable: true }
    );
  };

	return (
		<View key={goalObj.id} style={styles.textContainer}>
			<Pressable 
				onPress={() => {
						console.log("GoalItem pressed: ", goalObj)
						navigation.navigate('Details', { pressedGoal: goalObj })
						}}
				onLongPress={handleLongPress}
				onPressIn={() => itemSeparator.highlight()}
				onPressOut={() => itemSeparator.unhighlight()}
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
					<MaterialIcons name="delete" size={24} color="white" />
					{/* <Text style={styles.deleteText}>X</Text> */}
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
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "center",
	},
	horizontal: {
		flex: 1,
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'center',
		padding: 10,
	},
	pressedStyle: {
		backgroundColor: 'white',
	},
	componentStyle: {
		backgroundColor: 'black',
	},
	componentPressedStyle: {
		backgroundColor: 'white',
	},
	deleteText: {
		fontSize: 20,
		color: 'white',
	}
});