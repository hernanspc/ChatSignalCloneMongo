import React, { useEffect, useState, useContext } from 'react'
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TouchableOpacity, KeyboardAvoidingView } from 'react-native'
import { useNavigation } from '@react-navigation/native';
import { Button, Input, Image } from 'react-native-elements'
import { AuthContext } from '../auth/AuthContext';

const LoginScreen = () => {
    const navigation = useNavigation();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const { login, leerStorage } = useContext(AuthContext);

    const todoOk = () => {
        return (email.length > 0 && password.length > 0) ? true : false;
    }

    const signIn = () => {
        login(email.toLowerCase(), password.toLowerCase());
    }

    return (
        <KeyboardAvoidingView behavior="padding" style={styles.container}>
            <StatusBar style="light" />
            <Image
                source={{
                    uri: "https://blog.mozilla.org/internetcitizen/files/2018/08/signal-logo.png"
                    // uri: "https://www.pelucaspacos.com/imagenes/Logo_Signal.png"
                    // uri: "https://play-lh.googleusercontent.com/jCln_XT8Ruzp7loH1S6yM-ZzzpLP1kZ3CCdXVEo0tP2w5HNtWQds6lo6aLxLIjiW_X8"
                }}
                style={{ width: 200, height: 200 }}
            />
            <View style={styles.inputContainer}>
                <Input
                    placeholder='Email'
                    autoFocus
                    type="email"
                    value={email}
                    onChangeText={(text) => setEmail(text)}
                />
                <Input
                    placeholder='Password'
                    secureTextEntry
                    autoFocus
                    type="password"
                    value={password}
                    onChangeText={(text) => setPassword(text)}
                />

                <Button
                    containerStyle={styles.button}
                    onPress={signIn}
                    title="Login"
                // disabled={todoOk ? false : true}
                />
                <Button
                    containerStyle={styles.button}
                    onPress={() => {
                        navigation.navigate('Register');
                    }}
                    type="outline"
                    title="Register"
                />

                <Button
                    title="leerStorage"
                    onPress={leerStorage}
                />

            </View>
            <View style={{ height: 100 }}></View>
            {/* <Text style={{
                fontFamily: 'SpaceMonoRegular',
                // fontWeight: 'bold',
                fontSize: 30
            }}>Montserrat</Text>
            <Text style={{ fontSize: 30 }}>Texto Normal</Text> */}

        </KeyboardAvoidingView>
    )
}

export default LoginScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 10,
        backgroundColor: 'white'
    },
    inputContainer: {
        alignItems: 'center',
        width: 300
    },
    button: {
        width: 200,
        marginTop: 10,
    }
})