import React, { Component } from 'react'
import { Text, View, StyleSheet, Image, ScrollView, SafeAreaView } from 'react-native'
import { Button, Card } from 'react-native-elements';
import { db } from '../DB/config';
export class DetailsScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            info: {}
        }
    }
    componentDidMount() {
        const itemId = this.props.navigation.getParam('ItemId', 'NO-ID');
        console.log('in details view got itemid ' + itemId);
        const userRef = db.ref('/users/' + itemId);
        userRef.once('value').then((result) => {
            this.setState({
                info: result.val()
            });
        }).catch((err) => {
            console.log('Error found in getting data ' + err);
        });
    }
    render() {
        return (
            <SafeAreaView style={styles.container}>
                <ScrollView>
                    <View>
                        <Card>
                            <Image source={{ uri: this.state.info.picture }} style={{ height: 200, marginBottom: 20 }} />
                            <Text><Text style={{ fontWeight: 'bold' }}>Name:</Text>{this.state.info.name}</Text>
                            <Text><Text style={{ fontWeight: 'bold' }}>Email:</Text>{this.state.info.email}</Text>
                            <Text><Text style={{ fontWeight: 'bold' }}>Company:</Text>{this.state.info.company}</Text>
                            <Text><Text style={{ fontWeight: 'bold' }}>Address:</Text>{this.state.info.address}</Text>
                            <Text><Text style={{ fontWeight: 'bold' }}>About:</Text>{this.state.info.about}</Text>
                        </Card>
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
        paddingBottom: 10,
    },
    button: {
        backgroundColor: '#0000ce'
    }
});
export default DetailsScreen;