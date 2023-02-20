import { WorkStatus, WorkStep } from 'src/data/services/graphql';

export const STEP_COLOR_GREEN = '#29c891';
export const STEP_COLOR_YELLOW = '#e5d64f';
export const STEP_COLOR_NONE = 'transparent';
export const STEP_COLOR_BLUE = '#2F80ED';
export const STEP_COLOR_PURPLE = '#A333C8';
export const STEP_COLOR_CYAN = '#56CCF2';
export const STEP_COLOR_RED = '#EB5757';

export type StepStatusSegment = {
  color: string;
  label: string;
};

export type StepStatusType = {
  step: WorkStep;
  stepStatus: WorkStatus;
  label: string;
  archiveOnly: boolean;
  segments: StepStatusSegment[];
};

export const STEP_STATUS_DEFAULT: StepStatusType[] = [
  {
    step: WorkStep.EnqueueExtract,
    stepStatus: WorkStatus.Submitted,
    label: 'Submitted',
    archiveOnly: false,
    segments: [
      { color: STEP_COLOR_BLUE, label: 'Receive' },
      { color: STEP_COLOR_NONE, label: 'Transform' },
      { color: STEP_COLOR_NONE, label: 'Transmit' },
    ],
  },
  {
    step: WorkStep.TransformExtract,
    stepStatus: WorkStatus.Processing,
    label: 'Processing',
    archiveOnly: false,
    segments: [
      { color: STEP_COLOR_GREEN, label: 'Received' },
      { color: STEP_COLOR_CYAN, label: 'Transforming' },
      { color: STEP_COLOR_NONE, label: 'Transmitted' },
    ],
  },
  {
    step: WorkStep.TransmitFile,
    stepStatus: WorkStatus.Processing,
    label: 'Transmitting',
    archiveOnly: false,
    segments: [
      { color: STEP_COLOR_GREEN, label: 'Received' },
      { color: STEP_COLOR_GREEN, label: 'Transformed' },
      { color: STEP_COLOR_CYAN, label: 'Transmitting' },
    ],
  },
];

