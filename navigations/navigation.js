import React from 'react';
import {StyleSheet, ScrollView, View, Text} from 'react-native';
import {
    createStackNavigator,
    createAppContainer,
    createBottomTabNavigator,
    createDrawerNavigator,
    DrawerItems,
    SafeAreaView
} from "react-navigation";
import {Icon} from 'react-native-elements'
import HomeScreen from '../screens/home.screen';
import DetailsScreen from '../screens/details.screen';
import ListScreen from "../screens/list.screen";
import DrawerScreen from '../screens/drawer.screen';
import BottomTabBar from '../ReusableComponents/BottomTabbar.component';
import HeaderNavComponent from "../ReusableComponents/HeaderNav.component";
import NavMenu from '../ReusableComponents/NavMenu/navmenu.component';
const RouteConfig = [
    {
        RouteName: 'Home',
        MenuName: 'Home',
        ContentComponent: HomeScreen
    }, {
        RouteName: 'List',
        MenuName: 'List',
        ContentComponent: ListScreen
    },
    {
        RouteName: 'Details',
        MenuName: 'Details',
        ContentComponent: DetailsScreen
    }
];
const BotomTabNavigation = NavMenu.initialize('bottomTab',RouteConfig);
// const BotomTabNavigation = createBottomTabNavigator({
//     Home: {
//         screen: HomeScreen
//     },
//     List: {
//         screen: ListScreen
//     },
//     Details: {
//         screen: DetailsScreen
//     }
// }, {
//     tabBarComponent: BottomTabBar
//     // contentComponent: DrawerScreen
// });
const AppNavigator = createStackNavigator({
    Home: {
        screen: BotomTabNavigation,
        navigationOptions: {
            header: <HeaderNavComponent></HeaderNavComponent>
        }
    }
}, {initialRouteName: 'Home'});

export default createAppContainer(AppNavigator);