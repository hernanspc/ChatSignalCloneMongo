import React, { useContext } from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { AuthContext } from '../auth/AuthContext';
import { Avatar, Button } from 'react-native-elements'

const ProfileScreen = () => {
    const { auth } = useContext(AuthContext);
    const { uid, photoUrl } = auth;
    return (
        <View>
            <Avatar
                size="xlarge"
                rounded
                source={photoUrl ?
                    {
                        uri: `data:image/jpeg;base64,${photoUrl}`
                    }
                    :
                    {
                        uri: "https://www.scottsdirectories.com/wp-content/uploads/2017/10/default.jpg"
                    }
                } >

                <Avatar.Accessory onPress={() => console.log('Press')} size={40} />

            </Avatar>
            <Text>ProfileScreen</Text>
        </View>
    )
}

export default ProfileScreen

const styles = StyleSheet.create({})