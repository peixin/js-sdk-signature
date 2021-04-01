import Global from "../global";
import { AccessTokenData, JsApiTicketData } from "../types";
import utils from "../utils";

const cachedData = {
  accessToken: null,
  jsApiTicket: null,
} as {
  accessToken: AccessTokenData | null;
  jsApiTicket: JsApiTicketData | null;
  configJsApiTicket: JsApiTicketData | null;
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

const fetchConfigJsApiTicket = async (accessToken: string) => {
  return utils.fetchAPIData<JsApiTicketData>("https://qyapi.weixin.qq.com/cgi-bin/get_jsapi_ticket", {
    "access_token": accessToken,
  });
};

const getConfigJsApiTicket = async (accessToken: string) => {
  cachedData.configJsApiTicket = await utils.getAPIData<JsApiTicketData>(cachedData.configJsApiTicket, async () =>
    fetchConfigJsApiTicket(accessToken),
  );
  if (!cachedData.configJsApiTicket) {
    cachedData.accessToken = null;
  }
  return cachedData.configJsApiTicket?.ticket;
};

const getSignature = async (url: string, ts: number, noncestr: string) => {
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

  const configTicket = await getConfigJsApiTicket(accessToken);
  if (!configTicket) {
    throw new Error("get config JsApiTicket failed");
  }

  Global.app.log.info(`configTicket: ${configTicket}`);
  Global.app.log.info(`noncestr: ${noncestr}`);
  Global.app.log.info(`timestamp: ${ts}`);
  Global.app.log.info(`url: ${url}`);

  const signatureStr = `jsapi_ticket=${ticket}&noncestr=${noncestr}&timestamp=${ts}&url=${url}`;
  const configSignatureStr = `jsapi_ticket=${configTicket}&noncestr=${noncestr}&timestamp=${ts}&url=${url}`;

  return { signature: utils.hash(signatureStr), configSignature: utils.hash(configSignatureStr) };
};

export default {
  getSignature,
};
