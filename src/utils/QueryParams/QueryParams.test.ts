import QueryParams from 'src/utils/QueryParams/QueryParams';

describe('QueryParams Testing Unit...', () => {
  it('Should parse the query params from the search string', () => {
    const search = '?firstParam=1&secondParam=second';
    const expectation = { firstParam: '1', secondParam: 'second' };

    expect(QueryParams.parse(search)).toEqual(expectation);
  });

  it('Should stringify the query params from object', () => {
    const params = { firstParam: '1', secondParam: 'second' };
    const expectation = 'firstParam=1&secondParam=second';

    expect(QueryParams.stringify(params)).toEqual(expectation);
  });

  it('Should generate a new URL containing the query params', () => {
    const url = 'link.com';
    const params = { count: 1, test: true };

    expect(QueryParams.generate(url, params)).toEqual('link.com?count=1&test=true');
  });

  it('Should replace the query params from a URL', () => {
    const location = { pathname: 'link.com' };
    const params = { new: true };

    expect(QueryParams.replace(location, params)).toEqual('link.com?new=true');
  });

  it('Should merge the query params from a URL', () => {
    const location = { pathname: 'link.com', search: '?old=false' };
    const params = { new: true };

    expect(QueryParams.merge(location, params)).toEqual('link.com?new=true&old=false');
  });
});
