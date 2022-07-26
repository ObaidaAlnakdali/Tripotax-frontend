import React, {useState, useContext} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  SyncStorage,
  Dimensions,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
// Import vector icons
import Icon from 'react-native-vector-icons/FontAwesome';
import AuthContext from '../../context/AuthContext';
import axios from 'axios';

function Signup({navigation, route}) {
  const {type} = route.params;
  const [firstName, onChangeFirstName] = useState('');
  const [middleName, onChangeMiddleName] = useState('');
  const [lastName, onChangeLastName] = useState('');
  const [email, onChangeEmail] = useState('');
  const [password, onChangePassword] = useState('');
  const {signup} = useContext(AuthContext);

  return (
    <SafeAreaView style={styles.Container}>
      <Text style={styles.title}>
        <Text style={styles.textOrang}> {type[0].toUpperCase()}</Text>
        {type.substring(1)}
        <Text style={styles.textOrang}> S</Text>ignup
      </Text>
      <View style={styles.inputField}>
        <Text style={styles.inputTitle}>First name</Text>
        <TextInput
          style={styles.inputTxt}
          onChangeText={onChangeFirstName}
          value={firstName}
        />
      </View>
      <View style={styles.inputField}>
        <Text style={styles.inputTitle}>Middle name</Text>
        <TextInput
          style={styles.inputTxt}
          onChangeText={onChangeMiddleName}
          value={middleName}
        />
      </View>
      <View style={styles.inputField}>
        <Text style={styles.inputTitle}>Last name</Text>
        <TextInput
          style={styles.inputTxt}
          onChangeText={onChangeLastName}
          value={lastName}
        />
      </View>
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
      <TouchableOpacity
        style={styles.btn}
        onPress={() =>
          signup(firstName, middleName, lastName, email, password, type)
        }>
        <Text style={styles.btnText}>Signup</Text>
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
        <Text style={styles.footerText}>Already have an account</Text>
        <TouchableOpacity
          onPress={() => navigation.navigate('Signin', {type: type})}>
          <Text style={[styles.textOrang, {fontWeight: 'bold', fontSize: 10}]}>
            {' '}
            Signin
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
    marginTop: 30,
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
    marginTop: 30,
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

export default Signup;
