import { ReactElement } from 'react';
import { StyleConstants } from '../../../data/constants/StyleConstants';
import { getSpinnerSize } from './Spinner.handlers';
import { StyledSpinner } from './Spinner.styles';

const defaultProps = {
  id: '',
  size: '',
  label: '',
};

type SpinnerProps = {
  id?: string;
  size?: string;
  label?: string;
} & typeof defaultProps;

const Spinner = ({
  id = '',
  size = StyleConstants.SPINNER_SMALL,
  label = '',
  ...props
}: SpinnerProps): ReactElement => {
  return <StyledSpinner id={id} size={getSpinnerSize(size)} label={label} {...props} />;
};

Spinner.defaultProps = defaultProps;

export { Spinner };
export default Spinner;
