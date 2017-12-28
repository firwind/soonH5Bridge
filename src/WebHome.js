//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet, WebView } from 'react-native';
import {Toast} from 'antd-mobile';
import CustomWebview from './components/WebviewBridge';
import resolveAssetSource from 'react-native/Libraries/Image/resolveAssetSource';
import * as Tools from './NativeTools';
const mHtml = require('./web/index.html');
// create a component
class WebHome extends Component {
    onMessage = (message) => {
    let text = message.nativeEvent.data;
    Tools.onclick(text,this.props.navigation);
     console.log('====================================');
     console.log('第三方士大夫');
     console.log('====================================');
    }
    // injectJavaScript = (text) =>{
    //     this.web.injectJavaScript('javascript:SignIn(jjjj)');
    // }
    
    render() {
        let url = '';
        if (this.props.navigation.state.params) {
            url=this.props.navigation.state.params.uri;
        }
        return (
            <CustomWebview 
             ref={(web)=>this.web=web}
             injectJavaScript={()=>this.injectJavaScript(script)}
             source={url?{uri:url}:mHtml}
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
