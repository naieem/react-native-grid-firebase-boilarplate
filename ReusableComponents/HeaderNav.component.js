import React, {Component} from 'react';
import {View, Text, StyleSheet} from 'react-native';
// import {Icon} from 'react-native-elements';
import {withNavigation, DrawerActions} from 'react-navigation';
import {navCommonService} from './NavMenu';
class HeaderNavComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            title: ''
        };
        this.toggleDrawer = this
            .toggleDrawer
            .bind(this);
    }
    componentDidMount() {
    }
    toggleDrawer = () => {
        this
            .props
            .navigation
            .dispatch(DrawerActions.openDrawer());
    }
    render() {
        // console.log('Before calling');
        // console.log(Object.entries(this.props.navigation['_childrenNavigation'])[0][1]);
        // const ActiveRouteInfo = Object.entries(this.props.navigation['_childrenNavigation'])[0][1]['ActiveRouteInfo'];
        // if (ActiveRouteInfo) {
        //     console.log(ActiveRouteInfo);
        //     // this.setState({     title:ActiveRouteInfo.params &&
        //     // ActiveRouteInfo.params.title ? ActiveRouteInfo.params.title: "Home" });
        // } else {
        //     console.log('ActiveRouteInfo not found');
        // }
        // console.log(navCommonService.checkService());
        const activeTitle = navCommonService.getActiveMenuParams();
        return (
            <View style={styles.container}>
                <View style={styles.componentContainer}>
                    <View style={{
                        paddingLeft: 20
                    }}>
                        {/* <Icon
                            name='ios-menu'
                            type='ionicon'
                            iconStyle={styles.textColor}
                            onPress={this.toggleDrawer}/> */}
                    </View>
                    <View style={styles.textColor}>
                        <Text
                            style={[
                            {
                                paddingTop: 5,
                                fontWeight:'bold',
                                textTransform:'uppercase'
                            },
                            styles.textColor
                        ]}>{activeTitle && activeTitle.title}
                        {!activeTitle && 'Home'}
                        </Text>
                    </View>
                    <View style={styles.textColor}>
                        <Text
                            style={[
                            {
                                paddingRight: 20,
                                paddingTop: 5
                            },
                            styles.textColor
                        ]}></Text>
                    </View>
                </View>
            </View>
        );
    }
}
const styles = StyleSheet.create({
    container: {
        backgroundColor: '#BC2909'
    },
    componentContainer: {
        flexDirection: 'row',
        paddingTop: 30,
        paddingBottom: 10,
        justifyContent: 'space-between'
    },
    textColor: {
        color: '#fff'
    }
});
export default withNavigation(HeaderNavComponent);
