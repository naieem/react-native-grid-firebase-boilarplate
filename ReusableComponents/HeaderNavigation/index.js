import React, { Component } from 'react';
import { View, Text } from 'react-native';
import {NavigationBar} from 'navigationbar-react-native';
import ComponentLeft from './ComponentLeft';
import ComponentCenter from './ComponentCenter';
import ComponentRight from './ComponentRight';
export default class Navbar extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
        <NavigationBar
        componentLeft={()=><ComponentLeft></ComponentLeft>}
        componentCenter={()=><ComponentCenter></ComponentCenter>}
        statusBarStyle={{
        barStyle: 'dark-content'
    }}/>
    );
  }
}
