import React, { ReactElement, ReactNode, useEffect, useReducer } from 'react';
import { Toast } from '../components/toast';

export const NotificationContext = React.createContext<any>(() => {
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

const defaultProps = {
  // children: '',
};

type NotificationContextProviderProps = {
  children?: ReactElement | ReactNode | string;
} & typeof defaultProps;

export const NotificationContextProvider = ({ children }: NotificationContextProviderProps): ReactElement => {
  const [state, dispatch]: any = useReducer(reducer, INITIAL_STATE);

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

NotificationContextProvider.defaultProps = defaultProps;