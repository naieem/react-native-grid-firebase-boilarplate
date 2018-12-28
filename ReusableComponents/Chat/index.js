import React, { Component } from "react";
import {
  View,
  Text,
  TouchableHighlight,
  Modal,
  ScrollView,
  TextInput,
  KeyboardAvoidingView
} from "react-native";
import { Icon, Button } from "react-native-elements";
export default class ChatComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalVisible: false,
      currentText: "",
      messages: []
    };
  }
  setModalVisible(visible) {
    this.setState({ modalVisible: visible });
  }
  saveMessage = message => {
    console.log("before add length is " + this.state.messages.length);
    this.state.messages.push({ message: message });
    this.state.messages.reverse();
    this.setState({
      messages: this.state.messages,
      currentText: ""
    });
    console.log(this.state.messages);
    console.log("after add length is " + this.state.messages.length);
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
            Alert.alert("Modal has been closed.");
          }}
        >
          <KeyboardAvoidingView
            enabled
            behavior="padding"
            style={{ height: "100%" }}
          >
            <ScrollView>
              <View
                style={{
                  flex: 1,
                  padding: 20,
                  flexDirection: "column",
                  justifyContent: "center",
                  alignContent: "center",
                  alignItems: "center",
                  paddingTop: 50
                }}
              >
                {/* close button container starts */}
                <View style={{ position: "absolute", top: 25, right: 5 }}>
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
                {/* message container starts */}
                <View
                  style={{
                    marginTop: 50,
                    minHeight: 200,
                    borderWidth: 1,
                    borderColor: "#000",
                    padding: 10,
                    width: "100%"
                  }}
                >
                  <Text style={{ fontWeight: "bold", paddingBottom: 10 }}>
                    Messages
                  </Text>
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
                alignContent: "center"
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
              <TouchableHighlight style={{ paddingTop: 10, paddingBottom: 20 }}>
                <Button
                  raised
                  title="BUTTON"
                  onPress={() => this.saveMessage(this.state.currentText)}
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
            name="ios-american-football"
            type="ionicon"
            color="#517fa4"
          />
        </TouchableHighlight>
      </View>
    );
  }
}
