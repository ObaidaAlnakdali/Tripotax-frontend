import React, {useContext, useState, useEffect} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  Dimensions,
  Alert,
  View,
  Modal,
  ScrollView,
  TouchableOpacity,
  Platform,
  TextInput,
  FlatList,
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AuthContext from '../../context/AuthContext';
import axios from 'axios';

import Icon from 'react-native-vector-icons/Feather';

function UserDashboard({navigation}) {
  const {IP, setOrderData} = useContext(AuthContext);
  const [modalVisible, setModalVisible] = useState(false);
  const [date, setDate] = useState(new Date());
  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);
  const [text, setText] = useState('Empty');
  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');
  const [orders, setOrders] = useState([]);

  const [dateTest, setDateTest] = useState('N/A');
  const [timeTest, setTimeTest] = useState('N/A');

  const onChange = (e, selectDate) => {
    const currentDate = selectDate || date;
    setShow(Platform.OS === 'ios');
    if (mode === 'date') {
      let fDate =
        currentDate.getDate() +
        '/' +
        (currentDate.getMonth() + 1) +
        '/' +
        currentDate.getFullYear();
      setDateTest(fDate);
    } else {
      let fTime = currentDate.getHours() + ':' + currentDate.getMinutes();
      setTimeTest(fTime);
      console.log(currentDate);
    }
    console.log(mode);
  };

  const showMode = currentMode => {
    setShow(true);
    setMode(currentMode);
  };

  const AddOrder = async () => {
    let id = await AsyncStorage.getItem('id');
    let form = {
      date: dateTest,
      time: timeTest,
      from: from,
      to: to,
      //user: id,
    };

    setOrders(current => [...current, form]);
    setModalVisible(!modalVisible);
    setDateTest('N/A');
    setTimeTest('N/A');
    setFrom('');
    setTo('');
    // axios
    //   .post(`http://${IP}:8000/api/order/${id}`, form)
    //   .then(res => {
    //     console.log(res.data.NewOrders);
    //     setOrders(orders.unshift(res.data.NewOrders));
    //     setModalVisible(!modalVisible);
    //   })
    //   .catch(err => console.log(err));
  };

  const getOrders = async () => {
    let id = await AsyncStorage.getItem('id');
    axios
      .get(`http://${IP}:8000/api/user/getOrderActiveByUser/${id}`)
      .then(res => {
        console.log('Orders :', res.data);
        setOrders(res.data.orders.reverse());
      })
      .catch(err => console.log(err));
  };

  const selectOrder = (date, time, from, to) => {
    let form = {
      date: date,
      time: time,
      from: from,
      to: to,
    };
    setOrderData(form);
    navigation.navigate('DriversList');
  };

  const Item = ({date, time, from, to}) => (
    <TouchableOpacity onPress={() => selectOrder(date, time, from, to)}>
      <View style={styles.item}>
        <View>
          <View style={styles.itemDataView}>
            <Text style={styles.title}>From :</Text>
            <Text style={styles.data}>{from}</Text>
          </View>
          <View style={styles.itemDataView}>
            <Text style={styles.title}>To :</Text>
            <Text style={styles.data}>{to}</Text>
          </View>
        </View>
        <View>
          <View style={styles.itemDataView}>
            <Text style={styles.title}>Date :</Text>
            <Text style={styles.data}>{date}</Text>
          </View>
          <View style={styles.itemDataView}>
            <Text style={styles.title}>Time :</Text>
            <Text style={styles.data}>{time}</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );

  const renderItem = ({item}) => (
    <Item date={item?.date} time={item?.time} from={item?.from} to={item?.to} />
  );

  useEffect(() => {
    //getOrders();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <SafeAreaView style={styles.Container}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert('Modal has been closed.');
          setModalVisible(!modalVisible);
        }}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>New Order</Text>
            <View style={{flexDirection: 'row'}}>
              <View>
                <TouchableOpacity
                  style={styles.buttonDate}
                  onPress={() => showMode('date')}>
                  <Text style={styles.textStyle}>Add Date</Text>
                </TouchableOpacity>
                <Text style={styles.textStyleDate}>{dateTest}</Text>
              </View>
              <View>
                <TouchableOpacity
                  style={styles.buttonDate}
                  onPress={() => showMode('time')}>
                  <Text style={styles.textStyle}>Add Time</Text>
                </TouchableOpacity>
                <Text style={styles.textStyleDate}>{timeTest}</Text>
              </View>
            </View>
            {show && (
              <DateTimePicker
                testID="dateTimePicker"
                value={date}
                mode={mode}
                is24Hour={true}
                display="default"
                onChange={onChange}
              />
            )}
            <View style={styles.inputField}>
              <Text style={styles.inputTitle}>From</Text>
              <TextInput
                style={styles.inputTxt}
                onChangeText={setFrom}
                value={from}
              />
            </View>
            <View style={styles.inputField}>
              <Text style={styles.inputTitle}>To</Text>
              <TextInput
                style={styles.inputTxt}
                onChangeText={setTo}
                value={to}
              />
            </View>
            <View style={{flexDirection: 'row'}}>
              <TouchableOpacity
                style={styles.buttonAdd}
                onPress={() => AddOrder()}>
                <Text style={styles.textStyleButtonAdd}>Add</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.buttonClose}
                onPress={() => setModalVisible(!modalVisible)}>
                <Text style={styles.textStyleButtonClose}>Close</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      {orders.length === 0 ? (
        <View>
          <Text style={styles.noData}>No Active Orders</Text>
        </View>
      ) : (
        <FlatList
          style={styles.flatList}
          data={orders}
          renderItem={renderItem}
          keyExtractor={item => item.id}
        />
      )}

      <TouchableOpacity
        onPress={() => setModalVisible(true)}
        style={styles.btnNewOrder}>
        <Icon name="plus" size={30} color="#fff" />
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  Container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  btnNewOrder: {
    position: 'absolute',
    right: 25,
    bottom: 30,
    padding: 10,
    backgroundColor: '#FFC12D',
    borderRadius: 100,
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  buttonDate: {
    borderWidth: 2,
    paddingHorizontal: 10,
    paddingVertical: 5,
    justifyContent: 'center',
    borderRadius: 8,
    borderColor: '#787878',
    marginHorizontal: 5,
  },
  buttonAdd: {
    width: 80,
    borderWidth: 2,
    paddingHorizontal: 15,
    paddingVertical: 5,
    justifyContent: 'center',
    borderRadius: 8,
    borderColor: '#FFC12D',
    marginTop: 15,
    marginHorizontal: 5,
  },
  buttonClose: {
    width: 80,
    borderWidth: 2,
    paddingHorizontal: 15,
    paddingVertical: 5,
    justifyContent: 'center',
    borderRadius: 8,
    borderColor: '#c11f1f',
    marginTop: 15,
    marginHorizontal: 5,
  },
  textStyleDate: {
    marginTop: 5,
    textAlign: 'center',
  },
  textStyleButtonAdd: {
    color: '#FFC12D',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  textStyleButtonClose: {
    color: '#c11f1f',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
  inputTxt: {
    height: 45,
    paddingHorizontal: 20,
    borderRadius: 15,
    backgroundColor: '#E9EBEC',
  },
  inputField: {
    width: Dimensions.get('window').width - 150,
    marginTop: 10,
  },
  inputTitle: {
    fontSize: 10,
    padding: 5,
    fontWeight: 'bold',
  },
  flatList: {
    margin: 20,
    flexDirection: 'row',
    width: Dimensions.get('window').width - 50,
  },
  item: {
    backgroundColor: '#fff',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderWidth: 3,
    borderRadius: 35,
    borderColor: '#FFC12D',
    margin: 10,
    shadowColor: '#000',
    elevation: 5,
    width: Dimensions.get('window').width - 80,
  },
  itemDataView: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: Dimensions.get('window').width - 325,
  },
  title: {
    fontWeight: 'bold',
    color: '#656565',
  },
  data: {
    fontSize: 12,
    fontWeight: '400',
    color: '#656565',
  },
  noData: {
    marginTop: 20,
    fontSize: 14,
    fontWeight: 'bold',
    color: '#656565',
  },
});

export default UserDashboard;
