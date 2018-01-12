//
//  CustomWebview.m
//  H5WithRN
//
//  Created by JianLong on 2017/12/27.
//  Copyright © 2017年 Facebook. All rights reserved.
//

#import "CustomWebview.h"

@implementation CustomWebview{
  UIWebView *webView;
}

//- (void)registerHandler:(NSString*)handlerName handler:(WVJBHandler)handler;
//- (void)removeHandler:(NSString*)handlerName;
//- (void)callHandler:(NSString*)handlerName;
//- (void)callHandler:(NSString*)handlerName data:(id)data;
//- (void)callHandler:(NSString*)handlerName data:(id)data responseCallback:(WVJBResponseCallback)responseCallback;
//- (void)setWebViewDelegate:(id)webViewDelegate;
//- (void)disableJavscriptAlertBoxSafetyTimeout;
-(instancetype)init{
  self=[super init];
  if(self){
    webView = [[UIWebView alloc] initWithFrame:CGRectMake(0, 0, [[UIScreen mainScreen] bounds].size.width, [[UIScreen mainScreen] bounds].size.height)];
    [self addSubview:webView];
    self.bridge = [WebViewJavascriptBridge bridgeForWebView:webView];
    [self.bridge registerHandler:@"ObjC Echo" handler:^(id data, WVJBResponseCallback responseCallback) {
      NSLog(@"ObjC Echo called with: %@", data);
      responseCallback(data);
    }];
    [_bridge registerHandler:@"OC提供方法给JS调用" handler:^(id data, WVJBResponseCallback responseCallback) {
      //NSLog(@"testObjcCallback called: %@", data);
      responseCallback(@"OC发给JS的返回值");
    }];
   // [self loadExamplePage];
  }
  return self;
}
  - (void)setSource:(NSDictionary *)source
  {
    if (![_source isEqualToDictionary:source]) {
      _source = [source copy];
      
      // Check for a static html source first
      NSString *html = [RCTConvert NSString:source[@"html"]];
      if (html) {
        NSURL *baseURL = [RCTConvert NSURL:source[@"baseUrl"]];
        if (!baseURL) {
          baseURL = [NSURL URLWithString:@"about:blank"];
        }
        [webView loadHTMLString:html baseURL:baseURL];
        return;
      }
      
      NSURLRequest *request = [RCTConvert NSURLRequest:source];
      // Because of the way React works, as pages redirect, we actually end up
      // passing the redirect urls back here, so we ignore them if trying to load
      // the same url. We'll expose a call to 'reload' to allow a user to load
      // the existing page.
      if ([request.URL isEqual:webView.request.URL]) {
        return;
      }
      if (!request.URL) {
        // Clear the webview
        [webView loadHTMLString:@"" baseURL:nil];
        return;
      }
      [webView loadRequest:request];
    }
  }
  //开始加载的时候执行该方法。
- (void)webViewDidStartLoad:(UIWebView *)webView{
  if (!self.onStart) {
    return;
  }
  self.onStart(@{});
  
}
  
  //加载完成的时候执行该方法。
- (void)webViewDidFinishLoad:(UIWebView *)webView{
  if (!self.onEnd) {
    return;
  }
  //  dispatch_after(dispatch_time(DISPATCH_TIME_NOW, (int64_t)(2 * NSEC_PER_SEC)), dispatch_get_main_queue(), ^{
  self.onEnd(@{});
  //  });
  
  
}
  
  //加载出错的时候执行该方法。
- (void)webView:(UIWebView *)webView didFailLoadWithError:(NSError *)error{
  if (!self.onError) {
    return;
  }
  self.onError(@{});
}

- (void)loadExamplePage {
  NSString* htmlPath = [[NSBundle mainBundle] pathForResource:@"ExampleApp" ofType:@"html"];
  NSString* appHtml = [NSString stringWithContentsOfFile:htmlPath encoding:NSUTF8StringEncoding error:nil];
  NSURL *baseURL = [NSURL fileURLWithPath:htmlPath];
  [webView loadHTMLString:appHtml baseURL:baseURL];
}

@end
