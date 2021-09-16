import React, { useEffect, useReducer } from 'react';
import { Toast } from '../components/toast';

export const NotificationContext = React.createContext(() => {
  return {};
});

const INITIAL_STATE = {
  type: 'info',
  text: '',
  visible: false,
  duration: 5000,
};

const reducer = (state, { type, payload }) => {
  switch (type) {
    case 'TOAST_SHOW':
      return { ...payload, visible: true };
    case 'TOAST_HIDE':
      return { ...INITIAL_STATE, visible: false };
    default:
      return state;
  }
};

export const NotificationContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, INITIAL_STATE);

  useEffect(() => {
    if (state.visible) {
      setTimeout(() => dispatch({ type: 'TOAST_HIDE' }), state.duration);
    }
  }, [state]);

  return (
    <NotificationContext.Provider value={{ state, dispatch }}>
      {children}

      <Toast visible={state.visible} text={state.text} type={state.type} />
    </NotificationContext.Provider>
  );
};
