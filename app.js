/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  TouchableOpacity
} from 'react-native';
import * as WeChat from 'react-native-wechat';

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' +
    'Cmd+D or shake for dev menu',
  android: 'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});

export default class App extends Component {
  constructor(props, context) {
    super(props, context)
    WeChat.registerApp('wx35f14e67f7ac19bc');
  }
  
  onPress = ()=>{
      this.share('1');
  }
  async share(type){
    switch (type) {
        case '1':
            {
                try {
                    let result = await WeChat.shareToSession({
                      type: 'news',
                      title: '送你300积分，快来领取吧！',
                      description: '领取300积分，扫码免费喝健康好水，还有更多抽奖等你拿！',
                      webpageUrl: 'http://www.baidu.com'
                    });
                    console.log('share image url to time line successful:', result);
                  } catch (e) {
                    if (e instanceof WeChat.WechatError) {
                      console.error(e.stack);
                    } else {
                      throw e;
                    }
                  }
            }
            break;
        case '2':
        {
           
        }
            break;
        default:
            break;
    }
   
}
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>
          Welcome to React Native!
        </Text>
        <TouchableOpacity onPress={this.onPress}>
        <Text style={styles.instructions}>
          To get started, edit App.js
        </Text>
        </TouchableOpacity>
        <Text style={styles.instructions}>
          {instructions}
        </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});
