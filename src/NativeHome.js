import React, {Component} from 'react';
import {Platform, ScrollView, StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import {List} from 'antd-mobile';
import * as WeChat from 'react-native-wechat';


export default class NativeHome extends Component {
  constructor(props, context) {
    super(props, context)
    WeChat.registerApp('wx35f14e67f7ac19bc');
  }

  onPress = () => {
    this.share('1');
  }
  async share(type) {
    switch (type) {
      case '1':
        {
          try {
            let result = await WeChat.shareToSession({type: 'news', title: '送你300积分，快来领取吧！', description: '领取300积分，扫码免费喝健康好水，还有更多抽奖等你拿！', webpageUrl: 'http://www.baidu.com'});
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
        {}
        break;
      default:
        break;
    }

  }
  render() {
    return (
      <ScrollView>
        <List renderHeader={() => '获取app存取的tokenId'}>
          <List.Item>点我获取tokenId</List.Item>
        </List>
        <List renderHeader={() => '分享'}>
          <List.Item>微信分享</List.Item>
          <List.Item>微博分享</List.Item>
        </List>
        <List renderHeader={() => '登录'}>
          <List.Item>微信登录</List.Item>
        </List>
        <List renderHeader={() => '支付'}>
          <List.Item>微信支付</List.Item>
          <List.Item>支付宝支付</List.Item>
        </List>
        <List renderHeader={() => '定位'}>
          <List.Item>点击获取位置</List.Item>
        </List>
        <List renderHeader={() => '推送'}>
          <List.Item>微信分享</List.Item>
        </List>
        <List renderHeader={() => '隐藏导航栏'}>
          <List.Item>导航栏控制</List.Item>
        </List>
        <List renderHeader={() => '退出app'}>
          <List.Item>点我退出app</List.Item>
        </List>
        <List renderHeader={() => '打开新的 webview'}>
          <List.Item>点我打开新的webview</List.Item>
        </List>
      </ScrollView>

    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF'
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5
  }
});
