import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import DriverDashboard from '../screens/driver/DriverDashboard';
import {createDrawerNavigator} from '@react-navigation/drawer';

const Drawer = createDrawerNavigator();

const Stack = createNativeStackNavigator();

function DriverStack() {
  return (
    <Drawer.Navigator>
      <Drawer.Screen name="DriverDashboard" component={DriverDashboard} />
    </Drawer.Navigator>
    // <Stack.Navigator>
    //   <Stack.Screen name="DriverDashboard" component={DriverDashboard} />
    // </Stack.Navigator>
  );
}

export default DriverStack;
