import React from 'react';
import {SafeAreaView, StyleSheet, Text} from 'react-native';

function Signup({route}) {
  const {type} = route.params;
  return (
    <SafeAreaView style={styles.Container}>
      <Text style={styles.title}>
        <Text style={{color: '#FFC12D'}}>S</Text>ignup
      </Text>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  Container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    margin: 30,
    color: '#5C5C5C',
    fontWeight: 'bold',
  },
});

export default Signup;
