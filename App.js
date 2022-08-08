import React, {useEffect} from 'react';
import SplashScreen from 'react-native-splash-screen';
import {AuthProvider} from './src/context/AuthContext';
import AppNav from './src/navigation/AppNav';

const App = () => {
  useEffect(() => {
    SplashScreen.hide();
  }, []);

  return (
    <AuthProvider>
      <AppNav />
    </AuthProvider>
  );
};

export default App;
