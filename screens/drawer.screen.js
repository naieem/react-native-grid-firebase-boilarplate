import React, { Component } from 'react';
import { View, Text, Image, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { DrawerItems, withNavigation } from "react-navigation";
import { Icon } from 'react-native-elements'
class DrawerScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentState: this.props.navigation.state.routeName
        };
        this.changeRoute = this.changeRoute.bind(this);
        // console.log(this.props.navigation.state);
    }
    changeRoute = (route) => {
        this.props.navigation.navigate(route);
        this.setState({
            currentState: route
        });
    }
    render() {
        return (
            <ScrollView style={{ flex: 1, backgroundColor: '#ececec', }}>
                <Image
                    source={{
                        uri: 'https://placeimg.com/640/640/nature'
                    }}
                    style={{
                        height: 200,
                        marginTop: 40,
                    }}></Image>
                {/* <DrawerItems {...this.props}/> */}
                <TouchableOpacity style={[styles.menuContainer, this.state.currentState == 'Home' ? styles.showActiveMenu : styles.deactiveMenu]} onPress={() => this.changeRoute('Home')}>
                    <View style={styles.menuIcon}>
                        <Icon name='ios-home' type='ionicon' />
                    </View>
                    <View><Text style={styles.menuItem}><Text>Home</Text></Text></View>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.menuContainer, this.state.currentState == 'List' ? styles.showActiveMenu : styles.deactiveMenu]} onPress={() => this.changeRoute('List')}>
                    <View style={styles.menuIcon}>
                        <Icon name='ios-list' type='ionicon' />
                    </View>
                    <View><Text style={styles.menuItem}>List</Text></View>
                </TouchableOpacity>
            </ScrollView>
        );
    }
}
const styles = StyleSheet.create({
    menuContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignContent: 'flex-start',
        alignItems: 'flex-start',
    },
    showActiveMenu: {
        backgroundColor: '#fff',
    },
    deactiveMenu: {
        backgroundColor: '#ececec'
    },
    menuItem: {
        fontWeight: 'bold',
        padding: 20,
        width: '100%',
    },
    menuIcon: {
        paddingTop: 15,
        paddingLeft: 20
    }
});

export default withNavigation(DrawerScreen);