import React, {Component} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {Icon} from 'react-native-elements';
import { withNavigation } from 'react-navigation';
import {navBarBottomCommonService} from '../navbar.common.service'
class BottomTabBar extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.listRouteData = {
      title: 'Service List'
    }
    this.changeRoute = this
      .changeRoute
      .bind(this);
  }
  changeRoute = (route, params) => {
    console.log('Given params are ' + JSON.stringify(params));
    navBarBottomCommonService.setActiveTitle(params);
    this
      .props
      .navigation
      .navigate(route);
  }
  render() {
    return (
      <View style={styles.tabbarContainer}>
        <TouchableOpacity onPress={() => this.changeRoute('Home', {title:'Home'})}>
          <Icon name='ios-home' type='ionicon' color='#fff'/>
          <Text style={{
            color: '#fff'
          }}>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => this.changeRoute('List', this.listRouteData)}>
          <Icon name='ios-list' type='ionicon' color='#fff'/>
          <Text style={{
            color: '#fff'
          }}>List</Text>
        </TouchableOpacity>
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
  }
});
export default withNavigation(BottomTabBar);
