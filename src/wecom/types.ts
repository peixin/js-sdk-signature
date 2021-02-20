export interface WecomResponseData {
  errcode: number;
  errmsg: string;
  expires_in: number;
  ts: number;
}

export interface AccessTokenData extends WecomResponseData {
  access_token: string;
}

export interface JsApiTicketData extends WecomResponseData {
  ticket: string;
}

export interface SignatureQuerystring {
  url: string;
  ts: number;
}
