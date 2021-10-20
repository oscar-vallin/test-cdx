import PropTypes from 'prop-types';
import { getClassNames } from '../../../helpers/helperStyles';
import { DivStyled } from './Column.styles';

const Column = ({
  id,
  variant = 'normal',
  direction = 'column',
  children,
  center,
  right,
  top,
  bottom,
  centerV,
  ...props
}) => {
  return (
    <DivStyled
      id={id}
      variant={variant}
      className={getClassNames('ms-Grid-col', props)}
      center={center}
      right={right}
      top={top}
      bottom={bottom}
      centerV={centerV}
      direction={direction}
    >
      {children}
    </DivStyled>
  );
};

Column.propTypes = {
  id: PropTypes.string,
  variant: PropTypes.string,
  children: PropTypes.node,
};

export { Column };
