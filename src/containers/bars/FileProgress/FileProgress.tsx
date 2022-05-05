import { ReactElement } from 'react';
import { FileProgressBar } from '../../../components/bars/FileProgressBar';
import { Box, Text } from './FileProgress.styles';
import { getProgressByValues } from '../../../data/constants/FileStatusConstants';

const defaultProps = {
  id: '',
  step: 'primary',
  stepStatus: true,
  archiveOnly: false
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
