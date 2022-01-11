import { ReactNode } from 'react';
import { MessageBarType } from '@fluentui/react';
import { StyledMessageBar } from './Toast.styles';

const defaultProps = {
  type: 'info',
  visible: false,
  text: '',
  onDismiss: () => {}
};

type ToastProps = {
  id?: string;
  type?: string;
  visible?: boolean;
  text?: string;
  onDismiss?: () => void;
} & typeof defaultProps;

export const Toast = ({id, type, visible, text, onDismiss }: ToastProps): ReactNode | any => {
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

Toast.defaultProps = defaultProps;

export default Toast;
