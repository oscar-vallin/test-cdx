import { format } from 'date-fns';

function yyyyMMdd(date?: Date | null): string {
  if (date) {
    return format(date, 'yyyy-MM-dd');
  }
  return '';
}

export { yyyyMMdd }