import { format } from 'date-fns';

function isDateTimeValid(d?: Date | null): boolean {
  // Check if this date has a valid time value
  /* eslint-disable no-self-compare */
  return !!(d && d.getTime() === d.getTime());
}

function yyyyMMdd(date?: Date | null): string {
  if (date) {
    return format(date, 'yyyy-MM-dd');
  }
  return '';
}

function yyyyMMdda(date?: Date | null): string {
  if (date) {
    return format(date, 'yyyy-MM-dd a');
  }
  return '';
}

function getEnumByValue(enumType, enumValue?: string) {
  const key = Object.keys(enumType).find((x) => enumType[x] === enumValue);
  if (key) {
    return enumType[key];
  }
  return null;
}

export { isDateTimeValid, yyyyMMdd, getEnumByValue, yyyyMMdda };
