import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { ListItem, Avatar, Badge } from 'react-native-elements'

const CustomListItem = ({ id, chatName, online, urlProfile, enterChat }) => {
    return (
        <ListItem
            key={id}
            onPress={() =>
                enterChat(id, chatName, online, urlProfile)
            }
            bottomDivider
        >
            <Avatar
                rounded
                source={{
                    uri: urlProfile
                }}
            >
                <Badge
                    status={online ? "success" : "error"}
                    containerStyle={{
                        position: 'absolute',
                        bottom: 0,
                        left: 22,
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
                    This is a test subtitle
                </ListItem.Subtitle>
            </ListItem.Content>
        </ListItem>
    )
}

export default CustomListItem

const styles = StyleSheet.create({})