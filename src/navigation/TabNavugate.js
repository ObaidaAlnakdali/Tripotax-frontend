import React from 'react';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import DriverStackNavigate from './DriverStackNavigate';
import OrderStackNavigation from './OrderStackNavigation';
import UserChatStack from './UserChatStack';

const Tab = createMaterialTopTabNavigator();

function TabNavugate() {
  return (
    <Tab.Navigator
      initialRouteName="Feed"
      screenOptions={{
        tabBarActiveTintColor: '#5C5C5C',
        tabBarLabelStyle: {fontSize: 12},
        borderBottomColor: 'red',
        tabBarIndicatorStyle: {backgroundColor: '#FFC12D'},
      }}>
      <Tab.Screen
        name="Order"
        component={OrderStackNavigation}
        options={{tabBarLabel: 'Order'}}
      />
      <Tab.Screen
        name="UserChatStack"
        component={UserChatStack}
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
