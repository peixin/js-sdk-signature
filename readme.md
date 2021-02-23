### WeCom / WeChat JS-SDK Signature Server
### 企业微信 / 微信 JS-SDK 签名 服务



[WeCom Official Documentation](https://work.weixin.qq.com/api/doc/90000/90136/90512)




- [企业微信 JS-SDK 签名流程](./doc/wecom-js-sdk-signature.md)
- 微信 JS-SDK 签名流程 待完善



#### Usage

```bash
yarn install
yarn build
yarn start
curl "http://0.0.0.0:3000/wecom/signature?url=http://example.com&ts=1"
```

Response:
```json
{"signature":"ed533a2f2a2bce3661cf8208c8c0f8ebbf3a9f8b"}
```