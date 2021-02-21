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
