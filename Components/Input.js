import { StyleSheet, Text, TextInput, View } from 'react-native';
import React from 'react'
import { useState } from 'react';


export default function Input({isFocus}) {
    const [text, setText] = useState("");
    const [showMessage, setShowMessage] = useState(false);

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
        
        {/* <Text>{text}</Text> */}

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
    </View>
    )
}