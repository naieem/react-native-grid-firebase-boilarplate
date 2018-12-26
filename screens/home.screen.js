import React, {Component} from 'react';
import {
    View,
    StyleSheet,
    Image,
    ScrollView,
    TouchableOpacity,
    TouchableHighlight,
    SafeAreaView,
    YellowBox,
    Text,
    StatusBar
} from 'react-native';
import GridList from 'react-native-grid-list';
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
    openDrawer = (props) => {
        this
            .props
            .navigation
            .openDrawer();
    }
    render() {
        const images = ['https://placeimg.com/640/640/nature', 'https://placeimg.com/640/640/cats', 'https://placeimg.com/640/640/cats', 'https://placeimg.com/640/640/cats'];
        return (
            <SafeAreaView style={styles.container}>
                {/* <StatusBar backgroundColor="blue" barStyle="dark-content"/>
                <Navbar></Navbar> */}
                <ScrollView>
                    <BasicImageSlider images={images} autoPlayWithInterval={5000}></BasicImageSlider>
                    <GridList
                        showSeparator
                        data={this.state.categoryInfo}
                        numColumns={2}
                        renderItem={this.renderItem}
                        style={{
                        paddingTop: 5
                    }}/>
                </ScrollView>
            </SafeAreaView>
        )
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    listItemContainer: {
        padding: 10
    }
});

export default HomeScreen;