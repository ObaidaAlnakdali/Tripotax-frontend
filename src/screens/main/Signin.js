import React, {useState, useContext} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  View,
  Dimensions,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
const signinImage = require('../../assets/image/signin.png');
// Import vector icons
import Icon from 'react-native-vector-icons/FontAwesome';
import AuthContext from '../../context/AuthContext';
import axios from 'axios';

function Signin({navigation, route}) {
  const {type} = route.params;
  const [email, onChangeEmail] = useState('');
  const [password, onChangePassword] = useState('');
  const {signin} = useContext(AuthContext);

  return (
    <SafeAreaView style={styles.Container}>
      <Text style={styles.title}>
        <Text style={styles.textOrang}> {type[0].toUpperCase()}</Text>
        {type.substring(1)}
        <Text style={styles.textOrang}> S</Text>ignin
      </Text>
      <Image style={styles.image} source={signinImage} />
      <View style={styles.inputField}>
        <Text style={styles.inputTitle}>Email</Text>
        <TextInput
          style={styles.inputTxt}
          onChangeText={onChangeEmail}
          value={email}
        />
      </View>
      <View style={styles.inputField}>
        <Text style={styles.inputTitle}>Password</Text>
        <TextInput
          style={styles.inputTxt}
          onChangeText={onChangePassword}
          value={password}
        />
      </View>
      <Text style={[styles.textOrang, {marginTop: 10, fontSize: 10}]}>
        Forgot your password?
      </Text>
      <TouchableOpacity
        style={styles.btn}
        onPress={() => signin(email, password, type)}>
        <Text style={styles.btnText}>Signin</Text>
      </TouchableOpacity>
      <View style={styles.boxLine}>
        <View style={{flex: 1, height: 1, backgroundColor: '#D5DDE0'}} />
        <View>
          <Text style={{width: 150, textAlign: 'center'}}>
            Or continue with
          </Text>
        </View>
        <View style={{flex: 1, height: 1, backgroundColor: '#D5DDE0'}} />
      </View>
      <TouchableOpacity
        style={styles.btnIcon}
        //onPress={() => navigation.navigate('Signin', {type: 'driver'})}
      >
        <Icon name="google" size={30} color="#fff" />
      </TouchableOpacity>
      <View style={styles.footer}>
        <Text style={styles.footerText}>Don’t Have an account</Text>
        <TouchableOpacity
          onPress={() => navigation.navigate('Signup', {type: type})}>
          <Text style={[styles.textOrang, {fontWeight: 'bold', fontSize: 10}]}>
            {' '}
            Signup
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  Container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    margin: 30,
    color: '#5C5C5C',
    fontWeight: 'bold',
  },
  inputTxt: {
    height: 45,
    paddingHorizontal: 20,
    borderRadius: 15,
    backgroundColor: '#E9EBEC',
  },
  image: {
    width: 200,
    height: 100,
    marginBottom: 20,
  },
  inputField: {
    width: Dimensions.get('window').width - 100,
    marginTop: 10,
  },
  inputTitle: {
    fontSize: 10,
    padding: 5,
    fontWeight: 'bold',
  },
  textOrang: {
    color: '#FFC12D',
  },
  btn: {
    width: Dimensions.get('window').width - 100,
    marginTop: 30,
    paddingVertical: 15,
    justifyContent: 'center',
    borderRadius: 15,
    backgroundColor: '#FFC12D',
  },
  btnIcon: {
    marginTop: 20,
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderRadius: 50,
    backgroundColor: '#D5DDE0',
  },
  btnText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 18,
    textAlign: 'center',
  },
  boxLine: {
    flexDirection: 'row',
    alignItems: 'center',
    width: Dimensions.get('window').width - 100,
    marginTop: 50,
  },
  footer: {
    display: 'flex',
    flexDirection: 'row',
    marginTop: 40,
  },
  footerText: {
    fontSize: 10,
  },
});

export default Signin;
