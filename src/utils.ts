import Axios from "axios";
import Global from "./global";
import { JSONType, APIResponseData, APIWelinkResponseData } from "./types";
import crypto from "crypto";

const fetchAPIData = async <T extends APIResponseData>(url: string, params: JSONType, headers?: JSONType) => {
  Global.app.log.info(`fetch data: ${url}`);

  const ts = new Date().getTime();
  try {
    const { data } = await Axios.get(url, { params, headers });
    const _data = { ts, ...data } as T;
    if (_data.errcode && _data.errcode !== 0) {
      throw new Error(JSON.stringify(data));
    }
    return _data;
  } catch (error) {
    Global.app.log.error(error);
    return null;
  }
};

const fetchWelinkAPIData = async <T extends APIWelinkResponseData>(
  url: string,
  params: JSONType,
  headers?: JSONType,
) => {
  Global.app.log.info(`fetch data: ${url}`);

  const ts = new Date().getTime();
  try {
    const { data } = await Axios.get(url, { params, headers });
    const _data = { ts, ...data } as T;
    if (_data.code !== "0") {
      throw new Error(JSON.stringify(data));
    }
    return _data;
  } catch (error) {
    Global.app.log.error(error);
    return null;
  }
};

const postAPIData = async <T extends APIWelinkResponseData>(url: string, params: JSONType, headers?: JSONType) => {
  Global.app.log.info(`fetch data: ${url}`);

  const ts = new Date().getTime();
  try {
    const { data } = await Axios.post(url, params, { headers });
    const _data = { ts, ...data } as T;

    if (_data.code !== "0") {
      throw new Error(JSON.stringify(data));
    }
    return _data;
  } catch (error) {
    Global.app.log.error(error);
    return null;
  }
};

const getAPIData = async <T extends APIResponseData>(data: null | T, fetDataFunc: () => Promise<null | T>) => {
  if (!data) {
    data = await fetDataFunc();
  }
  const ts = new Date().getTime() - 10 * 1000;
  if (data?.ts && ts > data.ts + data.expires_in * 1000) {
    data = await fetDataFunc();
  }
  return data;
};

const getAPIWelinkData = async <T extends APIWelinkResponseData>(
  data: null | T,
  fetDataFunc: () => Promise<null | T>,
) => {
  if (!data) {
    data = await fetDataFunc();
  }
  const ts = new Date().getTime() - 10 * 1000;
  if (data?.expires_in && ts > data.expires_in + data.expires_in * 1000) {
    data = await fetDataFunc();
  }
  return data;
};

const generateNonceStr = () => Math.random().toString(36).substr(2, 15);

const hash = (str: string, algorithm = "sha1") => {
  const shaSum = crypto.createHash(algorithm);
  shaSum.update(str);
  return shaSum.digest("hex");
};

export default {
  fetchAPIData,
  getAPIData,
  postAPIData,
  getAPIWelinkData,
  fetchWelinkAPIData,
  generateNonceStr,
  hash,
};
