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
  WebCommand,
  CdxWebCommandType,
  XchangeJobGroup,
  useDeleteXchangeJobGroupMutation,
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
import { useThemeStore } from 'src/store/ThemeStore';
import { DialogYesNo, DialogYesNoProps } from 'src/containers/modals/DialogYesNo';
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

const defaultDialogProps: DialogYesNoProps = {
  id: '__SchedulePanel_Dlg',
  open: false,
  title: '',
  message: '',
  labelYes: 'Yes',
  labelNo: 'No',
  highlightNo: true,
  highlightYes: false,
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
  const ThemeStore = useThemeStore();
  const [schedule, setSchedule] = useState<boolean>();
  const [xchangeSchedule, setXchangeSchedule] = useState<XchangeScheduleForm | null>();
  const [xchangeJobGroup, setXchangeJobGroup] = useState<XchangeJobGroupForm | null>();
  const [xchangeJobGroups, setXchangeJobGroups] = useState<XchangeJobGroupConnection | null>();
  const [jobGroup, setJobGroup] = useState<XchangeJobGroup>();
  const [options, setOptions] = useState<UiOptions[]>([]);
  const [currentDaySelected, setCurrentDaySelected] = useState<DaysProps>({ ...DefaulDaysProps });
  const [currentMonthSelected, setCurrentMonthSelected] = useState<MonthsProps>({ ...DefaulMonthsProps });
  const [days, setDays] = useState<DayOfWeek[]>([]);
  const [months, setMonths] = useState<Month[]>([]);
  const [jobGroupName, setJobGroupName] = useState('')
  const [updateCmd, setUpdateCmd] = useState<WebCommand | null>();
  const [everyMonth, setEveryMonth] = useState<UiOption[]>([]);
  const [everyDay, setEveryDay] = useState<UiOption[]>([]);
  const [totalSubscribers, setTotalSubscribers] = useState<SubscriberOptionProps[]>([]);
  const [addSubscriberModal, setAddSubscriberModal] = useState(false);
  const [hasSilencePeriod, setHasSilencePeriod] = useState(false);
  const [hasSilencePeriodLabel, setHasSilencePeriodLabel] = useState('')
  const [scheduleFrequency, setScheduleFrequency] = useState('');
  const [scheduleType, setScheduleType] = useState('');
  const [scheduleTime, setScheduleTime] = useState<string | null>('');
  const [scheduleTimezone, setScheduleTimeZone] = useState<string | null>('');
  const [silenceStartMonth, setSilenceStartMonth] = useState<string | null>('');
  const [silenceStartDay, setSilenceStartDay] = useState<string | null>('');
  const [silenceEndMonth, setSilenceEndMonth] = useState<string | null>('');
  const [silenceEndDay, setSilenceEndDay] = useState<string | null>('');
  const [endDayOfMonth, setEndDayOfMonth] = useState<string | null>('');
  const [endDayOrdinal, setEndDayOrdinal] = useState<string | null>('');
  const [endRelativeDay, setEndRelativeDay] = useState<string | null>('');
  const [message, setMessage] = useState<string | null>();
  const [messageType, setMessageType] = useState<MessageBarType>(MessageBarType.info);
  const [showDialog, setShowDialog] = useState(false);
  const [dialogProps, setDialogProps] = useState<DialogYesNoProps>(defaultDialogProps);
  const [unsavedChanges, setUnsavedChanges] = useState(false);

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
    deleteJobGroup,
    { data: jobGroupDeleted, loading: isLoadingDeletedJobGroup, error: jobGroupDeletedError },
  ] = useDeleteXchangeJobGroupMutation();

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

  const subscribersList = (subscribers: UiOption[]) => {
    const showSubs: any[] = [];
    let sub = {};
    for (let subscriber = 0; subscriber < subscribers.length; subscriber++) {
      sub['name'] = subscribers[subscriber].info;
      sub['email'] = subscribers[subscriber].label;
      sub['sid'] = subscribers[subscriber].value;
      showSubs.push(sub);
      sub = {};
    }
    setTotalSubscribers((prevValues) => prevValues.concat(showSubs));
  };

  const handleMonths = (selectedMonth: boolean, month: string) => {
    let currentMonth = month.toLocaleLowerCase();
    setUnsavedChanges(true);
    currentMonth = currentMonth.charAt(0).toUpperCase() + currentMonth.slice(1);
    if (selectedMonth) {
      setMonths((prevState) => prevState.concat(Month[currentMonth]));
      return;
    }
    setMonths((prevState) => prevState.filter((m) => m !== month));
  };

  const handleDays = (selectedDay: boolean, day: string) => {
    let currentDay = day.toLocaleLowerCase();
    setUnsavedChanges(true);
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
        const { label } = month;
        currentMonthSelected[label] = true;
        handleMonths(true, month.value);
      });
      xchangeScheduleForm?.days.value?.forEach((day) => {
        const { label } = day;
        currentDaySelected[label] = true;
        handleDays(true, day.value);
      });
      setUnsavedChanges(false);
      if (xchangeScheduleForm?.subscribers.value
        && xchangeScheduleForm.subscribers.value.length > 0) {
        subscribersList(xchangeScheduleForm.subscribers.value)
      }
      setScheduleFrequency(xchangeScheduleForm?.frequency.value?.value ?? '');
      setScheduleType(xchangeScheduleForm?.scheduleType.value?.value ?? '');
      setScheduleTimeZone(xchangeScheduleForm?.timezone.value?.value ?? '');
      setEndDayOfMonth(xchangeScheduleForm?.endDayOfMonth.value?.value ?? '');
      setEndDayOrdinal(xchangeScheduleForm?.endDayOrdinal.value?.value ?? '');
      setEndRelativeDay(xchangeScheduleForm?.endRelativeDay.value?.value ?? '');
      const hour = xchangeScheduleForm?.endHour.value?.value;
      const minutes = xchangeScheduleForm?.endMinute.value?.value;
      setScheduleTime(`${hour},${minutes}`);
      setHasSilencePeriod(xchangeScheduleForm?.hasSilencePeriod?.value ?? false);
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
        const { label } = month;
        currentMonthSelected[label] = true;
        handleMonths(true, month.value);
      });
      xchangeJobGroupForm?.days.value?.forEach((day) => {
        const { label } = day;
        currentDaySelected[label] = true;
        handleDays(true, day.value);
      });
      setJobGroupName(xchangeJobGroupForm?.name.value ?? '');
      if (xchangeJobGroupForm?.subscribers.value
        && xchangeJobGroupForm.subscribers.value.length > 0) {
        subscribersList(xchangeJobGroupForm.subscribers.value)
      }
      setScheduleFrequency(xchangeJobGroupForm?.frequency.value?.value ?? '');
      setScheduleType(xchangeJobGroupForm?.scheduleType.value?.value ?? '');
      setScheduleTimeZone(xchangeJobGroupForm?.timezone.value?.value ?? '');
      setEndDayOfMonth(xchangeJobGroupForm?.endDayOfMonth.value?.value ?? '');
      setEndDayOrdinal(xchangeJobGroupForm?.endDayOrdinal.value?.value ?? '');
      setEndRelativeDay(xchangeJobGroupForm?.endRelativeDay.value?.value ?? '');
      const hour = xchangeJobGroupForm?.endHour.value?.value;
      const minutes = xchangeJobGroupForm?.endMinute.value?.value;
      setScheduleTime(`${hour},${minutes}`);
      setHasSilencePeriod(xchangeJobGroupForm?.hasSilencePeriod?.value ?? false);
      setHasSilencePeriodLabel(xchangeJobGroupForm?.hasSilencePeriod?.label ?? '');
      const monthsValues = xchangeJobGroupForm?.options?.find((m) => m.key === 'Month');
      const daysValues = xchangeJobGroupForm?.options?.find((d) => d.key === 'DayOfWeek');
      setEveryMonth(monthsValues?.values ?? []);
      setEveryDay(daysValues?.values ?? []);

      if (xchangeJobGroupForm?.commands) {
        const pageCommands = xchangeJobGroupForm.commands;
        const _updateCmd = pageCommands.find((cmd) => cmd.commandType === CdxWebCommandType.Update);
        setUpdateCmd(_updateCmd);
      }
      setUnsavedChanges(false);
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
        setCurrentDaySelected({ ...DefaulDaysProps });
        setCurrentMonthSelected({ ...DefaulMonthsProps });
        setMonths([]);
        setDays([]);
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
    const response = jobGroupCreated?.createXchangeJobGroup;
    if (jobGroupCreated) {
      const responseCode = response?.response;
      const { createXchangeJobGroup } = jobGroupCreated;
      setXchangeJobGroup(createXchangeJobGroup);
      if (responseCode === GqOperationResponse.Fail) {
        const errorMsg = createXchangeJobGroup?.errMsg
          ?? 'Error occurred, please verify the information and try again.';
        setMessageType(MessageBarType.error);
        setMessage(errorMsg);
      }

      if (responseCode === GqOperationResponse.Success) {
        setTotalSubscribers([]);
        setCurrentDaySelected({ ...DefaulDaysProps });
        setCurrentMonthSelected({ ...DefaulMonthsProps });
        setMonths([]);
        setDays([]);
        setMessage(null);
        if (typeSchedule) {
          setSchedule(true);
          setScheduleFrequency('');
          fethData();
          Toast.success({ text: `Job Group ${jobGroupName} created` });
          return;
        }
        closePanel(false);
        refreshPage(true);
        Toast.success({ text: `Job Group ${jobGroupName} created` });
      }
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
        setCurrentDaySelected({ ...DefaulDaysProps });
        setCurrentMonthSelected({ ...DefaulMonthsProps });
        setMonths([]);
        setDays([]);
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
    if (!isLoadingDeletedJobGroup && jobGroupDeleted) {
      setTotalSubscribers([]);
      setCurrentDaySelected({ ...DefaulDaysProps });
      setCurrentMonthSelected({ ...DefaulMonthsProps });
      setMonths([]);
      setDays([]);
      setShowDialog(false);
      setMessage(null);
      closePanel(false);
      refreshPage(true);
      Toast.success({ text: 'Job Group Deleted' });
    }
    if (!isLoadingDeletedJobGroup && jobGroupDeletedError) {
      Toast.error({ text: 'Error deleting job group' });
    }
  }, [jobGroupDeleted, isLoadingDeletedJobGroup, jobGroupDeletedError]);

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

  const hideDialog = () => {
    setShowDialog(false);
  };

  const showUnsavedChangesDialog = () => {
    const updatedDialog = { ...defaultDialogProps };
    updatedDialog.title = 'You have unsaved changes';
    updatedDialog.message = 'Changes made to this Schedule will be discarded?  Are you sure you wish to continue and lose your changes?';

    updatedDialog.onYes = () => {
      hideDialog();
      closePanel(false);
      setCurrentMonthSelected({ ...DefaulMonthsProps });
      setCurrentDaySelected({ ...DefaulDaysProps });
      setMonths([]);
      setDays([]);
      setMessage(null);
      setTotalSubscribers([]);
      setUnsavedChanges(false);
    };
    updatedDialog.onClose = () => {
      hideDialog();
    };
    setDialogProps(updatedDialog);
    setShowDialog(true);
  };

  const deleteJonGroupDialog = () => {
    const updatedDialog = { ...defaultDialogProps };
    updatedDialog.title = 'Delete Job group';
    updatedDialog.message = 'Are you sure you want to delete this Job Group?';

    const sid = xchangeJobGroup?.sid ?? '';

    updatedDialog.onYes = () => {
      deleteJobGroup({
        variables: {
          sid,
        },
      }).then()
    };
    updatedDialog.onNo = () => {
      hideDialog();
    };
    setDialogProps(updatedDialog);
    setShowDialog(true);
  };

  const onPanelClose = () => {
    if (unsavedChanges) {
      showUnsavedChangesDialog();
    } else {
      setCurrentMonthSelected({ ...DefaulMonthsProps });
      setCurrentDaySelected({ ...DefaulDaysProps });
      setUnsavedChanges(false);
      setMonths([]);
      setDays([]);
      setTotalSubscribers([]);
      setMessage(null);
      closePanel(false);
    }
  };

  const saveSchedule = () => {
    let subscriberSids;
    let endHour: number | undefined;
    let endMinute: number | undefined;
    if (scheduleTime) {
      endHour = +scheduleTime.split(',')[0];
      endMinute = +scheduleTime.split(',')[1];
    }

    let frecuency = scheduleFrequency.toLocaleLowerCase();
    frecuency = frecuency.charAt(0).toUpperCase() + frecuency.slice(1);
    if (frecuency.includes('_')) frecuency = 'InGroup';

    const endRDay = handleLastValue(endRelativeDay ?? '');
    const endOday = handleLastValue(endDayOrdinal ?? '');
    const silenceSMonth = handleLastValue(silenceStartMonth ?? '');
    const silenceEMonth = handleLastValue(silenceEndMonth ?? '');
    let scheduleValues;
    if (ScheduleFrequency.InGroup === scheduleFrequency) {
      scheduleValues = {
        frequency: ScheduleFrequency[frecuency],
        scheduleType: ScheduleType.ExpectedToRun,
        months: null,
        days: null,
        endDayOfMonth: null,
        endDayOrdinal: null,
        endRelativeDay: null,
        endHour: null,
        endMinute: null,
        timezone: null,
        subscriberSids,
        hasSilencePeriod,
        silenceStartMonth: null,
        silenceStartDay: null,
        silenceEndMonth: null,
        silenceEndDay: null,
        xchangeJobGroupSid: jobGroup?.sid,
      }
    } else {
      subscriberSids = totalSubscribers.map((subSids) => subSids.sid);
      scheduleValues = {
        frequency: ScheduleFrequency[frecuency],
        scheduleType: scheduleType === ScheduleType.ExpectedToRun
          ? ScheduleType.ExpectedToRun : ScheduleType.NotScheduled,
        months: scheduleFrequency === ScheduleFrequency.Weekly ? null : months,
        days: scheduleFrequency === ScheduleFrequency.Monthly ? null : days,
        xchangeJobGroupSid,
        endDayOfMonth: !endDayOfMonth || scheduleFrequency === ScheduleFrequency.Weekly
          ? null : +endDayOfMonth,
        endDayOrdinal: scheduleFrequency === ScheduleFrequency.Weekly ? null : DayOrdinal[endOday],
        endRelativeDay: scheduleFrequency === ScheduleFrequency.Weekly
          ? null : RelativeDay[endRDay],
        endHour: scheduleFrequency === ScheduleFrequency.Monthly ? null : endHour,
        endMinute: scheduleFrequency === ScheduleFrequency.Monthly ? null : endMinute,
        timezone: scheduleFrequency === ScheduleFrequency.Monthly ? undefined : scheduleTimezone,
        subscriberSids,
        hasSilencePeriod,
        silenceStartMonth: Month[silenceSMonth],
        silenceStartDay: !silenceStartDay ? undefined : +silenceStartDay,
        silenceEndMonth: Month[silenceEMonth],
        silenceEndDay: !silenceEndDay ? undefined : +silenceEndDay,
      };
    }

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
      if (scheduleFrequency === ScheduleFrequency.Monthly) {
        scheduleValues.endHour = endHour;
        scheduleValues.endMinute = endMinute;
        scheduleValues.timezone = scheduleTimezone;
      }
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
    if (!schedule && xchangeJobGroupSid) {
      if (scheduleFrequency === ScheduleFrequency.Monthly) {
        scheduleValues.endHour = endHour;
        scheduleValues.endMinute = endMinute;
        scheduleValues.timezone = scheduleTimezone;
      }
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
            value={scheduleTime ?? ''}
            onChange={(_newValue) => {
              setUnsavedChanges(true);
              setScheduleTime(_newValue ?? '')
            }}
          />
        </Column>
        <Column lg="6">
          <Spacing margin={{ left: 'normal' }}>
            <UIFlatSelectOneField
              id="scheduleTimezone"
              uiField={renderUiField('timezone')}
              value={scheduleTimezone ?? ''}
              options={options}
              onChange={(_newValue) => {
                setUnsavedChanges(true);
                setScheduleTimeZone(_newValue ?? '')
              }}
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
                onChange={(event, _newValue) => {
                  setUnsavedChanges(true);
                  setJobGroupName(_newValue ?? '')
                }}
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
              onChange={(_newValue) => {
                setUnsavedChanges(true);
                setScheduleType(_newValue ?? '')
              }}
            />
          </Column>
          {scheduleType && scheduleType !== 'NOT_SCHEDULED' && (
          <Column lg="4">
            <UIFlatSelectOneField
              id="scheduleFrequency"
              uiField={renderUiField('frequency')}
              options={options}
              value={scheduleFrequency}
              onChange={(_newValue) => {
                setUnsavedChanges(true);
                setScheduleFrequency(_newValue ?? '');
              }}
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
                          color: ThemeStore.userTheme.colors.custom.info,
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
                onClick: () => setJobGroup(jobGroup),
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
                    defaultSelectedKey={endDayOfMonth ? 'singleDay' : 'relOrdDay'}
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
                                value={endDayOfMonth ?? ''}
                                disabled={!props?.checked}
                                onChange={(_newValue) => {
                                  setEndDayOfMonth(_newValue ?? '');
                                  setUnsavedChanges(true);
                                  setEndDayOrdinal(null);
                                  setEndRelativeDay(null);
                                }}
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
                                value={endDayOrdinal ?? ''}
                                options={options}
                                disabled={!props?.checked}
                                onChange={(_newValue) =>{
                                  setEndDayOrdinal(_newValue ?? '');
                                  setUnsavedChanges(true);
                                  setEndDayOfMonth(null);
                                }}
                              />
                              <UIFlatSelectOneField
                                id="scheduleSelectTime"
                                uiField={renderUiField('endRelativeDay')}
                                value={endRelativeDay ?? ''}
                                options={options}
                                disabled={!props?.checked}
                                onChange={(_newValue) => {
                                  setUnsavedChanges(true);
                                  setEndRelativeDay(_newValue ?? '');
                                }}
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
              <FontIcon
                style={{
                  color: ThemeStore.userTheme.colors.black,
                  marginTop: '50px',
                  fontSize: '15px',
                  fontWeight: 'bold',
                  cursor: 'pointer',
                }}
                iconName="Ringer"
              />
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
                if (hasSilencePeriod) {
                  setUnsavedChanges(true);
                }
                setHasSilencePeriod((prevState) => !prevState);
              }}
            />
          </Spacing>
          <Row>
            <Spacing margin={{ left: 'normal' }}>
              {hasSilencePeriod && (
                <Stack horizontal={true}>
                  <Column md="12" lg="3">
                    <UIFlatSelectOneField
                      id="scheduleStartMonth"
                      uiField={renderUiField('silenceStartMonth')}
                      value={silenceStartMonth ?? ''}
                      options={options}
                      onChange={(_newValue) => setSilenceStartMonth(_newValue ?? '')}
                    />
                  </Column>
                  <Column md="12" lg="2">
                    <UIFlatSelectOneField
                      id="scheduleStartDay"
                      uiField={renderUiField('silenceStartDay')}
                      value={silenceStartDay ?? ''}
                      options={options}
                      onChange={(_newValue) => setSilenceStartDay(_newValue ?? '')}
                      optionNumber={true}
                    />
                  </Column>
                  <Column md="12" lg="2">
                    <Text
                      style={{
                        marginTop: '10px',
                        marginLeft: '35px',
                        textAlign: 'center',
                      }}
                    > to
                    </Text>
                  </Column>
                  <Column md="12" lg="3">
                    <UIFlatSelectOneField
                      id="scheduleLastMonth"
                      uiField={renderUiField('silenceEndMonth')}
                      value={silenceEndMonth ?? ''}
                      options={options}
                      onChange={(_newValue) => setSilenceEndMonth(_newValue ?? '')}
                    />
                  </Column>
                  <Column md="12" lg="1">
                    <UIFlatSelectOneField
                      id="scheduleLastDay"
                      uiField={renderUiField('silenceEndDay')}
                      value={silenceEndDay ?? ''}
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
              <Text style={{ fontWeight: 'bolder' }}>Xchange processed in this groups</Text>
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

  const renderSaveButton = () => {
    if (xchangeJobGroup && !schedule) {
      if (xchangeJobGroup.sid && !updateCmd) {
        return null;
      }
      return (
        <PrimaryButton style={{ marginLeft: '20px' }} id="__Schedule_Button" onClick={saveSchedule}>
          Save
        </PrimaryButton>
      );
    }

    return (
      <PrimaryButton style={{ marginLeft: '20px' }} id="__Schedule_Button" onClick={saveSchedule}>
        Save
      </PrimaryButton>
    );
  };

  const renderDeleteJobGroup = () => {
    if (xchangeJobGroup && xchangeJobGroup.sid && !schedule) {
      const xchangesProcessed = !xchangeJobGroup.includedExchanges.length;
      return (
        <>
          <DefaultButton
            style={{ marginLeft: '20px' }}
            id="deleteSchedule"
            text="Delete"
            disabled={!xchangesProcessed}
            onClick={() => {
              setShowDialog(true);
              deleteJonGroupDialog();
            }}
          />
          {!xchangeProcessed && (
            <TooltipHost
              content="A job group can only be deleted if there are no Xchanges processed within the group."
            >
              <FontIcon
                iconName="info"
                style={{
                  marginLeft: '10px',
                  cursor: 'pointer',
                }}
              />
            </TooltipHost>
          )}
        </>
      );
    }

    return null;
  }

  const renderPanelFooter = () => (
    <>
      {renderSaveButton()}
      {renderDeleteJobGroup()}
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
        onPanelClose();
      }}
    >
      <PanelBody>
        <Container>
          {message && (
          <Spacing margin={{ bottom: 'normal' }}>
            <MessageBar
              id="__SchedulePanel_Msg"
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
      <DialogYesNo {...dialogProps} open={showDialog} />
    </ThemedPanel>
  );
};

export { SchedulePanel };
