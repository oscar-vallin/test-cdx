import PropTypes from 'prop-types';
import { Row, Column } from '../../../components/layouts';

import { StyledBox } from './PageHeader.styles';

const PageHeader = ({ id, spacing, children }) => {
  return (
    <StyledBox id={id} spacing={spacing}>
      <Row id={`${id}__Nav`} left>
        <Column id={`${id}__Col-Left`} sm={12}>
          {children}
        </Column>
      </Row>
    </StyledBox>
  );
};

PageHeader.propTypes = {
  id: PropTypes.string,
};

export { PageHeader };
