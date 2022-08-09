import React from 'react';
import {SafeAreaView, Text, View, StyleSheet} from 'react-native';

export default function Profile() {
  return (
    <SafeAreaView>
      <View style={styles.Container}>
        <Text>Profile</Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  Container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
