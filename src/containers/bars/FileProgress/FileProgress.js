import React from 'react';
import PropTypes from 'prop-types';
import { FileProgressBar } from '../../../components/bars/FileProgressBar';
import { Box, Text } from './FileProgress.styles';
import { getProgressItemByString } from '../../../data/constants/FileStatusConstants';

const FileProgress = ({ id = '__FileProgress', stringValues, data }) => {
  if (stringValues) {
    const progressItem = getProgressItemByString(stringValues);

    if (!progressItem) return null;

    return (
      <Box left>
        <FileProgressBar colors={progressItem.colors} />
        <Text>{progressItem.stepStatus.label}</Text>
      </Box>
    );
  }
  if (data) {
    return (
      <Box left>
        <FileProgressBar colors={data.colors} />
        <Text>{data.stepStatus.label}</Text>
      </Box>
    );
  }
  return null;
};

FileProgress.propTypes = {
  id: PropTypes.string,
};

export { FileProgress };
