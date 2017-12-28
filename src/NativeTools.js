import { AsyncStorage } from 'react-native';
import * as WeChat from 'react-native-wechat';

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