export const STEP_STATUS: StepStatusType[] = [
  {
    step: WorkStep.EnqueueExtract,
    stepStatus: WorkStatus.Queued,
    label: 'Queued',
    archiveOnly: false,
    segments: [
      { color: STEP_COLOR_BLUE, label: 'Queued' },
      { color: STEP_COLOR_NONE, label: 'Transform' },
      { color: STEP_COLOR_NONE, label: 'Transmit' },
    ],
  },
  {
    step: WorkStep.EnqueueExtract,
    stepStatus: WorkStatus.Processing,
    label: 'Processing',
    archiveOnly: false,
    segments: [
      { color: STEP_COLOR_PURPLE, label: 'Receiving' },
      { color: STEP_COLOR_NONE, label: 'Transform' },
      { color: STEP_COLOR_NONE, label: 'Transmit' },
    ],
  },
  {
    step: WorkStep.TransformExtract,
    stepStatus: WorkStatus.Processing,
    label: 'Processing',
    archiveOnly: false,
    segments: [
      { color: STEP_COLOR_GREEN, label: 'Received' },
      { color: STEP_COLOR_PURPLE, label: 'Transforming' },
      { color: STEP_COLOR_NONE, label: 'Transmit' },
    ],
  },
  {
    step: WorkStep.TransmitFile,
    stepStatus: WorkStatus.Processing,
    label: 'Transmitting File',
    archiveOnly: false,
    segments: [
      { color: STEP_COLOR_GREEN, label: 'Received' },
      { color: STEP_COLOR_GREEN, label: 'Transformed' },
      { color: STEP_COLOR_PURPLE, label: 'Transmitting' },
    ],
  },
  {
    step: WorkStep.TransformExtract,
    stepStatus: WorkStatus.Complete,
    label: 'Transformed',
    archiveOnly: false,
    segments: [
      { color: STEP_COLOR_GREEN, label: 'Received' },
      { color: STEP_COLOR_GREEN, label: 'Transformed' },
      { color: STEP_COLOR_NONE, label: 'Transmit' },
    ],
  },
  {
    step: WorkStep.EnqueueExtract,
    stepStatus: WorkStatus.Complete,
    label: 'Received',
    archiveOnly: false,
    segments: [
      { color: STEP_COLOR_GREEN, label: 'Received' },
      { color: STEP_COLOR_NONE, label: 'Transform' },
      { color: STEP_COLOR_NONE, label: 'Transmit' },
    ],
  },
  {
    step: WorkStep.TransmitFile,
    stepStatus: WorkStatus.Complete,
    label: 'Complete',
    archiveOnly: false,
    segments: [
      { color: STEP_COLOR_GREEN, label: 'Received' },
      { color: STEP_COLOR_GREEN, label: 'Transformed' },
      { color: STEP_COLOR_GREEN, label: 'Transmitted' },
    ],
  },
  {
    step: WorkStep.TransmitFile,
    stepStatus: WorkStatus.Complete,
    label: 'Complete - Archived',
    archiveOnly: true,
    segments: [
      { color: STEP_COLOR_GREEN, label: 'Received' },
      { color: STEP_COLOR_GREEN, label: 'Transformed' },
      { color: STEP_COLOR_BLUE, label: 'Archived' },
    ],
  },
  {
    step: WorkStep.EnqueueExtract,
    stepStatus: WorkStatus.Error,
    label: 'Error',
    archiveOnly: false,
    segments: [
      { color: STEP_COLOR_RED, label: 'Receive' },
      { color: STEP_COLOR_NONE, label: 'Transform' },
      { color: STEP_COLOR_NONE, label: 'Transmit' },
    ],
  },
  {
    step: WorkStep.TransformExtract,
    stepStatus: WorkStatus.Error,
    label: 'Error',
    archiveOnly: false,
    segments: [
      { color: STEP_COLOR_GREEN, label: 'Received' },
      { color: STEP_COLOR_RED, label: 'Transform' },
      { color: STEP_COLOR_NONE, label: 'Transmit' },
    ],
  },
  {
    step: WorkStep.TransmitFile,
    stepStatus: WorkStatus.Error,
    label: 'Error',
    archiveOnly: false,
    segments: [
      { color: STEP_COLOR_GREEN, label: 'Received' },
      { color: STEP_COLOR_GREEN, label: 'Transformed' },
      { color: STEP_COLOR_RED, label: 'Transmit' },
    ],
  },
  {
    step: WorkStep.EnqueueExtract,
    stepStatus: WorkStatus.Submitted,
    label: 'Submitted',
    archiveOnly: false,
    segments: [
      { color: STEP_COLOR_BLUE, label: 'Receive' },
      { color: STEP_COLOR_NONE, label: 'Transform' },
      { color: STEP_COLOR_NONE, label: 'Transmit' },
    ],
  },
  {
    step: WorkStep.EnqueueExtract,
    stepStatus: WorkStatus.Warning,
    label: 'Warning',
    archiveOnly: false,
    segments: [
      { color: STEP_COLOR_YELLOW, label: 'Receive' },
      { color: STEP_COLOR_NONE, label: 'Transform' },
      { color: STEP_COLOR_NONE, label: 'Transmit' },
    ],
  },
  {
    step: WorkStep.TransformExtract,
    stepStatus: WorkStatus.Warning,
    label: 'Warning',
    archiveOnly: false,
    segments: [
      { color: STEP_COLOR_GREEN, label: 'Received' },
      { color: STEP_COLOR_YELLOW, label: 'Transform' },
      { color: STEP_COLOR_NONE, label: 'Transmit' },
    ],
  },
  {
    step: WorkStep.TransmitFile,
    stepStatus: WorkStatus.Warning,
    label: 'Warning',
    archiveOnly: false,
    segments: [
      { color: STEP_COLOR_GREEN, label: 'Received' },
      { color: STEP_COLOR_GREEN, label: 'Transformed' },
      { color: STEP_COLOR_YELLOW, label: 'Transmit' },
    ],
  },
  {
    step: WorkStep.EnqueueExtract,
    stepStatus: WorkStatus.Hold,
    label: 'Hold',
    archiveOnly: false,
    segments: [
      { color: STEP_COLOR_YELLOW, label: 'Received' },
      { color: STEP_COLOR_NONE, label: 'Transform' },
      { color: STEP_COLOR_NONE, label: 'Transmit' },
    ],
  },
  {
    step: WorkStep.TransformExtract,
    stepStatus: WorkStatus.Hold,
    label: 'Hold',
    archiveOnly: false,
    segments: [
      { color: STEP_COLOR_GREEN, label: 'Received' },
      { color: STEP_COLOR_YELLOW, label: 'Transform' },
      { color: STEP_COLOR_NONE, label: 'Transmit' },
    ],
  },
  {
    step: WorkStep.EnqueueExtract,
    stepStatus: WorkStatus.Canceled,
    label: 'Canceled',
    archiveOnly: false,
    segments: [
      { color: STEP_COLOR_RED, label: 'Receive' },
      { color: STEP_COLOR_NONE, label: 'Transform' },
      { color: STEP_COLOR_NONE, label: 'Transmit' },
    ],
  },
  {
    step: WorkStep.TransformExtract,
    stepStatus: WorkStatus.Canceled,
    label: 'Canceled',
    archiveOnly: false,
    segments: [
      { color: STEP_COLOR_GREEN, label: 'Received' },
      { color: STEP_COLOR_RED, label: 'Transform' },
      { color: STEP_COLOR_NONE, label: 'Transmit' },
    ],
  },
  {
    step: WorkStep.TransmitFile,
    stepStatus: WorkStatus.Canceled,
    label: 'Canceled',
    archiveOnly: false,
    segments: [
      { color: STEP_COLOR_GREEN, label: 'Received' },
      { color: STEP_COLOR_GREEN, label: 'Transformed' },
      { color: STEP_COLOR_RED, label: 'Transmit' },
    ],
  },
  {
    step: WorkStep.TransformExtract,
    stepStatus: WorkStatus.QualityCheckFailed,
    label: 'Quality Check Failed',
    archiveOnly: false,
    segments: [
      { color: STEP_COLOR_GREEN, label: 'Received' },
      { color: STEP_COLOR_RED, label: 'Transform' },
      { color: STEP_COLOR_NONE, label: 'Transmit' },
    ],
  },
];

