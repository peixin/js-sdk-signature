import crypto from "crypto";
import { AccessTokenData, JsApiTicketData } from "./types";
import utils from "./utils";

const corpId = "";
const appSecret = "";
const NONCESTR = "";

const cachedData = {
  accessToken: null,
  jsApiTicket: null,
} as {
  accessToken: AccessTokenData | null;
  jsApiTicket: JsApiTicketData | null;
};

const fetchAccessToken = async () => {
  return utils.fetchWecomData<AccessTokenData>("https://qyapi.weixin.qq.com/cgi-bin/gettoken", {
    "corpid": corpId,
    "corpsecret": appSecret,
  });
};

const getAccessToken = async () => {
  cachedData.accessToken = await utils.getWecomData<AccessTokenData>(cachedData.accessToken, fetchAccessToken);
  return cachedData.accessToken?.access_token;
};

const fetchJsApiTicket = async (accessToken: string) => {
  return utils.fetchWecomData<JsApiTicketData>("https://qyapi.weixin.qq.com/cgi-bin/ticket/get", {
    "access_token": accessToken,
    "type": "agent_config",
  });
};

const getJsApiTicket = async (accessToken: string) => {
  cachedData.jsApiTicket = await utils.getWecomData<JsApiTicketData>(cachedData.jsApiTicket, async () =>
    fetchJsApiTicket(accessToken),
  );
  return cachedData.jsApiTicket?.ticket;
};

const getSignature = async (url: string, ts: number): Promise<string> => {
  const accessToken = await getAccessToken();
  if (!accessToken) {
    throw new Error("get accessToken failed");
  }
  console.log("accessToken", accessToken);
  const ticket = await getJsApiTicket(accessToken);
  if (!ticket) {
    throw new Error("get JsApiTicket failed");
  }
  console.log("ticket", ticket);
  const signatureStr = `jsapi_ticket=${ticket}&noncestr=${NONCESTR}&timestamp=${ts}&url=${url}`;

  const shaSum = crypto.createHash("sha1");
  shaSum.update(signatureStr);
  return shaSum.digest("hex");
};

export default {
  getSignature,
};
