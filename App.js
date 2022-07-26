import React, { useEffect, useContext } from "react";
import { StyleSheet, Text, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useFonts } from 'expo-font';

import LoginScreen from './src/screens/LoginScreen';
import RegisterScreen from './src/screens/RegisterScreen';
import HomeScreen from './src/screens/HomeScreen';
import ChatScreen from './src/screens/ChatScreen';

import { AuthProvider, AuthContext } from './src/auth/AuthContext';

import { ChatProvider } from './src/context/chat/ChatContext';
import { SocketProvider } from './src/context/SocketContext';
import { AppRouter } from "./src/router/AppRouter";

const Stack = createNativeStackNavigator();

const globalScreenOptions = {
  headerStyle: { backgroundColor: '#2C6BED' },
  headerTitleStyle: { color: 'white' },
  headerTintColor: 'white'
}

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

            {/* <NavigationContainer>
              <Stack.Navigator
                screenOptions={globalScreenOptions}
              >

                <Stack.Screen options={{
                  title: 'Lets Sign Up',
                }}
                  name="Login"
                  component={LoginScreen}
                />
                <Stack.Screen
                  name="Register"
                  component={RegisterScreen}
                />

                <Stack.Screen
                  name="Home"
                  component={HomeScreen}
                />

                <Stack.Screen
                  name="ChatScreen"
                  component={ChatScreen}
                />

              </Stack.Navigator>
            </NavigationContainer> */}

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
