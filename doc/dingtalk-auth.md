# 登陆对接

[官方文档](https://developers.dingtalk.com/document/app/enterprise-internal-application-logon-free?spm=ding_open_doc.document.0.0.39227391mohLXu#topic-2021731)

1. client 获取微应用免登授权码: code
2. 通过免登授权码换取用户身份: userid
3. 通过userid 获得 用户详情: userno



### 1. client 获取微应用免登授权码: code

- 无需 授权
- 获取的免登授权码有效期5分钟，且只能使用一次

```javascript
dd.ready(function() {
    dd.runtime.permission.requestAuthCode({
        corpId: _config.corpId, // 企业id
        onSuccess: function (info) {
        	code = info.code // 通过该免登授权码可以获取用户身份
        }});
});

```



### 2. 通过 code 换取用户身份: userid

- [get access_token](./dingtalk-js-sdk-signature.md)

- 获取用户userid

  > GET https://oapi.dingtalk.com/user/getuserinfo?access_token=ACCESS_TOKEN&code=123456
  
  ```json
  {
    "errcode": 0,
    "sys_level": 1,
    "is_sys": true,
    "name": "张xx",
    "errmsg": "ok",
    "deviceId": "12drtfxxxxx",
    "userid": "user456"
  }
  ```

### 3. 通过userid 获得 用户详情: userno

> POST https://oapi.dingtalk.com/topapi/v2/user/get?access_token=ACCESS_TOKEN
> body: { "language":"zh_CN", "userid":"manager4220" }

```json
response: {
  "errcode":0,
  "errmsg":"ok",
  "request_id":"51jql88tpa6g",
  "result": {
    "unionid":"gliiW0piiii02zBUjUkUWAuCQiEiE",
    "userid":"manager4220",
    "mobile":"188xxxx1234",
    "active":true,
    "telephone":"010-8xxxx6-2345",
    "avatar":"",
    "hide_mobile":false,
    "senior":false,
    "name":"杨xxx",
    "state_code":"86",
    "job_number":"10001", // 工号
 }
}
```
