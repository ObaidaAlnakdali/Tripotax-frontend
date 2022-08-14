import React, {useContext, useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {View, ActivityIndicator, StyleSheet} from 'react-native';

import MainStack from './MainStack';
import DriverStack from './DriverStack';
import UserStack from './UserStack';

import {AuthContext} from '../context/AuthContext';

function AppNav() {
  const {isLoading, userToken, userType} = useContext(AuthContext);

  if (isLoading) {
    return (
      <View style={styles.Container}>
        <ActivityIndicator size={'large'} color="#FFC12D" />
      </View>
    );
  }

  return (
    <NavigationContainer>
      {userToken === null || userToken === undefined ? (
        <MainStack />
      ) : userType === 'driver' ? (
        <DriverStack />
      ) : (
        <UserStack />
      )}
      {console.log(userType)}
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  Container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default AppNav;
