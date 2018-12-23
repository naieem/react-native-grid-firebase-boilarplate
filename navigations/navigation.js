import React from 'react';
import {
    createStackNavigator,
    createAppContainer
} from "react-navigation";
import HomeScreen from '../screens/home.screen';
import DetailsScreen from '../screens/details.screen';
import ListScreen from "../screens/list.screen";
const AppNavigator = createStackNavigator({
    Home: {
        screen: HomeScreen,
        navigationOptions: {
            title: "Home",
        }
    },
    List: {
        screen: ListScreen
    },
    Details: {
        screen: DetailsScreen,
        navigationOptions: {
            title: 'Details',
        }
    }
}, {
    initialRouteName: 'Home',
});
export default createAppContainer(AppNavigator);