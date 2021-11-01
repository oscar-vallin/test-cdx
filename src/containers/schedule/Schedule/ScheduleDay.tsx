import { addHours, format, isSameDay, startOfDay } from 'date-fns';
import { ReactElement } from 'react';

import {
  WeekRow,
  Container,
  DayOfWeekContainer,
  SWeekHourContainer,
  SWeekHour,
  CalendarBodyRow,
} from './ScheduleDay.styles';

export const ScheduleDay = ({ currentDate, selectedDate }) => {
  const currentSelectedDate = selectedDate ?? currentDate;

  const rows: ReactElement[] = [];

  let formattedHour = '';
  let hour = startOfDay(currentSelectedDate);
  const hourFormat = 'h aa';

  //
  //

  const _renderBody = () => {
    for (let h = 1; h <= 24; h++) {
      formattedHour = format(hour, hourFormat);
      rows.push(
        <CalendarBodyRow id="CalendarBodyRow" key={formattedHour}>
          <SWeekHourContainer>{h > 1 && <SWeekHour>{formattedHour}</SWeekHour>}</SWeekHourContainer>
          <DayOfWeekContainer id="CalendarBodyCell" isSameDay={isSameDay(new Date(), currentSelectedDate)} />
        </CalendarBodyRow>
      );

      hour = addHours(hour, 1);
    }

    return <Container id="DayContainer">{rows}</Container>;
  };

  return <WeekRow id="WeekRow">{_renderBody()}</WeekRow>;
};

ScheduleDay.propTypes = {};

export default ScheduleDay;
