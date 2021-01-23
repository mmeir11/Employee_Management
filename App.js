import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import Navigator from './navigation/Navigation';
import config from './src/config';
import * as firebase from 'firebase';

// initialize Firebase
if (!firebase || !firebase.apps) {
  console.log("!firebase");
}
else if (!firebase.apps.length) {
  firebase.initializeApp(config.firebaseConfig);
}

export default function App() {
  return (
    <NavigationContainer style={styles.container}>
      <Navigator />
    </NavigationContainer>
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
