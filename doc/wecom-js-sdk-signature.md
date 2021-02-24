# 企业微信 JS-SDK 签名流程

1. 获得 access token
2. 获得 jsapi_ticket
3. 获得 signature



## 1. 获得 access token

#### access_token 

- 至少保留512字节的存储空间

- 有效期为7200秒



> GET https://qyapi.weixin.qq.com/cgi-bin/gettoken?corpid=ID&corpsecret=SECRET

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



## 2. 获得 jsapi_ticket

#### jsapi_ticket
- 有效期为7200秒
- 一小时内，一个企业最多可获取400次，且单个应用不能超过100次



[agentConfig VS config](https://work.weixin.qq.com/api/doc/90000/90136/90515)



For 企业  `wx.config` 

> https://qyapi.weixin.qq.com/cgi-bin/get_jsapi_ticket?access_token=ACCESS_TOKEN
>
> access_token 使用 企业的 secret 获取



For 企业内应用 `wx.agentConfig`

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



## 3. 获得 signature

- noncestr 随机字符串
- jsapi_ticket
- timestamp
- url

> signatureStr = "jsapi_ticket=JSAPITICKET&noncestr=NONCESTR&timestamp=TIMESTAMP&url=URL" 

- ordered 

- no url encode

> signature = sha1(signatureStr)
