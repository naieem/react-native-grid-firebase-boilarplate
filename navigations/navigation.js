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
import HomeScreen from '../screens/home.screen';
import DetailsScreen from '../screens/details.screen';
import ListScreen from "../screens/list.screen";
import HeaderNavComponent from "../ReusableComponents/HeaderNav.component";
import NavMenu from '../ReusableComponents/NavMenu/navmenu.component';
const RouteConfig = [
    {
        RouteName: 'Home',
        MenuName: 'Home',
        ContentComponent: HomeScreen,
        showOnMenu:true,
        Params:{
            title:'Home',
            iconName:'ios-home',
            iconType:'ionicon',
            iconColor:'#fff'
        }
    }, {
        RouteName: 'List',
        MenuName: 'List',
        ContentComponent: ListScreen,
        showOnMenu:true,
        Params:{
            title:'List',
            iconName:'ios-list',
            iconType:'ionicon',
            iconColor:'#fff'
        }
    },
    {
        RouteName: 'Details',
        MenuName: 'Details',
        ContentComponent: DetailsScreen,
        showOnMenu:false
    }
];
const Navigation = NavMenu.initialize('bottomTab',RouteConfig);
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
        screen: Navigation,
        navigationOptions: {
            header: <HeaderNavComponent></HeaderNavComponent>
        }
    }
}, {initialRouteName: 'Home'});

export default createAppContainer(AppNavigator);