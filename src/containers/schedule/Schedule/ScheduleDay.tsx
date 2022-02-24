import { format, isSameDay, isSameHour, parseISO } from 'date-fns';
import React, { ReactElement } from 'react';
import { ScheduleOccurrence } from 'src/data/services/graphql';
import { CalendarBodyCellNumber } from 'src/containers/schedule/Schedule/ScheduleWeek.styles';
import { Badge } from 'src/components/badges/Badge';
import {
  WeekRow,
  DayContainer,
  DayOfWeekContainer,
  SWeekHourContainer,
  SWeekHour,
  CalendarBodyRow,
  OccurrenceDetail,
} from './Schedule.styles';

type ScheduleDayType = {
  currentDate: Date;
  selectedDate: Date;
  items: ScheduleOccurrence[];
};

export const ScheduleDay = ({ currentDate, selectedDate, items }: ScheduleDayType) => {
  const currentSelectedDate = selectedDate ?? currentDate;

  const rows: ReactElement[] = [];

  const hourFormat = 'h aa';

  const renderItems = (hour: number, allItems: ScheduleOccurrence[]) => {
    const day = new Date(currentSelectedDate);
    day.setHours(hour);
    const dayRows = allItems.filter((_item) => isSameHour(parseISO(_item.timeScheduled), day));

    return dayRows?.map((_item, index) => (
      <OccurrenceDetail key={`cell_${hour}_${index}`} title={_item.resource}>
        {format(parseISO(_item.timeScheduled), 'hh:mm')} {_item.resource}
        <Badge variant="info" label={_item.schedOccurStatus} pill />
      </OccurrenceDetail>
    ));
  };

  const renderRow = (hour: number, value: string) => (
    <CalendarBodyRow id={`__CalendarBodyRow_${hour}`} key={value}>
      <SWeekHourContainer>{hour > 0 && <SWeekHour>{value}</SWeekHour>}</SWeekHourContainer>
      <DayOfWeekContainer id={`__CalendarBodyCell_${hour}`} isSameDay={isSameDay(currentDate, currentSelectedDate)}>
        <CalendarBodyCellNumber id={`CalendarBodyCellNumber-${hour}`}>
          {renderItems(hour, items)}
        </CalendarBodyCellNumber>
      </DayOfWeekContainer>
    </CalendarBodyRow>
  );

  const renderBody = () => {
    const day = new Date(currentSelectedDate);
    for (let h = 0; h < 24; h++) {
      day.setHours(h);
      const formattedHour = format(day, hourFormat);
      rows.push(renderRow(h, formattedHour));
    }

    return <DayContainer id="__DayContainer">{rows}</DayContainer>;
  };

  return <WeekRow id="__DayRow">{renderBody()}</WeekRow>;
};
