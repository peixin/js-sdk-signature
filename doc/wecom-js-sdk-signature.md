

# 企业微信 JS-SDK 签名


## 获得 access token

#### access_token 

- 至少保留512字节的存储空间

- 有效期为7200秒



获取access_token

> https://qyapi.weixin.qq.com/cgi-bin/gettoken?corpid=ID&corpsecret=SECRET

- corpid
- corpsecret
- 每个应用有独立的secret，所以每个应用的access_token应该分开来获取

```json
{
   "errcode":0,
   "errmsg":"",
   "access_token": "accesstoken000001",
   "expires_in": 7200
}
```



## 获得 jsapi_ticket

#### jsapi_ticket
- 有效期为7200秒
- 一小时内，一个企业最多可获取400次，且单个应用不能超过100次

[agentConfig VS config](https://work.weixin.qq.com/api/doc/90000/90136/90515)



for config

> https://qyapi.weixin.qq.com/cgi-bin/get_jsapi_ticket?access_token=ACCESS_TOKEN

for agentConfig

>  https://qyapi.weixin.qq.com/cgi-bin/ticket/get?access_token=ACCESS_TOKEN&type=agent_config 
> 须用wx.agentConfig中的agentid对应的应用secret去获取access_token。


```json
{
    "errcode":0,
    "errmsg":"ok",
    "ticket":"bxLdikRXVbTPdHSM05e5u5sUoXNKd8-41ZO3MhKoyN5OfkWITDGgnr2fwJ0m9E8NYzWKVZvdVtaUgWvsdshFKA",
    "expires_in":7200
}
```



## 获得 signature

- noncestr 随机字符串
- jsapi_ticket
- timestamp
- url

> signatureStr = "jsapi_ticket=JSAPITICKET&noncestr=NONCESTR&timestamp=TIMESTAMP&url=URL" 

- ordered 

- no url encode

> signature = sha1(signatureStr)





## 注入权限验证配置

签名用的noncestr和timestamp必须与wx.config中的nonceStr和timestamp相同。
签名用的url必须是调用JS接口页面的完整URL。

```javascript
<script src="https://open.work.weixin.qq.com/wwopen/js/jwxwork-1.0.0.js"></script>

wx.config({
    beta: true,// 必须这么写，否则wx.invoke调用形式的jsapi会有问题
    debug: true, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
    appId: '', // 必填，企业微信的corpID
    timestamp: , // 必填，生成签名的时间戳
    nonceStr: '', // 必填，生成签名的随机串
    signature: '',// 必填，签名，见 附录-JS-SDK使用权限签名算法
    jsApiList: [] // 必填，需要使用的JS接口列表，凡是要调用的接口都需要传进来
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