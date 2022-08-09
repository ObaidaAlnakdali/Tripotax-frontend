import React, {createContext, useState, useEffect} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

export const AuthContext = createContext();

export const AuthProvider = ({children}) => {
  const [isLoading, setIsLoading] = useState(true);
  const [userToken, setUserToken] = useState(null);
  const [userType, setUserType] = useState(null);
  const [userData, setUserData] = useState(null);

  const signup = (firstName, middleName, lastName, email, password, type) => {
    let form = {
      firstName: firstName.trim(),
      middleName: middleName.trim(),
      lastName: lastName.trim(),
      email: email.trim(),
      password: password.trim(),
    };
    console.log(form);
    axios
      .post(`http://192.168.0.106:8000/api/${type}/signup`, form)
      .then(res => {
        console.log(res.data);
        AsyncStorage.setItem('token', res.data.Token);
        AsyncStorage.setItem('type', res.data.type);
        AsyncStorage.setItem('id', res.data[type].id);
        setUserToken(res.data.Token);
        setUserType(res.data.type);
      })
      .catch(err => console.log(err));
  };

  const signin = (email, password, type) => {
    setIsLoading(true);
    let form = {email: email.trim(), password: password.trim()};
    console.log(form);
    //console.log(process.env.URL);
    axios
      .post(`http://192.168.0.115:8000/api/${type}/signin`, form)
      .then(res => {
        console.log(res.data);
        AsyncStorage.setItem('token', res.data.Token);
        AsyncStorage.setItem('type', res.data.type);
        AsyncStorage.setItem('id', res.data.id);
        setUserToken(res.data.Token);
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
        .get(`http://192.168.0.115:8000/api/${type}/${id}`)
        .then(res => {
          setUserData(res.data);
        })
        .catch(err => console.log(err));
    }
  };

  useEffect(() => {
    isLoggedIn();
    getUserData();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        signin,
        signup,
        logout,
        setUserToken,
        setUserType,
        isLoading,
        userToken,
        userType,
        userData,
      }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
