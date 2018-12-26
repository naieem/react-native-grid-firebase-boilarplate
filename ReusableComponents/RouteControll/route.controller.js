import { navCommonService } from '../NavMenu/navbar.common.service';
export const RouteController = (props,route,params)=>{
    navCommonService.setActiveMenuParam(params);
    props.navigation.navigate(route,params);
}