import { FlatList, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { writeToDB } from '../Firebase/firestoreHelper';

export default function GoalUsers(goalId) {

  const [users, setUsers] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch('https://jsonplaceholder.typicode.com/users')
        console.log(response.status)
        if(!response.ok) {
          throw new Error('HTTP Error Happened with Status: ' + response.status)
        }
        const data = await response.json()
        console.log(data)
        setUsers(data.map((user) => {
          return user.name
        }))
        data.forEach((user) => {
          writeToDB(user, `goals/${goalId}/users`);
        });
      } catch (error) { 
        console.error(error) 
      }
    }

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