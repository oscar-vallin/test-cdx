import { useState, useEffect } from 'react';
import {
  XchangeSchedule,
  useXchangeScheduleFormLazyQuery,
  useUpdateXchangeScheduleMutation,
  XchangeScheduleForm,
  ScheduleFrequency,
  UiOption,
  Month,
  DayOrdinal,
  RelativeDay,
  DayOfWeek,
  ScheduleType,
} from 'src/data/services/graphql';
import {
  PanelBody,
  ThemedPanel,
} from 'src/layouts/Panels/Panels.styles';
import {
  Checkbox,
  ChoiceGroup,
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
import { SubscriberOptionProps } from '../../XchangeAlerts/XchangeAlertsPanel/XchangeAlertsPanel';

type ScheduleProps = {
    isPanelOpen: boolean;
    closePanel: (data: boolean) => void;
    dataSchedule?: XchangeSchedule,
    xchangeConfigSid: string,
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
  isPanelOpen, closePanel, xchangeConfigSid,
}: ScheduleProps) => {
  const { orgSid } = useOrgSid();
  const Toast = useNotification();
  const [xchangeSchedule, setXchangeSchedule] = useState<XchangeScheduleForm | null>();
  const [currentDaySelected, setCurrentDaySelected] = useState<DaysProps>(DefaulDaysProps);
  const [currentMonthSelected, setCurrentMonthSelected] = useState<MonthsProps>(DefaulMonthsProps);
  const [days, setDays] = useState<DayOfWeek[]>([]);
  const [months, setMonths] = useState<Month[]>([]);
  const [everyMonth, setEveryMonth] = useState<UiOption[]>([]);
  const [everyDay, setEveryDay] = useState<UiOption[]>([]);
  const [totalSubscribers, setTotalSubscribers] = useState<SubscriberOptionProps[]>([]);
  const [addSubscriberModal, setAddSubscriberModal] = useState(false);
  const [hasSilencePeriod, setHasSilencePeriod] = useState(false);
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
  const [refreshPanel, setRefreshPanel] = useState(false);

  const [
    scheduleForm, { data: formData, loading: isLoadingForm },
  ] = useXchangeScheduleFormLazyQuery();

  const [
    scheduleUpdate,
    { data: updateData, loading: isLoadingUpdate, error: updateError },
  ] = useUpdateXchangeScheduleMutation();

  const fethData = () => {
    scheduleForm({
      variables: {
        xchangeConfigSid,
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

  useEffect(() => {
    if (isPanelOpen) {
      setRefreshPanel(false);
      fethData();
    }
  }, [isPanelOpen, refreshPanel]);

  useEffect(() => {
    if (!isLoadingForm && formData) {
      const { xchangeScheduleForm } = formData;
      setXchangeSchedule(xchangeScheduleForm);
      if (xchangeScheduleForm?.subscribers.value
        && xchangeScheduleForm.subscribers.value.length > 0) {
        subscribersList(xchangeScheduleForm.subscribers.value)
      }
      setScheduleFrequency(xchangeScheduleForm?.frequency.value?.value ?? '');
      setScheduleType(xchangeScheduleForm?.scheduleType.value?.value ?? '');
      setHasSilencePeriod(xchangeScheduleForm?.hasSilencePeriod?.value ?? true);
      const monthsValues = xchangeScheduleForm?.options?.find((m) => m.key === 'Month');
      const daysValues = xchangeScheduleForm?.options?.find((d) => d.key === 'DayOfWeek');
      setEveryMonth(monthsValues?.values ?? []);
      setEveryDay(daysValues?.values ?? []);
    }
  }, [formData, isLoadingForm]);

  useEffect(() => {
    if (!isLoadingUpdate && updateData) {
      setRefreshPanel(true);
      Toast.success({ text: 'Schedule Updated' });
    }
  }, [updateData, isLoadingUpdate, updateError]);

  const handleMonths = (selectedMonth: boolean, month: string, end?: boolean) => {
    let currentMonth = month.toLocaleLowerCase();
    currentMonth = currentMonth.charAt(0).toUpperCase() + currentMonth.slice(1);
    if (selectedMonth) {
      setMonths((prevState) => prevState.concat(Month[currentMonth]));
      return;
    }
    setMonths((prevState) => prevState.filter((m) => m !== month));

    if (end) {
      setSilenceEndMonth(currentMonth);
    } else {
      setSilenceStartMonth(currentMonth);
    }
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
    let type = '';
    let frecuency = scheduleFrequency.toLocaleLowerCase();
    frecuency = frecuency.charAt(0).toUpperCase() + frecuency.slice(1);
    if (frecuency.includes('_')) frecuency = 'InGroup';
    // eslint-disable-next-line no-unused-expressions
    type === 'NotScheduled' ? type = 'NotScheduled' : type = 'ExpectedToRun';
    scheduleUpdate({
      variables: {
        scheduleInput: {
          xchangeConfigSid,
          schedule: {
            frequency: ScheduleFrequency[frecuency],
            scheduleType: ScheduleType[type],
            months,
            days,
            endDayOfMonth: !endDayOfMonth ? undefined : +endDayOfMonth,
            endDayOrdinal: DayOrdinal[endDayOrdinal],
            endRelativeDay: RelativeDay[endRelativeDay],
            endHour,
            endMinute,
            timezone: scheduleTimezone,
            subscriberSids,
            hasSilencePeriod,
            silenceStartMonth: Month[silenceStartMonth],
            silenceStartDay: !silenceStartDay ? undefined : +silenceStartDay,
            silenceEndMonth: Month[silenceEndMonth],
            silenceEndDay: !silenceEndDay ? undefined : +silenceEndDay,
          },
        },
      },
    });
  }

  const renderBody = () => {
    if (isLoadingForm) {
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
                    placeholder="time"
                    onChange={(_newValue) => setScheduleTime(_newValue ?? '')}
                  />
                </Column>
                <Column lg="5">
                  <Spacing margin={{ left: 'normal' }}>
                    <UIFlatSelectOneField
                      id="scheduleTimezone"
                      uiField={xchangeSchedule?.timezone}
                      options={xchangeSchedule?.options}
                      placeholder="timezone"
                      onChange={(_newValue) => setScheduleTimeZone(_newValue ?? '')}
                    />
                  </Spacing>
                </Column>
              </Row>
            </Spacing>
          </>
        )}
        {scheduleFrequency === ScheduleFrequency.Monthly && (
          <>
            {selectedMonthly()}
            <Spacing margin={{ top: 'normal' }}>
              <Row>
                <Column lg="4">
                  <Text style={{ marginTop: '8px' }}>To be completed by</Text>
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
                    uiField={xchangeSchedule?.endDayOfMonth}
                    options={xchangeSchedule?.options}
                    disabled={!toBeCompletedMonthy}
                    placeholder="day"
                    onChange={(_newValue) => setEndDayOfMonth(_newValue ?? '')}
                  />
                  <span style={{ marginTop: '5px' }} />
                  <UIFlatSelectOneField
                    id="scheduleSelectTime"
                    uiField={xchangeSchedule?.endDayOrdinal}
                    options={xchangeSchedule?.options}
                    placeholder="Ord"
                    disabled={toBeCompletedMonthy}
                    onChange={(_newValue) => {
                      if (_newValue === 'FIRST') {
                        setEndDayOrdinal('First');
                      } else if (_newValue === 'SECOND') {
                        setEndDayOrdinal('Second')
                      } else if (_newValue === 'THIRD') {
                        setEndDayOrdinal('Third')
                      } else {
                        setEndDayOrdinal('Last');
                      }
                    }}
                  />
                </Column>
                <Column lg="4">
                  <Text style={{ marginTop: '10px', marginBottom: '8px' }}>Day</Text>
                  <UIFlatSelectOneField
                    id="scheduleSelectTime"
                    uiField={xchangeSchedule?.endRelativeDay}
                    options={xchangeSchedule?.options}
                    placeholder="Day"
                    disabled={toBeCompletedMonthy}
                    onChange={(_newValue) => handleDays(false, _newValue ?? '')}
                  />
                </Column>
              </Row>
            </Spacing>
          </>
        )}
        <Stack.Item>
          <Spacing margin={{ top: 'double' }}>
            <FontIcon iconName="Ringer" style={{ marginTop: '50px', fontWeight: 'bold' }} />
            <Text style={{ fontWeight: 'bold', paddingLeft: '5px' }}>Alert if not delivered by expected day</Text>
          </Spacing>
        </Stack.Item>
        <SubscribersList
          currentSubscribers={totalSubscribers}
          totalSubscribers={setTotalSubscribers}
          title={false}
        />
        <ButtonAction onClick={() => setAddSubscriberModal(true)} iconName="add">
          Add person to be notified
        </ButtonAction>
        <Spacing margin={{ top: 'normal', bottom: 'normal', left: 'normal' }}>
          <Checkbox
            label={xchangeSchedule?.hasSilencePeriod?.label}
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
                <Column lg="2">
                  <UIFlatSelectOneField
                    id="scheduleStartMonth"
                    uiField={xchangeSchedule?.silenceStartMonth}
                    options={xchangeSchedule?.options}
                    placeholder="month"
                    onChange={(_newValue) => handleMonths(false, _newValue ?? '', false)}
                  />
                </Column>
                <Column lg="1">
                  <UIFlatSelectOneField
                    id="scheduleStartDay"
                    uiField={xchangeSchedule?.silenceStartDay}
                    options={xchangeSchedule?.options}
                    placeholder="day"
                    onChange={(_newValue) => setSilenceStartDay(_newValue ?? '')}
                  />
                </Column>
                <Column lg="2">
                  <span style={{ marginTop: '10px', marginLeft: '35px' }}> to</span>
                </Column>
                <Column lg="2">
                  <UIFlatSelectOneField
                    id="scheduleLastMonth"
                    uiField={xchangeSchedule?.silenceEndMonth}
                    options={xchangeSchedule?.options}
                    placeholder="month"
                    onChange={(_newValue) => handleMonths(false, _newValue ?? '', true)}
                  />
                </Column>
                <Column lg="1">
                  <UIFlatSelectOneField
                    id="scheduleLastDay"
                    uiField={xchangeSchedule?.silenceEndDay}
                    options={xchangeSchedule?.options}
                    placeholder="day"
                    onChange={(_newValue) => setSilenceEndDay(_newValue ?? '')}
                  />
                </Column>
              </Stack>
            )}
          </Spacing>
        </Row>
      </>
    );
  };

  const renderPanelFooter = () => (
    <PrimaryButton id="__Schedule_Button" onClick={saveSchedule}>
      Save
    </PrimaryButton>
  );

  return (
    <ThemedPanel
      closeButtonAriaLabel="Close"
      type={PanelType.medium}
      headerText="Schedule"
      isOpen={isPanelOpen}
      onRenderFooterContent={renderPanelFooter}
      onDismiss={() => {
        closePanel(false);
      }}
    >
      <PanelBody>
        <Container>
          <Row>
            <Column lg="4">
              <UIFlatSelectOneField
                id="scheduleType"
                uiField={xchangeSchedule?.scheduleType}
                options={xchangeSchedule?.options}
                placeholder="Select a type"
                value={scheduleType}
                onChange={(_newValue) => setScheduleType(_newValue ?? '')}
              />
            </Column>
            {scheduleType !== 'NOT_SCHEDULED' && !isLoadingForm && (
            <Column lg="4">
              <UIFlatSelectOneField
                id="scheduleFrequency"
                uiField={xchangeSchedule?.frequency}
                options={xchangeSchedule?.options}
                placeholder="Select a frecuency"
                value={scheduleFrequency}
                onChange={(_newValue) => setScheduleFrequency(_newValue ?? '')}
              />
            </Column>
            )}
          </Row>
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
