import { FastifyInstance, FastifyRequest } from "fastify";
import { signatureSchema } from "../schema";
import service from "./service";
import { SignatureQuerystring } from "../types";
import Global from "../global";

const signatureHandler = async (request: FastifyRequest<{ Querystring: SignatureQuerystring }>) => {
  const { url } = request.query;
  const ts = parseInt((new Date().getTime() + "").substr(0, 10));
  const signature = await service.getSignature(decodeURIComponent(url), ts);

  return {
    signature: signature,
    // @ts-ignore
    nonceStr: Global.app.config.WELINK_NONCESTR,
    timestamp: ts,
    // @ts-ignore
    agentId: Global.app.config.WELINK_APP_ID,
    // @ts-ignore
    corpId: Global.app.config.WELINK_CORP_ID,
  };
};

export default async (fastify: FastifyInstance): Promise<void> => {
  fastify.get("/signature", { schema: signatureSchema }, signatureHandler);
};
