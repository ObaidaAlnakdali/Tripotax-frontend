import React, {useState, useEffect, useContext} from 'react';
import {
  SafeAreaView,
  ActivityIndicator,
  Text,
  View,
  Image,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  Platform,
  Linking,
  Alert,
  Modal,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import Icons from 'react-native-vector-icons/MaterialCommunityIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AuthContext from '../../context/AuthContext';
import axios from 'axios';

export default function DriverProfile({navigation, route}) {
  const {id} = route.params;
  const {IP} = useContext(AuthContext);

  const [driver, setDriver] = useState({});
  const [loading, setLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [defaultRaiting, setDefaultRaiting] = useState(2);
  const [maxRaiting, setMaxRaiting] = useState([1, 2, 3, 4, 5]);

  const Image_Http_URL = {
    uri: `http://${IP}:8000/images/${driver?.personalImage}`,
  };
  const starImageFilled =
    'https://raw.githubusercontent.com/tranhonghan/images/main/star_filled.png';
  const starImageCorner =
    'https://raw.githubusercontent.com/tranhonghan/images/main/star_corner.png';

  const CustomeRaitingBar = () => {
    return (
      <View style={styles.customeRaitingBarStyle}>
        {maxRaiting.map((item, key) => {
          return (
            <TouchableOpacity
              activeOpacity={0.7}
              key={item}
              onPress={() => setDefaultRaiting(item)}>
              <Image
                style={styles.starImageStyle}
                source={
                  item <= defaultRaiting
                    ? {uri: starImageFilled}
                    : {uri: starImageCorner}
                }
              />
            </TouchableOpacity>
          );
        })}
      </View>
    );
  };

  const getDriver = () => {
    setLoading(false);
    axios
      .get(`http://${IP}:8000/api/driver/${id}`)
      .then(res => {
        setDriver(res.data.response);
        console.log(res.data.response);
        setLoading(true);
      })
      .catch(err => console.log(err));
  };

  const openDialScreen = () => {
    let phoneNumber = '';
    if (Platform.OS === 'android') {
      phoneNumber = `tel:${driver?.phoneNumber}`;
    } else {
      phoneNumber = `telprompt:${driver?.phoneNumber}`;
    }
    Linking.openURL(phoneNumber);
  };

  const addRate = async () => {
    let userID = await AsyncStorage.getItem('id');
    let form = {userId: userID, rate: defaultRaiting};
    axios
      .post(`http://${IP}:8000/api/driver/addRaiting/${id}`, form)
      .then(res => {
        console.log(res.data.response);
        setModalVisible(!modalVisible);
      })
      .catch(err => console.log(err));
  };

  useEffect(() => {
    getDriver();
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
            <Text style={styles.modalText}>Raiting</Text>
            <CustomeRaitingBar />
            <View style={{flexDirection: 'row'}}>
              <TouchableOpacity
                style={styles.buttonAdd}
                onPress={() => addRate()}>
                <Text style={styles.textStyleButtonAdd}>Rate</Text>
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
      {!loading ? (
        <View style={styles.loading}>
          <ActivityIndicator size={'large'} color="#FFC12D" />
        </View>
      ) : (
        <ScrollView>
          <View style={styles.Container}>
            <View style={[styles.row, styles.head]}>
              <TouchableOpacity
                onPress={() => navigation.navigate('DriversList')}>
                <View style={styles.leftIconView}>
                  <Icon
                    style={styles.leftIcon}
                    name="chevron-circle-left"
                    size={20}
                    color="#656565"
                  />
                </View>
              </TouchableOpacity>
              <Text style={styles.headTitle}>Driver Detail</Text>
            </View>
            <View style={styles.first}>
              <Image source={Image_Http_URL} style={styles.image} />
              <Text style={styles.firstTitle}>{driver?.fullName}</Text>
              <View style={[styles.row, {margin: 10}]}>
                <Text style={styles.phoneNumber}>{driver?.phoneNumber}</Text>
                <Icon
                  style={styles.leftIcon}
                  name="copy"
                  size={18}
                  color="#FFC12D"
                />
              </View>
              <View style={styles.rateIcon}>
                <TouchableOpacity onPress={() => setModalVisible(true)}>
                  <Icons
                    name="card-account-details-star"
                    size={25}
                    color="#373737"
                  />
                </TouchableOpacity>
              </View>
            </View>
            <View style={[styles.row, styles.seccond]}>
              <View style={styles.center}>
                <View style={styles.viewIcon}>
                  <Icon name="star-half-alt" size={25} color="#373737" />
                </View>
                <Text style={styles.rate}>
                  {driver.Rate?.rate
                    ? Math.round(driver.Rate?.rate * 10) / 10
                    : driver?.Rate}
                </Text>
                <Text style={styles.textUnderIcon}>Raiting</Text>
              </View>
              <View style={styles.center}>
                <View style={styles.viewIcon}>
                  <Icon name="clock" size={25} color="#373737" />
                </View>
                <Text style={styles.rate}>5</Text>
                <Text style={styles.textUnderIcon}>year</Text>
              </View>
            </View>
            <View style={styles.seccond}>
              <View style={[styles.row, styles.details]}>
                <Text style={styles.detailsTitle}>Email</Text>
                <Text style={styles.detailsContent}>{driver?.email}</Text>
              </View>
              <View style={[styles.row, styles.details]}>
                <Text style={styles.detailsTitle}>Car Model</Text>
                <Text style={styles.detailsContent}>Marcedes-Benz E-Class</Text>
              </View>
              <View style={[styles.row, styles.details]}>
                <Text style={styles.detailsTitle}>City</Text>
                <Text style={styles.detailsContent}>{driver.city?.name}</Text>
              </View>
              <View style={[styles.row, styles.details]}>
                <Text style={styles.detailsTitle}>Status</Text>
                <Text style={styles.detailsContent}>{driver?.status}</Text>
              </View>
            </View>
            <View style={styles.end}>
              <TouchableOpacity>
                <View style={styles.endIcon}>
                  <Icon name="comment-dots" size={30} color="#373737" />
                </View>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => openDialScreen()}>
                <View style={styles.endIcon}>
                  <Icon name="phone-alt" size={30} color="#373737" />
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  Container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  center: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  head: {
    margin: 10,
    alignItems: 'center',
    width: Dimensions.get('window').width - 40,
  },
  headTitle: {
    fontSize: 20,
    marginLeft: 10,
    color: '#373737',
    fontWeight: '500',
  },
  leftIconView: {
    marginTop: 2,
    shadowColor: '#000',
    elevation: 20,
  },
  leftIcon: {},
  first: {
    margin: 10,
    backgroundColor: '#fcfcfc',
    borderRadius: 35,
    padding: 18,
    alignItems: 'center',
    width: Dimensions.get('window').width - 80,
    shadowColor: '#000',
    elevation: 8,
    position: 'relative',
  },
  rateIcon: {
    position: 'absolute',
    right: 20,
    top: 20,
    borderRadius: 100,
    backgroundColor: '#FFC12D',
    padding: 10,
  },
  image: {
    height: 100,
    width: 100,
    borderRadius: 100,
    marginBottom: 10,
  },
  firstTitle: {
    fontSize: 16,
    color: '#656565',
    fontWeight: '500',
  },
  phoneNumber: {
    fontSize: 12,
    color: '#656565',
    marginRight: 10,
    fontWeight: '500',
  },
  seccond: {
    margin: 10,
    backgroundColor: '#fcfcfc',
    borderRadius: 35,
    padding: 20,
    alignItems: 'center',
    justifyContent: 'space-evenly',
    width: Dimensions.get('window').width - 80,
    shadowColor: '#000',
    elevation: 8,
  },
  viewIcon: {
    borderRadius: 100,
    backgroundColor: '#FFC12D',
    padding: 10,
  },
  rate: {
    fontSize: 14,
    color: '#656565',
    fontWeight: 'bold',
    marginTop: 5,
  },
  textUnderIcon: {
    fontSize: 10,
    color: '#656565',
  },
  details: {
    justifyContent: 'space-between',
    width: Dimensions.get('window').width - 100,
    paddingHorizontal: 30,
    margin: 5,
  },
  detailsTitle: {
    fontSize: 13,
    color: '#656565',
    fontWeight: 'bold',
  },
  detailsContent: {
    fontSize: 12,
    color: '#656565',
    fontWeight: '500',
    textAlign: 'left',
  },
  end: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  endIcon: {
    padding: 12,
    borderRadius: 100,
    backgroundColor: '#FFC12D',
    marginVertical: 20,
    marginHorizontal: 20,
  },
  loading: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
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
  textStyleButtonAdd: {
    color: '#FFC12D',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  textStyleButtonClose: {
    color: '#c11f1f',
    textAlign: 'center',
  },
  customeRaitingBarStyle: {
    justifyContent: 'center',
    flexDirection: 'row',
    margin: 15,
  },
  starImageStyle: {
    width: 30,
    height: 30,
    resizeMode: 'cover',
    margin: 1,
  },
});
