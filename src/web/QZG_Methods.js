
$('#listView').on("click", "li" ,function (event) {
    switch (event.target.textContent) {
        case '点我获取tokenId':
            jsCalled_getSignInToken(event.target.textContent);
            break;
        case '微信分享':
        
        break;
        case '微信登录':
        
        break;
        case '微信支付':
        
        break;
        case '支付宝支付':
        
        break;
        case '点击获取位置':
        
        break;
        case '阿里推送':
        
        break;
        case '隐藏导航栏':
        
        break;
        case '点我退出app':
        
        break;
        case '点我打开新的webview':
        
        break;
        default:
            break;
    }
});

function globl(cb){

    
}

function jsCalled_getSignInToken() {
    window.postMessage({},callbakc(params) {
     
    });

}
window.signin=function (params) {
    window.postMessage('gdsgds');
    alert('回调我了吗');   
 }