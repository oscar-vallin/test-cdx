import { SpinnerSize } from '@fluentui/react';
import { StyleConstants } from '../../../data/constants/StyleConstants';

export const getSpinnerSize = (size) => {
  if (size === StyleConstants.SPINNER_XSMALL) return SpinnerSize.xSmall;

  if (size === StyleConstants.SPINNER_MEDIUM) return SpinnerSize.medium;

  if (size === 'lg') return SpinnerSize.large;

  return SpinnerSize.small;
};
