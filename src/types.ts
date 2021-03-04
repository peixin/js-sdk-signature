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

export interface APIWelinkResponseData {
  "code": string;
  "message": string;
  "expires_in": number;
}

export interface AccessTokenWelinkData extends APIWelinkResponseData {
  access_token: string;
}

export interface AccessTokenData extends APIResponseData {
  access_token: string;
}

export interface JsApiTicketData extends APIResponseData {
  ticket: string;
}

export interface JsApiWelinkTicketData extends APIWelinkResponseData {
  jstickets: string;
}

export interface SignatureQuerystring {
  url: string;
}
