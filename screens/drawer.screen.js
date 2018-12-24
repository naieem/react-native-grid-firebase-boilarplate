import React, {Component} from 'react';
import {View, Text, Image, ScrollView} from 'react-native';
import {DrawerItems} from "react-navigation";

export const DrawerScreen = (props) => (
    <ScrollView>
        <Image
            source={{
            uri: 'https://placeimg.com/640/640/nature'
        }}
            style={{
            height: 200
        }}></Image>
        <DrawerItems {...props}/>
        <View style={{
            flexDirection: 'column'
        }}>
            <Text
                style={{
                alignContent: 'flex-end',
                fontWeight: 'bold',
                padding: 20
            }}>Design and developed by supto</Text>
        </View>
    </ScrollView>
)
