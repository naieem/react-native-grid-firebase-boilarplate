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
import { RouteController } from '../ReusableComponents/RouteControll/route.controller';
import {db} from '../DB/config';
export class ListScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userInfo: []
        };
        this.gotoDetails = this.gotoDetails.bind(this);
    }
    gotoDetails = (ind) => {
        console.log(ind);
        RouteController(this.props,'Details',{ItemId:ind,title:'Service Details'});
    }
    componentDidMount() {
        const users = db.ref('/users');
        users.on('value', (dataSnap) => {
            this.setState({
                userInfo: dataSnap.val()
            });
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
                        {this.state.userInfo.length > 0 && this
                            .state
                            .userInfo
                            .map((data, index) => {
                                return (
                                    <TouchableOpacity key={index} onPress={() => this.gotoDetails(index)}>
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