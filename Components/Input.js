import { Button, StyleSheet, Text, TextInput, View, Modal, Image} from 'react-native';
import React from 'react'
import { useState } from 'react';
import ImageManager from './ImageManager';


export default function Input({isFocus, inputHandler, cancelHandler, inputVisibility}) {
    const [text, setText] = useState("");
    const [showMessage, setShowMessage] = useState(false);
    const [ImageUri, setImageUri] = useState("");
    // const [clearInputText, setClearInputText] = useState(false);
    

    const handleConfirm = () => {
        console.log(text)
        inputHandler({text, ImageUri})
        setText("")
    }

    const handleCancel = () => {
        cancelHandler()
        setText("")
    }

    const receiveImageUri = (imageUri) => {
        console.log('image:', imageUri)
        setImageUri(imageUri)
    }

    return (
    <Modal visible={inputVisibility} animationType="slide" transparent={true}>
        <View style={styles.container}>
            <View style={styles.modalContainer}>
                <Image 
                source={{uri: 'https://cdn-icons-png.flaticon.com/512/2617/2617812.png'}} 
                style={styles.image} 
                alt="An image with an arrow shoting the target" 
                />
                <Image 
                    source={require('../assets/image1.png')} 
                    style={styles.image} 
                    alt="Another image with an arrow shoting the target" 
                />
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

                <ImageManager handleImageUri={receiveImageUri}></ImageManager>
                
                <View style={styles.buttonContainer}>
                    <Button title="Cancel" onPress={handleCancel}></Button>
                    <Button title="Confirm" 
                        onPress={handleConfirm}
                        disabled = {text.length < 3}></Button>
                </View>
            </View>
        </View>
    </Modal>
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
    //   backgroundColor: '#fcf',
      alignItems: 'center',
      justifyContent: 'center',
    },
    modalContainer: {
        backgroundColor: 'rgba(0,0,0,0.7)',
        alignItems: 'center',
        borderRadius: 5,
        padding: 20
    },
    textInputStyle: {
        borderWidth: 2,
        borderColor: 'black',
        padding: 4,
        marginVertical: 30,
        color: 'black',
        fontSize: 20,
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width:"50%",
        marginVertical: 30,
    },
    image: {
        width:100,
        height:100
    },
  });
  