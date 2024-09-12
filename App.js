import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, TextInput, View } from 'react-native';
import Header from './Components/Header';
import { useState } from 'react';

export default function App() {
  const appName = "Zecheng's App";
  const [text, setText] = useState("");

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <Header name={appName} />
      <TextInput 
        placeholder='something to type'
        keyboardType='defualt' 
        style={{borderBlockColor:'purple', borderBottomWidth:1}}
        value={text}
        onChangeText={function (changedText) {
          setText(changedText)
        } }/>
      <Text>{text} </Text>
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
});
