import Fastify from "fastify";
import Global from "./global";

const fastify = Fastify({ logger: true });
const options = {
  dotenv: true,
  confKey: "config",
  schema: {
    type: "object",
    required: ["CORP_ID", "APP_SECRET", "NONCESTR"],
    properties: {
      "CORP_ID": {
        type: "string",
      },
      "APP_SECRET": {
        type: "string",
      },
      "NONCESTR": {
        type: "string",
      },
    },
  },
};

fastify
  .register(require("fastify-env"), options)
  .register(require("fastify-cors"), { origin: "*", methods: ["GET"] })
  .register(require("./wecom"), { prefix: "/wecom" })
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
