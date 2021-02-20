import Axios from "axios";
import { JSONType } from "../types";
import { AccessTokenData, JsApiTicketData, WecomResponseData } from "./types";

const cachedData = {
  accessToken: null,
  jsApiTicket: null,
} as {
  accessToken: AccessTokenData | null;
  jsApiTicket: JsApiTicketData | null;
};

const fetchWecomData = async <T extends WecomResponseData>(url: string, params: JSONType) => {
  const ts = new Date().getTime();
  try {
    const { data } = await Axios.get(url, { params });
    const _data = { ts, ...data } as T;
    if (_data.errcode !== 0) {
      throw new Error(JSON.stringify(data));
    }
    return _data;
  } catch (error) {
    console.error(error);
    return null;
  }
};

const getWecomData = async <T extends WecomResponseData>(data: null | T, fetDataFunc: () => Promise<null | T>) => {
  if (!data) {
    data = await fetDataFunc();
  }
  const ts = new Date().getTime() - 10 * 1000;
  if (data?.ts && ts > data.ts + data.expires_in * 1000) {
    data = await fetDataFunc();
  }
  return data;
};

export default {
  fetchWecomData,
  getWecomData,
};
