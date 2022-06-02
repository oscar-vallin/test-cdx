import { ReactElement } from 'react';
import { FileProgressBar } from 'src/components/bars/FileProgressBar';
import { getProgressByValues } from 'src/data/constants/FileStatusConstants';
import { Box, Text } from './FileProgress.styles';

const defaultProps = {
  id: '',
  step: 'primary',
  stepStatus: true,
  archiveOnly: false,
};

type FileProgressProps = {
  id?: string;
  step?: any;
  stepStatus?: any;
  archiveOnly?: boolean;
} & typeof defaultProps;

const FileProgress = ({ id, step, stepStatus, archiveOnly }: FileProgressProps): ReactElement | null => {
  const progressItem = getProgressByValues(step, stepStatus, archiveOnly);

  if (!progressItem) return null;

  return (
    <Box id={id} left>
      <FileProgressBar colors={progressItem.colors} />
      <Text>{progressItem.stepStatus.label}</Text>
    </Box>
  );
};

FileProgress.defaultProps = defaultProps;

export { FileProgress };
