import React, {createContext, useState, useEffect} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

export const AuthContext = createContext();

export const AuthProvider = ({children}) => {
  const [isLoading, setIsLoading] = useState(true);
  const [userToken, setUserToken] = useState(null);
  const [userType, setUserType] = useState(null);
  const [userData, setUserData] = useState(null);
  const [orderData, setOrderData] = useState({});
  const IP = '192.168.0.126';

  const signup = (firstName, middleName, lastName, email, password, type) => {
    setIsLoading(true);
    let form = {
      firstName: firstName.trim(),
      middleName: middleName.trim(),
      lastName: lastName.trim(),
      email: email.trim(),
      password: password.trim(),
    };
    axios
      .post(`http://${IP}:8000/api/${type}/signup`, form)
      .then(async res => {
        console.log('Data', res.data);
        AsyncStorage.setItem('token', res.data.token);
        AsyncStorage.setItem('type', res.data.type);
        AsyncStorage.setItem('id', res.data[type].id);
        setUserToken(res.data.token);
        setUserType(res.data.type);
        setIsLoading(false);
      })
      .catch(err => console.log(err));
  };

  const signin = (email, password, type) => {
    setIsLoading(true);
    let form = {email: email.trim(), password: password.trim()};
    console.log(form);
    //console.log(process.env.URL);
    axios
      .post(`http://${IP}:8000/api/${type}/signin`, form)
      .then(res => {
        console.log(res.data);
        AsyncStorage.setItem('token', res.data.token);
        AsyncStorage.setItem('type', res.data.type);
        AsyncStorage.setItem('id', res.data.id);
        setUserToken(res.data.token);
        setUserType(res.data.type);
        setIsLoading(false);
      })
      .catch(err => console.log(err));
  };

  const logout = async () => {
    setIsLoading(true);
    setUserToken(null);
    setUserType(null);
    await AsyncStorage.removeItem('token');
    await AsyncStorage.removeItem('type');
    await AsyncStorage.removeItem('id');
    setIsLoading(false);
  };

  const isLoggedIn = async () => {
    try {
      setIsLoading(true);
      let token = await AsyncStorage.getItem('token');
      let type = await AsyncStorage.getItem('type');
      setUserToken(token);
      setUserType(type);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  const getUserData = async () => {
    let id = await AsyncStorage.getItem('id');
    let type = await AsyncStorage.getItem('type');
    if (id !== null || id !== undefined) {
      axios
        .get(`http://${IP}:8000/api/${type}/${id}`)
        .then(res => {
          //console.log('user test', res.data.response);
          setUserData(res.data.response);
        })
        .catch(err => console.log(err));
    }
  };

  useEffect(() => {
    isLoggedIn();
    getUserData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    getUserData();
  }, [userToken]);

  return (
    <AuthContext.Provider
      value={{
        signin,
        signup,
        logout,
        setUserToken,
        setUserType,
        setOrderData,
        orderData,
        isLoading,
        userToken,
        userType,
        userData,
        IP,
      }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
