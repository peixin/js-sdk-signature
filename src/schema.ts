export const envOptions = {
  dotenv: true,
  confKey: "config",
  schema: {
    type: "object",
    required: [
      "WECOM_CORP_ID",
      "WECOM_APP_SECRET",
      "WECOM_NONCESTR",
      "DINGTALK_CORP_ID",
      "DINGTALK_APP_SECRET",
      "DINGTALK_NONCESTR",
      "DINGTALK_APP_KEY",
    ],
    properties: {
      "WECOM_CORP_ID": {
        type: "string",
      },
      "WECOM_APP_SECRET": {
        type: "string",
      },
      "WECOM_NONCESTR": {
        type: "string",
      },

      "DINGTALK_CORP_ID": {
        type: "string",
      },
      "DINGTALK_APP_KEY": {
        type: "string",
      },
      "DINGTALK_APP_SECRET": {
        type: "string",
      },
      "DINGTALK_NONCESTR": {
        type: "string",
      },
    },
  },
};

export const signatureSchema = {
  querystring: {
    type: "object",
    required: ["url", "ts"],
    properties: {
      url: {
        type: "string",
      },
      ts: {
        type: "number",
      },
    },
    additionalProperties: false,
  },
  response: {
    200: {
      type: "object",
      required: ["signature"],
      properties: {
        signature: { type: "string" },
      },
      additionalProperties: false,
    },
  },
};
