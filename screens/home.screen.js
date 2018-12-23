import React, { Component } from 'react'
import {
    Text,
    View,
    StyleSheet,
    Image,
    ScrollView,
    ActivityIndicator,
    TouchableOpacity, TouchableHighlight, SafeAreaView,
    YellowBox
} from 'react-native'
import { Card, ListItem, Button, Icon } from 'react-native-elements';
import GridList from 'react-native-grid-list';
import BasicImageSlider from '../ReusableComponents/ImageSlider';
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
YellowBox.ignoreWarnings(["Warning: Failed child context type: Invalid child context",]);
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
            var sliceCat = this.state.backupCatInfo.slice(0, 10);
            this.setState({
                categoryInfo: sliceCat
            });
            console.log(this.state.categoryInfo.length);
        });
    }
    renderItem = ({ item, index }) => {
        return (
            <View style={{ padding: 10 }}>
                <Image style={{ height: 100 }} source={{ uri: item.picture }} />
            </View>
        );
    };
    render() {
        const images = [
            'https://placeimg.com/640/640/nature',
            'https://placeimg.com/640/640/cats',
            'https://placeimg.com/640/640/cats',
            'https://placeimg.com/640/640/cats',
        ];
        return (
            <SafeAreaView style={styles.container} >
                <ScrollView>
                    <BasicImageSlider images={images} autoPlayWithInterval={5000}></BasicImageSlider>
                    <GridList
                        showSeparator
                        data={this.state.categoryInfo}
                        numColumns={2}
                        renderItem={this.renderItem} />
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