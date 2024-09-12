import { StyleSheet, Text, TextInput, View } from 'react-native';
import React from 'react'
import { useState } from 'react';


export default function Input() {
    const [text, setText] = useState("");
    return (
    <View>
        <TextInput 
        placeholder='something to type'
        keyboardType='defualt' 
        style={{borderBlockColor:'purple', borderBottomWidth:1}}
        value={text}
        onChangeText={function (changedText) {
            setText(changedText)
        } }/>
        <Text>{text}</Text>
    </View>
    )
}