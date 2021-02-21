export const envSchema = {
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
