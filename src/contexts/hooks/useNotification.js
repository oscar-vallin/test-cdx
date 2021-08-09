import { useContext } from 'react';
import { NotificationContext } from '../NotificationContext';

export const useNotification = () => {
  const { dispatch } = useContext(NotificationContext);

  const notify = (type) => ({ text, duration = 5000 }) =>
    dispatch({
      type: 'TOAST_SHOW',
      payload: { type, text, duration },
    });

  return {
    success: notify('success'),
    warning: notify('warning'),
    error: notify('error'),
    info: notify('info'),
  };
};
