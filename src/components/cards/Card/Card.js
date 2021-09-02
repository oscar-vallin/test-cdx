import React from 'react';
import { PropTypes } from 'prop-types';
import { CardSection } from '@uifabric/react-cards';
//
import { getClassNames } from '../../../helpers/helperStyles';
import { CardStyled, Stylesheet } from './Card.styles';

const Card = ({
  id = '__Card',
  variant = 'normal',
  elevation = 'normal',
  spacing = 'normal',
  onClick = () => null,
  children,
  ...props
}) => {
  return (
    <CardStyled
      id={id}
      variant={variant}
      elevation={elevation}
      spacing={spacing}
      className={getClassNames(null, props)}
      onClick={onClick}
      horizontal
    >
      <CardSection id={`${id}__Card-CardSection`} style={Stylesheet.CardSection}>
        {children}
      </CardSection>
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
