import React, { Component } from 'react';
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
import { Icon, Button } from 'react-native-elements'
import BasicImageSlider from '../ReusableComponents/ImageSlider';
import { RouteController } from '../ReusableComponents/RouteControll/route.controller';
import { db } from '../DB/config';
import { Header } from 'react-navigation';

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
    setModalVisible(visible) {
        this.setState({ modalVisible: visible });
    }
    saveMessage = (message) => {
        console.log('before add length is ' + this.state.messages.length);
        this.state.messages.push({ message: message });
        this.state.messages.reverse();
        this.setState({
            messages: this.state.messages,
            currentText: ''
        });
        console.log(this.state.messages);
        console.log('after add length is ' + this.state.messages.length);
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
                        }} />
                </ScrollView>
                {/* chat modal */}
                <Modal
                    animationType="slide"
                    transparent={false}
                    visible={this.state.modalVisible}
                    onRequestClose={() => {
                        Alert.alert('Modal has been closed.');
                    }}>
                    <KeyboardAvoidingView enabled behavior='padding' style={{ height: '100%' }}>
                        <ScrollView>
                            <View style={{ flex: 1, padding: 20, flexDirection: 'column', justifyContent: 'center', alignContent: 'center', alignItems: 'center', paddingTop: 50 }}>
                                {/* close button container starts */}
                                <View style={{ position: 'absolute', top: 25, right: 5 }}>
                                    <Icon
                                        reverse
                                        name='ios-close'
                                        type='ionicon'
                                        color='#517fa4'
                                        onPress={() => {
                                            this.setModalVisible(!this.state.modalVisible);
                                        }}
                                    />
                                </View>
                                {/* close button container ends */}
                                {/* message container starts */}
                                <View style={{ marginTop: 50, minHeight: 200, borderWidth: 1, borderColor: '#000', padding: 10, width: '100%' }}>
                                    <Text style={{ fontWeight: 'bold', paddingBottom: 10 }}>Messages</Text>
                                    {this.state.messages.length > 0 && this.state.messages.map((data, index) => {
                                        return (<Text key={index} style={{ paddingBottom: 10 }}>{data.message}</Text>);
                                    })}
                                </View>
                                {/* message container ends */}
                            </View>

                        </ScrollView>
                        {/* message sending input part */}
                        <View style={{ justifyContent: 'center', alignItems: 'center', alignContent: 'center' }}>
                            <TextInput
                                style={{
                                    height: 40,
                                    borderColor: '#000',
                                    borderWidth: 1,
                                    width: 300,
                                    paddingLeft: 20,
                                    borderRadius: 10
                                }}
                                placeholder="Your Message"
                                placeholderTextColor="#000"
                                selectionColor="#000"
                                onChangeText={(text) => {
                                    console.log(text);
                                    this.setState({
                                        currentText: text
                                    });
                                }} value={this.state.currentText} />
                            <TouchableHighlight style={{ paddingTop: 10, paddingBottom: 20 }}>
                                <Button raised title='BUTTON' onPress={() => this.saveMessage(this.state.currentText)} />
                            </TouchableHighlight>
                        </View>

                    </KeyboardAvoidingView>
                </Modal>
                {/* Fav Icon */}
                <TouchableHighlight
                    style={{
                        position: 'absolute',
                        bottom: 10,
                        right: 20
                    }}
                    onPress={() => {
                        this.setModalVisible(true);
                    }}>
                    <Icon reverse name='ios-american-football' type='ionicon' color='#517fa4' />
                </TouchableHighlight>

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