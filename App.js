
import { StatusBar } from 'expo-status-bar';
import { Button, StyleSheet, Text, TextInput, View, SafeAreaView, Alert, ScrollView } from 'react-native';
import Header from './Components/Header';
import Input from './Components/Input';
import { useState } from 'react';

export default function App() {
  const appName = "Zecheng's App";
  const [inputVisibility, setInputVisibility] = useState(false);
  const [receivedText, setReceivedText] = useState("");
  const [goals, setGoals] = useState([])

  const handleInputData = (textContent) => {
    setReceivedText(textContent)
    setInputVisibility(false)
    setGoals(goal => [...goals, {text: textContent, id: Math.random()}])
  }

  const handleCancel = () => {
    Alert.alert('Cancel', 'Do you want to cancel the current input of your goal?', [
      {
        text: 'Cancel',
        style: 'cancel', 
      },
      {
        text: 'OK', 
        onPress: () => setInputVisibility(false)},
    ]);
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.topView}>
        <StatusBar style="auto" />
        <Header name={appName}/>
        <Input ifFocus={true} inputHandler={handleInputData} cancelHandler={handleCancel} inputVisibility={inputVisibility} />
        <Button title="Add a goal" onPress={() => {setInputVisibility(true)}}></Button>
      </View>
      <View style={styles.bottomView}>
        <ScrollView style={styles.scrollView}>
          {goals.map((goalObj) => {
            return (
              <View key={goalObj.id}>
                <Text style={styles.textStyle}>{goalObj.text}</Text>
              </View>
            );
            })}
          {/* <Text style={styles.textStyle}>{receivedText}</Text> */}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
  },
  textStyle: {
    color: 'blue',
    fontSize:20,
    marginVertical: 10,
    backgroundColor: 'gray',
    padding: 5,
    borderRadius: 5,
  },
  topView: {
    flex: 1,
    alignItems: "center",
    justifyContent: "space-evenly"
  },
  bottomView: {
    flex: 4,
    backgroundColor: "#fcf",
    alignContent: "center",
    // alignItems: "center",
  },
  scrollView: {
    marginHorizontal: 20,
  }
});
