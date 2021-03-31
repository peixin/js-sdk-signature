import Global from "../global";
import { FastifyInstance, FastifyRequest } from "fastify";
import { SignatureQuerystring, WechatAuthQueryString } from "../types";
import service from "./service";
import { signatureSchema, wechatAPIAUthSchema } from "../schema";
import utils from "../utils";

const signatureHandler = async (request: FastifyRequest<{ Querystring: SignatureQuerystring }>) => {
  const { url } = request.query;
  const ts = Math.floor(new Date().getTime() / 1000);
  const nonceStr = utils.generateNonceStr();
  const signature = await service.getSignature(decodeURIComponent(url), ts, nonceStr);
  return {
    signature: signature,
    nonceStr: nonceStr,
    timestamp: ts,
    // @ts-ignore
    corpId: Global.app.config.WECHAT_APP_ID,
  };
};

export default async (fastify: FastifyInstance): Promise<void> => {
  fastify.get(
    "/",
    { schema: wechatAPIAUthSchema },
    async (request: FastifyRequest<{ Querystring: WechatAuthQueryString }>) => {
      return request.query.echostr;
    },
  );

  fastify.get("/signature", { schema: signatureSchema }, signatureHandler);
};
