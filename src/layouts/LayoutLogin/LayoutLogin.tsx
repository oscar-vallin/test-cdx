import { ReactElement } from 'react';
import { StyleConstants } from '../../data/constants/StyleConstants';
import { BoxStyled } from './LayoutLogin.styles';

const defaultProps = {
  id: '',
  children: '',
  direction: StyleConstants.DIRECTION_COLUMN,
};

type LayoutLoginProps = {
  id?: string;
  children?: ReactElement | string;
  direction?: string;
} & typeof defaultProps;

const LayoutLogin = ({ id, children, direction = StyleConstants.DIRECTION_COLUMN }: LayoutLoginProps): ReactElement => {
  return (
    <BoxStyled id={id} direction={direction}>
      {children}
    </BoxStyled>
  );
};

LayoutLogin.defaultProps = defaultProps;

export { LayoutLogin };
