import { ReactNode } from 'react';
import { MessageBarType } from '@fluentui/react';
import { StyledMessageBar } from './Toast.styles';

type ToastProps = {
  id?: string;
  type?: string;
  visible?: boolean;
  text?: string;
  onDismiss?: () => void;
};

export const Toast = ({ id, type = 'info', visible = false, text, onDismiss }: ToastProps): ReactNode | any => {
  return (
    visible && (
      <StyledMessageBar
        id={id}
        visible={visible}
        messageBarType={MessageBarType[type]}
        isMultiline={false}
        dismissButtonAriaLabel="Close"
        onDismiss={onDismiss}
      >
        {text}
      </StyledMessageBar>
    )
  );
};

export default Toast;
