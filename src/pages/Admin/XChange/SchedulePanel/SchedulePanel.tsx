import { useState, useEffect } from 'react';
import {
  XchangeSchedule,
  useXchangeScheduleFormLazyQuery,
  useUpdateXchangeScheduleMutation,
  useXchangeJobGroupFormLazyQuery,
  useCreateXchangeJobGroupMutation,
  useUpdateXchangeJobGroupMutation,
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
} from '@fluentui/react';
import { useOrgSid } from 'src/hooks/useOrgSid';
import { CircleSchedule } from 'src/components/circleSchedule';
import { Spacing } from 'src/components/spacings/Spacing';
import { SubscribersList } from 'src/components/subscribers/SubscribersList';
import { AddSubscriberModal } from 'src/containers/modals/AddSubsciberModal/AddSubscriberModal';
import { ButtonAction } from 'src/components/buttons';
import { UIFlatSelectOneField } from 'src/components/inputs/InputDropdown/UIFlatSelectOneField';
import { Column, Container, Row } from 'src/components/layouts';
import { UITimeSelectOneField } from 'src/components/inputs/InputDropdown/UITimeSelectOneField';
import { useNotification } from 'src/hooks/useNotification';
import { UIInputText } from 'src/components/inputs/InputText';
import { EmptyMessage } from 'src/containers/tables/TableCurrentActivity/TableActivity.styles';
import { SubscriberOptionProps } from '../XchangeAlerts/XchangeAlertsPanel/XchangeAlertsPanel';

type ScheduleProps = {
    isPanelOpen: boolean;
    closePanel: (data: boolean) => void;
    dataSchedule?: XchangeSchedule,
    xchangeConfigSid: string,
    xchangeJobGroupSid?: string;
    refreshPage: (data: boolean) => void;
    schedule?: boolean;
    xchangePorcessed?: string[];
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
  schedule,
  xchangePorcessed,
  xchangeJobGroupSid,
}: ScheduleProps) => {
  const { orgSid } = useOrgSid();
  const Toast = useNotification();
  const [xchangeSchedule, setXchangeSchedule] = useState<XchangeScheduleForm | null>();
  const [xchangeJobGroup, setXchangeJobGroup] = useState<XchangeJobGroupForm | null>();
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
  const [toBeCompletedMonthy, setToBeCompletedMonthy] = useState(true);

  const [
    scheduleForm, { data: formData, loading: isLoadingForm },
  ] = useXchangeScheduleFormLazyQuery();

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
    if (schedule) {
      scheduleForm({
        variables: {
          xchangeConfigSid,
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
    const response = updateData?.updateXchangeSchedule;

    if (updateData) {
      const responseCode = response?.response;
      if (responseCode === GqOperationResponse.Fail) {
        Toast.error({ text: 'Error Updating Schedule' });
      }

      if (responseCode === GqOperationResponse.Success) {
        closePanel(false);
        refreshPage(true);
        Toast.success({ text: 'Schedule Updated' });
      }
    }
  }, [updateData, isLoadingUpdate, updateError]);

  useEffect(() => {
    if (!isLoadingCreateJobGroup && jobGroupCreated) {
      closePanel(false);
      refreshPage(true);
      Toast.success({ text: `Job Group ${jobGroupName} created` });
    }

    if (!isLoadingCreateJobGroup && jobGroupCreatedError) {
      Toast.error({ text: 'Error creating a job group' });
    }
  }, [jobGroupCreated, isLoadingCreateJobGroup, jobGroupCreatedError]);

  useEffect(() => {
    if (!isLoadingUpdateJobGroup && jobGroupUpdated) {
      closePanel(false);
      refreshPage(true);
      Toast.success({ text: `Job Group ${jobGroupName} created` });
    }

    if (!isLoadingUpdateJobGroup && jobGroupUpdatedError) {
      Toast.success({ text: 'Error updating a job group' });
    }
  }, [jobGroupUpdated, isLoadingUpdateJobGroup, jobGroupUpdatedError]);

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
            xchangeConfigSid,
            schedule: scheduleValues,
          },
        },
      });
    }
    if (!schedule && !xchangeConfigSid) {
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
  };

  const renderUiField = (type: string) => {
    if (schedule && xchangeSchedule) {
      return xchangeSchedule[type];
    }

    if (xchangeJobGroup) {
      return xchangeJobGroup[type];
    }

    return null;
  }

  const selectedCompletedTime = () => (
    <Spacing margin={{ top: 'normal' }}>
      <Row>
        <Column lg="3">
          <Text style={{ marginTop: '8px' }}>To be completed by</Text>
        </Column>
        <Column lg="3">
          <UITimeSelectOneField
            id="scheduleSelectTime"
            uiFieldHour={xchangeSchedule?.endHour}
            uiFieldMinute={xchangeSchedule?.endMinute}
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
    if (!isLoadingForm && !isLoadingJobGroup) {
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
                  placeholder="job group name"
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
    }

    return null;
  }

  const renderBody = () => {
    if (isLoadingForm || isLoadingJobGroup) {
      return (
        <Spacing margin={{ top: 'double' }}>
          <Spinner size={SpinnerSize.large} label="Loading schedule panel" />
        </Spacing>
      );
    }

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
                <Column lg="4">
                  <Text style={{ marginTop: '8px' }}>
                    {!schedule ? 'on' : 'To be completed by'}
                  </Text>
                </Column>
                <ChoiceGroup
                  style={{ paddingBottom: '20px' }}
                  defaultSelectedKey="singleDay"
                  options={[
                    { key: 'singleDay', text: '' },
                    { key: 'relOrdDay', text: '' },
                  ]}
                  onChange={() => setToBeCompletedMonthy((prevState) => !prevState)}
                />
                <Column lg="2">
                  <UIFlatSelectOneField
                    id="scheduleSelectTime"
                    uiField={renderUiField('endDayOfMonth')}
                    options={options}
                    value={endDayOfMonth}
                    disabled={!toBeCompletedMonthy}
                    onChange={(_newValue) => setEndDayOfMonth(_newValue ?? '')}
                    optionNumber={true}
                  />
                  <span style={{ marginTop: '5px' }} />
                  <UIFlatSelectOneField
                    id="scheduleSelectTime"
                    uiField={renderUiField('endDayOrdinal')}
                    value={endDayOrdinal}
                    options={options}
                    disabled={toBeCompletedMonthy}
                    onChange={(_newValue) => setEndDayOrdinal(_newValue ?? '')}
                  />
                </Column>
                <Column lg="4">
                  <Text style={{ marginTop: '10px', marginBottom: '8px' }}>Day</Text>
                  <UIFlatSelectOneField
                    id="scheduleSelectTime"
                    uiField={renderUiField('endRelativeDay')}
                    value={endRelativeDay}
                    options={options}
                    disabled={toBeCompletedMonthy}
                    onChange={(_newValue) => setEndRelativeDay(_newValue ?? '')}
                  />
                </Column>
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
                <Column md="12" lg="2">
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
                  <span style={{ marginTop: '10px' }}> to</span>
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
                <Column md="12" lg="1">
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
            {xchangePorcessed && xchangePorcessed.length > 0 ? (
              xchangePorcessed?.map((xchange, indexXchange) => (
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
  };

  const renderPanelHeader = () => (
    <PanelHeader id="__PanelHeader">
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
        closePanel(false);
      }}
    >
      <PanelBody>
        <Container>
          {renderTopBody()}
          {scheduleType !== 'NOT_SCHEDULED' && renderBody()}
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
