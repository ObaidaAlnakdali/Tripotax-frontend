import React from 'react';
import {SafeAreaView, Text, View, StyleSheet} from 'react-native';

function MyOrders() {
  return (
    <SafeAreaView>
      <View style={styles.Container}>
        <Text>My Orders</Text>
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

export default MyOrders;
