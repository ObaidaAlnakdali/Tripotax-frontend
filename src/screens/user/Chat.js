import React, {useContext} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  Image,
  TouchableOpacity,
} from 'react-native';

function Chat() {
  return (
    <SafeAreaView style={styles.Container}>
      <TouchableOpacity>
        <Text>Chat</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  Container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#fff',
  },
});

export default Chat;
