import React, { useEffect, useContext } from "react";
import { StyleSheet, Text, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useFonts } from 'expo-font';
import { AuthProvider, AuthContext } from './src/auth/AuthContext';

import { ChatProvider } from './src/context/chat/ChatContext';
import { SocketProvider } from './src/context/SocketContext';
import { AppRouter } from "./src/router/AppRouter";

export default function App() {
  // const [loaded] = useFonts({
  //   Montserrat: require('./assets/fonts/Montserrat.ttf'),
  //   OpenSansBold: require('./assets/fonts/OpenSans-Bold.ttf'),
  //   OpenSansRegular: require('./assets/fonts/OpenSans-Regular.ttf'),
  //   OpenSansSemiBold: require('./assets/fonts/OpenSans-SemiBold.ttf'),
  //   SpaceMonoRegular: require('./assets/fonts/SpaceMono-Regular.ttf'),
  // });

  // if (!loaded) {
  //   return null;
  // }

  return (

    <>
      <ChatProvider>
        <AuthProvider>
          <SocketProvider>
            <AppRouter />
          </SocketProvider>
        </AuthProvider>
      </ChatProvider>
    </>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
