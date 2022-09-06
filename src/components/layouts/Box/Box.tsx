import React, { ReactElement } from 'react';
import { getClassNames } from 'src/helpers/helperStyles';
import { StyleConstants } from 'src/data/constants/StyleConstants';
import { validateDirection } from './Box.handlers';
import { ComponentStyled } from './Box.styles';

const defaultProps = {
  id: '',
  children: undefined,
  direction: StyleConstants.DIRECTION_COLUMN,
  left: false,
  right: false,
  top: false,
  bottom: '',
};

type BoxProps = {
  id?: string;
  children?: React.ReactNode | ReactElement | any;
  direction?: string;
  left?: boolean;
  right?: boolean;
  top?: boolean;
  bottom?: string;
} & typeof defaultProps;

const Box = ({
  id, children, direction, left, right, top, bottom, ...props
}: BoxProps): ReactElement => (
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

Box.defaultProps = defaultProps;

export { Box };
