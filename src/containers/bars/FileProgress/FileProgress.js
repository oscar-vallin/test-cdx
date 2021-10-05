import PropTypes from 'prop-types';
import { FileProgressBar } from '../../../components/bars/FileProgressBar';
import { Box, Text } from './FileProgress.styles';
import { getProgressByValues } from '../../../data/constants/FileStatusConstants';

const FileProgress = ({ id, step, stepStatus }) => {
  const progressItem = getProgressByValues(step, stepStatus);

  if (!progressItem) return null;

  return (
    <Box id={id} left>
      <FileProgressBar colors={progressItem.colors} />
      <Text>{progressItem.stepStatus.label}</Text>
    </Box>
  );
};

FileProgress.propTypes = {
  id: PropTypes.string,
};

export { FileProgress };
