import React from 'react';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import UserDashboard from '../screens/user/UserDashboard';
import Chat from '../screens/user/Chat';
import Drivers from '../screens/user/Drivers';
import DriverStackNavigate from './DriverStackNavigate';
import {Text} from 'react-native';

const Tab = createMaterialTopTabNavigator();

function TabNavugate() {
  return (
    <Tab.Navigator
      initialRouteName="Feed"
      screenOptions={{
        tabBarActiveTintColor: '#5C5C5C',
        tabBarLabelStyle: {fontSize: 12},
        borderBottomColor: 'red',
      }}>
      <Tab.Screen
        name="Order"
        component={UserDashboard}
        options={{tabBarLabel: 'Order'}}
      />
      <Tab.Screen
        name="Chat"
        component={Chat}
        options={{tabBarLabel: 'Chat'}}
      />
      <Tab.Screen
        name="Drivers"
        component={DriverStackNavigate}
        options={{tabBarLabel: 'Drivers'}}
      />
    </Tab.Navigator>
  );
}

export default TabNavugate;
