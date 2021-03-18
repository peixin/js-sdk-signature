import { FastifyInstance, FastifyRequest } from "fastify";
import { SignatureQuerystring, WechatSignature } from "../types";
import service from "./service";
import Global from "../global";
import { signatureSchema } from "../schema";

const signatureHandler = async (request: FastifyRequest<{ Querystring: SignatureQuerystring }>) => {
  const { url } = request.query;
  const ts = Math.floor(new Date().getTime() / 1000);
  console.log(ts);
  const signature = await service.getSignature(decodeURIComponent(url), ts);
  return {
    signature: signature,
    // @ts-ignore
    nonceStr: Global.app.config.WECHAT_NONCESTR,
    timestamp: ts,
  };
};

export default async (fastify: FastifyInstance): Promise<void> => {
  fastify.get("/", {}, async (request: FastifyRequest<any>) => {
    return (request.query as WechatSignature).echostr;
  });

  fastify.get("/signature", { schema: signatureSchema }, signatureHandler);
};
