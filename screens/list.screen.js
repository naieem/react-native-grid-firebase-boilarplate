import React, {Component} from 'react'
import {
    Text,
    View,
    StyleSheet,
    Image,
    ScrollView,
    ActivityIndicator,
    TouchableOpacity,
    SafeAreaView
} from 'react-native'
import {Card, ListItem, Button, Icon} from 'react-native-elements';
import CommonService from '../common.service';
import {db} from '../DB/config';
export class ListScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userInfo: []
        };
    }
    _onPressButton = (ind) => {
        console.log(ind);
        CommonService.setActiveTitle({
            title:'List Details'
        });
        this
            .props
            .navigation
            .navigate('Details', {ItemId: ind});
        //   alert('hukka hua '+ ind);
    }
    componentDidMount() {
        const users = db.ref('/users');
        users.on('value', (dataSnap) => {
            // console.log(dataSnap.val());
            this.setState({
                userInfo: dataSnap.val()
            });
            // console.log(this.state.userInfo);
        });
    }
    render() {
        return (
            <SafeAreaView style={styles.container}>
                <ScrollView>
                    {!this.state.userInfo.length && <View style={styles.loaderContainer}>
                        <ActivityIndicator size="large" color="#0000ff"/>
                    </View>
}
                    <View>
                        {/* <Button raised
                    title="Go to Details"
                    onPress={() => this.props.navigation.navigate('Details')}/> */}
                        {this.state.userInfo.length > 0 && this
                            .state
                            .userInfo
                            .map((data, index) => {
                                return (
                                    <TouchableOpacity key={index} onPress={() => this._onPressButton(index)}>
                                        <Card >
                                            <View style={styles.listContainer}>
                                                <View>
                                                    <Image
                                                        source={{
                                                        uri: data.picture
                                                    }}
                                                        style={{
                                                        height: 50,
                                                        width: 50
                                                    }}/>
                                                </View>
                                                <View
                                                    style={{
                                                    paddingLeft: 10,
                                                    width: 250
                                                }}>
                                                    <Text>
                                                        <Text
                                                            style={{
                                                            fontWeight: 'bold'
                                                        }}>Name:</Text>{data.name}</Text>
                                                    <Text>
                                                        <Text
                                                            style={{
                                                            fontWeight: 'bold'
                                                        }}>Email:</Text>Email:{data.email}</Text>
                                                    <Text>
                                                        <Text
                                                            style={{
                                                            fontWeight: 'bold'
                                                        }}>Address:</Text>Address:{data.address}</Text>
                                                </View>
                                            </View>
                                        </Card>
                                    </TouchableOpacity>
                                )
                            })
}
                    </View>
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
    listContainer: {
        flexDirection: 'row'
    },
    loaderContainer: {
        flex: 10,
        justifyContent: 'center',
        alignItems: 'center'
    }
});

export default ListScreen;