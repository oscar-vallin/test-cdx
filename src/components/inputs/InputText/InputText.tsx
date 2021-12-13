import { ReactElement } from 'react';
import { StyledTextField } from './InputText.styles';

const defaultProps = {
  id: '',
  type: 'text',
  disabled: false,
  autofocus: true,
  errorMessage: '',
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
  required?: boolean;
  canRevealPassword?: boolean;
  label?: string;
  maxLength?: number;
  minLength?: number;
} & typeof defaultProps;

const InputText = ({
  id,
  type,
  disabled,
  onChange,
  autofocus,
  errorMessage,
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

InputText.defaultProps = defaultProps;

export { InputText };
