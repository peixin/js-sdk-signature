# Client 注入权限验证配置
[官方文档](https://developers.dingtalk.com/document/app/jsapi-authentication)


- 签名用的 `noncestr` 和 `timestamp` 必须与 `wx.config` 中的 `nonceStr` 和`timestamp` 相同。
- 签名用的url必须是调用 JS 接口页面的完整URL，不包含#及其后面部分。
- 并非所有 API 都需要 config 见 [JSAPI总览](https://developers.dingtalk.com/document/app/jsapi-overview?spm=ding_open_doc.document.0.0.6fbe63c6MzPYpq#topic-2024952)
- `dd.ready` 后方可进行后续工作
- **只需 config 一次**, 和微信不一样
    > dd.config 一次，所有的需要 Auth 的 API List
    > 之后 dd.ready 直接调用 API 就行
    > get signature 传入的 url 为 dingtalk-jsapi 初始化时当前页面的 url。一般也就是 APP 被打开的入口页


### 引入 SDK 

> yarn add dingtalk-jsapi
>
> import * as dd from 'dingtalk-jsapi'; // 此方式为整体加载，也可按需进行加载
>
> or
>
> <script src="https://g.alicdn.com/dingding/dingtalk-jsapi/2.10.3/dingtalk.open.js"></script>



```javascript
dd.config({
    agentId: '', // 必填，微应用ID
    corpId: '',//必填，企业ID
    timeStamp: '', // 必填，生成签名的时间戳
    nonceStr: '', // 必填，生成签名的随机串
    signature: '', // 必填，签名
    type:0/1,   //选填。0表示微应用的jsapi,1表示服务窗的jsapi；不填默认为0。该参数从dingtalk.js的0.8.3版本开始支持
    jsApiList : [
        'runtime.info',
        'biz.contact.choose',
        'device.notification.confirm',
        'device.notification.alert',
        'device.notification.prompt',
        'biz.ding.post',
        'biz.util.openLink',
    ] // 必填，需要使用的jsapi列表，注意：不要带dd。
});

```