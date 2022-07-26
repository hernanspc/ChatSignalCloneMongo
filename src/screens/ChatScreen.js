import React, { useLayoutEffect, useState } from 'react'
import {
    StyleSheet, Text, View,
    TouchableOpacity, SafeAreaView,
    KeyboardAvoidingView, Platform, ScrollView, TextInput
} from 'react-native'
import { useNavigation, useRoute } from '@react-navigation/native'
import { Avatar } from 'react-native-elements';
import { FontAwesome, Ionicons } from '@expo/vector-icons';
import { StatusBar } from 'expo-status-bar';

const ChatScreen = () => {
    const navigation = useNavigation();
    const route = useRoute();

    const [input, setInput] = useState("")
    console.log('route ', route?.params)

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

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
            <StatusBar style="light" />

            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? "padding" : "height"}
                style={styles.container}
                keyboardVerticalOffset={90}
            >
                <>
                    <ScrollView>
                        {/* Chat goes on */}
                    </ScrollView>
                    <View style={styles.footer}>
                        <TextInput
                            value={input}
                            onChangeText={(text) => setInput(text)}
                            placeholder="Signal Message"
                            style={styles.textInput}
                        />
                        <TouchableOpacity
                            activeOpacity={0.5}
                            onPress={() => console.log('first')}
                        >
                            <Ionicons name='send' size={24} color="#2B68E6" />
                        </TouchableOpacity>
                    </View>
                </>
            </KeyboardAvoidingView>
        </SafeAreaView>
    )
}

export default ChatScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
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
    }
})