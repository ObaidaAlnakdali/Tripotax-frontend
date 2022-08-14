/* eslint-disable prettier/prettier */
import React, {useEffect} from 'react';
const typeImage = require("../../assets/image/type.png");

import {
  SafeAreaView,
  StyleSheet,
  Text,
  Image,
  TouchableOpacity,
} from 'react-native';

function Home({ navigation }) {
    return (
        <SafeAreaView style={styles.Container}>
            <Text style={styles.title}><Text style={{color:'#FFC12D'}}>W</Text>ho are you</Text>
            <Image
                style={styles.image}
                source={typeImage}
            />
            <TouchableOpacity style={styles.btn}  onPress={() => navigation.navigate("Signin", { type:'driver' })}>
                <Text style={styles.text}>Driver</Text>
            </TouchableOpacity>
            <Text style={{marginTop: 30, fontWeight: 'bold'}}>OR</Text>
            <TouchableOpacity style={styles.btn}  onPress={() => navigation.navigate("Signin", { type:'user' })}>
                <Text style={styles.text}>User</Text>
            </TouchableOpacity>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
   Container: {
      flex: 1,
      alignItems: 'center',
      backgroundColor:'#fff',
    },
    title: {
        fontSize: 24,
        margin: 30,
        color: '#5C5C5C',
        fontWeight: 'bold',
    },
    btn: {
        marginTop: 30,
        paddingHorizontal: 80,
        paddingVertical: 40,
        justifyContent:'center',
        borderWidth: 2,
        borderRadius: 35 ,
        borderColor: '#FFC12D',
    },
    text: {
        color: '#787878',
        fontWeight: 'bold',
        fontSize: 18,
    },
    image:{
        marginBottom: 20,
    },
  });

export default Home;
