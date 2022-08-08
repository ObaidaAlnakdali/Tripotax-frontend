import React, {useContext} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  Image,
  TouchableOpacity,
} from 'react-native';
import AuthContext from '../../context/AuthContext';

function UserDashboard() {
  const {logout} = useContext(AuthContext);

  return (
    <SafeAreaView style={styles.Container}>
      <TouchableOpacity onPress={() => logout()}>
        <Text>UserDashboard</Text>
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

export default UserDashboard;
