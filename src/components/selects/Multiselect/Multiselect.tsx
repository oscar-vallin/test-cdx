import { ReactElement } from 'react';
import { StyledDiv, StyledDropdown } from './Multiselect.styles';

const defaultProps = {
  value: [],
  options: [],
};

type CDXMultiselectProps = {
  value?: any[];
  options?: any[];
  onChange?: any | null;
} & typeof defaultProps;

const CDXMultiselect = ({ value, options, onChange }: CDXMultiselectProps): ReactElement => {
  return (
    <StyledDiv>
      <StyledDropdown selectedKeys={value} onChange={onChange} options={options} multiSelect />
    </StyledDiv>
  );
};

CDXMultiselect.defaultProps = defaultProps;

export default CDXMultiselect;
