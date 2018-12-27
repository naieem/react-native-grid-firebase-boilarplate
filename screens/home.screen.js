import React, {Component} from 'react';
import {
    View,
    StyleSheet,
    KeyboardAvoidingView,
    ScrollView,
    TouchableOpacity,
    TouchableHighlight,
    SafeAreaView,
    YellowBox,
    Text,
    Modal,
    TextInput,
    ImageBackground
} from 'react-native';
import GridList from 'react-native-grid-list';
import {Icon, Button} from 'react-native-elements'
import BasicImageSlider from '../ReusableComponents/ImageSlider';
import {RouteController} from '../ReusableComponents/RouteControll/route.controller';
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
            backupCatInfo: [],
            modalVisible: false,
            contacts: []
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
            this.setState({categoryInfo: sliceCat});
            console.log(this.state.categoryInfo.length);
        });
    }

    gotoListPage = (catName) => {
        RouteController(this.props, 'List', {
            title: 'List',
            categoryName: catName
        });
    }
    renderItem = ({item, index}) => {
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
    setModalVisible(visible) {
        this.setState({modalVisible: visible});
    }
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
                    }}/>
                </ScrollView>
                {/* bottom fav button starts */}
                <TouchableHighlight
                    style={{
                    position: 'absolute',
                    bottom: 10,
                    right: 20
                }}
                    onPress={() => {
                    this.setModalVisible(true);
                }}>
                    <Icon reverse name='ios-american-football' type='ionicon' color='#517fa4'/>
                </TouchableHighlight>
                {/* bottom fav button ends */}
                {/* modal body design starts */}
                <ScrollView>
                    <Modal
                        animationType="slide"
                        transparent={false}
                        visible={this.state.modalVisible}>
                        <KeyboardAvoidingView
                            style={{
                            flex: 1
                        }}
                            behavior="padding"
                            enabled>
                            <TouchableHighlight
                                style={{
                                justifyContent: 'center',
                                alignContent: 'center',
                                alignItems: 'center'
                            }}>
                                <TextInput
                                    style={{
                                    height: 40,
                                    borderColor: 'red',
                                    borderWidth: 1,
                                    width: '100%'
                                }}
                                    placeholder="Type here to translate!"
                                    onChangeText={() => {
                                    console.log('new personsssssss')
                                }}/>
                                <Button title='BUTTON'/>
                            </TouchableHighlight>
                        </KeyboardAvoidingView>
                    </Modal>
                </ScrollView>
                {/* modal body design ends */}
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