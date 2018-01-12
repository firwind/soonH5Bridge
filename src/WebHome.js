//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet, WebView } from 'react-native';
import {Toast} from 'antd-mobile';

import resolveAssetSource from 'react-native/Libraries/Image/resolveAssetSource';
const mHtml = require('./web/index.html');
// create a component
class WebHome extends Component {
    onMessage = (message) => {
    let text = message.nativeEvent.data;
    this.injectJavaScript();
     console.log('====================================');
     console.log('第三方士大夫');
     console.log('====================================');
    }
    injectJavaScript = (script) =>{
        this.web.injectJavaScript('javascript:SignIn(jjjj)');
    }
    
    render() {
        return (
            <WebView 
             ref={(web)=>this.web=web}
             injectJavaScript={()=>this.injectJavaScript(script)}
             source={mHtml}
             onLoadStart={()=>Toast.loading('Loading', 5)}
             onError={()=>Toast.hide()}
             onLoadEnd={()=>Toast.hide()}
             javaScriptEnabled
             onMessage={(message)=>this.onMessage(message)}
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
