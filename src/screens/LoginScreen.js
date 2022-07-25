import React, { useEffect, useState } from 'react'
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TouchableOpacity, KeyboardAvoidingView } from 'react-native'
import { useNavigation } from '@react-navigation/native';
import { Button, Input, Image } from 'react-native-elements'

const LoginScreen = () => {
    const navigation = useNavigation();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    // useEffect(() => {
    //     navigation.setOptions({
    //         headerLargeTitle: true,
    //         headerTitle: "Home",
    //         headerRight: () => (
    //             <TouchableOpacity
    //                 onPress={() => navigation.navigate("Stack")}
    //                 style={{
    //                     backgroundColor: "purple",
    //                     width: 30,
    //                     height: 30,
    //                     borderRadius: 10,
    //                     justifyContent: "center",
    //                 }}
    //             >
    //                 <Text
    //                     style={{
    //                         fontSize: 20,
    //                         textAlign: "center",
    //                         color: "white",
    //                     }}
    //                 >+</Text>
    //             </TouchableOpacity>
    //         ),
    //         headerSearchBarOptions: {
    //             placeholder: "Friends",
    //             onChangeText: (event) => {
    //                 searchFilterFunction(event.nativeEvent.text);
    //             },
    //         },
    //     });
    // }, [navigation]);

    const signIn = () => {
        console.log('signIn called')
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
                />
                <Button
                    containerStyle={styles.button}
                    onPress={() => {
                        navigation.navigate('Register');
                    }}
                    type="outline"
                    title="Register"
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