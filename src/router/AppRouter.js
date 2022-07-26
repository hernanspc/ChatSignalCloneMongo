
import React, { useContext, useEffect } from 'react';
import { AuthContext } from '../auth/AuthContext';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';
import HomeScreen from '../screens/HomeScreen';
import ChatScreen from '../screens/ChatScreen';
import moment from 'moment';
import 'moment/locale/es';
moment.locale('es');

const Stack = createNativeStackNavigator();
const globalScreenOptions = {
    headerStyle: { backgroundColor: '#2C6BED' },
    headerTitleStyle: { color: 'white' },
    headerTintColor: 'white'
}
export const AppRouter = () => {

    const { auth, verificaToken } = useContext(AuthContext);

    useEffect(() => {
        verificaToken();
    }, [verificaToken])


    if (auth?.checking) {
        return <Text>Espere por favor</Text>
    }

    return (
        <>
            <NavigationContainer>
                <Stack.Navigator
                    screenOptions={globalScreenOptions}
                >
                    {
                        auth?.logged ? (
                            <>
                                <Stack.Screen
                                    name="HomeScreen"
                                    component={HomeScreen}
                                />
                                <Stack.Screen
                                    name="ChatScreen"
                                    component={ChatScreen}
                                />
                            </>

                        ) : (
                            <>
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
                            </>
                        )
                    }
                </Stack.Navigator>
            </NavigationContainer>
        </>
    )
}
