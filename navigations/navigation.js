import React from 'react';
import {StyleSheet,ScrollView,View,Text} from 'react-native';
import {createStackNavigator, createAppContainer, createDrawerNavigator, DrawerItems, SafeAreaView} from "react-navigation";
import { Icon } from 'react-native-elements'
import HomeScreen from '../screens/home.screen';
import DetailsScreen from '../screens/details.screen';
import ListScreen from "../screens/list.screen";
import DrawerScreen  from '../screens/drawer.screen';
const drawer = createDrawerNavigator({
    Home: {
        screen: HomeScreen
    },
    List: {
        screen: ListScreen
    },
    Details: {
        screen: DetailsScreen
    }
}, {
    // drawerPosition: 'left',
    // drawerType:'slide',
    // contentOptions: {
    //     activeTintColor: '#e91e63',
    //     itemsContainerStyle: {
    //       marginVertical: 0,
    //     },
    //     iconContainerStyle: {
    //       opacity: 1
    //     }
    //   },
    contentComponent: DrawerScreen,
        
});

const AppNavigator = createStackNavigator({
    Home: {
        screen: drawer,
        navigationOptions: {
            header:null
        }
    }
}, {initialRouteName: 'Home'});

export default createAppContainer(AppNavigator);