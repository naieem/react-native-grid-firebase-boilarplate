import React from 'react';
import {
    createStackNavigator,
    createAppContainer,
    createBottomTabNavigator,
    createDrawerNavigator,
    DrawerItems,
    SafeAreaView
} from "react-navigation";
routeConfig = [];
routeObject = {};
setRouteConfig = (config) => {
    routeConfig = config;
    console.log('supplied routeConfig ');
    console.log(routeConfig);
    routeConfig.map((value, index) => {
        routeObject[value.RouteName] = {
            'screen': value.ContentComponent
        }
    });
    console.log('modified routeConfig ');
    console.log(routeObject);
}
export default BottomNavService = {
    setRouteConfig: setRouteConfig
}