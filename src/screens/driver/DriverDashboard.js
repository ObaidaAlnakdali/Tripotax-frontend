import React, {useContext} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  Image,
  TouchableOpacity,
} from 'react-native';
import AuthContext from '../../context/AuthContext';

function DriverDashboard() {
  const {logout} = useContext(AuthContext);

  return (
    <SafeAreaView style={styles.Container}>
      <TouchableOpacity onPress={() => logout()}>
        <Text>DriverDashboard</Text>
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

export default DriverDashboard;
