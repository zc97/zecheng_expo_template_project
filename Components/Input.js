import { Button, StyleSheet, Text, TextInput, View, Modal} from 'react-native';
import React from 'react'
import { useState } from 'react';


export default function Input({isFocus, inputHandler, inputVisibility}) {
    const [text, setText] = useState("");
    const [showMessage, setShowMessage] = useState(false);

    const handleConfirm = () => {
        console.log(text)
        inputHandler(text)
    }

    return (
    <Modal visible={inputVisibility} animationType="slide">
        <View style={styles.container}>
            <TextInput 
                placeholder='something to type'
                keyboardType='defualt' 
                style={styles.textInputStyle}
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
            <View style={styles.buttonContainer}>
                <Button title="Confirm" onPress={handleConfirm}></Button>
            </View>
        </View>
    </Modal>
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: 'skyblue',
      alignItems: 'center',
      justifyContent: 'center',
    },
    textInputStyle: {
        borderWidth: 2,
        borderColor: 'black',
        color: 'blue',
        fontSize:20,
    },
    buttonContainer: {
        width:"30%",
        marginVertical: 30,
    }
  });
  