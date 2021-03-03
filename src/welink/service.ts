import crypto from "crypto";
import Global from "../global";
import { AccessTokenData, AccessTokenWelinkData, JsApiWelinkTicketData } from "../types";
import utils from "../utils";

const cachedData = {
  accessToken: null,
  jsApiTicket: null,
} as {
  accessToken: AccessTokenWelinkData | null;
  jsApiTicket: JsApiWelinkTicketData | null;
};

const fetchAccessToken = async () => {
  return utils.postAPIData<AccessTokenWelinkData>(
    "https://open.welink.huaweicloud.com/api/auth/v2/tickets",
    {
      // @ts-ignore
      "client_id": Global.app.config.WELINK_APP_KEY,
      // @ts-ignore
      "client_secret": Global.app.config.WELINK_APP_SECRET,
    },
    {
      "Content-Type": "application/json",
    },
  );
};

const getAccessToken = async () => {
  cachedData.accessToken = await utils.getAPIWelinkData<AccessTokenWelinkData>(
    cachedData.accessToken,
    fetchAccessToken,
  );
  return cachedData.accessToken?.access_token;
};

const fetchJsApiTicket = async (accessToken: string) => {
  return utils.fetchWelinkAPIData<JsApiWelinkTicketData>(
    "https://open.welink.huaweicloud.com/api/auth/v1/jstickets",
    {},
    {
      "x-wlk-Authorization": accessToken,
    },
  );
};

const getJsApiTicket = async (accessToken: string) => {
  cachedData.jsApiTicket = await utils.getAPIWelinkData<JsApiWelinkTicketData>(cachedData.jsApiTicket, async () =>
    fetchJsApiTicket(accessToken),
  );

  if (!cachedData.jsApiTicket) {
    cachedData.accessToken = null;
  }

  return cachedData.jsApiTicket?.jstickets;
};

const getSignature = async (url: string, ts: number): Promise<string> => {
  Global.app.log.info(`url:${url},ts:${ts}`);
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
  const signatureStr = `jsapi_ticket=${ticket}&noncestr=${Global.app.config.WELINK_NONCESTR}&timestamp=${ts}&url=${url}`;
  Global.app.log.info(`signatureStr:${signatureStr}`);
  const shaSum = crypto.createHash("sha256");

  shaSum.update(signatureStr);
  const signature = shaSum.digest("hex");
  Global.app.log.info(`signature: ${signature}`);
  return signature;
};

export default {
  getSignature,
};
