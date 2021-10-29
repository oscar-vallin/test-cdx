import { ReactElement } from 'react';
import { MessageBar, MessageBarType } from 'office-ui-fabric-react';

const defaultProps = {
  id: '',
  type: 'info',
  multiline: false,
  truncated: false,
  content: '',
  actions: true,
  children: '',
};

type CDXMessageBarProps = {
  id?: string;
  type?: string;
  multiline?: boolean;
  truncated?: boolean;
  content?: string;
  actions?: any;
  children?: ReactElement | string;
} & typeof defaultProps;

const CDXMessageBar = ({
  id,
  type = 'info',
  multiline = false,
  truncated = false,
  content,
  actions,
  children,
  ...props
}: CDXMessageBarProps): ReactElement => {
  return (
    <MessageBar
      id={id}
      messageBarType={MessageBarType[type]}
      isMultiline={multiline}
      truncated={truncated}
      actions={actions}
      {...props}
    >
      {content || children}
    </MessageBar>
  );
};

CDXMessageBar.defaultProps = defaultProps;

export { CDXMessageBar };
export default CDXMessageBar;
