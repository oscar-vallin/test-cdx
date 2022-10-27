import { useState, useEffect } from 'react';
import {
  XchangeSchedule,
  useXchangeScheduleFormLazyQuery,
  useUpdateXchangeScheduleMutation,
  useXchangeJobGroupFormLazyQuery,
  useCreateXchangeJobGroupMutation,
  useUpdateXchangeJobGroupMutation,
  useXchangeJobGroupsLazyQuery,
  XchangeScheduleForm,
  XchangeJobGroupForm,
  ScheduleFrequency,
  UiOption,
  Month,
  DayOrdinal,
  RelativeDay,
  DayOfWeek,
  ScheduleType,
  UiOptions,
  GqOperationResponse,
  XchangeJobGroupConnection,
} from 'src/data/services/graphql';
import {
  PanelBody,
  PanelHeader,
  PanelTitle,
  ThemedPanel,
} from 'src/layouts/Panels/Panels.styles';
import {
  Checkbox,
  ChoiceGroup,
  DefaultButton,
  FontIcon,
  PanelType,
  PrimaryButton,
  Spinner,
  SpinnerSize,
  Stack,
  Text,
  MessageBar,
  MessageBarType,
  TooltipHost,
  DirectionalHint,
} from '@fluentui/react';
import { useOrgSid } from 'src/hooks/useOrgSid';
import { CircleSchedule } from 'src/components/circleSchedule';
import { Spacing } from 'src/components/spacings/Spacing';
import { SubscribersList } from 'src/components/subscribers/SubscribersList';
import { AddSubscriberModal } from 'src/containers/modals/AddSubsciberModal/AddSubscriberModal';
import { ButtonAction, ButtonLink } from 'src/components/buttons';
import { UIFlatSelectOneField } from 'src/components/inputs/InputDropdown/UIFlatSelectOneField';
import { Column, Container, Row } from 'src/components/layouts';
import { UITimeSelectOneField } from 'src/components/inputs/InputDropdown/UITimeSelectOneField';
import { useNotification } from 'src/hooks/useNotification';
import { UIInputText } from 'src/components/inputs/InputText';
import { EmptyMessage } from 'src/containers/tables/TableCurrentActivity/TableActivity.styles';
import { EmptyState } from 'src/containers/states';
import { SubscriberOptionProps } from '../XchangeAlerts/XchangeAlertsPanel/XchangeAlertsPanel';
import { StyledText, StyledXchanges } from './SchedulePanel.styles';

type ScheduleProps = {
    isPanelOpen: boolean;
    closePanel: (data: boolean) => void;
    dataSchedule?: XchangeSchedule,
    xchangeConfigSid?: string,
    xchangeJobGroupSid?: string;
    refreshPage: (data: boolean) => void;
    typeSchedule: boolean;
    xchangeProcessed?: string[];
};

type DaysProps = {
  Sun: boolean;
  Mon: boolean;
  Tue: boolean;
  Wed: boolean;
  Thu: boolean;
  Fri: boolean;
  Sat: boolean;
};

const DefaulDaysProps: DaysProps = {
  Sun: false,
  Mon: false,
  Tue: false,
  Wed: false,
  Thu: false,
  Fri: false,
  Sat: false,
};

type MonthsProps = {
  Jan: boolean;
  Feb: boolean;
  Mar: boolean;
  Apr: boolean;
  May: boolean;
  Jun: boolean;
  Jul: boolean;
  Aug: boolean;
  Sep: boolean;
  Oct: boolean;
  Nov: boolean;
  Dec: boolean;
};

const DefaulMonthsProps: MonthsProps = {
  Jan: false,
  Feb: false,
  Mar: false,
  Apr: false,
  May: false,
  Jun: false,
  Jul: false,
  Aug: false,
  Sep: false,
  Oct: false,
  Nov: false,
  Dec: false,
};

