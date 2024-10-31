import { FlatList, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { realAllDocs, writeToDB } from '../Firebase/firestoreHelper';

export default function GoalUsers(goalId) {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        // Check if data is already in the database
        const dataFromDB = await realAllDocs(`goals/${goalId.goalId}/users`)
        if (dataFromDB.length > 0) {
          console.log('fetching data from DB')
          setUsers(dataFromDB.map((user) => {
            return user.name
          }))
          return
        }

        // If data is not in the database, fetch it from the API
        console.log('fetching data from API')
        const response = await fetch('https://jsonplaceholder.typicode.com/users')
        console.log(response.status)
        if(!response.ok) {
          throw new Error('HTTP Error Happened with Status: ' + response.status)
        }
        const data = await response.json()
        setUsers(data.map((user) => {
          return user.name
        }))

        // Write data to the database, so we don't have to fetch it again
        data.forEach((user) => {
          writeToDB(user, `goals/${goalId.goalId}/users`);
        });
      } catch (error) {
        console.error(error) 
      }
    }

    // Call the async function at the first time the component is rendered
    fetchData();
  }, []);

  return (
    <View>
      <Text>GoalUsers:</Text>
      <FlatList
          style={styles.scrollView}
          data={users}
          renderItem={({item, separators}) => {
            return (
              <Text> {item} </Text>
            );
          }}
        ></FlatList>
    </View>
  )
}

const styles = StyleSheet.create({})