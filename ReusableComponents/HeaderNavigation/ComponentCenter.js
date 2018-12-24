import React, { Component } from 'react';
import {
    View,
    Text
} from 'react-native';
import { withNavigation } from 'react-navigation';
class ComponentCenter extends React.Component {
    render() {
        return (<View style={{
            flex: 1,
            alignItems: 'center'
        }}>
            <Text style={{
                color: '#fff'
            }}>Navigation Title</Text>
        </View>)
    }
}

export default withNavigation(ComponentCenter);