import React, { useLayoutEffect, useState, useContext } from 'react'
import {
    StyleSheet, Text, View,
    TouchableOpacity, SafeAreaView,
    KeyboardAvoidingView, Platform, ScrollView,
    TextInput, TouchableWithoutFeedback, Keyboard
} from 'react-native'
import { useNavigation, useRoute } from '@react-navigation/native'
import { Avatar } from 'react-native-elements';
import { FontAwesome, Ionicons } from '@expo/vector-icons';
import { StatusBar } from 'expo-status-bar';
import { ChatContext } from '../context/chat/ChatContext';
import { AuthContext } from '../auth/AuthContext';
import { SocketContext } from '../context/SocketContext';
import { horaMes } from '../helpers/horaMes'

const ChatScreen = () => {
    const navigation = useNavigation();
    const route = useRoute();

    const { socket } = useContext(SocketContext);

    const { chatState } = useContext(ChatContext);
    const { auth } = useContext(AuthContext);
    const { photoUrl } = auth;

    const [mensaje, setMensaje] = useState("")

    useLayoutEffect(() => {
        navigation.setOptions({
            title: "Chat",
            headerBackTitleVisible: false,
            headerTitleAlign: "left",
            headerTitle: () => (
                <View
                    style={{
                        flexDirection: "row",
                        alignItems: "center",
                    }}
                >
                    <Avatar
                        size="small"
                        rounded
                        source={route?.params?.photoUrl ?
                            { uri: `data:image/jpeg;base64,${route?.params?.photoUrl}` }
                            :
                            { uri: "https://www.scottsdirectories.com/wp-content/uploads/2017/10/default.jpg" }
                        }
                    />

                    <Text
                        style={{ color: "white", marginLeft: 10, fontWeight: "700" }}
                    >{route?.params?.chatName}</Text>
                </View>
            ),
            headerRight: () => (
                <View
                    style={{
                        flexDirection: "row",
                        justifyContent: "space-between",
                        width: 80,
                        marginRight: 20,
                    }}
                >
                    <TouchableOpacity
                        activeOpacity={0.5}
                    >
                        <FontAwesome name="video-camera" size={24} color="white" />
                    </TouchableOpacity>

                    <TouchableOpacity
                        activeOpacity={0.5}
                    >
                        <Ionicons name="call" size={24} color="white" />
                    </TouchableOpacity>
                </View>
            )
        })
    }, [navigation])

    const sendMessage = () => {
        //insetar mensaje
        if (mensaje.length === 0) { return; }
        socket.emit('mensaje-personal', {
            de: auth.uid,
            para: chatState.chatActivo,
            mensaje
        });
        setMensaje('')
        console.log('chatState.mensajes ', chatState.mensajes)
        // console.log("sendMessage", mensaje)
        // console.log('route ', route.params)
    }

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
            <StatusBar style="light" />

            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? "padding" : "height"}
                style={styles.container}
                keyboardVerticalOffset={90}
            >
                <TouchableWithoutFeedback
                    onPress={Keyboard.dismiss}
                >
                    <>
                        <ScrollView style={{ paddingTop: 15 }}>
                            {/* Chat goes on */}
                            {chatState.mensajes.map((msg) =>
                                msg.de === auth.uid ? (
                                    <View style={styles.reciever}>
                                        <Avatar
                                            position="absolute"
                                            containerStyle={{
                                                position: 'absolute',
                                                bottom: -15,
                                                right: -5
                                            }}
                                            bottom={-15}
                                            right={-5}
                                            rounded
                                            size={30}
                                            source={photoUrl ? {
                                                uri: `data:image/jpeg;base64,${photoUrl}`
                                            } : { uri: "https://www.scottsdirectories.com/wp-content/uploads/2017/10/default.jpg" }}
                                        />
                                        <Text style={styles.recieverText}>{msg.mensaje}</Text>
                                        <Text style={styles.recieverName}>Yo mismo</Text>
                                        <Text style={styles.recieverTime}>{horaMes(msg.createdAt)}</Text>
                                    </View>
                                ) : (
                                    <View style={styles.sender}>
                                        <Avatar
                                            position="absolute"
                                            containerStyle={{
                                                position: 'absolute',
                                                bottom: -15,
                                                left: -5
                                            }}
                                            bottom={-15}
                                            left={-5}
                                            rounded
                                            size={30}
                                            source={route?.params?.photoUrl ?
                                                { uri: `data:image/jpeg;base64,${route?.params?.photoUrl}` }
                                                :
                                                { uri: "https://www.scottsdirectories.com/wp-content/uploads/2017/10/default.jpg" }
                                            }
                                        />
                                        <Text style={styles.senderText}>{msg.mensaje}</Text>
                                        <Text style={styles.senderName}>{route?.params?.chatName}</Text>
                                        <Text style={styles.senderTime}>{horaMes(msg.createdAt)}</Text>

                                    </View>
                                )
                            )}
                        </ScrollView>
                        <View style={styles.footer}>
                            <TextInput
                                value={mensaje}
                                onChangeText={(text) => setMensaje(text)}
                                onSubmitEditing={sendMessage}
                                placeholder="Signal Message"
                                style={styles.textInput}
                            />
                            <TouchableOpacity
                                activeOpacity={0.5}
                                onPress={sendMessage}
                            >
                                <Ionicons name='send' size={24} color="#2B68E6" />
                            </TouchableOpacity>
                        </View>
                    </>
                </TouchableWithoutFeedback>

            </KeyboardAvoidingView>
        </SafeAreaView>
    )
}

export default ChatScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    reciever: {
        padding: 15,
        backgroundColor: "#ECECEC",
        alignSelf: "flex-end",
        borderRadius: 20,
        marginRight: 15,
        marginBottom: 20,
        maxWidth: "80%",
        position: "relative",
    },
    sender: {
        padding: 15,
        backgroundColor: "#2D68E6",
        alignSelf: "flex-start",
        borderRadius: 20,
        margin: 15,
        maxWidth: "80%",
        position: "relative",
    },
    senderText: {
        color: "white",
        fontWeight: "500",
        marginLeft: 10,
        marginBottom: 15,
    },
    footer: {
        flexDirection: 'row',
        alignItems: 'center',
        width: '100%',
        padding: 15
    },
    textInput: {
        bottom: 0,
        height: 40,
        flex: 1,
        marginRight: 15,
        borderColor: "transparent",
        backgroundColor: "#ECECEC",
        borderWidth: 1,
        padding: 10,
        color: "grey",
        borderRadius: 30,

    },
    senderText: {
        color: "white",
        fontWeight: "500",
        marginLeft: 10,
        marginBottom: 3
    },
    recieverText: {
        color: "black",
        fontWeight: "500",
        marginLeft: 10,
        marginBottom: 3
    },
    senderName: {
        fontSize: 10,
        marginLeft: 10,
        paddingRight: 10,
        fontWeight: "500",
        color: "white",
    },
    recieverName: {
        fontSize: 10,
        marginLeft: 10,
        paddingRight: 10,
        fontWeight: "500",
        color: "#979797",
    },
    recieverTime: {
        fontSize: 10,
        marginLeft: 10
    },
    senderTime: {
        fontSize: 10,
        marginLeft: 10,
        color: "white",
    }
})