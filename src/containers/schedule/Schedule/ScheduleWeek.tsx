import {
  addDays, format, isSameDay, isSameHour, parseISO, startOfWeek,
} from 'date-fns';
import { ReactElement } from 'react';
import { ScheduleOccurrence } from 'src/data/services/graphql';
import {
  Body,
  DayOfWeekContainer,
  WeekBodyCellNumber,
  WeekBodyRow,
  SWeekHour,
  SWeekHourContainer,
  WeekDaysWrapper,
  DesktopCellItem,
  MobileCellItem,
} from './Schedule.styles';

type ScheduleWeekProps = {
  currentDate: Date;
  selectedDate: Date;
  items: ScheduleOccurrence[];
  onChangeDate: (d: Date) => void;
  onChangeView: (viewName: string) => void;
};

//
// ─── SCHEDULE WEEK COMPONENT ───────────────────────────────────────────────────────
//
export const ScheduleWeek = ({
  currentDate, selectedDate, items, onChangeDate, onChangeView,
}: ScheduleWeekProps) => {
  const startDate = startOfWeek(selectedDate ?? currentDate);
  const currentSelectedDate = selectedDate ?? currentDate;

  const hourFormat = 'h aa';

  const handleChangeDate = (_date: Date) => {
    if (isSameDay(_date, selectedDate)) {
      onChangeView('day');
      return;
    }

    onChangeDate(_date);
  };

  //
  // ─── CREATE ROWS ─────────────────────────────────────────────────────────────────
  const renderItems = (_day: Date, allItems: ScheduleOccurrence[]) => {
    const dayRows = allItems.filter((_item) => isSameHour(parseISO(_item.timeScheduled), _day));
    return dayRows?.map((_item, index) => (
      <DesktopCellItem key={`cell_${_day}_${index}`} title={_item.resource} status={_item.schedOccurStatus}>
        {_item.resource}
      </DesktopCellItem>
    ));
  };

  const renderItemCount = (_day: Date, allItems: ScheduleOccurrence[]) => {
    const dayRows = allItems.filter((_item) => isSameHour(parseISO(_item.timeScheduled), _day));
    const count = dayRows.length;
    if (count > 0) {
      return <MobileCellItem>{count}</MobileCellItem>;
    }
    return null;
  };

  //
  // ─── CREATE DAYS ─────────────────────────────────────────────────────────────────
  //
  const renderDayOfWeek = (day: Date) => {
    const id = format(day, 'yyyy-MM-dd-hh');
    return (
      <DayOfWeekContainer
        id={`DayOfWeekBodyCell-${id}`}
        isSameDay={isSameDay(day, currentSelectedDate)}
        key={`dow_${day}`}
        onClick={() => handleChangeDate(day)}
      >
        <WeekBodyCellNumber id={`DayOfWeekBodyCellNumber-${id}`}>
          {renderItems(day, items)}
          {renderItemCount(day, items)}
        </WeekBodyCellNumber>
      </DayOfWeekContainer>
    );
  };

  const renderHourRow = (hour: number, value: string, days: ReactElement[]) => (
    <WeekBodyRow id={`CalendarBodyRow-${hour}`} key={`row_${hour}`}>
      <SWeekHourContainer>{hour > 0 && <SWeekHour>{value}</SWeekHour>}</SWeekHourContainer>
      <WeekDaysWrapper>{days}</WeekDaysWrapper>
    </WeekBodyRow>
  );

  const renderBody = () => {
    const rows: ReactElement[] = [];

    for (let h = 0; h < 24; h++) {
      const days: ReactElement[] = [];
      let day = new Date(startDate);
      day.setHours(h);
      const formattedHour = format(day, hourFormat);
      for (let i = 0; i < 7; i++) {
        const cloneDay = new Date(day);
        days.push(renderDayOfWeek(cloneDay));

        day = addDays(day, 1);
      }

      rows.push(renderHourRow(h, formattedHour, days));
    }

    return <div>{rows}</div>;
  };

  return <Body id="CalendarBody">{renderBody()}</Body>;
};

ScheduleWeek.propTypes = {};

export default ScheduleWeek;
