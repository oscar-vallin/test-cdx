import { ReactNode } from 'react';
import { MessageBarType } from '@fluentui/react';
import { StyledMessageBar } from './Toast.style';

const defaultProps = {
  type: 'info',
  visible: false,
  text: '',
};

type ToastProps = {
  type?: string;
  visible?: boolean;
  text?: string;
} & typeof defaultProps;

export const Toast = ({ type, visible, text }: ToastProps): ReactNode | any => {
  return (
    visible && (
      <StyledMessageBar
        visible={visible}
        messageBarType={MessageBarType[type]}
        isMultiline={false}
        dismissButtonAriaLabel="Close"
      >
        {text}
      </StyledMessageBar>
    )
  );
};

Toast.defaultProps = defaultProps;

export default Toast;
