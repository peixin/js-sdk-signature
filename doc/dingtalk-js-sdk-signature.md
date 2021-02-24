# 钉钉 JS-SDK 签名流程
和 企业微信 基本类似， 只是 get access_token,  jsapi_ticket 调用频次大大提高，但还是要做缓存。

1. 获取企业内部应用的 access_token
2. 获得 jsapi_ticket
3. 获得 signature



## 1. 获取企业内部应用的 access_token

#### access_token 

- 至少保留512字节的存储空间

- 有效期为7200秒


> GET https://oapi.dingtalk.com/gettoken?appkey=appkey&appsecret=appsecret

- appkey
- appsecret

```json
{
  "errcode": 0,
  "access_token": "96fc7a7axxx",
  "errmsg": "ok",
  "expires_in": 7200
}
```



## 2. 获取 jsapi_ticket

#### jsapi_ticket 

- 至少保留512字节的存储空间

- 有效期为7200秒


> GET GET https://oapi.dingtalk.com/get_jsapi_ticket?access_token=ACCESS_TOKEN

- access_token

```json
{
  "errcode":0,
  "ticket":"dWk8xxxx",
  "errmsg":"ok",
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