import React, { ReactElement } from 'react';
import { format, isSameHour, parseISO } from 'date-fns';
import { Stack, StackItem } from '@fluentui/react';
import { SchedOccurStatusEnum, ScheduleOccurrence, WorkPacketCommandType } from 'src/data/services/graphql';
import { Badge } from 'src/components/badges/Badge';
import { UseFileStatusDetailsPanel } from 'src/pages/FileStatusDetails/useFileStatusDetailsPanel';
import {
  DayBodyRow,
  DayContainer,
  DayHourWrapper,
  OccurrenceDetail,
  OccurrenceItem,
  OccurrencePattern,
  SWeekHour,
  SWeekHourContainer,
  DayRow,
} from './Schedule.styles';

type ScheduleDayType = {
  currentDate: Date;
  selectedDate: Date;
  items: ScheduleOccurrence[];
  useFileStatusDetailsPanel?: UseFileStatusDetailsPanel;
};

type RunOccurrence = {
  runTime: Date;
  resource: string;
  workOrderId: string;
  orgSid: string;
  status: SchedOccurStatusEnum;
  statusLabel: string;
  canViewDetails: boolean;
};

export const ScheduleDay = ({ currentDate, selectedDate, items, useFileStatusDetailsPanel }: ScheduleDayType) => {
  const currentSelectedDate = selectedDate ?? currentDate;

  const rows: ReactElement[] = [];

  const hourFormat = 'h aa';

  const runOccurrences: RunOccurrence[] = [];

  items.forEach((item) => {
    if (item.runOccurrences) {
      item.runOccurrences?.forEach((run) => {
        runOccurrences.push({
          runTime: parseISO(run.timeRan),
          resource: item.resource,
          workOrderId: run.workOrderId,
          orgSid: item.orgSid,
          status: run.status,
          statusLabel: run.statusLabel,
          canViewDetails: !!run.commands?.find((cmd) => cmd?.commandType === WorkPacketCommandType.ViewDetails),
        });
      });
    } else {
      runOccurrences.push({
        runTime: parseISO(item.timeScheduled),
        resource: item.resource,
        workOrderId: '',
        orgSid: item.orgSid,
        status: item.schedOccurStatus,
        statusLabel: item.schedOccurStatusLabel,
        canViewDetails: false,
      });
    }
  });

  const badgeVariant = (status?: SchedOccurStatusEnum): string => {
    switch (status) {
      case SchedOccurStatusEnum.Errored:
      case SchedOccurStatusEnum.ErroredCloseToSchedule:
      case SchedOccurStatusEnum.ErroredOffSchedule:
      case SchedOccurStatusEnum.ErroredEarly:
      case SchedOccurStatusEnum.ErroredLate:
        return 'error';
      case SchedOccurStatusEnum.Missed:
      case SchedOccurStatusEnum.ExchangeHeld:
        return 'warning';
      case SchedOccurStatusEnum.RanCloseToSchedule:
      case SchedOccurStatusEnum.RanOffSchedule:
      case SchedOccurStatusEnum.RanNotScheduled:
      case SchedOccurStatusEnum.RanLate:
      case SchedOccurStatusEnum.RanEarly:
      case SchedOccurStatusEnum.RanInWindow:
        return 'success';
      default:
        return 'info';
    }
  };

  const openDetails = (runOccurrence: RunOccurrence) => {
    if (runOccurrence.canViewDetails) {
      useFileStatusDetailsPanel?.showPanel(runOccurrence.workOrderId ?? '', runOccurrence.orgSid ?? '', '');
    }
  };

  const renderItems = (hour: number, allItems: RunOccurrence[]) => {
    const day = new Date(currentSelectedDate);
    day.setHours(hour);
    const dayRows = allItems.filter((_item) => isSameHour(_item.runTime, day));

    return dayRows?.map((_item, index) => (
      <OccurrenceDetail
        id={`__Occurrence_${_item.workOrderId}`}
        key={`cell_${hour}_${index}`}
        onClick={() => openDetails(_item)}
      >
        <Stack horizontal tokens={{ childrenGap: 15 }} verticalAlign="center" wrap>
          <StackItem>
            <OccurrenceItem>{format(_item.runTime, 'hh:mm')}</OccurrenceItem>
          </StackItem>
          <StackItem>
            <OccurrencePattern>{_item.resource}</OccurrencePattern>
          </StackItem>
          <StackItem>
            <OccurrenceItem>{_item.workOrderId}</OccurrenceItem>
          </StackItem>
          <StackItem>
            <Badge variant={badgeVariant(_item.status)} label={_item.statusLabel} pill />
          </StackItem>
        </Stack>
      </OccurrenceDetail>
    ));
  };

  const renderRow = (hour: number, value: string) => (
    <DayBodyRow id={`__DayBodyRow_${hour}`} key={value}>
      <SWeekHourContainer>{hour > 0 && <SWeekHour>{value}</SWeekHour>}</SWeekHourContainer>
      <DayHourWrapper id={`__HourWrapper_${hour}`}>{renderItems(hour, runOccurrences)}</DayHourWrapper>
    </DayBodyRow>
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

  return <DayRow id="__DayRow">{renderBody()}</DayRow>;
};