const SchedulePanel = ({
  isPanelOpen,
  closePanel,
  xchangeConfigSid,
  refreshPage,
  typeSchedule,
  xchangeProcessed,
  xchangeJobGroupSid,
}: ScheduleProps) => {
  const { orgSid } = useOrgSid();
  const Toast = useNotification();
  const [schedule, setSchedule] = useState<boolean>();
  const [xchangeSchedule, setXchangeSchedule] = useState<XchangeScheduleForm | null>();
  const [xchangeJobGroup, setXchangeJobGroup] = useState<XchangeJobGroupForm | null>();
  const [xchangeJobGroups, setXchangeJobGroups] = useState<XchangeJobGroupConnection | null>();
  const [options, setOptions] = useState<UiOptions[]>([]);
  const [currentDaySelected, setCurrentDaySelected] = useState<DaysProps>(DefaulDaysProps);
  const [currentMonthSelected, setCurrentMonthSelected] = useState<MonthsProps>(DefaulMonthsProps);
  const [days, setDays] = useState<DayOfWeek[]>([]);
  const [months, setMonths] = useState<Month[]>([]);
  const [jobGroupName, setJobGroupName] = useState('')
  const [everyMonth, setEveryMonth] = useState<UiOption[]>([]);
  const [everyDay, setEveryDay] = useState<UiOption[]>([]);
  const [totalSubscribers, setTotalSubscribers] = useState<SubscriberOptionProps[]>([]);
  const [addSubscriberModal, setAddSubscriberModal] = useState(false);
  const [hasSilencePeriod, setHasSilencePeriod] = useState(false);
  const [hasSilencePeriodLabel, setHasSilencePeriodLabel] = useState('')
  const [scheduleFrequency, setScheduleFrequency] = useState('');
  const [scheduleType, setScheduleType] = useState('');
  const [scheduleTime, setScheduleTime] = useState('');
  const [scheduleTimezone, setScheduleTimeZone] = useState('');
  const [silenceStartMonth, setSilenceStartMonth] = useState('');
  const [silenceStartDay, setSilenceStartDay] = useState('');
  const [silenceEndMonth, setSilenceEndMonth] = useState('');
  const [silenceEndDay, setSilenceEndDay] = useState('');
  const [endDayOfMonth, setEndDayOfMonth] = useState('');
  const [endDayOrdinal, setEndDayOrdinal] = useState('');
  const [endRelativeDay, setEndRelativeDay] = useState('');
  const [message, setMessage] = useState<string | null>();
  const [messageType, setMessageType] = useState<MessageBarType>(MessageBarType.info);

  const [
    scheduleForm, { data: formData, loading: isLoadingForm },
  ] = useXchangeScheduleFormLazyQuery();

  const [
    jobGroupList,
    { data: jobGroupListData, loading: isLoadingListJobGroup },
  ] = useXchangeJobGroupsLazyQuery();

  const [
    jobGroupForm, { data: jobGroupData, loading: isLoadingJobGroup },
  ] = useXchangeJobGroupFormLazyQuery();

  const [
    createJobGroup,
    { data: jobGroupCreated, loading: isLoadingCreateJobGroup, error: jobGroupCreatedError },
  ] = useCreateXchangeJobGroupMutation();

  const [
    updateJobGroup,
    { data: jobGroupUpdated, loading: isLoadingUpdateJobGroup, error: jobGroupUpdatedError },
  ] = useUpdateXchangeJobGroupMutation();

  const [
    scheduleUpdate,
    { data: updateData, loading: isLoadingUpdate, error: updateError },
  ] = useUpdateXchangeScheduleMutation();

  const fethData = () => {
    if (typeSchedule) {
      scheduleForm({
        variables: {
          xchangeConfigSid: xchangeConfigSid ?? '',
        },
      });
      return;
    }
    jobGroupForm({
      variables: {
        orgSid,
        sid: xchangeJobGroupSid,
      },
    });
  };

  const fethJobGroupData = () => {
    jobGroupForm({
      variables: {
        orgSid,
      },
    });
  };

  const subscribersList = (subscribers) => {
    const showSubs: any[] = [];
    let sub = {};
    for (let subscriber = 0; subscriber < subscribers.length; subscriber++) {
      sub['name'] = subscribers[subscriber].name;
      sub['email'] = subscribers[subscriber].email;
      sub['sid'] = subscribers[subscriber].value;
      showSubs.push(sub);
      sub = {};
    }
    setTotalSubscribers((prevValues) => prevValues.concat(showSubs));
  };

  const handleMonths = (selectedMonth: boolean, month: string) => {
    let currentMonth = month.toLocaleLowerCase();
    currentMonth = currentMonth.charAt(0).toUpperCase() + currentMonth.slice(1);
    if (selectedMonth) {
      setMonths((prevState) => prevState.concat(Month[currentMonth]));
      return;
    }
    setMonths((prevState) => prevState.filter((m) => m !== month));
  };

  const handleDays = (selectedDay: boolean, day: string) => {
    let currentDay = day.toLocaleLowerCase();
    currentDay = currentDay.charAt(0).toUpperCase() + currentDay.slice(1);
    if (selectedDay) {
      setDays((prevState) => prevState.concat(DayOfWeek[currentDay]));
      return;
    }
    setDays((prevState) => prevState.filter((d) => d !== day));
    setEndRelativeDay(currentDay);
  };

  const handleLastValue = (value: string) => {
    let currentValue = value.toLocaleLowerCase();
    currentValue = currentValue.charAt(0).toUpperCase() + currentValue.slice(1);
    return currentValue;
  }

  useEffect(() => {
    if (isPanelOpen) {
      setSchedule(typeSchedule);
      fethData();
    }
  }, [isPanelOpen]);

  useEffect(() => {
    if (!isLoadingForm && formData) {
      const { xchangeScheduleForm } = formData;
      setXchangeSchedule(xchangeScheduleForm);
      setOptions(xchangeScheduleForm?.options ?? []);
      xchangeScheduleForm?.months.value?.forEach((month) => {
        const { name } = month;
        DefaulMonthsProps[name] = true;
        handleMonths(true, month.value);
      });
      xchangeScheduleForm?.days.value?.forEach((day) => {
        const { name } = day;
        DefaulDaysProps[name] = true;
        handleDays(true, day.value);
      });
      if (xchangeScheduleForm?.subscribers.value
        && xchangeScheduleForm.subscribers.value.length > 0) {
        subscribersList(xchangeScheduleForm.subscribers.value)
      }
      setScheduleFrequency(xchangeScheduleForm?.frequency.value?.value ?? '');
      setScheduleType(xchangeScheduleForm?.scheduleType.value?.value ?? '');
      setScheduleTimeZone(xchangeScheduleForm?.timezone.value?.value ?? '');
      const hour = xchangeScheduleForm?.endHour.value?.value;
      const minutes = xchangeScheduleForm?.endMinute.value?.value;
      setScheduleTime(`${hour},${minutes}`);
      setHasSilencePeriod(xchangeScheduleForm?.hasSilencePeriod?.value ?? true);
      setHasSilencePeriodLabel(xchangeScheduleForm?.hasSilencePeriod?.label ?? '');
      const monthsValues = xchangeScheduleForm?.options?.find((m) => m.key === 'Month');
      const daysValues = xchangeScheduleForm?.options?.find((d) => d.key === 'DayOfWeek');
      setEveryMonth(monthsValues?.values ?? []);
      setEveryDay(daysValues?.values ?? []);
    }
  }, [formData, isLoadingForm]);

  useEffect(() => {
    if (!isLoadingJobGroup && jobGroupData) {
      const { xchangeJobGroupForm } = jobGroupData;
      setXchangeJobGroup(xchangeJobGroupForm);
      setOptions(xchangeJobGroupForm?.options ?? []);
      xchangeJobGroupForm?.months.value?.forEach((month) => {
        const { name } = month;
        DefaulMonthsProps[name] = true;
        handleMonths(true, month.value);
      })
      xchangeJobGroupForm?.days.value?.forEach((day) => {
        const { name } = day;
        DefaulDaysProps[name] = true;
        handleDays(true, day.value);
      });
      setJobGroupName(xchangeJobGroupForm?.name.value ?? '');
      setScheduleFrequency(xchangeJobGroupForm?.frequency.value?.value ?? '');
      setScheduleType(xchangeJobGroupForm?.scheduleType.value?.value ?? '');
      setHasSilencePeriod(xchangeJobGroupForm?.hasSilencePeriod?.value ?? true);
      setHasSilencePeriodLabel(xchangeJobGroupForm?.hasSilencePeriod?.label ?? '');
      const monthsValues = xchangeJobGroupForm?.options?.find((m) => m.key === 'Month');
      const daysValues = xchangeJobGroupForm?.options?.find((d) => d.key === 'DayOfWeek');
      setEveryMonth(monthsValues?.values ?? []);
      setEveryDay(daysValues?.values ?? []);
    }
  }, [jobGroupData, isLoadingJobGroup]);

  useEffect(() => {
    if (ScheduleFrequency.InGroup === scheduleFrequency) {
      jobGroupList({
        variables: {
          orgSid,
        },
      });
    }
  }, [scheduleFrequency]);

  useEffect(() => {
    const response = updateData?.updateXchangeSchedule;

    if (updateData) {
      const responseCode = response?.response;
      const { updateXchangeSchedule } = updateData;
      setXchangeSchedule(updateXchangeSchedule);
      if (responseCode === GqOperationResponse.Fail) {
        const errorMsg = updateXchangeSchedule?.errMsg
          ?? 'Error occurred, please verify the information and try again.';
        setMessageType(MessageBarType.error);
        setMessage(errorMsg);
      }

      if (responseCode === GqOperationResponse.Success) {
        setTotalSubscribers([]);
        setMessage(null);
        closePanel(false);
        refreshPage(true);
        Toast.success({ text: 'Schedule Updated' });
      }
    }
    if (!isLoadingUpdate && updateError) {
      Toast.error({ text: 'Error updating schedule' });
    }
  }, [updateData, isLoadingUpdate, updateError]);

  useEffect(() => {
    if (!isLoadingCreateJobGroup && jobGroupCreated) {
      setTotalSubscribers([]);
      setMessage(null);
      closePanel(false);
      refreshPage(true);
      Toast.success({ text: `Job Group ${jobGroupName} created` });
    }

    if (!isLoadingCreateJobGroup && jobGroupCreatedError) {
      Toast.error({ text: 'Error creating a job group' });
    }
  }, [jobGroupCreated, isLoadingCreateJobGroup, jobGroupCreatedError]);

  useEffect(() => {
    const response = jobGroupUpdated?.updateXchangeJobGroup;

    if (jobGroupUpdated) {
      const responseCode = response?.response;
      const { updateXchangeJobGroup } = jobGroupUpdated;
      setXchangeJobGroup(updateXchangeJobGroup);
      if (responseCode === GqOperationResponse.Fail) {
        const errorMsg = updateXchangeJobGroup?.errMsg
          ?? 'Error occurred, please verify the information and try again.';
        setMessageType(MessageBarType.error);
        setMessage(errorMsg);
      }

      if (responseCode === GqOperationResponse.Success) {
        setTotalSubscribers([]);
        setMessage(null);
        closePanel(false);
        refreshPage(true);
        Toast.success({ text: 'Job Group Updated' });
      }
    }
    if (!isLoadingUpdateJobGroup && jobGroupUpdatedError) {
      Toast.error({ text: 'Error updating job group' });
    }
  }, [jobGroupUpdated, isLoadingUpdateJobGroup, jobGroupUpdatedError]);

  useEffect(() => {
    if (!isLoadingListJobGroup && jobGroupListData) {
      const { xchangeJobGroups: xchangeJobGroupList } = jobGroupListData;
      setXchangeJobGroups(xchangeJobGroupList);
    }
  }, [jobGroupListData, isLoadingListJobGroup]);

  const selectedWeekly = () => (
    <Spacing margin={{ top: 'double', bottom: 'normal' }}>
      <Stack horizontal={true} horizontalAlign="space-between">
        {everyDay.map((day, indexDay) => (
          <CircleSchedule
            id={`${day}__${indexDay}`}
            label={day.label}
            selected={currentDaySelected[day.label]}
            onClick={() => {
              setCurrentDaySelected(
                {
                  ...currentDaySelected, [day.label]: !currentDaySelected[day.label],
                },
              );
              handleDays(!currentDaySelected[day.label], day.value);
            }}
            key={indexDay}
          />
        ))}
      </Stack>
    </Spacing>
  );

  const firstMonth = everyMonth.filter((_value, i) => i < 6);
  const lastMonth = everyMonth.filter((_value, i) => i > 5);

  const selectedMonthly = () => (
    <Spacing margin={{ top: 'double', bottom: 'normal' }}>
      <Stack horizontal={true} horizontalAlign="space-between">
        {firstMonth.map((month, indexMonth) => (
          <CircleSchedule
            id={`${month.value}__${indexMonth}`}
            label={month.label}
            selected={currentMonthSelected[month.label]}
            onClick={() => {
              setCurrentMonthSelected(
                {
                  ...currentMonthSelected, [month.label]: !currentMonthSelected[month.label],
                },
              );
              handleMonths(!currentMonthSelected[month.label], month.value);
            }}
            key={indexMonth}
          />
        ))}
      </Stack>
      <Spacing margin={{ top: 'normal' }} />
      <Stack horizontal={true} horizontalAlign="space-between">
        {lastMonth.map((month, indexMonth) => (
          <CircleSchedule
            id={`${month.value}__${indexMonth}`}
            label={month.label}
            selected={currentMonthSelected[month.label]}
            onClick={() => {
              setCurrentMonthSelected(
                {
                  ...currentMonthSelected, [month.label]: !currentMonthSelected[month.label],
                },
              );
              handleMonths(!currentMonthSelected[month.label], month.value);
            }}
            key={indexMonth}
          />
        ))}
      </Stack>
    </Spacing>
  );

  const saveSchedule = () => {
    const subscriberSids = totalSubscribers.map((subSids) => subSids.sid);
    let endHour: number | undefined;
    let endMinute: number | undefined;
    if (scheduleTime) {
      endHour = +scheduleTime.split(',')[0];
      endMinute = +scheduleTime.split(',')[1];
    }

    let frecuency = scheduleFrequency.toLocaleLowerCase();
    frecuency = frecuency.charAt(0).toUpperCase() + frecuency.slice(1);
    if (frecuency.includes('_')) frecuency = 'InGroup';

    const endRDay = handleLastValue(endRelativeDay);
    const endOday = handleLastValue(endDayOrdinal);
    const silenceSMonth = handleLastValue(silenceStartMonth);
    const silenceEMonth = handleLastValue(silenceEndMonth);

    const scheduleValues = {
      frequency: ScheduleFrequency[frecuency],
      scheduleType: scheduleType === ScheduleType.ExpectedToRun
        ? ScheduleType.ExpectedToRun : ScheduleType.NotScheduled,
      months,
      days,
      xchangeJobGroupSid,
      endDayOfMonth: !endDayOfMonth ? undefined : +endDayOfMonth,
      endDayOrdinal: DayOrdinal[endOday],
      endRelativeDay: RelativeDay[endRDay],
      endHour,
      endMinute,
      timezone: scheduleTimezone,
      subscriberSids,
      hasSilencePeriod,
      silenceStartMonth: Month[silenceSMonth],
      silenceStartDay: !silenceStartDay ? undefined : +silenceStartDay,
      silenceEndMonth: Month[silenceEMonth],
      silenceEndDay: !silenceEndDay ? undefined : +silenceEndDay,
    };

    if (schedule) {
      scheduleUpdate({
        variables: {
          scheduleInput: {
            xchangeConfigSid: xchangeConfigSid ?? '',
            schedule: scheduleValues,
          },
        },
      });
    }
    if (!schedule && !xchangeJobGroupSid) {
      if (jobGroupName.trim() !== '') {
        createJobGroup({
          variables: {
            jobGroupInput: {
              name: jobGroupName,
              orgSid,
              schedule: scheduleValues,
            },
          },
        });
      }
    }
    if (!schedule && xchangeJobGroupSid) {
      if (jobGroupName.trim() !== '') {
        updateJobGroup({
          variables: {
            jobGroupInput: {
              sid: xchangeJobGroupSid ?? '',
              name: jobGroupName,
              schedule: scheduleValues,
            },
          },
        });
      }
    }
  };

  const renderUiField = (type: string) => {
    if (schedule && xchangeSchedule) {
      return xchangeSchedule[type];
    }

    if (xchangeJobGroup) {
      return xchangeJobGroup[type];
    }

    return null;
  };

  const selectedCompletedTime = () => (
    <Spacing margin={{ top: 'normal' }}>
      <Row>
        <Column lg="4">
          <Text style={{ marginTop: '8px' }}>To be completed by</Text>
        </Column>
        <Column lg="2">
          <UITimeSelectOneField
            id="scheduleSelectTime"
            uiFieldHour={xchangeSchedule?.endHour}
            uiFieldMinute={xchangeSchedule?.endMinute}
            value={scheduleTime}
            onChange={(_newValue) => setScheduleTime(_newValue ?? '')}
          />
        </Column>
        <Column lg="6">
          <Spacing margin={{ left: 'normal' }}>
            <UIFlatSelectOneField
              id="scheduleTimezone"
              uiField={renderUiField('timezone')}
              value={scheduleTimezone}
              options={options}
              onChange={(_newValue) => setScheduleTimeZone(_newValue ?? '')}
            />
          </Spacing>
        </Column>
      </Row>
    </Spacing>
  );

  const renderTopBody = () => {
    if (isLoadingForm || isLoadingJobGroup) {
      return (
        <Spacing margin={{ top: 'double' }}>
          <Spinner size={SpinnerSize.large} label="Loading schedule panel" />
        </Spacing>
      );
    }
    return (
      <>
        <Row>
          {!schedule && (
          <Spacing margin={{ bottom: 'normal' }}>
            <Column>
              <UIInputText
                id="jobGroupName"
                value={jobGroupName}
                uiField={xchangeJobGroup?.name}
                onChange={(event, _newValue) => setJobGroupName(_newValue ?? '')}
              />
            </Column>
          </Spacing>
          )}
        </Row>
        <Row>
          <Column lg="4">
            <UIFlatSelectOneField
              id="scheduleType"
              uiField={renderUiField('scheduleType')}
              options={options}
              value={scheduleType}
              onChange={(_newValue) => setScheduleType(_newValue ?? '')}
            />
          </Column>
          {scheduleType !== 'NOT_SCHEDULED' && !isLoadingForm && (
          <Column lg="4">
            <UIFlatSelectOneField
              id="scheduleFrequency"
              uiField={renderUiField('frequency')}
              options={options}
              value={scheduleFrequency}
              onChange={(_newValue) => setScheduleFrequency(_newValue ?? '')}
            />
          </Column>
          )}
        </Row>
      </>
    )
  };

  const renderJobGroupList = () => {
    if (isLoadingListJobGroup) {
      return (
        <Spacing margin={{ top: 'double' }}>
          <Spinner size={SpinnerSize.large} label="Loading job group list" />
        </Spacing>
      );
    }
    const scheduleTooltiphost = (currentSchedule?: XchangeSchedule) => (
      <>
        <Stack horizontal>
          <FontIcon
            iconName="CalendarMirrored"
            style={{
              fontSize: '10px',
              fontWeight: 600,
              marginTop: '1px',
              paddingRight: '8px',
            }}
          />
          <StyledText>{currentSchedule?.scheduleType}</StyledText>
        </Stack>
        <Stack>
          <StyledText>{currentSchedule?.expectedRunSchedule}</StyledText>
          <StyledText>{currentSchedule?.expectedCompletionTime}</StyledText>
        </Stack>
      </>
    );

    if (xchangeJobGroups?.nodes && xchangeJobGroups.nodes?.length > 0) {
      return (
        <Spacing margin={{ top: 'double' }}>
          <ChoiceGroup
            options={
              xchangeJobGroups.nodes.map((jobGroup, indexJobGroup) => ({
                key: `${jobGroup.name}-${indexJobGroup}`,
                text: jobGroup.name ?? '',
                onRenderLabel: () => (
                  <Spacing margin={{ left: 'double' }} key={`${jobGroup.name}-label-${indexJobGroup}`}>
                    <Text style={{ marginRight: '10px' }}>{jobGroup.name}</Text>
                    <TooltipHost
                        directionalHint={DirectionalHint.rightCenter}
                        content={scheduleTooltiphost(jobGroup.schedule)}
                    >
                      <FontIcon
                        iconName="Info"
                        style={{
                          fontSize: '12px',
                          color: '#121829',
                          fontWeight: 700,
                          cursor: 'pointer',
                        }}
                      />
                    </TooltipHost>
                  </Spacing>
                ),
                onRenderField: (props, render) => (
                  <>
                    {render!(props)}
                    <StyledXchanges>
                      {jobGroup.includedExchanges.map((xchange, indexXchange) => (
                        <li key={`${xchange}-${indexXchange}`}>{xchange}</li>
                      ))}
                    </StyledXchanges>
                  </>
                ),
              }))
            }
          />
        </Spacing>
      );
    }

    return (
      <EmptyState
        description="There are no configured Job Groups"
      />
    );
  };

  const renderBody = () => {
    if (!isLoadingForm || !isLoadingJobGroup) {
      return (
        <>
          {scheduleFrequency === ScheduleFrequency.Weekly && (
            <>
              {selectedWeekly()}
              {selectedCompletedTime()}
            </>
          )}
          {scheduleFrequency === ScheduleFrequency.Monthly && (
            <>
              {selectedMonthly()}
              <Spacing margin={{ top: 'normal' }}>
                <Row>
                  <Column lg="4" right={!schedule}>
                    <Text style={{ marginTop: '8px' }}>
                      {!schedule ? 'On' : 'To be completed by'}
                    </Text>
                  </Column>
                  <ChoiceGroup
                    style={{ paddingBottom: '20px' }}
                    defaultSelectedKey="singleDay"
                    options={[
                      {
                        key: 'singleDay',
                        text: '',
                        onRenderLabel: (props) => (
                          <Spacing margin={{ left: 'double' }}>
                            <Stack horizontal horizontalAlign='space-around'>
                              <UIFlatSelectOneField
                                id="scheduleSelectTime"
                                uiField={renderUiField('endDayOfMonth')}
                                options={options}
                                value={endDayOfMonth}
                                disabled={!props?.checked}
                                onChange={(_newValue) => setEndDayOfMonth(_newValue ?? '')}
                                optionNumber={true}
                              />
                              <Text style={{ marginTop: '8px' }}>Day</Text>
                            </Stack>
                          </Spacing>
                        ),
                      },
                      {
                        key: 'relOrdDay',
                        text: '',
                        onRenderLabel: (props) => (
                          <Spacing margin={{ left: 'double' }}>
                            <Stack horizontal horizontalAlign="space-around">
                              <UIFlatSelectOneField
                                id="scheduleSelectTime"
                                uiField={renderUiField('endDayOrdinal')}
                                value={endDayOrdinal}
                                options={options}
                                disabled={!props?.checked}
                                onChange={(_newValue) => setEndDayOrdinal(_newValue ?? '')}
                              />
                              <UIFlatSelectOneField
                                id="scheduleSelectTime"
                                uiField={renderUiField('endRelativeDay')}
                                value={endRelativeDay}
                                options={options}
                                disabled={!props?.checked}
                                onChange={(_newValue) => setEndRelativeDay(_newValue ?? '')}
                              />
                            </Stack>
                          </Spacing>
                        ),
                      },
                    ]}
                  />
                </Row>
              </Spacing>
              {!schedule && selectedCompletedTime()}
            </>
          )}
          <Stack.Item>
            <Spacing margin={{ top: 'double' }}>
              <FontIcon iconName="Ringer" style={{ marginTop: '50px', fontWeight: 'bold' }} />
              <Text style={{ fontWeight: 'bold', paddingLeft: '5px' }}>Alert if not delivered by expected day</Text>
            </Spacing>
          </Stack.Item>
          <Row>
            <Column>
              <SubscribersList
                currentSubscribers={totalSubscribers}
                totalSubscribers={setTotalSubscribers}
                title={false}
              />
            </Column>
          </Row>
          <ButtonAction onClick={() => setAddSubscriberModal(true)} iconName="add">
            Add person to be notified
          </ButtonAction>
          <Spacing margin={{ top: 'normal', bottom: 'normal', left: 'normal' }}>
            <Checkbox
              label={hasSilencePeriodLabel}
              checked={hasSilencePeriod}
              onChange={() => {
                setHasSilencePeriod((prevState) => !prevState);
              }}
            />
          </Spacing>
          <Row>
            <Spacing margin={{ left: 'normal' }}>
              {hasSilencePeriod && (
                <Stack horizontal={true}>
                  <Column md="12" lg="2">
                    <UIFlatSelectOneField
                      id="scheduleStartMonth"
                      uiField={renderUiField('silenceStartMonth')}
                      value={silenceStartMonth}
                      options={options}
                      onChange={(_newValue) => setSilenceStartMonth(_newValue ?? '')}
                    />
                  </Column>
                  <Column md="12" lg="3">
                    <UIFlatSelectOneField
                      id="scheduleStartDay"
                      uiField={renderUiField('silenceStartDay')}
                      value={silenceStartDay}
                      options={options}
                      onChange={(_newValue) => setSilenceStartDay(_newValue ?? '')}
                      optionNumber={true}
                    />
                  </Column>
                  <Column md="12" lg="2">
                    <span
                      style={{
                        marginTop: '10px',
                        marginRight: '40px',
                      }}
                    > to
                    </span>
                  </Column>
                  <Column md="12" lg="2">
                    <UIFlatSelectOneField
                      id="scheduleLastMonth"
                      uiField={renderUiField('silenceEndMonth')}
                      value={silenceEndMonth}
                      options={options}
                      onChange={(_newValue) => setSilenceEndMonth(_newValue ?? '')}
                    />
                  </Column>
                  <Column md="12" lg="3">
                    <UIFlatSelectOneField
                      id="scheduleLastDay"
                      uiField={renderUiField('silenceEndDay')}
                      value={silenceEndDay}
                      options={options}
                      onChange={(_newValue) => setSilenceEndDay(_newValue ?? '')}
                      optionNumber={true}
                    />
                  </Column>
                </Stack>
              )}
            </Spacing>
          </Row>
          {!schedule && (
          <Spacing margin={{ top: 'normal' }}>
            <Stack>
              <Text style={{ fontWeight: 'bolder' }}>Xchange porcessed in this groups</Text>
              {xchangeProcessed && xchangeProcessed.length > 0 ? (
                xchangeProcessed?.map((xchange, indexXchange) => (
                  <Text key={indexXchange}>{xchange}</Text>
                ))
              ) : (
                <EmptyMessage>
                  {'<none>'}
                </EmptyMessage>
              )}
            </Stack>
          </Spacing>
          )}
        </>
      );
    }
    return null;
  };

  const renderPanelHeader = () => (
    <PanelHeader id="__FileTransmission_PanelHeader">
      <Container>
        <Row>
          <Column lg="4">
            <Stack horizontal styles={{ root: { height: 44, marginTop: '5px' } }}>
              <PanelTitle id="__FileTransmission_Panel_Title" variant="bold" size="large">
                {schedule ? 'Schedule' : 'Job Group'}
              </PanelTitle>
            </Stack>
          </Column>
        </Row>
      </Container>
    </PanelHeader>
  );

  const renderPanelFooter = () => (
    <>
      <PrimaryButton style={{ marginLeft: '20px' }} id="__Schedule_Button" onClick={saveSchedule}>
        Save
      </PrimaryButton>
      {!schedule && xchangeConfigSid && (
        <DefaultButton
          style={{ marginLeft: '20px' }}
          id="deleteSchedule"
          text="Delete"
        />
      )}
    </>
  );

  return (
    <ThemedPanel
      closeButtonAriaLabel="Close"
      type={PanelType.medium}
      onRenderHeader={renderPanelHeader}
      isOpen={isPanelOpen}
      onRenderFooterContent={renderPanelFooter}
      onDismiss={() => {
        setCurrentMonthSelected(DefaulMonthsProps);
        setCurrentDaySelected(DefaulDaysProps);
        setTotalSubscribers([]);
        setMessage(null);
        closePanel(false);
      }}
    >
      <PanelBody>
        <Container>
          {message && (
          <Spacing margin={{ bottom: 'normal' }}>
            <MessageBar
              id="__OrgPanel_Msg"
              messageBarType={messageType}
              isMultiline
              onDismiss={() => setMessage(undefined)}
            >
              {message}
            </MessageBar>
          </Spacing>
          )}
          {renderTopBody()}
          {scheduleType !== ScheduleType.NotScheduled && scheduleType !== '' && (
            <>
              {ScheduleFrequency.InGroup === scheduleFrequency ? (
                <>
                  {renderJobGroupList()}
                  <Spacing margin={{ top: 'normal' }}>
                    <ButtonLink
                      underline
                      onClick={() => {
                        setSchedule((prevState) => !prevState);
                        fethJobGroupData();
                      }}
                    >
                      Create a new Job Group
                    </ButtonLink>
                  </Spacing>
                </>
              ) : (
                renderBody()
              )}
            </>
          )}
        </Container>
      </PanelBody>
      {addSubscriberModal && (
        <AddSubscriberModal
          isOpen={setAddSubscriberModal}
          orgSid={orgSid}
          currentSubscribers={totalSubscribers}
          addSubscribers={setTotalSubscribers}
        />
      )}
    </ThemedPanel>
  );
};

export { SchedulePanel };
