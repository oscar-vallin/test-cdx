import { ReactElement } from 'react';
import { getClassNames } from '../../../helpers/helperStyles';
import { DivStyled } from './Column.styles';

const defaultProps = {
  id: '',
  variant: 'normal',
  direction: 'column',
  children: <></>,
  center: false,
  right: false,
  top: false,
  bottom: false,
  centerV: '',
};

type ColumnProps = {
  id?: string;
  variant?: string;
  direction?: string;
  children?: ReactElement | any;
  lg?: string;
  center?: boolean;
  right?: boolean;
  top?: boolean;
  bottom?: boolean;
  centerV?: string;
  sm?: number | string;
  xl?: number | string;
  xxl?: number | string;
} & typeof defaultProps;

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
}: ColumnProps): ReactElement => {
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

Column.defaultProps = defaultProps;

export { Column };
