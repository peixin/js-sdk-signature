// eslint-disable-next-line @typescript-eslint/no-unused-vars
import fastify from "fastify";

declare module "fastify" {
  interface FastifyInstance {
    config: {
      "WECOM_CORP_ID": string;
      "WECOM_APP_SECRET": string;
      "WECOM_NONCESTR": string;

      "DINGTALK_CORP_ID": string;
      "DINGTALK_APP_KEY": string;
      "DINGTALK_APP_SECRET": string;
      "DINGTALK_NONCESTR": string;

      "WELINK_CORP_ID": string;
      "WELINK_APP_KEY": string;
      "WELINK_APP_SECRET": string;
      "WELINK_NONCESTR": string;
    };
  }
}
