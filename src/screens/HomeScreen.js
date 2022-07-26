import React, { useLayoutEffect, useContext } from 'react'
import { useNavigation } from '@react-navigation/native'
import { fetchConToken, fetchSinToken } from '../helpers/fetch';
import { StyleSheet, Text, View, SafeAreaView, ScrollView, TouchableOpacity } from 'react-native'
import CustomListItem from '../components/CustomListItem'
import { Avatar, Button } from 'react-native-elements'
import { AntDesign, SimpleLineIcons, MaterialCommunityIcons, Ionicons } from '@expo/vector-icons';
import { AuthContext } from '../auth/AuthContext'
import { ChatContext } from '../context/chat/ChatContext';
import { types } from '../types/types'

const HomeScreen = () => {
    const navigation = useNavigation();

    const { leerStorage, logout, auth } = useContext(AuthContext);
    const { chatState, dispatch } = useContext(ChatContext);
    const { uid } = auth;
    const { chatActivo } = chatState;

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
                        onPress={logout}
                    >
                        <Ionicons name="ios-exit-outline" size={24} />
                    </TouchableOpacity>
                </View >
            )
        })

    }, [])

    const enterChat = async (id, chatName) => {

        dispatch({
            type: types.activarChat,
            // payload: usuario.uid
            payload: id
        });

        // Cargar los mensajes del chat
        const resp = await fetchConToken(`mensajes/${id}`);
        console.log('resp ', resp)
        dispatch({
            type: types.cargarMensajes,
            payload: resp.mensajes
        });

        // if (chatState.chatActivo) {
        //     console.log('chatActivo ')
        //     navigation.navigate("ChatScreen", {
        //         id: id,
        //         chatName
        //     })
        // }
        navigation.navigate("ChatScreen", {
            id: id,
            chatName
        })


    }

    return (
        <SafeAreaView>
            <ScrollView style={styles.container}>
                {
                    chatState.usuarios
                        .filter(user => user.uid !== uid)
                        .map((usuario) => (
                            <CustomListItem
                                key={usuario.uid}
                                id={usuario.uid}
                                chatName={usuario.nombre}
                                enterChat={enterChat}
                                online={usuario.online}
                                email={usuario.email}
                                urlProfile={"https://p.kindpng.com/picc/s/78-786207_user-avatar-png-user-avatar-icon-png-transparent.png"}
                            />
                        ))
                }
                <Button
                    title="leerStorage"
                    onPress={leerStorage}
                />
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