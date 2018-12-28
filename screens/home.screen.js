import React, { Component } from 'react';
import {
    StyleSheet,
    ScrollView,
    TouchableHighlight,
    SafeAreaView,
    YellowBox,
    Text,
    ImageBackground
} from 'react-native';
import GridList from 'react-native-grid-list';
import BasicImageSlider from '../ReusableComponents/ImageSlider';
import { RouteController } from '../ReusableComponents/RouteControll/route.controller';
import ChatComponent from '../ReusableComponents/Chat';
import { db } from '../DB/config';

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
            backupCatInfo: [],
            modalVisible: false,
            currentText: '',
            messages: []
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
                .slice(0, 11);
            this.setState({ categoryInfo: sliceCat });
            console.log(this.state.categoryInfo.length);
        });
    }

    gotoListPage = (catName) => {
        RouteController(this.props, 'List', {
            title: 'List',
            categoryName: catName
        });
    }
    renderItem = ({ item, index }) => {
        return (
            <TouchableHighlight
                style={{
                    padding: 5
                }}
                onPress={() => this.gotoListPage(item.title)}>
                {/* <Image
                    style={{
                    height: 100
                }}
                    source={{
                    uri: item.picture
                }}/> */}
                <ImageBackground
                    source={{
                        uri: item.picture
                    }}
                    style={{
                        width: '100%',
                        height: 70,
                        justifyContent: 'center',
                        alignItems: 'center'
                    }}>
                    <Text
                        style={{
                            color: '#fff',
                            fontWeight: 'bold',
                            fontSize: 25,
                            textTransform: 'uppercase'
                        }}>{item.title}</Text>
                </ImageBackground>
            </TouchableHighlight>
        );
    };
    
    render() {
        const images = ['https://placeimg.com/640/640/nature', 'https://placeimg.com/640/640/cats', 'https://placeimg.com/640/640/cats', 'https://placeimg.com/640/640/cats'];
        return (
            <SafeAreaView style={styles.container}>
                <ScrollView>
                    <BasicImageSlider images={images} autoPlayWithInterval={5000}></BasicImageSlider>
                    <GridList
                        showSeparator
                        data={this.state.categoryInfo}
                        numColumns={2}
                        renderItem={this.renderItem}
                        style={{
                            paddingTop: 5
                        }} />
                </ScrollView>
                <ChatComponent></ChatComponent>

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