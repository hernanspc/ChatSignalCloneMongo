import React, { useLayoutEffect, useState } from 'react'
import { StyleSheet, View, KeyboardAvoidingView } from 'react-native'
import { StatusBar } from 'expo-status-bar';
import { useNavigation } from '@react-navigation/native';
import { Button, Input, Text, Image } from 'react-native-elements'

const RegisterScreen = () => {
    const navigation = useNavigation();

    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [imageUrl, setImageUrl] = useState("")

    useLayoutEffect(() => {
        navigation.setOptions({
            headerBackTitle: "Login"
        })
    }, [navigation])

    const register = () => {
        console.log('register')
        //guardar en contexto
        navigation.navigate('Home');
    }

    return (
        <KeyboardAvoidingView behavior="padding" style={styles.container}>
            <StatusBar style="light" />

            <Text h4 style={{ marginBottom: 50, }} >
                Create a Signal account
            </Text>

            <View style={styles.inputContainer}>
                <Input
                    placeholder='Enter Full Name'
                    autoFocus
                    type="text"
                    value={name}
                    onChangeText={(text) => setName(text)}
                />
                <Input
                    placeholder='Email'
                    autoFocus
                    type="email"
                    value={email}
                    onChangeText={(text) => setEmail(text)}
                />
                <Input
                    placeholder='Password'
                    autoFocus
                    type="password"
                    value={password}
                    onChangeText={(text) => setPassword(text)}
                />
                <Input
                    placeholder='Profile Picture URL (optional)'
                    type="text"
                    value={imageUrl}
                    onChangeText={(text) => setImageUrl(text)}
                    onSubmitEditing={register}
                />
            </View>
            <Button
                containerStyle={styles.button}
                raised
                onPress={register}
                title="Register"
            />
        </KeyboardAvoidingView >
    )
}

export default RegisterScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 10,
        backgroundColor: 'white',
    },
    button: {
        width: 200,
        marginTop: 10,
    },
    inputContainer: {
        width: 300,
    }
})