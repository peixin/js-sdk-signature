import { FastifyInstance, FastifyRequest } from "fastify";
import { signatureSchema } from "../schema";
import service from "./service";
import { SignatureQuerystring } from "../types";

const signatureHandler = async (request: FastifyRequest<{ Querystring: SignatureQuerystring }>) => {
  const { url, ts } = request.query;
  const signature = await service.getSignature(decodeURIComponent(url), ts);
  return { signature };
};

export default async (fastify: FastifyInstance): Promise<void> => {
  fastify.get("/signature", { schema: signatureSchema }, signatureHandler);
};
