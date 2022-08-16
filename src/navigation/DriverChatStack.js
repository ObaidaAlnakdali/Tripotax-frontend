import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import DriverDashboard from '../screens/driver/DriverDashboard';
import Chat from '../screens/driver/Chat';

const Stack = createNativeStackNavigator();

function DriverChatStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="DriverDashboard" component={DriverDashboard} />
      <Stack.Screen name="ChatDriver" component={Chat} />
    </Stack.Navigator>
  );
}

export default DriverChatStack;
