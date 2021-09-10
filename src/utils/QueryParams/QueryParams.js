import queryString from 'query-string';

export default class QueryParams {
  static sharedAttrs = {};

  static setSharedAttrs(attrs) {
    QueryParams.sharedAttrs = attrs;
  }

  static parse(search) {
    return queryString.parse(search);
  }

  static stringify(params) {
    return queryString.stringify(params);
  }

  static generate(url, params) {
    const query = QueryParams.stringify(params);

    return `${url}?${query}`;
  }

  static replace(location, params) {
    return QueryParams.generate(location.pathname, { ...QueryParams.sharedAttrs, ...params });
  }

  static merge(location, params) {
    const { pathname, search } = location;

    return QueryParams.generate(pathname, {
      ...QueryParams.sharedAttrs,
      ...QueryParams.parse(search),
      ...params,
    });
  }
}
