import { ReactElement } from 'react';
import { FileProgressBar } from 'src/components/bars/FileProgressBar';
import { getStepStatus } from 'src/data/constants/FileStatusConstants';
import { WorkStatus, WorkStep } from 'src/data/services/graphql';
import { Box, Text } from './FileProgress.styles';

type FileProgressProps = {
  id: string;
  step: WorkStep;
  stepStatus: WorkStatus;
  archiveOnly: boolean;
};

const FileProgress = ({ id, step, stepStatus, archiveOnly }: FileProgressProps): ReactElement | null => {
  const progressItem = getStepStatus(step, stepStatus, archiveOnly);

  if (!progressItem) return null;

  return (
    <Box id={id} left>
      <FileProgressBar id={`${id}_bar`} stepStatus={progressItem} />
      <Text id={`${id}_lbl`}>{progressItem.label}</Text>
    </Box>
  );
};

export { FileProgress };
