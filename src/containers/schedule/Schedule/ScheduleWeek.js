import { addDays, addHours, format, isSameDay, parseISO, startOfDay, startOfWeek } from 'date-fns';

import {
  Body,
  DayOfWeekContainer,
  CalendarBodyCellNumber,
  CalendarBodyRow,
  SWeekHour,
  SWeekHourContainer,
  CellItem,
} from './ScheduleWeek.styles';

export const ScheduleWeek = ({ currentDate, selectedDate, items }) => {
  const startDate = startOfWeek(selectedDate ?? currentDate);
  const currentSelectedDate = selectedDate ?? currentDate;

  const rows = [];
  let days = [];
  let day = startDate;
  let formattedHour = '';

  let hour = startOfDay(startDate);
  const hourFormat = 'h aa';

  //
  //
  const renderItems = (_day, allItems) => {
    const dayRows = allItems.filter((_item) => isSameDay(parseISO(_item.datetime), _day));

    return dayRows.map((_item) => <CellItem>{_item.label}</CellItem>);
  };

  // *
  // *
  const _renderBody = () => {
    for (let h = 1; h <= 24; h++) {
      formattedHour = format(hour, hourFormat);
      for (let i = 0; i < 7; i++) {
        days.push(
          <DayOfWeekContainer
            id="CalendarBodyCell"
            isSameDay={isSameDay(day, currentSelectedDate)}
            key={day}
            // onClick={() => onDateClick(parse(cloneDay))}
          >
            <CalendarBodyCellNumber id="CalendarBodyCellNumber">{renderItems(day, items)}</CalendarBodyCellNumber>
          </DayOfWeekContainer>
        );

        day = addDays(day, 1);
      }

      rows.push(
        <CalendarBodyRow id="CalendarBodyRow" key={day}>
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
