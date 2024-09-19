import { View, Text, StyleSheet } from 'react-native'

import React from 'react'

export default function Header(props) {
    return (
        <View>
            <Text style = {styles.textStyle}>Welcome to {props.name}!</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    textStyle: {
        borderColor: 'purple',
        borderWidth: 2,
        color: 'purple',
        fontSize:25,
    }
});