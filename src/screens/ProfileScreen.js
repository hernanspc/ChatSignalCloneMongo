import React, { useContext, useLayoutEffect, useState, useEffect } from 'react';
import { View, SafeAreaView, StyleSheet, Alert } from 'react-native';
import {
    Title,
    Caption,
    Text,
    TouchableRipple,
} from 'react-native-paper';
import { StatusBar } from 'expo-status-bar';
import { Avatar } from 'react-native-elements'
// import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { MaterialCommunityIcons as Icon } from '@expo/vector-icons';
import { AuthContext } from '../auth/AuthContext';
import { useNavigation } from '@react-navigation/native';
import * as ImagePicker from "expo-image-picker";

const ProfileScreen = () => {
    const navigation = useNavigation();
    const { auth } = useContext(AuthContext);
    const { name, email, photoUrl } = auth;

    const [image, setImage] = useState(null);
    const [changeImg, setChangeImg] = useState(false)


    useLayoutEffect(() => {
        navigation.setOptions({
            title: 'Perfil',
            headerBackTitle: "Inicio"
        })
    }, []);

    const pickImage = async () => {
        let permissionResult =
            await ImagePicker.requestMediaLibraryPermissionsAsync();

        if (permissionResult.status === "denied") {
            Alert.alert(
                "Alerta!",
                " Es necesario aceptar los permisos de la galeria",
                [{ text: "Ok" }]
            );
        } else {
            let result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.All,
                allowsEditing: true,
                aspect: [4, 3],
                quality: 1,
            });

            setImage(result.uri)
            toDataURL(result.uri, function (dataUrl) {
                console.log('success')
                //guarddar en bd
                console.log('RESULT:', dataUrl)
                //guardar en context 

            })

            // if (result.cancelled) {
            //     Alert.alert("Alerta!", " Has cerrado la selección de imagenes", [
            //         { text: "Ok" },
            //     ]);
            // } else {

            // uploadImage(result.uri)
            //     .then(() => {
            //         console.log("uploadImage2 Subida Correctamente");
            //     })
            //     .catch(() => {
            //         console.log("uploadImage2 Error al actualizar avatar");
            //     });

            // }
        }
    };

    function toDataURL(url, callback) {
        var xhr = new XMLHttpRequest();
        xhr.onload = function () {
            var reader = new FileReader();
            reader.onloadend = function () {
                callback(reader.result);
            }
            reader.readAsDataURL(xhr.response);
        };
        xhr.open('GET', url);
        xhr.responseType = 'blob';
        xhr.send();
    }

    const loadImage = async () => {
        if (photoUrl) {
            setImage(`data:image/jpeg;base64,${photoUrl}`)
        } else {
            setImage("https://www.scottsdirectories.com/wp-content/uploads/2017/10/default.jpg")
        }

    }

    useEffect(() => {
        loadImage()
    }, []);

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar style="light" />
            <View style={styles.userInfoSection}>
                <View style={{ flexDirection: 'row', marginTop: 15 }}>
                    <Avatar
                        size={90}
                        rounded
                        source={{ uri: image }}
                    // source={photoUrl ?
                    //     {
                    //         uri: `data:image/jpeg;base64,${photoUrl}`
                    //     }
                    //     :
                    //     {
                    //         uri: "https://www.scottsdirectories.com/wp-content/uploads/2017/10/default.jpg"
                    //     }
                    // }
                    >
                        <Avatar.Accessory
                            onPress={pickImage}
                            size={30}
                        />
                    </Avatar>
                    <View style={{ marginLeft: 20 }}>
                        <Title style={[styles.title, {
                            marginTop: 15,
                            marginBottom: 5,
                        }]}>{name}</Title>
                        <Caption style={styles.caption}>{email}</Caption>
                    </View>
                </View>
            </View>

            <View style={styles.userInfoSection}>
                <View style={styles.row}>
                    <Icon name="map-marker-radius" color="#777777" size={20} />
                    <Text style={{ color: "#777777", marginLeft: 20 }}>Kolkata, India</Text>
                </View>
                <View style={styles.row}>
                    <Icon name="phone" color="#777777" size={20} />
                    <Text style={{ color: "#777777", marginLeft: 20 }}>+91-900000009</Text>
                </View>
                <View style={styles.row}>
                    <Icon name="email" color="#777777" size={20} />
                    <Text style={{ color: "#777777", marginLeft: 20 }}>{email}</Text>
                </View>
            </View>

            <View style={styles.infoBoxWrapper}>
                <View style={[styles.infoBox, {
                    borderRightColor: '#dddddd',
                    borderRightWidth: 1
                }]}>
                    <Title>₹140.50</Title>
                    <Caption>Wallet</Caption>
                </View>
                <View style={styles.infoBox}>
                    <Title>12</Title>
                    <Caption>Orders</Caption>
                </View>
            </View>

            <View style={styles.menuWrapper}>
                <TouchableRipple onPress={() => { }}>
                    <View style={styles.menuItem}>
                        <Icon name="heart-outline" color="#2B68E6" size={25} />
                        <Text style={styles.menuItemText}>Your Favorites</Text>
                    </View>
                </TouchableRipple>
                <TouchableRipple onPress={() => { }}>
                    <View style={styles.menuItem}>
                        <Icon name="share-outline" color="#2B68E6" size={25} />
                        <Text style={styles.menuItemText}>Tell Your Friends</Text>
                    </View>
                </TouchableRipple>
                <TouchableRipple onPress={() => { }}>
                    <View style={styles.menuItem}>
                        <Icon name="account-check-outline" color="#2B68E6" size={25} />
                        <Text style={styles.menuItemText}>Support</Text>
                    </View>
                </TouchableRipple>
                <TouchableRipple onPress={() => {
                    console.log('image ', image)
                }}>
                    <View style={styles.menuItem}>
                        <Icon name="cog-outline" color="#2B68E6" size={25} />
                        <Text style={styles.menuItemText}>Settings</Text>
                    </View>
                </TouchableRipple>
            </View>
        </SafeAreaView>
    );
};

export default ProfileScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    userInfoSection: {
        paddingHorizontal: 30,
        marginBottom: 25,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
    },
    caption: {
        fontSize: 14,
        lineHeight: 14,
        fontWeight: '500',
    },
    row: {
        flexDirection: 'row',
        marginBottom: 10,
    },
    infoBoxWrapper: {
        borderBottomColor: '#dddddd',
        borderBottomWidth: 1,
        borderTopColor: '#dddddd',
        borderTopWidth: 1,
        flexDirection: 'row',
        height: 100,
    },
    infoBox: {
        width: '50%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    menuWrapper: {
        marginTop: 10,
    },
    menuItem: {
        flexDirection: 'row',
        paddingVertical: 15,
        paddingHorizontal: 30,
    },
    menuItemText: {
        color: '#777777',
        marginLeft: 20,
        fontWeight: '600',
        fontSize: 16,
        lineHeight: 26,
    },
});