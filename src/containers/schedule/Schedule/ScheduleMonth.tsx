import { ReactElement, useEffect, useState } from 'react';
import {
  addDays,
  endOfMonth,
  endOfWeek,
  format,
  isSameDay,
  isSameMonth,
  parseISO,
  startOfMonth,
  startOfWeek,
} from 'date-fns';
import { SchedOccurStatusEnum, ScheduleOccurrence } from 'src/data/services/graphql';
import { Body, CalendarBodyCell, CalendarBodyCellNumber, CalendarBodyRow, CellItem } from './ScheduleMonth.styles';

type ScheduleMonthType = {
  id: string;
  currentDate: Date;
  selectedDate: Date;
  items: ScheduleOccurrence[];
  onChangeDate: (d: Date) => void;
  onChangeView: (viewName: string) => void;
};

export const ScheduleMonth = ({
  id,
  currentDate,
  selectedDate,
  items,
  onChangeDate,
  onChangeView,
}: ScheduleMonthType) => {
  const [dates, setDates] = useState({
    currentMonth: currentDate,
    selectedDate: currentDate,
    monthStart: startOfMonth(currentDate),
    monthEnd: endOfMonth(currentDate),
    startDate: startOfWeek(startOfMonth(currentDate)),
    endDate: endOfWeek(endOfMonth(currentDate)),
  });

  useEffect(() => {
    if (!!selectedDate && selectedDate !== dates.selectedDate) {
      const _monthStart = startOfMonth(selectedDate);
      const _monthEnd = endOfMonth(selectedDate);
      const _newDate = {
        currentMonth: selectedDate,
        selectedDate,
        monthStart: _monthStart,
        monthEnd: _monthEnd,
        startDate: startOfWeek(_monthStart),
        endDate: endOfWeek(_monthEnd),
      };

      setDates(_newDate);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedDate]);

  const renderItems = (day: Date, allItems: ScheduleOccurrence[]) => {
    let dayRows = allItems.filter((_item) => isSameDay(parseISO(_item.timeScheduled), day));
    if (dayRows.length > 5) {
      // Only show the first 5 items and then show an ellipsis
      dayRows = dayRows.splice(5);
      dayRows.push({
        resource: '...',
        schedOccurStatus: SchedOccurStatusEnum.Scheduled,
      });
    }

    return dayRows.map((_item, index) => (
      <CellItem key={`cell_${day}_${index}`} title={_item.resource}>
        {_item.resource}
      </CellItem>
    ));
  };

  // *
  const handleChangeDate = (_date: Date) => {
    if (isSameDay(_date, selectedDate)) {
      onChangeView('day');
      return;
    }

    onChangeDate(_date);
  };

  //
  const _renderBody = () => {
    const dateFormat = 'dd';
    const rows: ReactElement[] = [];

    let day = dates.startDate;
    let days: ReactElement[] = [];
    let formattedDate = '';
    let formattedDateNotValid = '';

    while (day <= dates.endDate) {
      for (let i = 0; i < 7; i++) {
        formattedDate = format(day, dateFormat);
        formattedDateNotValid = format(day, 'LLL d');
        const cloneDay = day;
        // Collapse icon.
        // Month View, Week Month, Day Month.
        // Select Day highlight and Change the View.
        // Just highlighted.

        days.push(
          <CalendarBodyCell
            id={`CalendarBodyCell-${i}-${day.getDate()}`}
            isSameMonth={isSameMonth(day, dates.monthStart)}
            isSameDay={isSameDay(day, currentDate)}
            isSelectedDate={isSameDay(day, dates.selectedDate)}
            key={`day_${i}_${day}`}
            onClick={() => handleChangeDate(cloneDay)}
          >
            <CalendarBodyCellNumber id={`CalendarBodyCellNumber_${i}_${day}`} key={`cell_${i}_${day}`}>
              {isSameMonth(day, dates.monthStart) && !isSameDay(day, currentDate)
                ? formattedDate
                : formattedDateNotValid}
            </CalendarBodyCellNumber>
            {renderItems(day, items)}
          </CalendarBodyCell>
        );

        day = addDays(day, 1);
      }
      rows.push(
        <CalendarBodyRow id={`CalendarBodyRow-${day}`} key={`week_${day}`}>
          {days}
        </CalendarBodyRow>
      );
      days = [];
    }
    return rows;
  };

  return <Body id={`${id}-CalendarBody`}>{_renderBody()}</Body>;
};

ScheduleMonth.propTypes = {};

export default ScheduleMonth;
