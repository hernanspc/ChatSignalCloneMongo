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

const ChatScreen = () => {
    const navigation = useNavigation();
    const route = useRoute();

    const { chatState } = useContext(ChatContext);
    const { auth } = useContext(AuthContext);

    const [input, setInput] = useState("")

    console.log('chatState.mensajes ', chatState.mensajes)
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
                        rounded
                        source={{
                            uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQKJuxfl_e_W_D8rYjsGrYsZccc1JROU-4ToQ&usqp=CAU"
                        }}
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
        console.log("sendMessage")
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
                                msg.para === auth.uid ? (
                                    <View style={styles.reciever}>
                                        <Avatar
                                            position="absolute"
                                            containerStyle={{
                                                position: 'absolute',
                                                bottom: -15,
                                                right: -5
                                            }}
                                            bottom={-15}
                                            left={-5}
                                            right={-5}
                                            rounded
                                            size={30}
                                            source={{
                                                uri: "https://static.wikia.nocookie.net/alfondohaysitio/images/2/2d/Nicolas_3ra.png/revision/latest?cb=20211128223821&path-prefix=es"
                                            }}
                                        />
                                        <Text style={styles.recieverText}>mensaje</Text>
                                    </View>
                                ) : (
                                    <View style={styles.sender}>
                                        <Text style={styles.senderText}>mensaje</Text>
                                    </View>
                                )
                            )}
                        </ScrollView>
                        <View style={styles.footer}>
                            <TextInput
                                value={input}
                                onChangeText={(text) => setInput(text)}
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
    senderName: {
        marginLeft: 10,
        paddingRight: 10,
        fontWeight: "500",
        color: "black",
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
    recieverText: {

    },
    senderText: {

    }
})