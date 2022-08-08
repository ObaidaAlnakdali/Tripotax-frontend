import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import UserDashboard from '../screens/user/UserDashboard';

const Stack = createNativeStackNavigator();

function UserStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="UserDashboard" component={UserDashboard} />
    </Stack.Navigator>
  );
}

export default UserStack;
