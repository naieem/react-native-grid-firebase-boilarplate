import React, {Component} from 'react';
import {
    View,
    Text,
    Image,
    StyleSheet,
    ScrollView,
    TouchableOpacity
} from 'react-native';
import {DrawerItems, withNavigation} from "react-navigation";
import {Icon} from 'react-native-elements';
import {navBarBottomCommonService} from '../navbar.common.service';
class DrawerScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentState: this.props.navigation.state.routeName
        };
        this.changeRoute = this
            .changeRoute
            .bind(this);
        // console.log(this.props.navigation.state);
    }
    changeRoute = (route, params) => {
        // setting active menu param
        navBarBottomCommonService.setActiveMenuParam(params);
        this
            .props
            .navigation
            .navigate(route);
        this.setState({currentState: route});
    }
    /**
   * rendering menu in the bottom
   */
    renderMenu = (value, index) => {
        if (value.showOnMenu) {
            return (
                <TouchableOpacity
                    key={index}
                    style={[
                    styles.menuContainer, this.state.currentState == value.RouteName
                        ? styles.showActiveMenu
                        : styles.deactiveMenu
                ]}
                    onPress={() => this.changeRoute(value.RouteName, value.Params)}>
                    <View style={styles.menuIcon}>
                        <Icon
                            name={value.Params.iconName}
                            type={value.Params.iconType}
                            color={value.Params.iconColor}/>
                    </View>
                    <View>
                        <Text style={styles.menuItem}>
                            <Text>{value.MenuName}</Text>
                        </Text>
                    </View>
                </TouchableOpacity>
            );
        }
    }
    render() {
        return (
            <ScrollView
                style={{
                flex: 1,
                backgroundColor: '#ececec'
            }}>
                <Image
                    source={{
                    uri: 'https://placeimg.com/640/640/nature'
                }}
                    style={{
                    height: 200
                }}></Image>
                {/* <DrawerItems {...this.props}/> */}
                {this.props.routeConfig.length > 0 && this
                    .props
                    .routeConfig
                    .map((value, index) => {
                        return (this.renderMenu(value, index))
                    })}
                {!this.props.routeConfig.length && <TouchableOpacity>
                    <Text style={styles.tabMenuTextColor}>Sorry No Menu Configuration Found</Text>
                </TouchableOpacity>
}
            </ScrollView>
        );
    }
}
const styles = StyleSheet.create({
    menuContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignContent: 'flex-start',
        alignItems: 'flex-start'
    },
    showActiveMenu: {
        backgroundColor: '#fff'
    },
    deactiveMenu: {
        backgroundColor: '#ececec'
    },
    menuItem: {
        fontWeight: 'bold',
        padding: 20,
        width: '100%'
    },
    menuIcon: {
        paddingTop: 15,
        paddingLeft: 20
    }
});

export default withNavigation(DrawerScreen);