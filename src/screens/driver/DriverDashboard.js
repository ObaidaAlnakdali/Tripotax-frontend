import React, {useContext, useState, useEffect} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  TextInput,
  Image,
  TouchableOpacity,
  Dimensions,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import AuthContext from '../../context/AuthContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/Ionicons';
import axios from 'axios';

function DriverDashboard({navigation}) {
  const [loading, setLoading] = useState(false);
  const [conversations, setConversations] = useState([]);
  const [filterConversations, setFilterConversations] = useState([]);
  const [search, setSearch] = useState('');
  const {IP} = useContext(AuthContext);

  const filterEmp = text => {
    if (text) {
      let newData = conversations.filter(conversation => {
        if (
          conversation.user?.fullName.toLowerCase().includes(text.toLowerCase())
        ) {
          return conversation;
        }
      });
      setFilterConversations(newData);
      setSearch(text);
    } else {
      setFilterConversations(conversations);
      setSearch(text);
    }
  };

  const getConversations = async () => {
    setLoading(false);
    let id = await AsyncStorage.getItem('id');
    axios
      .get(`http://${IP}:8000/api/conversation/getByDriver/${id}`)
      .then(async res => {
        console.log('Data', res.data.response);
        setFilterConversations(res.data.response);
        setConversations(res.data.response);
        setLoading(true);
      })
      .catch(err => console.log(err));
  };

  const Item = ({driver, user, messages}) => (
    <TouchableOpacity
      onPress={() =>
        navigation.navigate('ChatDriver', {messages: messages, user: user})
      }>
      <View style={styles.item}>
        <View style={styles.firstPart}>
          <Image
            source={{uri: `http://${IP}:8000/images/${user?.personalImage}`}}
            style={styles.itemImage}
          />
          <View>
            <Text style={styles.itemName}>{user.fullName}</Text>
            <Text style={styles.itemMessage}>
              {messages[messages.length - 1].content}
            </Text>
          </View>
        </View>
        <View style={styles.SecondPart}>
          <Text style={styles.itemDate}>
            {new Date(messages[messages.length - 1].createdAt)
              .toLocaleDateString()
              .substring(0, 11)}
          </Text>
          <Text style={styles.itemTime}>
            {new Date(messages[messages.length - 1].createdAt)
              .toTimeString()
              .substring(0, 5)}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  const renderItem = ({item}) => (
    <Item driver={item?.driver} user={item?.user} messages={item?.messages} />
  );

  useEffect(() => {
    getConversations();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <SafeAreaView style={styles.Container}>
      <View style={styles.inputField}>
        <Icon
          name="search"
          size={25}
          color="#656565"
          style={styles.searchIcon}
        />
        <TextInput
          placeholder="Search by name or city"
          style={styles.inputTxt}
          onChangeText={text => filterEmp(text)}
          value={search}
        />
      </View>
      {!loading ? (
        <View style={styles.loading}>
          <ActivityIndicator size={'large'} color="#FFC12D" />
        </View>
      ) : (
        <FlatList
          style={styles.body}
          data={filterConversations.reverse()}
          renderItem={renderItem}
          keyExtractor={item => item.id}
        />
      )}
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
    marginBottom: 20,
  },
  loading: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputTxt: {
    height: 45,
    paddingHorizontal: 20,
    paddingLeft: 40,
    borderRadius: 15,
    backgroundColor: '#E9EBEC',
  },
  inputField: {
    position: 'relative',
    width: Dimensions.get('window').width - 70,
    marginTop: 20,
    marginBottom: 15,
  },
  searchIcon: {
    position: 'absolute',
    left: 10,
    top: 8,
    zIndex: 1,
  },
  item: {
    backgroundColor: '#fff',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderRadius: 35,
    borderColor: '#FFC12D',
    marginVertical: 5,
  },
  firstPart: {
    flexDirection: 'row',
  },
  itemImage: {
    height: 60,
    width: 60,
    borderRadius: 40,
    marginHorizontal: 10,
  },
  itemName: {
    fontWeight: 'bold',
    color: '#656565',
    marginBottom: 10,
  },
  itemMessage: {
    fontSize: 10,
    fontWeight: '500',
    color: '#656565',
  },
  SecondPart: {
    marginTop: 5,
    alignSelf: 'flex-start',
  },
  itemDate: {
    fontSize: 10,
    fontWeight: '500',
    color: '#656565',
    marginRight: 20,
  },
  itemTime: {
    fontSize: 9,
    fontWeight: '500',
    color: '#656565',
    marginRight: 20,
  },
});

export default DriverDashboard;
