import { ReactNode } from 'react';
import { InfoIcon } from '../../guidance/InfoIcon';
import { StyledLabel } from './Label.styles';

const defaultProps = {
  text: null,
  info: null,
  children: null,
};

export const CDXLabel = ({ text, info, children }: any) => {
  return (
    <StyledLabel>
      {text || children} {info && <InfoIcon content={info} />}
    </StyledLabel>
  );
};

CDXLabel.defaultProps = defaultProps;

export default CDXLabel;
