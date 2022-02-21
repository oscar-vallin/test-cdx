import { getEnumByValue, yyyyMMdd } from './CDXUtils';
import { OrgType } from 'src/data/services/graphql';

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

  it('getEnumByValue', () => {
    expect(getEnumByValue(OrgType, 'VENDOR')).toEqual(OrgType.Vendor);
    expect(getEnumByValue(OrgType, 'INTEGRATION_SPONSOR')).toEqual(OrgType.IntegrationSponsor);
  });

  it('getEnumByValue not found', () => {
    expect(getEnumByValue(OrgType, undefined)).toBeNull();
    expect(getEnumByValue(OrgType, 'NotAValue')).toBeNull();
  });
});
