import { ReactElement } from 'react';
import { getClassNames } from '../../../helpers/helperStyles';
import { StyleConstants } from '../../../data/constants/StyleConstants';
import { validateDirection } from './Box.handlers';
import { ComponentStyled } from './Box.styles';

const Box = ({
  id = '',
  children,
  direction = StyleConstants.DIRECTION_COLUMN,
  left,
  right,
  top,
  bottom,
  ...props
}: BoxProps): ReactElement => {
  return (
    <ComponentStyled
      id={id}
      direction={validateDirection(direction)}
      className={getClassNames('ms-Grid-col', props)}
      left={left}
      right={right}
      top={top}
      bottom={bottom}
    >
      {children}
    </ComponentStyled>
  );
};

type BoxProps = {
  id: string;
  children: React.ReactNode;
  direction: string;
  left: string;
  right: string;
  top: string;
  bottom: string;
};

export { Box };
