import PropTypes from 'prop-types';
import { StyledDiv } from './Spacing.styles';

const CDXSpacing = ({ id = '', children = [], margin = {}, padding = {}, block = '', inline = false, ...props }) => {
  return (
    <StyledDiv id={`${id}`} margin={margin} padding={padding} block={block} inline={inline} {...props}>
      {children}
    </StyledDiv>
  );
};

CDXSpacing.propTypes = {
  margin: PropTypes.any,
  padding: PropTypes.any,
};

export { CDXSpacing };
export default CDXSpacing;
