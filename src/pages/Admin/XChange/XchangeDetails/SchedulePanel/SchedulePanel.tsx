import { useState, useEffect } from 'react';
import {
  DayOfWeek,
  Month,
  XchangeSchedule,
  useXchangeScheduleFormLazyQuery,
  XchangeScheduleForm,
  ScheduleFrequency,
} from 'src/data/services/graphql';
import {
  PanelBody,
  ThemedPanel,
  WizardBody,
  WizardButtonRow,
} from 'src/layouts/Panels/Panels.styles';
import {
  Checkbox,
  PanelType,
  PrimaryButton,
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
import { SubscriberOptionProps } from '../../XchangeAlerts/XchangeAlertsPanel/XchangeAlertsPanel';

type ScheduleProps = {
    isPanelOpen: boolean;
    closePanel: (data: boolean) => void;
    dataSchedule?: XchangeSchedule,
    xchangeConfigSid: string,
};

const DAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

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
const FIRST_MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'];
const LAST_MONTHS = ['Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

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
  isPanelOpen, closePanel, dataSchedule, xchangeConfigSid,
}: ScheduleProps) => {
  const { orgSid } = useOrgSid();
  const [xchangeSchedule, setXchangeSchedule] = useState<XchangeScheduleForm | null>();
  const [currentDaySelected, setCurrentDaySelected] = useState<DaysProps>(DefaulDaysProps);
  const [currentMonthSelected, setCurrentMonthSelected] = useState<MonthsProps>(DefaulMonthsProps);
  const [days, setDays] = useState<string[]>([]);
  const [months, setMonths] = useState<string[]>([]);
  const [totalSubscribers, setTotalSubscribers] = useState<SubscriberOptionProps[]>([]);
  const [addSubscriberModal, setAddSubscriberModal] = useState(false);
  const [showDateRange, setShowDateRange] = useState(false);
  const [scheduleFrequency, setScheduleFrequency] = useState('');
  const [scheduleType, setScheduleType] = useState('');
  const [scheduleTime, setScheduleTime] = useState('');

  const [
    scheduleForm, { data: formData, loading: isLoadingForm },
  ] = useXchangeScheduleFormLazyQuery()

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
      if (dataSchedule?.subscribers && dataSchedule.subscribers.length > 0) {
        subscribersList(dataSchedule.subscribers);
      }
      fethData();
    }
  }, [isPanelOpen]);

  useEffect(() => {
    if (!isLoadingForm && formData) {
      const { xchangeScheduleForm } = formData;
      console.log(xchangeScheduleForm)
      setXchangeSchedule(xchangeScheduleForm);
      setScheduleFrequency(xchangeScheduleForm?.frequency.value?.value ?? '');
      setScheduleType(xchangeScheduleForm?.scheduleType.value?.value ?? '');
    }
  }, [formData, isLoadingForm]);

  const handleMonths = (selectedMonth: boolean, month: string) => {
    let currentMonth = '';
    switch (month) {
      case 'Jan':
        currentMonth = Month.January;
        break;
      case 'Feb':
        currentMonth = Month.February;
        break;
      case 'Mar':
        currentMonth = Month.March;
        break;
      case 'Apr':
        currentMonth = Month.April;
        break;
      case 'May':
        currentMonth = Month.May;
        break;
      case 'Jun':
        currentMonth = Month.June;
        break;
      case 'Jul':
        currentMonth = Month.July;
        break;
      case 'Aug':
        currentMonth = Month.August;
        break;
      case 'Sep':
        currentMonth = Month.September;
        break;
      case 'Oct':
        currentMonth = Month.October;
        break;
      case 'Nov':
        currentMonth = Month.November;
        break;
      case 'Dec':
        currentMonth = Month.December;
        break;
      default:
        break;
    }
    if (selectedMonth) {
      setMonths((prevState) => prevState.concat(currentMonth));
      return;
    }
    setMonths((prevState) => prevState.filter((m) => m !== currentMonth));
  };

  const handleDays = (selectedDay: boolean, day: string) => {
    let currentDay = '';
    switch (day) {
      case 'Sun':
        currentDay = DayOfWeek.Sunday;
        break;
      case 'Mon':
        currentDay = DayOfWeek.Monday;
        break;
      case 'Tue':
        currentDay = DayOfWeek.Tuesday;
        break;
      case 'Wed':
        currentDay = DayOfWeek.Wednesday;
        break;
      case 'Thu':
        currentDay = DayOfWeek.Thursday;
        break;
      case 'Fri':
        currentDay = DayOfWeek.Friday;
        break;
      case 'Sat':
        currentDay = DayOfWeek.Saturday;
        break;
      default:
        break;
    }
    if (selectedDay) {
      setDays((prevState) => prevState.concat(currentDay));
      return;
    }
    setDays((prevState) => prevState.filter((d) => d !== currentDay));
  };

  const selectedWeekly = () => (
    <Spacing margin={{ top: 'double', bottom: 'normal' }}>
      <Stack horizontal={true} horizontalAlign="space-between">
        {DAYS.map((day, indexDay) => (
          <CircleSchedule
            label={day}
            selected={currentDaySelected[day]}
            onClick={() => {
              setCurrentDaySelected({ ...currentDaySelected, [day]: !currentDaySelected[day] });
              handleDays(!currentDaySelected[day], day);
            }}
            key={indexDay}
          />
        ))}
      </Stack>
    </Spacing>
  );

  const selectedMonthly = () => (
    <Spacing margin={{ top: 'double', bottom: 'normal' }}>
      <Stack horizontal={true} horizontalAlign="space-between">
        {FIRST_MONTHS.map((month, indexMonth) => (
          <CircleSchedule
            label={month}
            selected={currentMonthSelected[month]}
            onClick={() => {
              setCurrentMonthSelected(
                {
                  ...currentMonthSelected, [month]: !currentMonthSelected[month],
                },
              );
              handleMonths(!currentMonthSelected[month], month);
            }}
            key={indexMonth}
          />
        ))}
      </Stack>
      <Spacing margin={{ top: 'normal' }} />
      <Stack horizontal={true} horizontalAlign="space-between">
        {LAST_MONTHS.map((month, indexMonth) => (
          <CircleSchedule
            label={month}
            selected={currentMonthSelected[month]}
            onClick={() => {
              setCurrentMonthSelected(
                {
                  ...currentMonthSelected, [month]: !currentMonthSelected[month],
                },
              );
              handleMonths(!currentMonthSelected[month], month);
            }}
            key={indexMonth}
          />
        ))}
      </Stack>
    </Spacing>
  );

  const saveSchedule = () => {
    console.log(days);
    // console.log(months);
    console.log(scheduleType)
    console.log(scheduleFrequency)
    console.log(scheduleTime)
  }

  const renderBody = () => (
    <PanelBody>
      <WizardBody>
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
          </Row>
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
                      />
                    </Spacing>
                  </Column>
                </Row>
              </Spacing>
            </>
          )}
          {scheduleFrequency === ScheduleFrequency.Monthly && selectedMonthly()}
          <SubscribersList
            currentSubscribers={totalSubscribers}
            totalSubscribers={setTotalSubscribers}
          />
          <ButtonAction onClick={() => setAddSubscriberModal(true)} iconName="add">
            Add person to be notified
          </ButtonAction>
          <Spacing margin={{ top: 'normal', bottom: 'normal', left: 'normal' }}>
            <Checkbox
              label="Do not alert within the timeframe"
              checked={showDateRange}
              onChange={() => {
                setShowDateRange((prevState) => !prevState);
              }}
            />
          </Spacing>
          <Row>
            <Spacing margin={{ left: 'normal' }}>
              {showDateRange && (
                <Stack horizontal={true}>
                  <Column lg="2">
                    <UIFlatSelectOneField
                      id="scheduleStartMonth"
                      uiField={xchangeSchedule?.silenceStartMonth}
                      options={xchangeSchedule?.options}
                      placeholder="month"
                    />
                  </Column>
                  <Column lg="1">
                    <UIFlatSelectOneField
                      id="scheduleStartDay"
                      uiField={xchangeSchedule?.silenceStartDay}
                      options={xchangeSchedule?.options}
                      placeholder="day"
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
                    />
                  </Column>
                  <Column lg="1">
                    <UIFlatSelectOneField
                      id="scheduleLastDay"
                      uiField={xchangeSchedule?.silenceEndDay}
                      options={xchangeSchedule?.options}
                      placeholder="day"
                    />
                  </Column>
                </Stack>
              )}
            </Spacing>
          </Row>
        </Container>
      </WizardBody>
      <WizardButtonRow>
        <PrimaryButton id="__Schedule_Button" onClick={saveSchedule}>
          Save
        </PrimaryButton>
      </WizardButtonRow>
    </PanelBody>
  );

  return (
    <ThemedPanel
      closeButtonAriaLabel="Close"
      type={PanelType.medium}
      headerText="Schedule"
      isOpen={isPanelOpen}
      onDismiss={() => {
        closePanel(false);
      }}
    >
      {renderBody()}
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