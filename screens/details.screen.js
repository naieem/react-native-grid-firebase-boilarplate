import React, {Component} from 'react'
import {
    Text,
    View,
    StyleSheet,
    Image,
    ScrollView,
    SafeAreaView,
    ActivityIndicator
} from 'react-native';
import {Button, Card} from 'react-native-elements';
import {db} from '../DB/config';
export class DetailsScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            info: undefined
        }
        console.log('constructor called');
        this.setInformation = this
            .setInformation
            .bind(this);
    }
    componentDidMount() {
        console.log('component mounted');
        console.log(this.props.navigation.getParam('_id'));
        const itemId = this
            .props
            .navigation
            .getParam('_id');
        this.setInformation(itemId);
        // console.log('after mount');
    }
    componentDidUpdate(prevProps) {
        console.log('component updated');
        // console.log(this.props.navigation.getParam('ItemId')); console.log('prev');
        // console.log(prevProps); console.log('latest'); console.log(this.props);
        
        const currentParam = this.props.navigation.getParam('_id');
        if (prevProps && (prevProps.navigation.state.params._id !== currentParam)) {
            this.setState({
                info:undefined
            });
            this.setInformation(currentParam);
        }
    }
    setInformation = (ItemId) => {
        console.log('supplied _id is '+ ItemId);
        const userRef = db.ref('/services');
        userRef
            .orderByChild("_id")
            .equalTo(ItemId)
            .once('value')
            .then((result) => {
                console.log(typeof(result.val()));
                const tempStore = result.val();
                Object
                    .values(tempStore)
                    .forEach(value => {
                        this.setState({info: value});
                    });
                // console.log(this.state.info);
            })
            .catch((err) => {
                console.log('Error found in getting data ' + err);
            });
    }

    render() {
        // var userInfo = this.state.info;
        return (
            <SafeAreaView style={styles.container}>
                <ScrollView>
                    <View>
                        {!this.state.info && <View style={styles.loaderContainer}>
                        <ActivityIndicator size="large" color="#0000ff"/>
                    </View>}
                    {this.state.info && <View>
                        <Card>
                            <Image
                                source={{
                                uri: this.state.info.picture
                            }}
                                style={{
                                height: 200,
                                marginBottom: 20
                            }}/>
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
    }
});
export default DetailsScreen;