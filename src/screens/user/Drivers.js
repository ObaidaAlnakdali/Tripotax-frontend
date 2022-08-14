import React, {useContext, useState, useEffect} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  Image,
  FlatList,
  Dimensions,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import axios from 'axios';
import AuthContext from '../../context/AuthContext';
import Icon from 'react-native-vector-icons/Ionicons';

function Drivers({navigation}) {
  const [drivers, setDrivers] = useState([]);
  const [filterDrivers, setFilterDrivers] = useState([]);
  const [search, setSearch] = useState('');
  const {IP} = useContext(AuthContext);

  const filterEmp = text => {
    if (text) {
      let newData = drivers.filter(driver => {
        if (
          driver.fullName.toLowerCase().includes(text.toLowerCase())
          // || driver?.city.toLowerCase().includes(text.toLowerCase())
        ) {
          return driver;
        }
      });
      setFilterDrivers(newData);
      setSearch(text);
    } else {
      setFilterDrivers(drivers);
      setSearch(text);
    }
  };

  const getDrivers = () => {
    axios
      .get(`http://${IP}:8000/api/driver`)
      .then(res => {
        setDrivers(res.data.response);
        setFilterDrivers(res.data.response);
      })
      .catch(err => console.log(err));
  };

  const Item = ({name, id, image, city, Rate, status}) => (
    <TouchableOpacity
      onPress={() => navigation.navigate('DriverProfile', {id: id})}>
      <View style={styles.item}>
        <View style={{alignItems: 'center'}}>
          <Image source={{uri: image}} style={styles.itemImage} />
        </View>
        <View style={{alignItems: 'center'}}>
          <Text style={styles.itemTextName}>{name}</Text>
          <Text style={styles.itemText}>{city.name}</Text>
          <Text style={styles.itemText}>{status}</Text>
        </View>
        <View style={{alignItems: 'center'}}>
          <Icon name="star-half" size={30} color="#FFC12D" />
          <Text style={styles.itemText}>
            {Rate.rate ? Math.round(Rate.rate * 10) / 10 : Rate}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  const renderItem = ({item}) => (
    <Item
      name={item?.fullName}
      id={item?._id}
      image={`http://${IP}:8000/images/${item?.personalImage}`}
      city={item?.city}
      Rate={item?.Rate}
      status={item?.status}
    />
  );

  useEffect(() => {
    getDrivers();
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
      <FlatList
        style={styles.body}
        data={filterDrivers}
        renderItem={renderItem}
        keyExtractor={item => item.id}
      />
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
    justifyContent: 'space-around',
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderWidth: 2,
    borderRadius: 35,
    borderColor: '#FFC12D',
    margin: 10,
    shadowColor: '#000',
    elevation: 5,
  },
  itemImage: {
    height: 70,
    width: 70,
    borderRadius: 40,
  },
  itemText: {
    fontSize: 12,
    color: '#656565',
    fontWeight: '400',
  },
  itemTextName: {
    fontSize: 13,
    fontWeight: 'bold',
    color: '#656565',
    marginBottom: 5,
  },
});

export default Drivers;
