import React, { Component } from 'react';
import { View, Text,StyleSheet,Image } from 'react-native';
import ImageSlider from 'react-native-image-slider';
export default class BasicImageSlider extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    render() {
        return (
            <View>
                <ImageSlider style={styles.slider}
                    loopBothSides
                    autoPlayWithInterval={this.props.autoPlayWithInterval}
                    images={this.props.images}
                    customSlide={({ index, item, style, width }) => (
                        <View key={index} style={[
                            style,
                            styles.basicSlide,
                        ]}>
                            <Image source={{ uri: item }} style={{ height: 200, width: 360 }} />
                        </View>
                    )}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    slider: { 
        backgroundColor: '#fff'
    },
    basicSlide: {
        alignItems: 'center',
        justifyContent: 'center',
    }
});