import { ReactElement } from 'react';
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

type ColumnProps = {
  id: string;
  variant: string;
  direction: string;
  children: ReactElement | null;
  center: string;
  right: string;
  top: string;
  bottom: string;
  centerV: string;
};

export { Column };
