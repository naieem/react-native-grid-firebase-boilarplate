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
import {RouteController} from '../ReusableComponents/RouteControll/route.controller';
import {db} from '../DB/config';
export class ListScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userInfo: []
        };
        this.gotoDetails = this
            .gotoDetails
            .bind(this);
    }
    gotoDetails = (_id) => {
        console.log(_id);
        RouteController(this.props, 'Details', {
            _id: _id,
            title: 'Service Details'
        });
    }

    componentDidMount() {
        console.log('list page called');
        const querysring = this
            .props
            .navigation
            .getParam('categoryName');
        this.getServiceInfo(querysring);
    }
    componentDidUpdate(prevProps) {
        console.log('component updated called');
        console.log('get params is');
        console.log(this.props.navigation.getParam('categoryName'));
        // console.log(this.props.navigation.getParam('ItemId')); console.log('prev');
        // console.log(prevProps); console.log('latest'); console.log(this.props);
        if (prevProps && (prevProps.navigation.state.params.categoryName !== this.props.navigation.getParam('categoryName'))) {
            this.setState({
                userInfo:[]
            });
            this.getServiceInfo(this.props.navigation.getParam('categoryName'));
        }
    }
    getServiceInfo = (categoryName) => {
        const services = db.ref('/services');
        services
            .orderByChild("categoryName")
            .equalTo(categoryName)
            .on('value', (dataSnap) => {
                const info = [];
                const tempdatastore = dataSnap.val();
                Object.values(tempdatastore).forEach(data => {
                    info.push(data);
                });
                console.log(info.length);
                this.setState({
                    userInfo: info
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
                                    <TouchableOpacity key={index} onPress={() => this.gotoDetails(data._id)}>
                                        <Card containerStyle={styles.containerStyless}>
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
        height:70,
        width:"100%",
        justifyContent: 'center',
        alignItems: 'center'
    },
    containerStyle:{
        borderRadius:10
    }
});

export default ListScreen;