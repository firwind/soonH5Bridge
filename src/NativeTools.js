import { AsyncStorage } from 'react-native';
import * as WeChat from 'react-native-wechat';
import JShareModule from 'jshare-react-native';

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
