export const STATUSES_DEFAULT = { label: '', value: '' };

export const STATUSES = [
  { label: 'Queued', value: 'QUEUED' },
  { label: 'Processing', value: 'PROCESSING' },
  { label: 'Complete', value: 'COMPLETE' },
  { label: 'Error', value: 'ERROR' },
  { label: 'Submitted', value: 'SUBMITTED' },
  { label: 'Warning', value: 'WARNING' },
  { label: 'Hold', value: 'HOLD' },
  { label: 'Canceled', value: 'CANCELED' },
  { label: 'Quality Check Failed', value: 'QUALITY_CHECK_FAILED' },
  { label: 'No Records', value: 'NO_RECORDS' },
  { label: 'Tech migration Check Failed', value: 'TECH_MIGRATION_CHECK_FAILED' },
];

const STEP_RECEIVE = 'ENQUEUE_EXTRACT';
const STEP_TRANSFORM = 'TRANSFORM_EXTRACT';
const STEP_TRANSMIT = 'TRANSMIT_FILE';

export const STEP_COLOR_GREEN = '#29c891';
export const STEP_COLOR_YELLOW = '#e5d64f';
export const STEP_COLOR_NONE = 'transparent';
export const STEP_COLOR_BLUE = '#2F80ED';
export const STEP_COLOR_PURPLE = '#A333C8';
export const STEP_COLOR_CYAN = '#56CCF2';
export const STEP_COLOR_RED = '#EB5757';

export const STEP_STATUS_DEFAULT = [
  {
    step: STEP_RECEIVE,
    stepStatus: STATUSES_DEFAULT,
    archiveOnly: false,
    colors: [STEP_COLOR_BLUE, STEP_COLOR_NONE, STEP_COLOR_NONE],
  },
  {
    step: STEP_TRANSFORM,
    stepStatus: STATUSES_DEFAULT,
    archiveOnly: false,
    colors: [STEP_COLOR_GREEN, STEP_COLOR_CYAN, STEP_COLOR_NONE],
  },
  {
    step: STEP_TRANSMIT,
    stepStatus: STATUSES_DEFAULT,
    archiveOnly: false,
    colors: [STEP_COLOR_GREEN, STEP_COLOR_GREEN, STEP_COLOR_CYAN],
  },
];

export const STEP_STATUS = [
  {
    step: STEP_RECEIVE,
    stepStatus: STATUSES[2],
    archiveOnly: false,
    colors: [STEP_COLOR_GREEN, STEP_COLOR_NONE, STEP_COLOR_NONE],
  },
  {
    step: STEP_RECEIVE,
    stepStatus: STATUSES[0],
    archiveOnly: false,
    colors: [STEP_COLOR_BLUE, STEP_COLOR_NONE, STEP_COLOR_NONE],
  },
  {
    step: STEP_TRANSFORM,
    stepStatus: STATUSES[1],
    archiveOnly: false,
    colors: [STEP_COLOR_GREEN, STEP_COLOR_PURPLE, STEP_COLOR_NONE],
  },
  {
    step: STEP_TRANSFORM,
    stepStatus: STATUSES[2],
    archiveOnly: false,
    colors: [STEP_COLOR_GREEN, STEP_COLOR_GREEN, STEP_COLOR_NONE],
  },
  {
    step: STEP_TRANSFORM,
    stepStatus: STATUSES[6],
    archiveOnly: false,
    colors: [STEP_COLOR_GREEN, STEP_COLOR_YELLOW, STEP_COLOR_NONE],
  },
  {
    step: STEP_TRANSFORM,
    stepStatus: STATUSES[3],
    archiveOnly: false,
    colors: [STEP_COLOR_GREEN, STEP_COLOR_RED, STEP_COLOR_NONE],
  },
  {
    step: STEP_TRANSMIT,
    stepStatus: STATUSES[2],
    archiveOnly: false,
    colors: [STEP_COLOR_GREEN, STEP_COLOR_GREEN, STEP_COLOR_GREEN],
  },
  {
    step: STEP_TRANSMIT,
    stepStatus: STATUSES[2],
    archiveOnly: true,
    colors: [STEP_COLOR_GREEN, STEP_COLOR_GREEN, STEP_COLOR_BLUE],
  },
  {
    step: STEP_TRANSFORM,
    stepStatus: STATUSES[8],
    archiveOnly: true,
    colors: [STEP_COLOR_GREEN, STEP_COLOR_GREEN, STEP_COLOR_RED],
  },
  {
    step: STEP_TRANSMIT,
    stepStatus: STATUSES[8],
    archiveOnly: true,
    colors: [STEP_COLOR_GREEN, STEP_COLOR_GREEN, STEP_COLOR_BLUE],
  },
];

export const getProgressItemByString = (argStringValues) => {
  const stringVal = argStringValues.split(',');
  const _step = stringVal[0];
  const _stepStatus = stringVal[1];

  return (
    STEP_STATUS.find(({ step, stepStatus }) => step === _step && stepStatus.value === _stepStatus) ??
    STEP_STATUS_DEFAULT.find((step) => step === _step) ??
    STEP_STATUS_DEFAULT[0]
  );
};

export const getColorsByString = (argStringValues) => {
  const xColors = getProgressItemByString(argStringValues);

  return xColors.colors;
};

export const getStepStatusLabel = (stepStatusId) => {
  return STEP_STATUS.find((step) => step?.stepStatus?.value === stepStatusId)?.stepStatus.label;
};

const getStepStatus = (stepId, stepStatusId) => {
  return (
    STEP_STATUS.find(({ step, stepStatus }) => step === stepId && stepStatus.value === stepStatusId) ??
    STEP_STATUS_DEFAULT.find((step) => step === stepId) ??
    STEP_STATUS_DEFAULT[0]
  );
};

export const getProgressByValues = (step, stepStatus) => {
  return getStepStatus(step, stepStatus);
};
