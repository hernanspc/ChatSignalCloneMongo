import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { ListItem, Avatar } from 'react-native-elements'

const CustomListItem = ({ id, chatName, enterChat }) => {
    return (
        <ListItem
            key={id}
            onPress={() =>
                enterChat(id, chatName)
            }
            bottomDivider
        >
            <Avatar
                rounded
                source={{
                    uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQKJuxfl_e_W_D8rYjsGrYsZccc1JROU-4ToQ&usqp=CAU"
                }}
            />
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