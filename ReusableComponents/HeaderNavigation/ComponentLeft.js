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
class ComponentLeft extends React.Component {
    render() {
        return (<View
            style={{
                flex: 1,
                alignItems: 'flex-start',
                paddingLeft: 20
            }}>
            <TouchableOpacity
                style={{
                    justifyContent: 'center',
                    flexDirection: 'row'
                }} onPress={() => this.props.navigation.openDrawer()}>
                <Icon
                size={32}
                    name='ios-menu'
                    type='ionicon'
                    color='#fff' />
            </TouchableOpacity>
        </View>)
    }
}
export default withNavigation(ComponentLeft);