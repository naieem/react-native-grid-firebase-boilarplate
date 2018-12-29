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
import MessageComponent from '../screens/message.screen';
import MoreComponent from '../screens/more.screen';
import NotificationComponent from '../screens/notification.screen';
import AddNewComponent from '../screens/add_new_category.screen';
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
        showOnMenu:false,
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
    },
    {
        RouteName: 'Message',
        MenuName: 'Message',
        ContentComponent: MessageComponent,
        showOnMenu:true,
        Params:{
            title:'Message',
            iconName:'ios-chatboxes',
            iconType:'ionicon',
            iconColor:'#fff'
        }
    },
    {
        RouteName: 'Add',
        MenuName: 'Add',
        ContentComponent: AddNewComponent,
        showOnMenu:true,
        Params:{
            title:'Add',
            iconName:'ios-add-circle',
            iconType:'ionicon',
            iconColor:'#fff'
        }
    },
    {
        RouteName: 'Notification',
        MenuName: 'Notification',
        ContentComponent: NotificationComponent,
        showOnMenu:true,
        Params:{
            title:'Notification',
            iconName:'ios-notifications-outline',
            iconType:'ionicon',
            iconColor:'#fff'
        }
    },
    {
        RouteName: 'More',
        MenuName: 'More',
        ContentComponent: MoreComponent,
        showOnMenu:true,
        Params:{
            title:'More',
            iconName:'ios-more',
            iconType:'ionicon',
            iconColor:'#fff'
        }
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