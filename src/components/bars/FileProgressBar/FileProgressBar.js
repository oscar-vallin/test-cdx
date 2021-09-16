import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Box, Bar, BarAnimated } from './FileProgressBar.styles';
import { STEP_COLOR_PURPLE } from '../../../data/constants/FileStatusConstants';

const FileProgressBar = ({ id = '__FileProgressBar', colors = [] }) => {
  return (
    <Box id={id}>
      {colors.map((color, index) => {
        if (color === STEP_COLOR_PURPLE) {
          return (
            <Bar key={`${index}`} order={index} color={color}>
              <BarAnimated />
            </Bar>
          );
        }
        return <Bar key={`${index}`} order={index} color={color} />;
      })}
    </Box>
  );
};

FileProgressBar.propTypes = {
  id: PropTypes.string,
};

export { FileProgressBar };
