import { ReactElement } from 'react';
import FormLabel from 'src/components/labels/FormLabel';
import { StyledTextField } from './InputText.styles';

const defaultProps = {
  id: '',
  type: 'text',
  disabled: false,
  autofocus: true,
  errorMessage: '',
  value: '',
};

export type InputTextProps = {
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
  info?: string;
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
  info,
  required,
  ...props
}: InputTextProps): ReactElement => {
  const handleKey = (key) => {
    if (key === 'Enter' && onKeyEnter) return onKeyEnter();

    if (onKeyDown) return onKeyDown(key);

    return null;
  };

  const onRenderLabel = () => <FormLabel required={required} info={info} {...props} />;

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
      onRenderLabel={info ? onRenderLabel : undefined}
      {...props}
    />
  );
};

InputText.defaultProps = defaultProps;

export { InputText };
