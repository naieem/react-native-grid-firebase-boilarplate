import React, { Component } from 'react'
import {
    Text,
    View,
    StyleSheet,
    Image,
    ScrollView,
    SafeAreaView,
    ActivityIndicator
} from 'react-native';
import { Button, Card } from 'react-native-elements';
import ChatComponent from '../ReusableComponents/Chat';
import { db } from '../DB/config';
export class DetailsScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            info: undefined
        }
        console.log('constructor called from details component');
        this.setInformation = this
            .setInformation
            .bind(this);
    }
    componentDidMount() {
        console.log('component mounted details component');
        console.log(this.props.navigation.getParam('_id'));
        const itemId = this
            .props
            .navigation
            .getParam('_id');
        this.setInformation(itemId);
        // console.log('after mount');
    }
    componentDidUpdate(prevProps) {
        console.log('component updated details component');
        // console.log(this.props.navigation.getParam('ItemId')); console.log('prev');
        // console.log(prevProps); console.log('latest'); console.log(this.props);

        const currentParam = this.props.navigation.getParam('_id');
        if (prevProps && (prevProps.navigation.state.params._id !== currentParam)) {
            this.setState({
                info: undefined
            });
            this.setInformation(currentParam);
        }
    }
    setInformation = (ItemId) => {
        console.log('supplied _id is ' + ItemId);
        const userRef = db.ref('/services');
        userRef
            .orderByChild("_id")
            .equalTo(ItemId)
            .on('value', (result) => {
                const tempStore = result.val();
                Object
                    .values(tempStore)
                    .forEach(value => {
                        if(value.messages && value.messages.length){
                            value.messages.reverse();
                        }
                        this.setState({
                            info: value
                        });
                    });
            });
    }

    render() {
        // var userInfo = this.state.info;
        return (
            <SafeAreaView style={styles.container}>
                <ScrollView>
                    <View>
                        {!this.state.info && <View style={styles.loaderContainer}>
                            <ActivityIndicator size="large" color="#0000ff" />
                        </View>}
                        {this.state.info && <View>
                            <Card containerStyle={styles.containerStyle}>
                                <Image
                                    source={{
                                        uri: this.state.info.picture
                                    }}
                                    style={{
                                        height: 200,
                                        marginBottom: 20
                                    }} />
                                <Text>
                                    <Text
                                        style={{
                                            fontWeight: 'bold'
                                        }}>Name:</Text>{this.state.info.name}</Text>
                                <Text>
                                    <Text
                                        style={{
                                            fontWeight: 'bold'
                                        }}>Email:</Text>{this.state.info.email}</Text>
                                <Text>
                                    <Text
                                        style={{
                                            fontWeight: 'bold'
                                        }}>Company:</Text>{this.state.info.company}</Text>
                                <Text>
                                    <Text
                                        style={{
                                            fontWeight: 'bold'
                                        }}>Address:</Text>{this.state.info.address}</Text>
                                <Text>
                                    <Text
                                        style={{
                                            fontWeight: 'bold'
                                        }}>About:</Text>{this.state.info.about}</Text>
                            </Card>
                        </View>}
                    </View>
                </ScrollView>
                <View>
                    {this.state.info &&
                        <ChatComponent itemId={this.props.navigation.getParam('_id')} messages={this.state.info.messages ? this.state.info.messages : []}></ChatComponent>
                    }
                </View>
            </SafeAreaView>
        )
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 10,
        paddingBottom: 10
    },
    button: {
        backgroundColor: '#0000ce'
    },
    containerStyle: {
        borderRadius: 10
    }
});
export default DetailsScreen;