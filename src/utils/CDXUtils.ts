import { format } from 'date-fns';

function yyyyMMdd(date?: Date | null): string {
  if (date) {
    return format(date, 'yyyy-MM-dd');
  }
  return '';
}

function getEnumByValue(enumType, enumValue?: string) {
  const key = Object.keys(enumType).find((x) => enumType[x] == enumValue);
  if (key) {
    return enumType[key];
  }
  return null;
}

export { yyyyMMdd, getEnumByValue };
