import { FastifyInstance, FastifyRequest } from "fastify";
import { signatureSchema } from "../schema";
import service from "./service";
import { SignatureQuerystring } from "../types";
import Global from "../global";
import utils from "../utils";

const signatureHandler = async (request: FastifyRequest<{ Querystring: SignatureQuerystring }>) => {
  const { url } = request.query;
  const ts = new Date().getTime();
  const nonceStr = utils.generateNonceStr();
  const signature = await service.getSignature(decodeURIComponent(url), ts, nonceStr);

  return {
    signature: signature,
    nonceStr: nonceStr,
    timestamp: ts,
    // @ts-ignore
    agentId: Global.app.config.DINGTALK_AGENT_ID,
    // @ts-ignore
    corpId: Global.app.config.DINGTALK_CORP_ID,
  };
};

export default async (fastify: FastifyInstance): Promise<void> => {
  fastify.get("/signature", { schema: signatureSchema }, signatureHandler);
};
