import { StatusBar } from 'expo-status-bar';
import { Button, StyleSheet, Text, TextInput, View } from 'react-native';
import Header from './Components/Header';
import Input from './Components/Input';
import { useState } from 'react';

export default function App() {
  const appName = "Zecheng's App";
  const [inputVisibility, setInputVisibility] = useState(false);
  const [receivedText, setReceivedText] = useState("");

  const handleInputData = (textContent) => {
    setReceivedText(textContent)
    setInputVisibility(false)
  }

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <Header name={appName}/>
      <Input ifFocus={true} inputHandler={handleInputData} inputVisibility={inputVisibility} />
      <Text style={styles.textStyle}>{receivedText}</Text>
      <Button title="Add a goal" onPress={() => {setInputVisibility(true)}}></Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  textStyle: {
    color: 'blue',
    fontSize:20,
  }
});
