import { ReactElement } from 'react';
import { MessageBarType } from '@fluentui/react';
import { StyledMessageBar } from './Toast.style';

const defaultProps = {
  type: MessageBarType.info,
  visible: true,
  text: '',
};

type ToastProps = {
  type?: MessageBarType;
  visible?: boolean;
  text?: string;
} & typeof defaultProps;

export const Toast = ({ type, visible, text }: ToastProps): React.ReactNode => {
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
