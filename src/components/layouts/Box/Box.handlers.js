import { StyleConstants } from '../../../data/constants/StyleConstants';

export const validateDirection = (direction) => {
  return direction !== StyleConstants.DIRECTION_ROW && direction !== StyleConstants.DIRECTION_COLUMN
    ? direction
    : StyleConstants.DIRECTION_COLUMN;
};