export const getStepStatusLabel = (status: WorkStatus) => {
  switch (status) {
    case WorkStatus.Queued:
      return 'Queued';
    case WorkStatus.Processing:
      return 'Processing';
    case WorkStatus.Complete:
      return 'Complete';
    case WorkStatus.Error:
      return 'Error';
    case WorkStatus.Submitted:
      return 'Submitted';
    case WorkStatus.Warning:
      return 'Warning';
    case WorkStatus.Hold:
      return 'Hold';
    case WorkStatus.Canceled:
      return 'Canceled';
    case WorkStatus.QualityCheckFailed:
      return 'Quality Check Failed';
    case WorkStatus.NoRecords:
      return 'No Records';
    case WorkStatus.TechMigrationCheckFailed:
      return 'Tech Migration Check Failed';
    default:
      return '';
  }
};

export const getStepStatus = (
  stepId: WorkStep,
  stepStatusId: WorkStatus,
  isArchiveOnly: boolean,
) => (
  STEP_STATUS.find(
    ({ step, stepStatus, archiveOnly }) => step === stepId
        && stepStatus === stepStatusId
        && archiveOnly === (stepId === WorkStep.TransmitFile && stepStatusId === 'COMPLETE' ? isArchiveOnly : false),
  )
    ?? STEP_STATUS_DEFAULT.find((step) => step.step === stepId)
    ?? STEP_STATUS_DEFAULT[0]
);
