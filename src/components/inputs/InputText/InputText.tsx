import { ReactElement } from 'react';
import { StyledTextField } from './InputText.styles';

const defaultProps = {
  id: '',
  type: 'text',
  disabled: false,
  onChange: () => null,
  autofocus: true,
  errorMessage: '',
  onKeyDown: () => null,
  onKeyEnter: () => null,
  value: '',
};

type InputTextProps = {
  id?: string;
  type?: string;
  disabled?: boolean;
  onChange?: any | null;
  autofocus?: boolean;
  errorMessage?: any | string;
  onKeyDown?: any | null;
  onKeyEnter?: any | null;
  value?: string;
  placeholder?: string;
  autoFocus?: boolean;
} & typeof defaultProps;

const InputText = ({
  id,
  type = 'text',
  disabled = false,
  onChange,
  autofocus = true,
  errorMessage = '',
  onKeyDown,
  onKeyEnter,
  value,
  ...props
}: InputTextProps): ReactElement => {
  const handleKey = (key) => {
    if (key === 'Enter' && onKeyEnter) return onKeyEnter();

    if (onKeyDown) return onKeyDown(key);

    return null;
  };

  return (
    <StyledTextField
      id={id}
      type={type}
      autofocus={autofocus}
      disabled={disabled}
      onChange={onChange}
      onKeyDown={({ key }) => handleKey(key)}
      value={value}
      errorMessage={errorMessage}
      {...props}
    />
  );
};

// InputText.propTypes = {
//   id: PropTypes.string,
//   type: PropTypes.string,
//   disabled: PropTypes.bool,
//   autofocus: PropTypes.bool,
//   onChange: PropTypes.func,
//   errorMessage: PropTypes.string,
//   value: PropTypes.string,
// };

InputText.defaultProps = defaultProps;

export { InputText };
