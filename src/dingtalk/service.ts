import crypto from "crypto";
import Global from "../global";
import { AccessTokenData, JsApiTicketData } from "./types";
import utils from "./utils";

const cachedData = {
  accessToken: null,
  jsApiTicket: null,
} as {
  accessToken: AccessTokenData | null;
  jsApiTicket: JsApiTicketData | null;
};

const fetchAccessToken = async () => {
  return utils.fetchWecomData<AccessTokenData>("https://oapi.dingtalk.com/gettoken", {
    // @ts-ignore
    "appkey": Global.app.config.DINGTALK_APP_KEY,
    // @ts-ignore
    "appsecret": Global.app.config.DINGTALK_APP_SECRET,
  });
};

const getAccessToken = async () => {
  cachedData.accessToken = await utils.getWecomData<AccessTokenData>(cachedData.accessToken, fetchAccessToken);
  return cachedData.accessToken?.access_token;
};

const fetchJsApiTicket = async (accessToken: string) => {
  return utils.fetchWecomData<JsApiTicketData>("https://oapi.dingtalk.com/get_jsapi_ticket", {
    "access_token": accessToken,
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
  Global.app.log.info(`accessToken: ${accessToken}`);
  const ticket = await getJsApiTicket(accessToken);
  if (!ticket) {
    throw new Error("get JsApiTicket failed");
  }
  Global.app.log.info(`ticket: ${ticket}`);
  // @ts-ignore
  const signatureStr = `jsapi_ticket=${ticket}&noncestr=${Global.app.config.DINGTALK_NONCESTR}&timestamp=${ts}&url=${url}`;

  const shaSum = crypto.createHash("sha1");
  shaSum.update(signatureStr);
  return shaSum.digest("hex");
};

export default {
  getSignature,
};
