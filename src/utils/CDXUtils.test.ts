import { OrgType } from 'src/data/services/graphql';
import { getEnumByValue, isDateTimeValid, yyyyMMdd, yyyyMMdda } from 'src/utils/CDXUtils';

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

  it('yyyyMMdda null', () => {
    expect(yyyyMMdda(null)).toEqual('');
  });

  it('yyyyMMdda undefined', () => {
    expect(yyyyMMdda(undefined)).toEqual('');
  });

  it('yyyyMMdda date format', () => {
    const date = new Date(2020, 10, 15, 11, 12, 13);
    expect(yyyyMMdda(date)).toEqual('2020-11-15 11:12:13 AM');
  });
  it('getEnumByValue', () => {
    expect(getEnumByValue(OrgType, 'VENDOR')).toEqual(OrgType.Vendor);
    expect(getEnumByValue(OrgType, 'INTEGRATION_SPONSOR')).toEqual(OrgType.IntegrationSponsor);
  });

  it('getEnumByValue not found', () => {
    expect(getEnumByValue(OrgType, undefined)).toBeNull();
    expect(getEnumByValue(OrgType, 'NotAValue')).toBeNull();
  });

  it('isDateTimeValid null', () => {
    expect(isDateTimeValid(null)).toEqual(false);
  });

  it('isDateTimeValid undefined', () => {
    expect(isDateTimeValid(undefined)).toEqual(false);
  });

  it('isDateTimeValid now', () => {
    expect(isDateTimeValid(new Date())).toEqual(true);
  });

  it('isDateTimeValid with bad time', () => {
    expect(isDateTimeValid(new Date('2020-11-01T88:99:00'))).toEqual(false);
  });
});
