import { SpinnerSize } from '@fluentui/react';
import { StyleConstants } from '../../../data/constants/StyleConstants';

export const getSpinnerSize = size => {
  return size === StyleConstants.SPINNER_XSMALL
    ? SpinnerSize.xSmall
    : size === StyleConstants.SPINNER_MEDIUM
    ? SpinnerSize.medium
    : size === 'lg'
    ? SpinnerSize.large
    : SpinnerSize.small;
};
