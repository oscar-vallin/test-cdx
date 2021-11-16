import { StyledDiv, StyledDropdown } from './Multiselect.styles';

const CDXMultiselect = ({ value = [], options = [], onChange }) => {
  return (
    <StyledDiv>
      <StyledDropdown selectedKeys={value} onChange={onChange} options={options} multiSelect />
    </StyledDiv>
  );
};

export default CDXMultiselect;
