import { ReactElement } from 'react';
import { getClassNames } from '../../../helpers/helperStyles';
import { CardStyled } from './Card.styles';

const Card = ({
  id,
  variant = 'normal',
  elevation = 'normal',
  spacing = 'normal',
  onClick,
  children,
  ...props
}: CardProps): ReactElement => {
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

type CardProps = {
  id: string;
  variant: string;
  elevation: string;
  spacing: string;
  onClick?: any | null;
  children?: ReactElement | string;
};

export { Card };
