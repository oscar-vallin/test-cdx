import { ReactElement } from 'react';
import { getClassNames } from '../../../helpers/helperStyles';
import { CardStyled } from './Card.styles';

const defaultProps = {
  id: '',
  variant: 'normal',
  elevation: 'normal',
  spacing: 'normal',
  onClick: null,
  children: '',
};

type CardProps = {
  id?: string | null | undefined;
  variant?: string;
  elevation?: string;
  spacing?: string;
  onClick?: any | null;
  children?: any | null;
} & typeof defaultProps;

const Card = ({ id, variant, elevation, spacing, onClick, children, ...props }: CardProps): ReactElement => {
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

Card.defaultProps = defaultProps;

export { Card };
