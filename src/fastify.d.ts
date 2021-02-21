// eslint-disable-next-line @typescript-eslint/no-unused-vars
import fastify from "fastify";

declare module "fastify" {
  interface FastifyInstance {
    config: {
      "CORP_ID": string;
      "APP_SECRET": string;
      "NONCESTR": string;
    };
  }
}
