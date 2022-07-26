import { useNavigation } from '@react-navigation/native'
import React, { useLayoutEffect } from 'react'
import { StyleSheet, Text, View, SafeAreaView, ScrollView, TouchableOpacity } from 'react-native'
import CustomListItem from '../components/CustomListItem'
import { Avatar } from 'react-native-elements'
import { AntDesign, SimpleLineIcons, MaterialCommunityIcons, Ionicons } from '@expo/vector-icons';

const HomeScreen = () => {
    const navigation = useNavigation();

    useLayoutEffect(() => {
        navigation.setOptions({
            title: "Signal",
            headerStyle: { backgroundColor: "#FFF" },
            headerTitleStyle: { color: "black" },
            headerTintColor: "black",
            headerLeft: () => (
                <View style={{ marginLeft: 0, marginBottom: 5 }}>
                    <TouchableOpacity>
                        <Avatar
                            size={40}
                            rounded
                            source={{
                                uri: "https://www.informador.mx/__export/1549313630427/sites/elinformador/img/2019/02/04/rs2298747_mark_zuckerbergx18748676x_crop1549313262992.jpg_423682103.jpg"
                            }} >
                            {/* <Avatar.Accessory size={15} /> */}
                        </Avatar>
                    </TouchableOpacity>
                </View>
            ),
            headerRight: () => (
                <View
                    style={{
                        flexDirection: "row",
                        justifyContent: "space-between",
                        width: 120,
                        marginRight: 5
                    }}
                >
                    <TouchableOpacity activeOpacity={0.5} >
                        <AntDesign name="camerao" size={24} />
                    </TouchableOpacity>
                    <TouchableOpacity activeOpacity={0.5}>
                        <SimpleLineIcons name="pencil" size={24} />
                    </TouchableOpacity>
                    <TouchableOpacity
                        activeOpacity={0.5}
                        onPress={() => {
                            console.log("Salir de la app")
                        }
                        }>
                        <Ionicons name="ios-exit-outline" size={24} />
                    </TouchableOpacity>
                </View>
            )
        })

    }, [])

    const enterChat = () => {
        console.log('enterChat ')
    }

    return (
        <SafeAreaView>
            <ScrollView style={styles.container}>
                <CustomListItem chatName={"Hernan"} enterChat={enterChat} />
                <CustomListItem chatName={"Luchito"} enterChat={enterChat} />
                <CustomListItem chatName={"Jimmito"} enterChat={enterChat} />
            </ScrollView>
        </SafeAreaView>
    )
}

export default HomeScreen

const styles = StyleSheet.create({
    container: {
        height: '100%',
    }
})