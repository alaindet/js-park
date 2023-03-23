export type RouteParams = { [paramName: string]: string };

export type StaticRegisteredRoute = {
  pattern: string;
  key: string;
};

export type RegexRegisteredRoute = {
  pattern: string;
  key: string;
  regex: RegExp;
  paramNames: string[];
};

export type RegisteredRoute = StaticRegisteredRoute | RegexRegisteredRoute;

export type StaticMatchedRoute = StaticRegisteredRoute;

export type RegexMatchedRoute = RegexRegisteredRoute & {
  data: RouteParams;
};

export type MatchedRoute = StaticMatchedRoute | RegexMatchedRoute;
