export interface apiResponse {
  status: string;
  status_message: string;
  data: any;
  "@meta": Meta;
}

export interface Meta {
  server_time: number;
  server_timezone: string;
  api_version: number;
  execution_time: string;
}

export interface apiError {
  message: string;
  name: string;
  stack: string;
  config: Config;
  code: string;
  status: null;
}

export interface Config {
  transitional: Transitional;
  transformRequest: null[];
  transformResponse: null[];
  timeout: number;
  xsrfCookieName: string;
  xsrfHeaderName: string;
  maxContentLength: number;
  maxBodyLength: number;
  headers: Headers;
  method: string;
  url: string;
}

export interface Headers {
  Accept: string;
  "User-Agent": string;
}

export interface Transitional {
  silentJSONParsing: boolean;
  forcedJSONParsing: boolean;
  clarifyTimeoutError: boolean;
}

export interface seriesApiResponse {
  data: any;
  view: string;
  url: string;
}
