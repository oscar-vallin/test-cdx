import PropTypes from 'prop-types';
import { getClassNames } from '../../../helpers/helperStyles';
import { CardStyled } from './Card.styles';

const Card = ({ id, variant = 'normal', elevation = 'normal', spacing = 'normal', onClick, children, ...props }) => {
  return (
    <CardStyled
      id={id}
      variant={variant}
      elevation={elevation}
      spacing={spacing}
      className={getClassNames(null, props)}
      horizontal
      {...(onClick && { onClick })}
    >
      {children}
    </CardStyled>
  );
};

Card.propTypes = {
  id: PropTypes.string,
  variant: PropTypes.string,
  elevation: PropTypes.string,
  children: PropTypes.node,
};

export { Card };
