import { ReactElement } from 'react';
import { Box, Bar, BarAnimated } from './FileProgressBar.styles';
import { STEP_COLOR_PURPLE } from '../../../data/constants/FileStatusConstants';

const FileProgressBar = ({ id, colors = [] }: FileProgressBarProps): ReactElement => {
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

type FileProgressBarProps = {
  id: string;
  colors: string[];
};

export { FileProgressBar };
