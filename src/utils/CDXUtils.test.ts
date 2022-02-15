import { yyyyMMdd } from './CDXUtils';

describe('CDX Utility testing', () => {
  it('yyyyMMdd null', () => {
    expect(yyyyMMdd(null)).toEqual('');
  });

  it('yyyyMMdd undefined', () => {
    expect(yyyyMMdd(undefined)).toEqual('');
  });

  it('yyyyMMdd date format', () => {
    const date = new Date(2020, 10, 15, 11, 12, 13);
    expect(yyyyMMdd(date)).toEqual('2020-11-15');
  });
});