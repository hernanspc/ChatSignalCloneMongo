import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const LoginScreen = () => {
    return (
        <View style={styles.container}>
            <StatusBar style="auto" />
            {/* <Text>SIGNAL</Text> */}
            <Text style={{
                fontFamily: 'SpaceMonoRegular',
                // fontWeight: 'bold',
                fontSize: 30
            }}>Montserrat</Text>
            <Text style={{ fontSize: 30 }}>Texto Normal</Text>

        </View>
    )
}

export default LoginScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
})