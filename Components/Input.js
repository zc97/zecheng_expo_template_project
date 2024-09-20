import { Button, StyleSheet, Text, TextInput, View, Modal} from 'react-native';
import React from 'react'
import { useState } from 'react';


export default function Input({isFocus, inputHandler, cancelHandler, inputVisibility}) {
    const [text, setText] = useState("");
    const [showMessage, setShowMessage] = useState(false);
    // const [clearInputText, setClearInputText] = useState(false);
    

    const handleConfirm = () => {
        console.log(text)
        inputHandler(text)
        setText("")
    }

    const handleCancel = () => {
        cancelHandler()
        setText("")
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
                <Button title="Cancel" style={styles.button} onPress={handleCancel}></Button>
                <Button title="Confirm" style={styles.button} onPress={handleConfirm}></Button>
            </View>
        </View>
    </Modal>
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fcf',
      alignItems: 'center',
      justifyContent: 'center',
    },
    textInputStyle: {
        borderWidth: 2,
        borderColor: 'black',
        padding: 4,
        color: 'black',
        fontSize: 20,
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        width:"60%",
        marginVertical: 30,
    },
    button: {
        flex: 1,
        marginHorizontal: 15,
    }
  });
  