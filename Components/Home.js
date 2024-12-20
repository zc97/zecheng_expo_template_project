
import { StatusBar } from 'expo-status-bar';
import { Button, StyleSheet, Text, TextInput, View, SafeAreaView, Alert, ScrollView, FlatList } from 'react-native';
import Header from './Header';
import Input from './Input';
import { useState, useEffect } from 'react';
import GoalItem from './GoalItem';
import { writeToDB, deleteFromDB, deleteAllFromDB } from '../Firebase/firestoreHelper';
import { collection, onSnapshot, query, where } from 'firebase/firestore';
import { database, auth, storage } from '../Firebase/firebaseSetup';
import { ref, uploadBytesResumable } from "firebase/storage";
import Profile from './Profile';

export default function Home({ navigation }) {
  const appName = "Zecheng's App";
  const [inputVisibility, setInputVisibility] = useState(false);
  const [receivedText, setReceivedText] = useState("");
  const [goals, setGoals] = useState([])
  const collectionName = "goals"

  useEffect(() => {
    // querySnapshot is a list of documentSnapshots
    const q = query(collection(database, collectionName), where("owner", "==", auth.currentUser.uid));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      let goalsArray = [];
      snapshot.forEach((docSnapshot) => {
        // populate an array
        goalsArray.push({ ...docSnapshot.data(), id: docSnapshot.id });
      });
      // set to the goals array
      setGoals(goalsArray);
    }, 
    (error) => {
      console.log("Error in onSnapshot: ", error);
      Alert.alert(error.message);
    });
    return () => unsubscribe()
  }, []);

  async function handleImageData(uri) {
    try {
      // fetch the image from the uri
      const response = await fetch(uri);
      if (!response.ok) {
        throw new Error("Error Happened with Status: " + response.status);
      }
      const blob = await response.blob();
      // upload the image to the storage
      const imageName = uri.substring(uri.lastIndexOf('/') + 1);
      const imageRef = ref(storage, `images/${imageName}`)
      const uploadResult = await uploadBytesResumable(imageRef, blob);
      console.log("Image uploaded successfully: ", uploadResult);
    } catch (error) { 
      console.log("Error in fetching the image: ", error);
    }
  }

  async function handleInputData(data) {
    setInputVisibility(false)
    if (data.imageUri) {
      handleImageData(data.imageUri)
    }
    let newGoal = { text: data.text }
    newGoal = { ...newGoal, owner: auth.currentUser.uid }
    // await writeToDB(newGoal, collectionName)
    // setGoals(goals => [...goals, {text: textContent, id: Math.random()}]]
  }

  const handleCancel = () => {
    Alert.alert('Cancel', 'Do you want to cancel the current input of your goal?', [
      {
        text: 'Cancel',
        style: 'cancel',
      },
      {
        text: 'OK',
        onPress: () => setInputVisibility(false)
      },
    ]);
  }

  const headleDelete = (deletedId) => {
    // console.log("goal deleted")
    // setGoals((prevGoals) => {
    //   return prevGoals.filter((goalObj) => {
    //     return goalObj.id != deletedId;
    //   });
    // });
    deleteFromDB(deletedId, collectionName);
  }

  const handleDeleteAll = () => {
    deleteAllFromDB(collectionName);
    // setGoals(goals => []);
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
        <Header name={appName} />
        <Input ifFocus={true} inputHandler={handleInputData} cancelHandler={handleCancel} inputVisibility={inputVisibility} />
        <Button title="Add a goal" onPress={() => { setInputVisibility(true) }}></Button>
      </View>
      <View style={styles.bottomView}>
        <FlatList
          style={styles.scrollView}
          data={goals}

          ItemSeparatorComponent={({ highlighted }) =>
            (<View style={[styles.goalSeparator, highlighted && styles.separatorHighlighted]} />)}

          renderItem={({ item, separators }) => {
            return (
              <GoalItem goalObj={item} deleteHandler={headleDelete} itemSeparator={separators}></GoalItem>
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
    // alignItems: "center",
    flexDirection: "row",
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
    alignItems: "center",
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
  },
  separatorHighlighted: {
    backgroundColor: 'white',
  },
});
