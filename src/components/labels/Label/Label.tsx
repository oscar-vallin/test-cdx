import { InfoIcon } from '../../guidance/InfoIcon';
import { StyledLabel } from './Label.styles';

const CDXLabel = ({ text, info, children }) => {
  return (
    <StyledLabel>
      {text || children} {info && <InfoIcon content={info} />}
    </StyledLabel>
  );
};

export default CDXLabel;
