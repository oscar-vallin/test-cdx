import React from 'react';
import PropTypes from 'prop-types';
import { StyleConstants } from '../../../data/constants/StyleConstants';
import { getSpinnerSize } from './Spinner.handlers';
import { StyledSpinner } from './Spinner.styles';

const Spinner = ({ id = '__Spinner', size = StyleConstants.SPINNER_SMALL, label = '' }) => {
  return <StyledSpinner id={id} size={getSpinnerSize(size)} label={label} />;
};

Spinner.propTypes = {
  id: PropTypes.string,
  size: PropTypes.string,
  label: PropTypes.string,
};

export { Spinner };
