import { addDays, addHours, format, isSameDay, parseISO, startOfDay, startOfWeek } from 'date-fns';
import { ReactElement } from 'react';

import {
  Body,
  DayOfWeekContainer,
  CalendarBodyCellNumber,
  CalendarBodyRow,
  SWeekHour,
  SWeekHourContainer,
  CellItem,
} from './ScheduleWeek.styles';

type ScheduleWeekProps = {
  currentDate: Date;
  selectedDate: Date;
  items: any[] | undefined;
};

//
// ─── SCHEDULE WEEK COMPONENT ───────────────────────────────────────────────────────
//
export const ScheduleWeek = ({ currentDate, selectedDate, items }: ScheduleWeekProps) => {
  const startDate = startOfWeek(selectedDate ?? currentDate);
  const currentSelectedDate = selectedDate ?? currentDate;

  const rows: ReactElement[] = [];
  let days: ReactElement[] = [];
  let day = startDate;
  let formattedHour = '';

  let hour = startOfDay(startDate);
  const hourFormat = 'h aa';

  //
  // ─── CREATE ROWS ─────────────────────────────────────────────────────────────────
  const renderItems = (_day, allItems) => {
    const dayRows = allItems.filter((_item) => isSameDay(parseISO(_item.datetime), _day));

    return dayRows?.map((_item, index) => <CellItem key={`cell_${_day}_${index}`}>{_item.label}</CellItem>);
  };

  //
  // ─── CREATE DAYS ─────────────────────────────────────────────────────────────────
  //
  const _renderBody = () => {
    for (let h = 1; h <= 24; h++) {
      formattedHour = format(hour, hourFormat);
      for (let i = 0; i < 7; i++) {
        days.push(
          <DayOfWeekContainer id={`CalendarBodyCell-${day}-${i}-${h}`} isSameDay={isSameDay(day, currentSelectedDate)} key={`dow_${day}_${i}-${h}`}>
            <CalendarBodyCellNumber id={`CalendarBodyCellNumber-${day}-${i}-${h}`}>{renderItems(day, items)}</CalendarBodyCellNumber>
          </DayOfWeekContainer>
        );

        day = addDays(day, 1);
      }

      rows.push(
        <CalendarBodyRow id={`CalendarBodyRow-${day}-${h}`} key={`row_${day}-${h}`}>
          <SWeekHourContainer>{h > 1 && <SWeekHour>{formattedHour}</SWeekHour>}</SWeekHourContainer>
          {days}
        </CalendarBodyRow>
      );

      days = [];
      hour = addHours(hour, 1);
    }

    return <div>{rows}</div>;
  };

  return <Body id="CalendarBody">{_renderBody()}</Body>;
};

ScheduleWeek.propTypes = {};

export default ScheduleWeek;
