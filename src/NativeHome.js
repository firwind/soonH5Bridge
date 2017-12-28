import React, {Component} from 'react';
import {Platform, ScrollView, StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import {List,Toast} from 'antd-mobile';
import * as WeChat from 'react-native-wechat';
import {datas} from './Data';
import * as Tools from './NativeTools';
import JShareModule from 'jshare-react-native';

var isHeaderShow = true;
export default class NativeHome extends Component {
  constructor(props, context) {
    super(props, context);
    this.props.navigation.setParams({isHeaderShow});
    // this.state={
    //   text:'隐藏导航栏'
    // }
    var config = 
    {
      appKey:'a1703c14b186a68a66ef86c1',
      channel:'',
      advertisingId:'',
      isProduction:false,
      sinaWeiboAppKey: '2731775419',
      sinaWeiboAppSecret: '9a4de9b9116ab5598768a6cd39fca078',
      sinaRedirectUri: 'https://www.jiguang.cn',
      isSupportWebSina: false
    }
     
    JShareModule.setup(config)
    WeChat.registerApp('wx35f14e67f7ac19bc');
  }
  onclick = async (text)=>{
    switch (text) {
      case '点我获取tokenId':
        const token = await Tools.getNativeTokenId();
        alert('token是'+token);
        break;
      case '微信分享':
        Tools.shareToSession();
        break;
      case '微博分享':
        Tools.shareToSina();
        break;
      case '微信登录':
        Tools.sendAuthRequest();
        break;
      case '支付宝支付':
        Tools.aliPay();
        break;
      case '微信支付':
        Tools.weixinPay();
        break;
      case '点击获取位置':
        Tools.getLocation();
        break;
      case '隐藏导航栏':
        this.props.navigation.setParams({isHeaderShow:!this.props.navigation.state.params.isHeaderShow});
        break;
      case '点我退出app':
        Toast.show('此功能仅限于android平台');
        break;
      case '阿里推送':
        Toast.show('');
        break;
      default:
        break;
    }
    }
  
  // onPress = () => {
  //   this.share('1');
  // }
  // async share(type) {
  //   switch (type) {
  //     case '1':
  //       {
  //         try {
  //           let result = await WeChat.shareToSession({type: 'news', title: '送你300积分，快来领取吧！', description: '领取300积分，扫码免费喝健康好水，还有更多抽奖等你拿！', webpageUrl: 'http://www.baidu.com'});
  //           console.log('share image url to time line successful:', result);
  //         } catch (e) {
  //           if (e instanceof WeChat.WechatError) {
  //             console.error(e.stack);
  //           } else {
  //             throw e;
  //           }
  //         }
  //       }
  //       break;
  //     case '2':
  //       {}
  //       break;
  //     default:
  //       break;
  //   }

  // }
  render() {
    return (
      <ScrollView>
        {
          datas.map((item)=>(
            <List key={item.key} renderHeader={() => item.key}>
               {
                 item.value.map((text)=>(<List.Item onClick={()=>this.onclick(text)} key={text}>{text}</List.Item>))
               }
            </List>
          ))
        }
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
