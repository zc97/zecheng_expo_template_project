import { View, Text, StyleSheet } from 'react-native'
import React from 'react'

export default function GoalItem({goalObj}) {
    return (
        <View key={goalObj.id}  style={styles.textContainerStyle}>
            <Text style={styles.textStyle}>{goalObj.text}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    textContainerStyle: {
        marginVertical: 10,
        backgroundColor: '#ccc',
        borderColor: '#ccc',
        padding: 10,
        borderRadius: 5,
        alignItems: "center",
    },
    textStyle: {
        color: 'blue',
        fontSize:20,
        padding: 5,
    },
});