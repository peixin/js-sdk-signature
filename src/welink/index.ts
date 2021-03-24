import { FastifyInstance, FastifyRequest } from "fastify";
import { signatureSchema } from "../schema";
import service from "./service";
import { SignatureQuerystring } from "../types";
import Global from "../global";
import utils from "../utils";

const signatureHandler = async (request: FastifyRequest<{ Querystring: SignatureQuerystring }>) => {
  const { url } = request.query;
  const ts = parseInt((new Date().getTime() + "").substr(0, 10));
  const nonceStr = utils.generateNonceStr();
  const signature = await service.getSignature(decodeURIComponent(url), ts, nonceStr);

  return {
    signature: signature,
    nonceStr: nonceStr,
    timestamp: ts,
    // @ts-ignore
    agentId: Global.app.config.WELINK_APP_ID,
    corpId: "",
  };
};

export default async (fastify: FastifyInstance): Promise<void> => {
  fastify.get("/signature", { schema: signatureSchema }, signatureHandler);
};
