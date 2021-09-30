import PropTypes from 'prop-types';
import { StyledSeparator } from './Separator.styles';

const CDXSeparator = ({ id }) => {
  return <StyledSeparator id={id} />;
};

CDXSeparator.propTypes = {
  id: PropTypes.string,
};

export { CDXSeparator };
