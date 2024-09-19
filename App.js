import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, TextInput, View } from 'react-native';
import Header from './Components/Header';
import Input from './Components/Input';

export default function App() {
  const appName = "Zecheng's App";

  const handleInputData = () => {

  }

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <Header name={appName} />
      <Input ifFocus={true} headleInput={handleInputData} />
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
