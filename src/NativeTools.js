import { AsyncStorage,NativeModules,Geolocation,Alert } from 'react-native';
import * as WeChat from 'react-native-wechat';
import JShareModule from 'jshare-react-native';
import {Toast} from 'antd-mobile';
const Alipay = NativeModules.Alipay;
// export const datas = [
//   {'key':'获取app存取的tokenId','value':[{'title':'点我获取tokenId',id:'1'}]},  
//   {'key':'分享','value':[{'title':'微信分享',id:'2'},{'title':'微博分享',id:'3'}]}, 
//   {'key':'登录','value':[{'title':'微信登录',id:'4'}]}, 
//   {'key':'支付','value':[{'title':'微信支付',id:'5'},{'title':'支付宝支付',id:'6'}]},
//   {'key':'定位','value':[{'title':'点击获取位置',id:'7'}]}, 
//   {'key':'推送','value':[{'title':'阿里推送',id:'8'}]}, 
//   {'key':'导航栏控制','value':[{'title':'隐藏导航栏',id:'9'}]}, 
//   {'key':'退出app','value':[{'title':'点我退出app',id:'10'}]},
//   {'key':'打开新的 webview','value':[{'title':'点我打开新的webview',id:'11'}]},   
// ];
export async function getNativeTokenId(params) {
    let tokenId = await AsyncStorage.getItem('tokenId');
    return tokenId;
}
export async function shareToSession(params) {
    try {
        let result = await WeChat.shareToSession({type: 'news', title: '测试！', description: '领取300积分，扫码免费喝健康好水，还有更多抽奖等你拿！', webpageUrl: 'http://www.baidu.com'});
        console.log('share image url to time line successful:', result);
      } catch (e) {
        if (e instanceof WeChat.WechatError) {
          console.error(e.stack);
        } else {
          throw e;
        }
      }
}
export async function shareToSina(params) {
  var shareParam = {
    platform: "sina_weibo",
     type: "text",
      text: "JShare test text",
      title: "my app",
      url: "www.jiguang.cn",
      extInfo: "ext info string",
  };
  JShareModule.share(shareParam, (map) => {
    alert('分享成功');
  }, (map) => {
    alert('分享失败');
    console.log("share failed, map: " + map);
  });
}
export async function sendAuthRequest(params) {
  let scope = 'snsapi_userinfo';
  let state = 'wechat_sdk_demo';

  WeChat.sendAuthRequest(scope).then(responseCode => {
         alert('获取到微信登录令牌'+responseCode.code);
    }).catch(err => {
       console.log(err)
       alert('登录授权发生错误：', err.message);
  })

}
export function aliPay(params) {
  let orderString = 'app_id=2015052600090779&biz_content=%7B%22timeout_express%22%3A%2230m%22%2C%22seller_id%22%3A%22%22%2C%22product_code%22%3A%22QUICK_MSECURITY_PAY%22%2C%22total_amount%22%3A%220.02%22%2C%22subject%22%3A%221%22%2C%22body%22%3A%22%E6%88%91%E6%98%AF%E6%B5%8B%E8%AF%95%E6%95%B0%E6%8D%AE%22%2C%22out_trade_no%22%3A%22314VYGIAGG7ZOYY%22%7D&charset=utf-8&method=alipay.trade.app.pay&sign_type=RSA2&timestamp=2016-08-15%2012%3A12%3A15&version=1.0&sign=MsbylYkCzlfYLy9PeRwUUIg9nZPeN9SfXPNavUCroGKR5Kqvx0nEnd3eRmKxJuthNUx4ERCXe552EV9PfwexqW%2B1wbKOdYtDIb4%2B7PL3Pc94RZL0zKaWcaY3tSL89%2FuAVUsQuFqEJdhIukuKygrXucvejOUgTCfoUdwTi7z%2BZzQ%3D';
  //let res = await call(getOrderInfo, params); // 从后端获取签名字串，参考支付接口调用
  Alipay.pay(orderString).then(function(data){
     
      console.log(data);
  }, function (err) {
      console.log(err);
  });

}
// "appid": "wx51f766378415c10f",
// "error": 1,
// "noncestr": "VJPJ9IVwBGNqdFpDL2bJDG3baheBYOve",
// "package": "Sign\u003dWXPay",
// "partnerid": "1480779302",
// "paysign": "8F2AAD73E7A376511A6807AC9D055B70",
// "prepayid": "wx2017122823411485997fd2e10769919598",
// "timestamp": "1514475674"
export function weixinPay(params) {
  let formData = new FormData();  
  formData.append("totalAmount","0.01");  
    formData.append("description","111");  
    formData.append("userId","1");  
    formData.append("token","1B3CEF76-4DD2-4B17-9898-8FDEC7835C1B");   
    // alert('支付');
    fetch('http://sq.hc-it.com/ToPay',{
      method:'POST',
      headers:{},
      body:formData,
       })
         .then((response) => response.json())
         .then((responseJson) =>{
          const aaa = { 
            partnerId: responseJson.partnerid,  // 商家向财付通申请的商家id
            prepayId: responseJson.prepayid,   // 预支付订单
            nonceStr: responseJson.noncestr,   // 随机串，防重发
            timeStamp: responseJson.timestamp,  // 时间戳，防重发
            package: responseJson.package,    // 商家根据财付通文档填写的数据和签名
            sign: responseJson.paysign, 
          };
          WeChat.pay(aaa)
          .then(e =>{
          if (e.errCode == '0') {
                  alert('支付成功!');
          } else {
                  alert('抱歉,支付失败!');
          }
      }).catch(() =>{
  
      })
          //this.pay(responseJson);
         })
         .catch((error) =>{
         // alert('失败');
          console.log(error);
         }).done();
}
pay = (responseJson) =>{
  console.log(responseJson);
    
    console.log(aaa);
    
}
//获取位置
export function getLocation() {
  navigator.geolocation.getCurrentPosition(
      location => {
          var result = "速度：" + location.coords.speed +
                      "\n经度：" + location.coords.longitude +
                      "\n纬度：" + location.coords.latitude +
                      "\n准确度：" + location.coords.accuracy +
                      "\n行进方向：" + location.coords.heading +
                      "\n海拔：" + location.coords.altitude +
                      "\n海拔准确度：" + location.coords.altitudeAccuracy +
                      "\n时间戳：" + location.timestamp;
          alert(result);
      },
      error => {
        alert("获取位置失败："+ error)
      }
  );
}
// export const datas = [
//   {'key':'获取app存取的tokenId','value':[{'title':'点我获取tokenId',id:'1'}]},  
//   {'key':'分享','value':[{'title':'微信分享',id:'2'},{'title':'微博分享',id:'3'}]}, 
//   {'key':'登录','value':[{'title':'微信登录',id:'4'}]}, 
//   {'key':'支付','value':[{'title':'微信支付',id:'5'},{'title':'支付宝支付',id:'6'}]},
//   {'key':'定位','value':[{'title':'点击获取位置',id:'7'}]}, 
//   {'key':'推送','value':[{'title':'阿里推送',id:'8'}]}, 
//   {'key':'导航栏控制','value':[{'title':'隐藏导航栏',id:'9'}]}, 
//   {'key':'退出app','value':[{'title':'点我退出app',id:'10'}]},
//   {'key':'打开新的 webview','value':[{'title':'点我打开新的webview',id:'11'}]},   
// ];
export async function onclick(id,navigation){
  switch (id) {
    case '1':
      const token = await getNativeTokenId();
      alert('token是'+token);
      break;
    case '2':
      shareToSession();
      break;
    case '3':
      shareToSina();
      break;
    case '4':
      sendAuthRequest();
      break;
    case '6':
      aliPay();
      break;
    case '5':
      weixinPay();
      break;
    case '7':
      getLocation();
      break;
    case '9':
      navigation.setParams({isHeaderShow:!navigation.state.params.isHeaderShow});
      break;
    case '10':
      Toast.show('此功能仅限于android平台');
      break;
    case '8':
      Toast.loading('loading',10);
      setTimeout(function() {
        Toast.hide();
        Alert.alert(
          '收到推送',
          '推送消息',
          [
           
            {text: '取消', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
            {text: '点击查看', onPress: () => navigation.navigate('WebHome',{uri:'http://www.baidu.com'})},
          ],
          { cancelable: false }
        )
      }, 500);
      break;
     case '11':
     navigation.navigate('WebHome',{uri:'http://www.baidu.com'});
      break;
    default:
      break;
  }
  }
