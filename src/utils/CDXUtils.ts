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
    return format(date, 'yyyy-MM-dd hh:mm:ss a');
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

function prettyEnumValue(enumValue?) {
  if (!enumValue) {
    return '';
  }

  return enumValue
    .toString()
    .replace(/_/g, ' ')
    .toLowerCase()
    .replace(/\b\w/g, (str) => str.toUpperCase());
}

export {
  isDateTimeValid, yyyyMMdd, getEnumByValue, yyyyMMdda, prettyEnumValue,
};
