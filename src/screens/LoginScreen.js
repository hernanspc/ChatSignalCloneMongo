import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React, { useEffect } from 'react'
import { useNavigation } from '@react-navigation/native';

const LoginScreen = () => {
    const navigation = useNavigation();

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