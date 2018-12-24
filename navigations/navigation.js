import React from 'react';
import {StyleSheet,ScrollView,View,Text} from 'react-native';
import {createStackNavigator, createAppContainer, createDrawerNavigator, DrawerItems, SafeAreaView} from "react-navigation";
import { Icon } from 'react-native-elements'
import HomeScreen from '../screens/home.screen';
import DetailsScreen from '../screens/details.screen';
import ListScreen from "../screens/list.screen";
import { DrawerScreen } from '../screens/drawer.screen';
const drawer = createDrawerNavigator({
    Home: {
        screen: HomeScreen
    },
    List: {
        screen: ListScreen
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
const Ico= ()=>{
    <Icon
  name='g-translate'
  color='#00aced' />
}
const AppNavigator = createStackNavigator({
    Home: {
        screen: drawer,
        navigationOptions: {
            title: "Home",
            header:Ico
        }
    },
    Details: {
        screen: DetailsScreen,
        navigationOptions: {
            title: 'Details'
        }
    }
}, {initialRouteName: 'Home'});

export default createAppContainer(AppNavigator);