import { MatchedRoute, RegexRegisteredRoute, RegisteredRoute, RouteParams, StaticRegisteredRoute } from './types';

export class Router {

  private routes: RegisteredRoute[] = [];

  constructor(
    private baseUrl: string,
  ) {}

  register(_pattern: string, key: string): void {
    const pattern = this.normalizePattern(_pattern);
    const isStatic = !pattern.match(/\/\:/);

    if (isStatic) {
      this.registerStatic(pattern, key);
      return;
    }

    const [regex, paramNames] = this.parseRegexRoute(pattern);
    this.registerRegex(pattern, key, regex, paramNames);
  }

  debugRoutes() {
    console.table(this.routes);
  }

  handle(_pattern: string): MatchedRoute | null {
    let pattern = this.sanitizePattern(_pattern);

    for (const route of this.routes) {

      // Regex route
      if ((route as RegexRegisteredRoute)?.regex) {
        const { regex, paramNames } = route as RegexRegisteredRoute;
        const matches = [...pattern.matchAll(regex)];

        if (!!matches.length) {
          const params: RouteParams = {};
          matches.forEach(match => {
            match.slice(1).forEach((routeParamValue, i) => {
              params[paramNames[i]] = routeParamValue;
            });
          });

          return {
            pattern: route.pattern,
            key: route.key,
            data: params,
          };
        }
        continue;
      }

      // Static route
      if (route.pattern === pattern) {
        const { pattern, key } = route;
        return { pattern, key };
      }
    }

    return null;
  }

  private parseRegexRoute(pattern: string): [RegExp, string[]] {

    let regexSegments: string[] = [];
    let paramNames: string[] = [];

    for (const segment of pattern.split('/')) {

      // Empty segment
      if (segment === '') {
        continue;
      }

      // Static segment
      if (segment[0] !== ':') {
        regexSegments.push(segment);
        continue;
      }

      const paramName = segment.slice(1);
      paramNames.push(paramName);
      regexSegments.push(`([^\/]+?)`);
    }

    const regex = `^\/${regexSegments.join('/')}$`;

    return [new RegExp(regex, 'gi'), paramNames];
  }

  private registerStatic(pattern: string, key: string): void {
    const route: StaticRegisteredRoute = { pattern, key };
    this.routes.push(route);
  }

  private registerRegex(pattern: string, key: string, regex: RegExp, paramNames: string[]): void {
    const route: RegexRegisteredRoute = { pattern, key, regex, paramNames };
    this.routes.push(route);
  }

  // Ex.:
  // normalizePattern('/todos') => '/todos'
  // normalizePattern('todos') => '/todos'
  // normalizePattern('todos/') => '/todos'
  private normalizePattern(pattern: string): string {
    let result = pattern;

    if (!pattern.startsWith('/')) {
      result = `/${pattern}`;
    }

    if (pattern.endsWith('/')) {
      result = result.slice(0, -1);
    }

    return result;
  }

  private sanitizePattern(pattern: string): string {
    let result = pattern;

    if (pattern.startsWith(this.baseUrl)) {
      result = result.replace(this.baseUrl, '');
    }

    const queryStringIndex = result.indexOf('?');
    if (queryStringIndex !== -1) {
      result = result.slice(0, queryStringIndex);
    }

    const fragmentIndex = result.indexOf('#');
    if (fragmentIndex !== -1) {
      result = result.slice(0, fragmentIndex);
    }

    return result;
  }
}
