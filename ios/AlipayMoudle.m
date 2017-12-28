//
//  AlipayMoudle.m
//  H5WithRN
//
//  Created by JianLong on 2017/12/28.
//  Copyright © 2017年 Facebook. All rights reserved.
//

#import "AlipayMoudle.h"
#import <AlipaySDK/AlipaySDK.h>
@implementation AlipayMoudle
RCT_EXPORT_METHOD(pay:(NSString *)orderInfo
                  resolver:(RCTPromiseResolveBlock)resolve
                  rejecter:(RCTPromiseRejectBlock)reject){
  //应用注册scheme,在AliSDKDemo-Info.plist定义URL types
  NSString *appScheme = @"H5WithRN";
  [[AlipaySDK defaultService] payOrder:orderInfo fromScheme:appScheme callback:^(NSDictionary *resultDic) {
    resolve(resultDic);
  }];
}

RCT_EXPORT_MODULE(Alipay);

@end
