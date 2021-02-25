# Client 注入权限验证配置

- 签名用的 `noncestr` 和 `timestamp` 必须与 `wx.config` 中的 `nonceStr` 和`timestamp` 相同。

- 签名用的url必须是调用 JS 接口页面的完整URL，不包含#及其后面部分。

- **每次 URL 变动，都要重新 config 之后才能调用 API**

- **所有 API 调用都前需要 config**



```javascript
<script src="https://open.work.weixin.qq.com/wwopen/js/jwxwork-1.0.0.js"></script>

wx.config({
    beta: true,// 必须这么写，否则wx.invoke调用形式的jsapi会有问题
    debug: true, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
    appId: '', // 必填，企业微信的corpID
    timestamp: , // 必填，生成签名的时间戳
    nonceStr: '', // 必填，生成签名的随机串
    signature: '',// 必填，签名，见 附录-JS-SDK使用权限签名算法
    jsApiList: [] // 必填，需要使用的JS接口列表，凡是要调用的接口都需要传进来,
    success: function(res) {
        // 回调
    },
    fail: function(res) {
        if(res.errMsg.indexOf('function not exist') > -1){
            alert('版本过低请升级')
        }
    }
});

```



```javascript
<script src="https://open.work.weixin.qq.com/wwopen/js/jwxwork-1.0.0.js"></script>

wx.agentConfig({
    corpid: '', // 必填，企业微信的corpid，必须与当前登录的企业一致
    agentid: '', // 必填，企业微信的应用id （e.g. 1000247）
    timestamp: , // 必填，生成签名的时间戳
    nonceStr: '', // 必填，生成签名的随机串
    signature: '',// 必填，签名，见附录-JS-SDK使用权限签名算法
    jsApiList: ['selectExternalContact'], //必填
    success: function(res) {
        // 回调
    },
    fail: function(res) {
        if(res.errMsg.indexOf('function not exist') > -1){
            alert('版本过低请升级')
        }
    }
});

```