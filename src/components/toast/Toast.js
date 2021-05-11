import React from 'react';
import PropTypes from 'prop-types';
import { MessageBarType } from '@fluentui/react';
import { MessageCont } from './Toast.style';

export const Toast = ({ text, duration }) => {
  const [animation, setAnimation] = React.useState('myfirst');
  const [top, setTop] = React.useState('-35px');
  const [display, setDisplay] = React.useState(false);
  React.useEffect(() => {
    setTimeout(() => setAnimation('mySecond'), duration + 1500);
    setTimeout(() => setTop('9px'), 950);
    setTimeout(() => setDisplay(true), duration + 2950);
  }),
    [];

  return (
    <>
      <MessageCont
        hide={display}
        top={top}
        animation={animation}
        messageBarType={MessageBarType.error}
        isMultiline={false}
        // onDismiss={p.resetChoice}
        dismissButtonAriaLabel="Close"
      >
        {text}
      </MessageCont>
    </>
  );
};

Toast.propTypes = {
  text: PropTypes.string.isRequired,
  duration: PropTypes.number.isRequired,
};

export default Toast;
