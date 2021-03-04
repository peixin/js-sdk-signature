export const envOptions = {
  dotenv: true,
  confKey: "config",
  schema: {
    type: "object",
    required: [
      "WECOM_CORP_ID",
      "WECOM_AGENT_ID",
      "WECOM_APP_SECRET",
      "WECOM_NONCESTR",
      "DINGTALK_CORP_ID",
      "DINGTALK_AGENT_ID",
      "DINGTALK_APP_SECRET",
      "DINGTALK_NONCESTR",
      "DINGTALK_APP_KEY",
      "WELINK_APP_KEY",
      "WELINK_APP_ID",
      "WELINK_APP_SECRET",
      "WELINK_NONCESTR",
    ],
    properties: {
      "WECOM_CORP_ID": {
        type: "string",
      },
      "WECOM_AGENT_ID": {
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
      "DINGTALK_AGENT_ID": {
        type: "string",
      },
      "DINGTALK_APP_KEY": {
        type: "string",
      },
      "WELINK_APP_ID": {
        type: "string",
      },
      "DINGTALK_APP_SECRET": {
        type: "string",
      },
      "DINGTALK_NONCESTR": {
        type: "string",
      },

      "WELINK_APP_KEY": {
        type: "string",
      },
      "WELINK_APP_SECRET": {
        type: "string",
      },
      "WELINK_NONCESTR": {
        type: "string",
      },
    },
  },
};

export const signatureSchema = {
  querystring: {
    type: "object",
    required: ["url"],
    properties: {
      url: {
        type: "string",
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
        nonceStr: { type: "string" },
        timestamp: { type: "string" },
        agentId: { type: "string" },
        corpId: { type: "string" },
      },
      additionalProperties: false,
    },
  },
};
