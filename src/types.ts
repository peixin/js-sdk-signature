export interface XHeader {
  "x-session-id": string;
}

export interface JSONType {
  [key: string]: string | number | JSONType;
}

export interface APIResponseData {
  errcode: number;
  errmsg: string;
  expires_in: number;
  ts: number;
}

export interface AccessTokenData extends APIResponseData {
  access_token: string;
}

export interface JsApiTicketData extends APIResponseData {
  ticket: string;
}

export interface SignatureQuerystring {
  url: string;
  ts: number;
}
