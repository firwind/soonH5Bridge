import React, {Component} from 'react';
import {Platform, ScrollView, StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import {List} from 'antd-mobile';
import * as WeChat from 'react-native-wechat';
import {datas} from './Data';
import * as Tools from './NativeTools';
export default class NativeHome extends Component {
  constructor(props, context) {
    super(props, context)
    WeChat.registerApp('wx35f14e67f7ac19bc');
  }

  // onPress = () => {
  //   this.share('1');
  // }
   
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
  // export const datas = [
  //   {'key':'获取app存取的tokenId','value':['点我获取tokenId']},  
  //   {'key':'分享','value':['微信分享','微博分享']}, 
  //   {'key':'登录','value':['微信登录']}, 
  //   {'key':'支付','value':['微信支付','支付宝支付']},
  //   {'key':'定位','value':['点击获取位置']}, 
  //   {'key':'推送','value':['阿里推送']}, 
  //   {'key':'导航栏控制','value':['隐藏导航栏']}, 
  //   {'key':'退出app','value':['点我退出app']},
  //   {'key':'打开新的 webview','value':['点我打开新的webview']},   
  // ];
  onclick = async (text)=>{
  switch (text) {
    case '点我获取tokenId':
      const token = await Tools.getNativeTokenId();
      alert('token是'+token);
      break;
    case '微信分享':
      Tools.shareToSession()
      break;
    default:
      break;
  }
  }
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
