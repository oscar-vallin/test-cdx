import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import {
  MessageBar,
  MessageBarType,
} from 'office-ui-fabric-react';

const CDXMessageBar = ({
  id = '__MessageBar',
  type = 'info',
  multiline = false,
  truncated = false,
  content,
  actions,
  children,
  ...props
}) => {
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
}

CDXMessageBar.propTypes = {
  id: PropTypes.string,
  type: PropTypes.string,
  multiline: PropTypes.bool,
  truncated: PropTypes.bool,
};


export { CDXMessageBar };