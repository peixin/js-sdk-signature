import Fastify from "fastify";
import Global from "./global";
import { envOptions } from "./schema";

const fastify = Fastify({ logger: true });

fastify
  .register(require("fastify-env"), envOptions)
  .register(require("fastify-cors"), { origin: "*", methods: ["GET"] })
  .register(require("./wecom"), { prefix: "/wecom" })
  .register(require("./dingtalk"), { prefix: "/dingtalk" })
  .register(require("./welink"), { prefix: "/welink" })
  .register(require("./wechat"), { prefix: "/wechat" })
  .ready(() => {
    Global.app = fastify;
  });

const start = async () => {
  try {
    await fastify.listen(3000, "0.0.0.0");
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};
start();
