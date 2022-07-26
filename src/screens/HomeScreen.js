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
            // < img src = {`data:image/jpeg;base64,${data}`} />
            headerLeft: () => (
                <View style={{ marginLeft: 0, marginBottom: 5 }}>
                    <TouchableOpacity activeOpacity={0.5} onPress={
                        () => {
                            console.log('Ir a configurar');
                            navigation.navigate("ProfileScreen")
                        }
                    }>
                        <Avatar
                            size={40}
                            rounded
                            source={auth?.photoUrl ?
                                {
                                    uri: `data:image/jpeg;base64,${auth?.photoUrl}`
                                }
                                :
                                {
                                    uri: "https://www.scottsdirectories.com/wp-content/uploads/2017/10/default.jpg"
                                }
                            } >
                            <Avatar.Accessory size={15} />
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

    const enterChat = async (id, chatName, online, photoUrl) => {

        dispatch({
            type: types.activarChat,
            // payload: usuario.uid
            payload: id
        });

        // Cargar los mensajes del chat
        const resp = await fetchConToken(`mensajes/${id}`);
        // console.log('resp ', resp)
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
            chatName,
            photoUrl
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
                                photoUrl={usuario.photoUrl}
                            />
                        ))
                }
                {/* <Button
                    title="leerStorage"
                    onPress={leerStorage}
                /> */}
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