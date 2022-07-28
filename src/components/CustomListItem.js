import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { ListItem, Avatar, Badge } from 'react-native-elements'

const CustomListItem = ({ id, chatName, online, photoUrl, enterChat, email }) => {
    return (
        <ListItem
            key={id}
            onPress={() =>
                enterChat(id, chatName, online, photoUrl, email)
            }
            bottomDivider
        >
            <Avatar
                rounded
                size="medium"
                source={photoUrl ?
                    { uri: `${photoUrl}` }
                    :
                    { uri: "https://www.scottsdirectories.com/wp-content/uploads/2017/10/default.jpg" }
                }
            >
                <Badge
                    status={online ? "success" : "error"}
                    containerStyle={{
                        position: 'absolute',
                        bottom: 2,
                        left: 40,
                    }}
                />
            </Avatar>
            <ListItem.Content>
                <ListItem.Title style={{ fontWeight: '800' }}>
                    {chatName}
                </ListItem.Title>
                <ListItem.Subtitle
                    numberOfLines={1}
                    ellipsizeMode="tail"
                >
                    {email}
                </ListItem.Subtitle>
            </ListItem.Content>
        </ListItem>
    )
}

export default CustomListItem

const styles = StyleSheet.create({})