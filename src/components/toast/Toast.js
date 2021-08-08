import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { MessageBarType } from '@fluentui/react';
import { StyledMessageBar } from './Toast.style';

export const Toast = ({ type, visible, text }) => {
  return (
    visible && (
      <StyledMessageBar
        visible={visible}
        messageBarType={MessageBarType[type]}
        isMultiline={false}
        // onDismiss={p.resetChoice}
        dismissButtonAriaLabel="Close"
      >
        {text}
      </StyledMessageBar>
    )
  );
};

Toast.propTypes = {
  text: PropTypes.string.isRequired,
};

export default Toast;
