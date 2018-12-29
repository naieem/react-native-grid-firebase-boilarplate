import React, { Component } from "react";
import {
  View,
  Text,
  TouchableHighlight,
  Modal,
  ScrollView,
  TextInput,
  KeyboardAvoidingView,
  Alert
} from "react-native";
import { Icon, Button } from "react-native-elements";
import { db } from '../../DB/config';
// Warn if overriding existing method
if (Array.prototype.isEquals)
  console.warn("Overriding existing Array.prototype.equals. Possible causes: New API defines the method, there's a framework conflict or you've got double inclusions in your code.");
// attach the .equals method to Array's prototype to call it on any array
Array.prototype.isEquals = function (array) {
  // if the other array is a falsy value, return
  if (!array)
    return false;

  // compare lengths - can save a lot of time 
  if (this.length != array.length)
    return false;

  for (var i = 0, l = this.length; i < l; i++) {
    // Check if we have nested arrays
    if (this[i] instanceof Array && array[i] instanceof Array) {
      // recurse into the nested arrays
      if (!this[i].isEquals(array[i]))
        return false;
    }
    else if (this[i] != array[i]) {
      // Warning - two different object instances will never be equal: {x:20} != {x:20}
      return false;
    }
  }
  return true;
}
// Hide method from for-in loops
Object.defineProperty(Array.prototype, "isEquals", { enumerable: false });
export default class ChatComponent extends Component {
  constructor(props) {
    super(props);
    this.messages = this.props.messages;
    this.state = {
      modalVisible: false,
      currentText: "",
      CurrentObjectRef: {},
      messages: []
    };
  }
  componentDidMount() {
    console.log('Props from chat component');
    console.log(this.props);
    const userRef = db.ref('/services');
    console.log('after user ref');
    userRef
      .orderByChild("_id")
      .equalTo(this.props.itemId)
      .once('value')
      .then((result) => {
        if (result) {
          result
            .forEach(value => {
              if (value) {
                this.setState({
                  CurrentObjectRef: value,
                  messages: this.props.messages
                });
              }
            });
        } else {
          console.log('no data found from chat component');
        }
      })
      .catch((err) => {
        console.log('Error found in getting data ' + err);
      });
  }
  componentDidUpdate(prevProps) {
    console.log('updated from chat component');
    console.log('new prop is ');
    console.log(prevProps.messages.isEquals(this.props.messages));
    var isValueChanged = prevProps.messages.isEquals(this.props.messages);
    if (!isValueChanged) {
      this.setState({
        messages: this.props.messages
      });
    }
  }
  setModalVisible(visible) {
    this.setState({ modalVisible: visible });
  }
  saveMessage = message => {
    if (message.trim() !== '' && message !== '') {
      console.log("before add length is " + this.state.messages.length);
      this.state.messages.reverse();
      this.state.messages.unshift({ message: message });
      this.state.CurrentObjectRef.ref.update({ messages: this.state.messages }).then(() => {
        console.log('update success');
        this.setState({
          currentText: ''
        });
      }).catch((er) => {
        console.log(er);
      });
      console.log(this.state.messages);
      console.log("after add length is " + this.state.messages.length);
    } else {
      Alert.alert(
        'Warning',
        'Can not send empty message',
        [
          { text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel' },
          { text: 'OK', onPress: () => console.log('OK Pressed') },
        ],
        { cancelable: false }
      )
    }
  };
  render() {
    return (
      <View>
        {/* chat modal */}
        <Modal
          animationType="slide"
          transparent={false}
          visible={this.state.modalVisible}
          onRequestClose={() => {
            alert("Modal has been closed.");
          }}
        >
          <KeyboardAvoidingView
            enabled
            behavior="padding"
            style={{ height: 550 }}
          >

            <View style={{ flexDirection: 'row', alignContent: 'space-between', alignItems: 'flex-end' }}>
              <Text style={{ fontWeight: "bold", width: 200, height: 100, paddingLeft: 30, paddingTop: 50 }}>
                Messages
              </Text>
              {/* close button container starts */}
              <View style={{ width: '50%', paddingRight: 20, alignItems: 'flex-end' }}>
                <Icon
                  reverse
                  name="ios-close"
                  type="ionicon"
                  color="#517fa4"
                  onPress={() => {
                    this.setModalVisible(!this.state.modalVisible);
                  }}
                />
              </View>
              {/* close button container ends */}
            </View>
            <ScrollView ref={ref => this.scrollView = ref}
              onContentSizeChange={(contentWidth, contentHeight) => {
                this.scrollView.scrollToEnd({ animated: true });
              }}>
              <View
                style={{
                  flex: 1,
                  padding: 20,
                  flexDirection: "column",
                  justifyContent: "center",
                  alignContent: "center",
                  alignItems: "center",
                }}
              >

                {/* message container starts */}
                <View
                  style={{
                    minHeight: 200,
                    padding: 10,
                    width: "100%",
                  }}
                >
                  {!this.state.messages.length &&
                    <Text>No Message Found</Text>
                  }
                  {this.state.messages.length > 0 &&
                    this.state.messages.map((data, index) => {
                      return (
                        <Text key={index} style={{ paddingBottom: 10 }}>
                          {data.message}
                        </Text>
                      );
                    })}
                </View>
                {/* message container ends */}
              </View>
            </ScrollView>
            {/* message sending input part */}
            <View
              style={{
                justifyContent: "center",
                alignItems: "center",
                alignContent: "center",
                marginTop: 10
              }}
            >
              <TextInput
                style={{
                  height: 40,
                  borderColor: "#000",
                  borderWidth: 1,
                  width: 300,
                  paddingLeft: 20,
                  borderRadius: 10
                }}
                placeholder="Your Message"
                placeholderTextColor="#000"
                selectionColor="#000"
                onChangeText={text => {
                  console.log(text);
                  this.setState({
                    currentText: text
                  });
                }}
                value={this.state.currentText}
              />
              <TouchableHighlight style={{ paddingBottom: 20, marginTop: 10 }}>
                <Button
                  raised
                  title="Send Message"
                  onPress={() => this.saveMessage(this.state.currentText)}
                  buttonStyle={{ borderRadius: 10, borderColor: "transparent" }}
                />
              </TouchableHighlight>
            </View>
          </KeyboardAvoidingView>
        </Modal>
        {/* Fav Icon */}
        <TouchableHighlight
          style={{
            position: "absolute",
            bottom: 10,
            right: 20
          }}
          onPress={() => {
            this.setModalVisible(true);
          }}
        >
          <Icon
            reverse
            name="ios-chatboxes"
            type="ionicon"
            color="#517fa4"
          />
        </TouchableHighlight>
      </View>
    );
  }
}
