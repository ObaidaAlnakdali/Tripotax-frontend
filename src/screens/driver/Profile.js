import React, {useContext, useState} from 'react';
import {
  SafeAreaView,
  Text,
  View,
  StyleSheet,
  ScrollView,
  Image,
  TextInput,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import SelectDropdown from 'react-native-select-dropdown';
import AuthContext from '../../context/AuthContext';

export default function Profile() {
  const {userData, IP} = useContext(AuthContext);
  const [firstName, onChangeFirstName] = useState(userData?.firstName);
  const [middleName, onChangeMiddleName] = useState(userData?.middleName);
  const [lastName, onChangeLastName] = useState(userData?.lastName);
  const [email, onChangeEmail] = useState(userData?.email);
  const [password, onChangePassword] = useState(userData?.password);

  const countries = ['avilable', 'unavilable'];

  const Image_Http_URL = {
    uri: `http://${IP}:8000/images/${userData?.personalImage}`,
  };

  const Update = () => {};

  return (
    <SafeAreaView>
      <ScrollView>
        <View style={styles.Container}>
          <View style={styles.firstPart}>
            <Image source={Image_Http_URL} style={styles.Image} />
            <Text style={styles.textTitle}>{userData?.fullName}</Text>
          </View>
          <View style={styles.firstPart}>
            <Text style={styles.textTitle}>{userData?.fullName}</Text>
          </View>
          <View>
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
              <Text style={styles.inputTitle}>Email</Text>
              <TextInput
                style={styles.inputTxt}
                onChangeText={onChangeEmail}
                value={email}
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
              <Text style={styles.inputTitle}>Last name</Text>
              <TextInput
                style={styles.inputTxt}
                onChangeText={onChangeFirstName}
                value={lastName}
              />
            </View>
            <SelectDropdown
              data={countries}
              onSelect={(selectedItem, index) => {
                console.log(selectedItem, index);
              }}
              buttonTextAfterSelection={(selectedItem, index) => {
                console.log(selectedItem);
              }}
              rowTextForSelection={(item, index) => {
                console.log(item);
              }}
            />
            <TouchableOpacity>
              <Text style={[styles.textOrang, {marginTop: 10, fontSize: 10}]}>
                Change your password?
              </Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.btn} onPress={() => Update()}>
              <Text style={styles.btnText}>Update</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  Container: {
    // flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
    paddingBottom: 30,
  },
  firstPart: {
    margin: 10,
  },
  Image: {
    height: 150,
    width: 150,
    borderRadius: 100,
    margin: 10,
    borderWidth: 3,
    borderColor: '#FFC12D',
  },
  textTitle: {
    color: '#3E4958',
    fontSize: 18,
    fontFamily: 'Roboto-Medium',
    marginBottom: 5,
    textAlign: 'center',
    fontWeight: 'bold',
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
  inputTxt: {
    height: 45,
    paddingHorizontal: 20,
    borderRadius: 15,
    backgroundColor: '#E9EBEC',
  },
  btn: {
    width: Dimensions.get('window').width - 100,
    marginTop: 20,
    paddingVertical: 15,
    justifyContent: 'center',
    borderRadius: 15,
    backgroundColor: '#FFC12D',
  },
  btnText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
    textAlign: 'center',
  },
  textOrang: {
    color: '#FFC12D',
  },
});
