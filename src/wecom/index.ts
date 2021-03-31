import { FastifyInstance, FastifyRequest } from "fastify";
import { signatureSchema } from "../schema";
import service from "./service";
import { SignatureQuerystring } from "../types";
import utils from "../utils";
import Global from "../global";

const signatureHandler = async (request: FastifyRequest<{ Querystring: SignatureQuerystring }>) => {
  const { url } = request.query;
  const ts = new Date().getTime();
  const nonceStr = utils.generateNonceStr();

  const { signature, configSignature } = await service.getSignature(decodeURIComponent(url), ts, nonceStr);
  return {
    signature: signature,
    configSignature: configSignature,
    nonceStr: nonceStr,
    timestamp: ts,
    // @ts-ignore
    agentId: Global.app.config.WECOM_AGENT_ID,
    // @ts-ignore
    corpId: Global.app.config.WECOM_CORP_ID,
  };
};

export default async (fastify: FastifyInstance): Promise<void> => {
  fastify.get("/signature", { schema: signatureSchema }, signatureHandler);
};
