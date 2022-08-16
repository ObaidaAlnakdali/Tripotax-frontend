import React, {useContext, useState} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  Image,
  View,
  Dimensions,
  FlatList,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import AuthContext from '../../context/AuthContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/FontAwesome5';
import Icons from 'react-native-vector-icons/Ionicons';
import axios from 'axios';

function Chat({navigation, route}) {
  const {messages, user, idConversation} = route.params;
  const [messagesReal, setMessagesReal] = useState(messages);
  const {IP} = useContext(AuthContext);
  const [message, setMessage] = useState('');

  const Item = ({senderRef, content, createdAt}) => (
    <View>
      {senderRef === 'Driver' ? (
        <View tyle={styles.textRecever}>
          <Text style={styles.textRecever}>{content}</Text>
          <Text style={styles.textReceverTime}>
            {new Date(createdAt).toTimeString().substring(0, 5)}
          </Text>
        </View>
      ) : (
        <View tyle={styles.textSender}>
          <Text style={styles.textSender}>{content}</Text>
          <Text style={styles.textSenderTime}>
            {new Date(createdAt).toTimeString().substring(0, 5)}
          </Text>
        </View>
      )}
    </View>
  );

  const renderItem = ({item}) => (
    <Item
      senderRef={item?.senderRef}
      content={item?.content}
      createdAt={item?.createdAt}
    />
  );

  const sendMassage = async () => {
    let id = await AsyncStorage.getItem('id');
    let form = {
      sender: id,
      senderRef: 'Driver',
      conversation: idConversation,
      content: message,
    };
    axios
      .post(`http://${IP}:8000/api/message`, form)
      .then(async res => {
        console.log('Data', res.data.response);
        setMessagesReal(current => [...current, res.data.response]);
        setMessage('');
      })
      .catch(err => console.log(err));
  };

  return (
    <SafeAreaView style={styles.Container}>
      <View style={styles.item}>
        <TouchableOpacity
          onPress={() => navigation.navigate('DriverDashboard')}>
          <View style={styles.leftIconView}>
            <Icon
              style={styles.leftIcon}
              name="arrow-left"
              size={20}
              color="#656565"
            />
          </View>
        </TouchableOpacity>
        <Image
          source={{uri: `http://${IP}:8000/images/${user?.personalImage}`}}
          style={styles.itemImage}
        />
        <View>
          <Text style={styles.itemName}>{user?.fullName}</Text>
        </View>
      </View>
      <Text style={styles.itemDate}>
        {new Date(messagesReal[0].createdAt)
          .toLocaleDateString()
          .substring(0, 11)}
      </Text>
      <View style={styles.Container}>
        <FlatList
          style={styles.body}
          data={messagesReal}
          renderItem={renderItem}
          keyExtractor={item => item.id}
        />
      </View>
      <View style={styles.EndPart}>
        <View style={styles.inputField}>
          <TextInput
            placeholder="Message"
            style={styles.inputTxt}
            onChangeText={setMessage}
            value={message}
          />
        </View>
        <TouchableOpacity onPress={() => sendMassage()}>
          <View style={styles.sendIcon}>
            <Icons
              style={styles.leftIcon}
              name="send"
              size={16}
              color="#656565"
            />
          </View>
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
  body: {
    width: Dimensions.get('window').width,
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  item: {
    backgroundColor: '#fff',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingHorizontal: 10,
    paddingVertical: 8,
    //borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: '#FFC12D',
    width: Dimensions.get('window').width,
  },
  itemImage: {
    height: 50,
    width: 50,
    borderRadius: 40,
    marginHorizontal: 10,
  },
  itemName: {
    fontWeight: 'bold',
    color: '#656565',
  },
  itemDate: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#656565',
    marginTop: 12,
  },
  leftIconView: {
    marginLeft: 10,
    marginTop: 2,
    shadowColor: '#000',
    elevation: 20,
  },
  leftIcon: {},
  EndPart: {
    backgroundColor: '#fff',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderTopWidth: 1,
    borderColor: '#fff',
    //borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    width: Dimensions.get('window').width,
  },
  inputTxt: {
    height: 45,
    margin: 10,
    paddingHorizontal: 20,
    borderRadius: 15,
    backgroundColor: '#f6f6f6',
    borderWidth: 1,
    borderColor: '#FFC12D',
  },
  inputField: {
    width: Dimensions.get('window').width - 100,
  },
  sendIcon: {
    padding: 10,
    borderRadius: 100,
    backgroundColor: '#FFC12D',
    marginVertical: 15,
  },
  textRecever: {
    marginVertical: 12,
    padding: 10,
    alignSelf: 'flex-start',
    backgroundColor: '#eeeeee',
    borderTopRightRadius: 20,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    position: 'relative',
  },
  textSender: {
    marginVertical: 12,
    padding: 10,
    alignSelf: 'flex-end',
    backgroundColor: '#FFC12D',
    borderTopLeftRadius: 20,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    position: 'relative',
  },
  textReceverTime: {
    fontSize: 9,
    alignSelf: 'flex-start',
    marginTop: -8,
    color: '#656565',
    fontWeight: 'bold',
  },
  textSenderTime: {
    alignSelf: 'flex-end',
    fontSize: 9,
    marginTop: -8,
    color: '#656565',
    fontWeight: 'bold',
  },
});

export default Chat;
