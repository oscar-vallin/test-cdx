import { ReactElement } from 'react';
import { Box, Bar, BarAnimated } from './FileProgressBar.styles';
import { STEP_COLOR_PURPLE } from '../../../data/constants/FileStatusConstants';

const defaultProps = {
  id: '',
  colors: [],
};

type FileProgressBarProps = {
  id?: string;
  colors?: string[] | any;
} & typeof defaultProps;

const FileProgressBar = ({ id, colors }: FileProgressBarProps): ReactElement => {
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

FileProgressBar.defaultProps = defaultProps;

export { FileProgressBar };
