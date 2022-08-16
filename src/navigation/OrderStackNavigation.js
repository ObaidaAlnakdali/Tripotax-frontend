import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import UserDashboard from '../screens/user/UserDashboard';
import Drivers from '../screens/user/Drivers';
import DriverProfile from '../screens/user/DriverProfile';
import Signup from '../screens/main/Signup';

const Stack = createNativeStackNavigator();

function OrderStackNavigation() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="UserDashboard" component={UserDashboard} />
      <Stack.Screen name="DriversList" component={Drivers} />
      <Stack.Screen name="DriverProfile" component={DriverProfile} />
    </Stack.Navigator>
  );
}

export default OrderStackNavigation;
