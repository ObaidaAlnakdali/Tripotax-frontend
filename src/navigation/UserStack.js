import React from 'react';
import UserDashboard from '../screens/user/UserDashboard';
import Profile from '../screens/user/Profile';
import MyOrders from '../screens/user/MyOrders';

import {createDrawerNavigator} from '@react-navigation/drawer';

import CustomDrawer from '../components/CustomeDrower';
import Ionicons from 'react-native-vector-icons/Ionicons';
import TabNavugate from './TabNavugate';

const Drawer = createDrawerNavigator();

function UserStack() {
  return (
    <Drawer.Navigator
      drawerContent={props => <CustomDrawer {...props} />}
      screenOptions={{
        drawerActiveBackgroundColor: '#FFC12D',
        drawerActiveTintColor: '#fff',
        drawerInactiveTintColor: '#333',
        drawerLabelStyle: {
          marginLeft: -25,
          fontFamily: 'Roboto-Medium',
          fontSize: 15,
        },
      }}>
      <Drawer.Screen
        name="Home"
        component={TabNavugate}
        options={{
          drawerIcon: ({color}) => (
            <Ionicons name="home-outline" size={22} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="Profile"
        component={Profile}
        options={{
          drawerIcon: ({color}) => (
            <Ionicons name="person-outline" size={22} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="My Orders"
        component={MyOrders}
        options={{
          drawerIcon: ({color}) => (
            <Ionicons name="person-outline" size={22} color={color} />
          ),
        }}
      />
    </Drawer.Navigator>
  );
}

export default UserStack;
