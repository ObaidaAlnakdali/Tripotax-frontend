import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import DashboardChat from '../screens/user/DashboardChat';
import Chat from '../screens/user/Chat';

const Stack = createNativeStackNavigator();

function UserChatStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="DashboardChat" component={DashboardChat} />
      <Stack.Screen name="ChatUser" component={Chat} />
    </Stack.Navigator>
  );
}

export default UserChatStack;
