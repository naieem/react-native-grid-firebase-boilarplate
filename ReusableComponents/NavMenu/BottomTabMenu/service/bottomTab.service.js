import React from 'react';
import {
    createStackNavigator,
    createAppContainer,
    createBottomTabNavigator,
    createDrawerNavigator,
    DrawerItems,
    SafeAreaView
} from "react-navigation";
import BottomTabBar from '../bottomTab.template.component';
routeConfig = []; // getting route config from parent app
routeObject = {}; // setting up route config from 'routeConfig'
storedActiveTitle = undefined; // storing active screens title
const setRouteConfig = (config) => {
    routeConfig = config;
    console.log('supplied routeConfig ');
    console.log(routeConfig);
    routeConfig.map((value, index) => {
        routeObject[value.RouteName] = {
            'screen': value.ContentComponent
        }
    });
    const tabConfiguration = {
        tabBarComponent: (props)=><BottomTabBar routeConfig={routeConfig}></BottomTabBar>
    }
    console.log('modified routeConfig ');
    console.log(routeObject);
    console.log('tab configuration ');
    console.log(tabConfiguration);
    return createBottomTabNavigator(routeObject, tabConfiguration);
}

export default BottomNavService = {
    setRouteConfig: setRouteConfig,
}