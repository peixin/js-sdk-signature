export interface XHeader {
  "x-session-id": string;
}

export interface JSONType {
  [key: string]: string | number | JSONType;
}
