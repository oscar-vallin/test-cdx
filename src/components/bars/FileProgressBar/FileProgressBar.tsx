import { ReactElement } from 'react';
import { TooltipDelay, TooltipHost } from '@fluentui/react';
import { STEP_COLOR_PURPLE, StepStatusSegment, StepStatusType } from 'src/data/constants/FileStatusConstants';
import { Bar, BarAnimated, Box } from './FileProgressBar.styles';

type FileProgressBarProps = {
  id: string;
  stepStatus: StepStatusType;
};

const FileProgressBar = ({ id, stepStatus }: FileProgressBarProps): ReactElement => {
  const renderSegment = (segment: StepStatusSegment, index: number) => {
    if (segment.color === STEP_COLOR_PURPLE) {
      return (
        <Bar key={`${index}`} order={index} color={segment.color}>
          <BarAnimated />
        </Bar>
      );
    }
    return <Bar key={`${index}`} order={index} color={segment.color} />;
  };

  return (
    <Box id={id}>
      {stepStatus.segments.map((segment, index) => (
        <TooltipHost key={`segment_${index}`} content={segment.label} delay={TooltipDelay.zero}>
          {renderSegment(segment, index)}
        </TooltipHost>
      ))}
    </Box>
  );
};

export { FileProgressBar };
