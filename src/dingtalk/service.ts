import Global from "../global";
import { AccessTokenData, JsApiTicketData } from "../types";
import utils from "../utils";

const cachedData = {
  accessToken: null,
  jsApiTicket: null,
} as {
  accessToken: AccessTokenData | null;
  jsApiTicket: JsApiTicketData | null;
};

const fetchAccessToken = async () => {
  return utils.fetchAPIData<AccessTokenData>("https://oapi.dingtalk.com/gettoken", {
    // @ts-ignore
    "appkey": Global.app.config.DINGTALK_APP_KEY,
    // @ts-ignore
    "appsecret": Global.app.config.DINGTALK_APP_SECRET,
  });
};

const getAccessToken = async () => {
  cachedData.accessToken = await utils.getAPIData<AccessTokenData>(cachedData.accessToken, fetchAccessToken);
  return cachedData.accessToken?.access_token;
};

const fetchJsApiTicket = async (accessToken: string) => {
  return utils.fetchAPIData<JsApiTicketData>("https://oapi.dingtalk.com/get_jsapi_ticket", {
    "access_token": accessToken,
  });
};

const getJsApiTicket = async (accessToken: string) => {
  cachedData.jsApiTicket = await utils.getAPIData<JsApiTicketData>(cachedData.jsApiTicket, async () =>
    fetchJsApiTicket(accessToken),
  );
  if (!cachedData.jsApiTicket) {
    cachedData.accessToken = null;
  }
  return cachedData.jsApiTicket?.ticket;
};

const getSignature = async (url: string, ts: number, nonceStr: string): Promise<string> => {
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
  const signatureStr = `jsapi_ticket=${ticket}&noncestr=${nonceStr}&timestamp=${ts}&url=${url}`;

  return utils.hash(signatureStr);
};

export default {
  getSignature,
};
