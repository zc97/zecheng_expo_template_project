import { Button, StyleSheet, Text, TextInput, View } from 'react-native';
import React from 'react'
import { useState } from 'react';


export default function Input({isFocus, inputHandler}) {
    const [text, setText] = useState("");
    const [showMessage, setShowMessage] = useState(false);

    const handleConfirm = () => {
        console.log(text)
        inputHandler(text)
    }

    return (
    <View>
        <TextInput 
            placeholder='something to type'
            keyboardType='defualt' 
            style={{borderBlockColor:'purple', borderBottomWidth:1}}
            value={text}
            onChangeText={function (changedText) {
                setText(changedText);
                setShowMessage(false);
            } }
            autoFocus={isFocus}
            onBlur={() => {
                setShowMessage(true)}}
        />
        

        {text.length > 0 && !showMessage && (
                <Text>
                    Character count: {text.length}
                </Text>
            )}

        {showMessage && (
            <Text>
                {text.length >= 3 ? 'Thank you' : 'Please type more than 3 characters'}
            </Text>
        )}
        <Button title="Confirm" onPress={handleConfirm}></Button>
    </View>
    )
}