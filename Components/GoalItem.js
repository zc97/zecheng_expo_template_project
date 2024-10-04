import { View, Text, StyleSheet, Button } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native';

export default function GoalItem({goalObj, deleteHandler}) {
    const navigation = useNavigation()

    function handleDelete() {
        deleteHandler(goalObj.id);
    }
    
    return (
        <View key={goalObj.id}  style={styles.textContainer}>
            <Text style={styles.text}>{goalObj.text}</Text>
            <Button title='X' color="#292929" onPress={handleDelete}/>
            <Button 
                title='i' 
                color="#292929" 
                onPress={() => {
                    navigation.navigate('Details', {pressedGoal: goalObj})
                }}
            />
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
});