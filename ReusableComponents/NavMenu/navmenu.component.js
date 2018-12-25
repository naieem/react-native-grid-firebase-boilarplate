import BottomNavService from './BottomTabMenu/service/bottomTab.service';

const routeConfig = [];
initializeRoute = (type, config) => {
    if (type == 'bottomTab') {
        return BottomNavService.setRouteConfig(config);
    }
}
export default NavMenu = {
    initialize: initializeRoute
}