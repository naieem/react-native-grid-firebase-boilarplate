import React, {Component} from 'react'
import {
    Text,
    View,
    StyleSheet,
    Image,
    ScrollView,
    ActivityIndicator,
    TouchableOpacity
} from 'react-native'
import {Card, ListItem, Button, Icon} from 'react-native-elements';
import {db} from '../DB/config';
import GridList from 'react-native-grid-list';
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
export class HomeScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            categoryInfo: []
        };
    }
    componentDidMount() {
        const users = db.ref('/categories');
        users.once('value', (dataSnap) => {
            this.setState({
                categoryInfo: dataSnap.val()
            });
            console.log(this.state.categoryInfo.length);
        });
    }
    renderItem = ({item, index}) => {
        return (
            <View style={{padding:10}}>
                <Image style={{height:100}} source={{uri:item.picture}}/>
            </View>
        );
    };
    render() {
        return (
            <ScrollView style={styles.container}>
                <GridList
                    showSeparator
                    data={this.state.categoryInfo}
                    numColumns={2}
                    renderItem={this.renderItem}/>
            </ScrollView>
        )
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 10
    },
    listItemContainer:{
        padding:10
    }
});

export default HomeScreen;