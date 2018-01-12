//
//  CustomWebview.h
//  H5WithRN
//
//  Created by JianLong on 2017/12/27.
//  Copyright © 2017年 Facebook. All rights reserved.
//

#import <React/RCTViewManager.h>
#import "WebViewJavascriptBridge.h"

@interface CustomWebview : UIView
  
@property WebViewJavascriptBridge* bridge;
@property (nonatomic, copy) NSDictionary *source;
@property (copy, nonatomic) RCTBubblingEventBlock onStart;
@property (copy, nonatomic) RCTBubblingEventBlock onEnd;
@property (copy, nonatomic) RCTBubblingEventBlock onError;
@end
