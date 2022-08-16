import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Drivers from '../screens/user/Drivers';
import DriverProfile from '../screens/user/DriverProfile';
import Chat from '../screens/user/Chat';

const Stack = createNativeStackNavigator();

function DriverStackNavigate() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="DriversList" component={Drivers} />
      <Stack.Screen name="DriverProfile" component={DriverProfile} />
      <Stack.Screen name="Chat" component={Chat} />
    </Stack.Navigator>
  );
}

export default DriverStackNavigate;
