import { ReactElement } from 'react';
import { getClassNames } from '../../../helpers/helperStyles';
import { DivStyled } from './Row.styles';

const defaultProps = {
  id: '',
  variant: 'normal',
  children: <></>,
  center: false,
  right: false,
  top: false,
  bottom: false,
  between: '',
  evenly: '',
  around: false,
};

type RowProps = {
  id?: string;
  variant?: string;
  children?: ReactElement | any;
  center?: boolean;
  right?: boolean;
  left?: boolean;
  top?: boolean;
  bottom?: boolean;
  between?: string;
  evenly?: string;
  around?: boolean;
} & typeof defaultProps;

const Row = ({
  id,
  variant,
  children,
  center,
  right,
  top,
  bottom,
  between,
  evenly,
  around,
  ...props
}: RowProps): ReactElement => {
  return (
    <DivStyled
      id={id}
      variant={variant}
      className={getClassNames('ms-Grid-row', props)}
      center={center}
      right={right}
      top={top}
      bottom={bottom}
      between={between}
      evenly={evenly}
      around={around}
    >
      {children}
    </DivStyled>
  );
};

Row.defaultProps = defaultProps;

export { Row };
