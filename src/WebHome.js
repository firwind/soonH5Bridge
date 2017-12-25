//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet, WebView } from 'react-native';

// create a component
class WebHome extends Component {
    render() {
        return (
            <WebView 
             source={require('./web/index.html')}
            />
        );
    }
}

// define your styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#2c3e50',
    },
});

//make this component available to the app
export default WebHome;
