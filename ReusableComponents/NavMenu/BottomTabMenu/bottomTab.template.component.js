import React, {Component} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {Icon} from 'react-native-elements';
import {withNavigation} from 'react-navigation';
import {navBarBottomCommonService} from '../navbar.common.service'
class BottomTabBar extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.listRouteData = {
      title: 'Service List'
    }
  }
  changeRoute = (route, params) => {
    console.log('Given params are ' + JSON.stringify(params));
    navBarBottomCommonService.setActiveMenuParam(params);
    this
      .props
      .navigation
      .navigate(route);
  }
  /**
   * rendering menu in the bottom
   */
  renderMenu = (value,index)=>{
    if(value.showOnMenu){
      return (<TouchableOpacity key={index}
        onPress={() => this.changeRoute(value.RouteName, value.Params)}>
        <Icon
          name={value.Params.iconName}
          type={value.Params.iconType}
          color={value.Params.iconColor}/>
        <Text style={styles.tabMenuTextColor}>{value.MenuName}</Text>
      </TouchableOpacity>);
    }
  }
  render() {
    console.log('inside bottom tab component');
    console.log(this.props.routeConfig);
    
    return (
      <View style={styles.tabbarContainer}>
        {this.props.routeConfig.length > 0 && this
          .props
          .routeConfig
          .map((value, index) => {
            return (
              this.renderMenu(value,index)
            )
          })}
        {!this.props.routeConfig.length && <TouchableOpacity>
          <Text style={styles.tabMenuTextColor}>Sorry No Menu Configuration Found</Text>
        </TouchableOpacity>
}
        {/* <TouchableOpacity
          onPress={() => this.changeRoute('List', this.listRouteData)}>
          <Icon name='ios-list' type='ionicon' color='#fff'/>
          <Text style={styles.tabMenuTextColor}>List</Text>
        </TouchableOpacity> */}
      </View>
    );
  }
}
const styles = StyleSheet.create({
  tabbarContainer: {
    height: 60,
    paddingTop: 10,
    paddingLeft: 20,
    paddingRight: 20,
    backgroundColor: '#BC2909',
    flexDirection: 'row',
    justifyContent: 'space-evenly'
  },
  tabMenuTextColor: {
    color: '#fff'
  }
});
export default withNavigation(BottomTabBar);
