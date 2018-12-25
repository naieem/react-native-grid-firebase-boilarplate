import React, { Component } from 'react';
import {
    View,
    StyleSheet,
    Image,
    ScrollView,
    TouchableOpacity,
    TouchableHighlight,
    SafeAreaView,
    YellowBox,
    Text
} from 'react-native';
import { withNavigation } from 'react-navigation';
import { Icon, Button } from 'react-native-elements';
class ComponentRight extends React.Component {
    render() {
        return (<View
            style={{
            flex: 1,
            alignItems: 'flex-end',
            paddingRight: 20
        }}>
            <TouchableOpacity>
                <Text style={{
                    color: 'white'
                }}>
                    Right
                </Text>
            </TouchableOpacity>
        </View>)
    }
}

export default withNavigation(ComponentRight);