
import { StatusBar } from 'expo-status-bar';
import { Button, StyleSheet, Text, TextInput, View, SafeAreaView, Alert, ScrollView, FlatList } from 'react-native';
import Header from './Header';
import Input from './Input';
import { useState } from 'react';
import GoalItem from './GoalItem';

export default function Home() {
  const appName = "Zecheng's App";
  const [inputVisibility, setInputVisibility] = useState(false);
  const [receivedText, setReceivedText] = useState("");
  const [goals, setGoals] = useState([])

  const handleInputData = (textContent) => {
    // setReceivedText(textContent)
    setInputVisibility(false)
    setGoals(goals => [...goals, {text: textContent, id: Math.random()}])
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
  
  const headleDelete = (deletedId) => {
    // console.log("goal deleted")
    setGoals((prevGoals) => {
      return prevGoals.filter((goalObj) => {
        return goalObj.id != deletedId;
      });
    });
  }

  const handleDeleteAll = () => {
    setGoals(goals => []);
  }

  const handleDeleteAllAlert = () => {
    Alert.alert(
      "Delete All Goals",
      "Are you sure you want to delete all goals?",
      [
        {
          text: "No",
          style: "cancel"
        },
        { text: "Yes", onPress: handleDeleteAll }
      ]
    );
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
        <FlatList data={goals} renderItem={({item}) => {
            // console.log(item);
            return (
              <GoalItem goalObj={item} deleteHandler={headleDelete}></GoalItem>
            );
          }}
          ListEmptyComponent={
            <View style={styles.headerContainer}>
              <Text style={styles.headerText}>No goals to show</Text>
            </View>
          }
          ListHeaderComponent={goals.length > 0 ? 
            <View style={styles.headerContainer}>
              <Text style={styles.headerText}>My Goals</Text> 
            </View>
            : null
          }

          ListFooterComponent={goals.length > 0 ? 
            <View style={styles.footerContainer}>
              <Button title="Delete All" onPress={handleDeleteAllAlert} />
            </View> 
            : null
          }
          ItemSeparatorComponent={<View style={styles.goalSeparator} />}
        >
        </FlatList>
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
  scrollView: {
    alignItems: "center",
    marginHorizontal: 20,
  },
  topView: {
    flex: 1,
    alignItems: "center",
    justifyContent: "space-evenly"
  },
  bottomView: {
    flex: 4,
    backgroundColor: "#fcf",
  },
  headerContainer: {
    marginVertical: 20,
    alignItems: "center",
  },
  headerText: {
    color: "#E600DE",
    fontSize: 20,
  },
  footerContainer: {
    marginVertical: 10,
    alignItems: "center",
  },
  goalSeparator: {
    height: 3,
    backgroundColor: 'gray',
    marginHorizontal: 20,
    marginVertical: 10,

  }
});
