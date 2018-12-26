import React from 'react';
import {
    createStackNavigator,
    createAppContainer,
    createDrawerNavigator,
    DrawerItems,
    SafeAreaView
} from "react-navigation";
import DrawerScreen from '../drawerMenu.template.component';
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
        contentComponent: (props)=><DrawerScreen routeConfig={routeConfig}></DrawerScreen>
    }
    console.log('modified routeConfig ');
    console.log(routeObject);
    console.log('tab configuration ');
    console.log(tabConfiguration);
    return createDrawerNavigator(routeObject, tabConfiguration);
}

export default DrawerNavService = {
    setRouteConfig: setRouteConfig,
}