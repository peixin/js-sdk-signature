### WeCom / WeChat / DingTalk JS-SDK Signature Server
### 企业微信 / 微信  / 钉钉 JS-SDK 签名 服务



[WeCom Official Documentation](https://work.weixin.qq.com/api/doc/90000/90136/90512)

[DingTalk Official Documentation](https://developers.dingtalk.com/document/app/read-before-development)




#### 企业微信
- [企业微信 JS-SDK 签名流程](./doc/wecom-js-sdk-signature.md)
- [企业微信 JS-SDK 客户端注入权限验证配置: wx.config](./doc/wecom-js-sdk-config.md)


#### 钉钉
- [钉钉 JS-SDK 签名流程](./doc/dingtalk-js-sdk-signature.md)
- [钉钉 JS-SDK 客户端注入权限验证配置: dd.config](./doc/dingtalk-js-sdk-config.md)
- [钉钉登入对接流程](./doc/dingtalk-auth.md)
- [钉钉企业内微应用开发文档](./doc/dingtalk-h5-dev.md)


#### 微信
- 待实现




TODO:

> 企业微信可能会出于运营需要，提前使access_token失效，开发者应实现access_token失效时重新获取的逻辑。

- 支持 access_token 提前过期 重新获取逻辑





#### Usage

```bash
cp .env.template .env
update .env info

yarn install
yarn build
yarn start
curl "http://0.0.0.0:3000/wecom/signature?url=http://example.com&ts=1"
curl "http://0.0.0.0:3000/dingtalk/signature?url=http://example.com&ts=1"
```

Response:
```json
{"signature":"ed533a2f2a2bce3661cf8208c8c0f8ebbf3a9f8b"}
```
