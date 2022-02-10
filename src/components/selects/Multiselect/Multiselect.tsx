import { ReactElement } from 'react';
import { StyledDiv, StyledDropdown } from './Multiselect.styles';

type CDXMultiselectProps = {
  value?: any[];
  options?: any[];
  onChange?: any | null;
  disabled?: boolean;
}

const CDXMultiselect = ({ value = [], options = [], onChange, disabled = false }: CDXMultiselectProps): ReactElement => {
  return (
    <StyledDiv>
      <StyledDropdown selectedKeys={value}
                      onChange={onChange}
                      options={options}
                      multiSelect
                      disabled={disabled}
                      aria-readonly={disabled}/>
    </StyledDiv>
  );
};

export default CDXMultiselect;
