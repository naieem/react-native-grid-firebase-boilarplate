import BottomNavService from './BottomTabMenu/service/bottomTab.service';
import DrawerNavService from './DrawerMenu/service/drawerTab.service';
const routeConfig = [];
const initializeRoute = (type, config) => {
    if (type == 'bottomTab') {
        return BottomNavService.setRouteConfig(config);
    }
    if (type == 'drawerNav') {
        return DrawerNavService.setRouteConfig(config);
    }
}
export default NavMenu = {
    initialize: initializeRoute
}