import { ReactElement } from 'react';
import { StyleConstants } from '../../../data/constants/StyleConstants';
import { getSpinnerSize } from './Spinner.handlers';
import { StyledSpinner } from './Spinner.styles';

const defaultProps = {
  id: '',
  size: StyleConstants.SPINNER_SMALL,
  label: '',
};

type SpinnerProps = {
  id?: string;
  size?: any;
  label?: string;
  style?: { justifySelf: string };
} & typeof defaultProps;

const Spinner = ({
  id, size, label, ...props
}: SpinnerProps): ReactElement => (
  <StyledSpinner id={id} size={getSpinnerSize(size)} label={label} {...props} />
)

Spinner.defaultProps = defaultProps;

export { Spinner };
export default Spinner;
