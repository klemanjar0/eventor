export enum Method {
  POST = "POST",
  GET = "GET",
  PUT = "PUT",
  DELETE = "DELETE",
  PATCH = "PATCH",
}

type UrlFunction = (...args: Anything[]) => string;

export interface Endpoint {
  method: Method;
  url: string | UrlFunction;
}

export type Endpoints = Record<string, Endpoint>;

const endpoints = {
  login: { method: Method.POST, url: "/v1/login" },
  logout: { method: Method.POST, url: "/v2/logout" },
  refreshToken: { method: Method.POST, url: "/v2/refresh" },
  register: { method: Method.POST, url: "/v1/register" },
  me: { method: Method.POST, url: "/v2/me" },
} satisfies Endpoints;

export default endpoints;
