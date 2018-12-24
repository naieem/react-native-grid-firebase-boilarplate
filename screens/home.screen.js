import React, {Component} from 'react'
import {
    View,
    StyleSheet,
    Image,
    ScrollView,
    TouchableOpacity,
    TouchableHighlight,
    SafeAreaView,
    YellowBox,
    Text
} from 'react-native';
import {NavigationBar} from 'navigationbar-react-native';
import GridList from 'react-native-grid-list';
import {Icon,Button} from 'react-native-elements'
import BasicImageSlider from '../ReusableComponents/ImageSlider';
import {db} from '../DB/config';

const items = [
    {
        thumbnail: {
            uri: 'https://lorempixel.com/200/200/animals'
        }
    }, {
        thumbnail: {
            uri: 'https://lorempixel.com/200/200/city'
        }
    }, {
        thumbnail: {
            uri: 'https://lorempixel.com/200/200/nature'
        }
    }, {
        thumbnail: {
            uri: 'https://lorempixel.com/200/200/cats'
        }
    }
];
YellowBox.ignoreWarnings(["Warning: Failed child context type: Invalid child context"]);

export class HomeScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            categoryInfo: [],
            backupCatInfo: []
        };
    }
    componentDidMount() {
        const users = db.ref('/categories');
        users.once('value', (dataSnap) => {
            this.setState({
                backupCatInfo: dataSnap.val()
            });
            var sliceCat = this
                .state
                .backupCatInfo
                .slice(0, 10);
            this.setState({categoryInfo: sliceCat});
            console.log(this.state.categoryInfo.length);
        });
    }
    ComponentLeft = () => {
        return (
            <View
                style={{
                flex: 1,
                alignItems: 'flex-start',
                paddingLeft: 20
            }}>
                <TouchableOpacity
                    style={{
                    justifyContent: 'center',
                    flexDirection: 'row'
                }}>
                    <Icon
                        name='ios-menu'
                        type='ionicon'
                        color='#fff'/>
                </TouchableOpacity>
            </View>
        );
    };
    
    ComponentCenter = () => {
        return (
            <View style={{
                flex: 1,
                alignItems: 'center'
            }}>
                <Text style={{
                    color: '#fff'
                }}>Home</Text>
            </View>
        );
    };
    
    ComponentRight = () => {
        return (
            <View
                style={{
                flex: 1,
                alignItems: 'flex-end',
                paddingRight: 20
            }}>
                <TouchableOpacity>
                    <Text style={{
                        color: 'white'
                    }}>
                        Right
                    </Text>
                </TouchableOpacity>
            </View>
        );
    };
    gotoListPage = () => {
        this
            .props
            .navigation
            .navigate('List');
    }
    renderItem = ({item, index}) => {
        return (
            <TouchableHighlight
                style={{
                padding: 10
            }}
                onPress={this.gotoListPage}>
                <Image
                    style={{
                    height: 100
                }}
                    source={{
                    uri: item.picture
                }}/>
            </TouchableHighlight>
        );
    };
    openDrawer = () => {
        this
            .props
            .navigation
            .openDrawer();
    }
    render() {
        const images = ['https://placeimg.com/640/640/nature', 'https://placeimg.com/640/640/cats', 'https://placeimg.com/640/640/cats', 'https://placeimg.com/640/640/cats'];
        return (
            <SafeAreaView style={styles.container}>
                <NavigationBar
                    componentLeft=
                    {  this.componentLeft }
                    componentCenter=
                    { this.componentCente }
                    statusBarStyle={{
                    barStyle: 'dark-content'
                }}/>
                <ScrollView>
                    <Button title='BUTTON' onPress={this.openDrawer}/>
                    <BasicImageSlider images={images} autoPlayWithInterval={5000}></BasicImageSlider>
                    <GridList
                        showSeparator
                        data={this.state.categoryInfo}
                        numColumns={2}
                        renderItem={this.renderItem}/>
                </ScrollView>
            </SafeAreaView>
        )
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 10
    },
    listItemContainer: {
        padding: 10
    }
});

export default HomeScreen;