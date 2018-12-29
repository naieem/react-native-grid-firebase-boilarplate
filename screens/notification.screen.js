import React, { Component } from 'react';
import { View, Text } from 'react-native';

class NotificationComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    render() {
        return (
            <View style={{ padding: 20, justifyContent: 'center', alignItems: 'center' }}>
                <Text> Comming soon </Text>
            </View>
        );
    }
}

export default NotificationComponent;
