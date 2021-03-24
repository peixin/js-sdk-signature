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
  return utils.fetchAPIData<AccessTokenData>("https://qyapi.weixin.qq.com/cgi-bin/gettoken", {
    // @ts-ignore
    "corpid": Global.app.config.WECOM_CORP_ID,
    // @ts-ignore
    "corpsecret": Global.app.config.WECOM_APP_SECRET,
  });
};

const getAccessToken = async () => {
  cachedData.accessToken = await utils.getAPIData<AccessTokenData>(cachedData.accessToken, fetchAccessToken);
  return cachedData.accessToken?.access_token;
};

const fetchJsApiTicket = async (accessToken: string) => {
  return utils.fetchAPIData<JsApiTicketData>("https://qyapi.weixin.qq.com/cgi-bin/ticket/get", {
    "access_token": accessToken,
    "type": "agent_config",
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

const getSignature = async (url: string, ts: number, noncestr: string): Promise<string> => {
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
  const signatureStr = `jsapi_ticket=${ticket}&noncestr=${noncestr}&timestamp=${ts}&url=${url}`;

  return utils.hash(signatureStr);
};

export default {
  getSignature,
};
