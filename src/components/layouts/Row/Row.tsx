import { ReactElement } from 'react';
import { getClassNames } from '../../../helpers/helperStyles';
import { DivStyled } from './Row.styles';

const defaultProps = {
  id: '',
  variant: 'normal',
  children: <></>,
  center: '',
  right: '',
  top: '',
  bottom: '',
  between: '',
  evenly: '',
  around: '',
};

type RowProps = {
  id?: string;
  variant?: string;
  children?: ReactElement | null;
  center?: string;
  right?: string;
  top?: string;
  bottom?: string;
  between?: string;
  evenly?: string;
  around?: string;
} & typeof defaultProps;

const Row = ({
  id,
  variant = 'normal',
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
