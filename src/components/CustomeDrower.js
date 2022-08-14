/* eslint-disable react-native/no-inline-styles */
import React, {useContext} from 'react';
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
} from 'react-native';
import {
  DrawerContentScrollView,
  DrawerItemList,
} from '@react-navigation/drawer';
import AuthContext from '../context/AuthContext';

import Ionicons from 'react-native-vector-icons/Ionicons';
//import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

const CustomDrawer = props => {
  const {logout, userData, IP} = useContext(AuthContext);
  const Image_Http_URL = {
    uri: `http://${IP}:8000/images/${userData?.personalImage}`,
  };

  return (
    <SafeAreaView style={{flex: 1}}>
      <DrawerContentScrollView
        {...props}
        contentContainerStyle={{backgroundColor: '#FFC12D'}}>
        <View
          style={{
            paddingHorizontal: 40,
            paddingTop: 80,
            paddingBottom: 20,
            backgroundColor: '#FFC12D',
          }}>
          <Image
            source={Image_Http_URL}
            style={{height: 80, width: 80, borderRadius: 40, marginBottom: 10}}
          />
          <Text style={styles.textTitle}>{userData?.fullName}</Text>
        </View>
        <View style={{flex: 1, backgroundColor: '#fff', paddingTop: 40}}>
          <DrawerItemList {...props} />
        </View>
      </DrawerContentScrollView>
      <View style={{padding: 20, borderTopWidth: 1, borderTopColor: '#ccc'}}>
        <TouchableOpacity
          onPress={() => logout()}
          style={{paddingVertical: 15}}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Ionicons name="exit-outline" size={22} />
            <Text style={styles.text}>Sign Out</Text>
          </View>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  textTitle: {
    color: '#3E4958',
    fontSize: 18,
    fontFamily: 'Roboto-Medium',
    marginBottom: 5,
  },
  text: {
    fontSize: 15,
    fontFamily: 'Roboto-Medium',
    marginLeft: 5,
  },
});

export default CustomDrawer;
