import { useContext } from 'react';
import { NotificationContext } from '../contexts/NotificationContext';

export const useNotification = () => {
  const { dispatch }: any = useContext(NotificationContext);

  const notify =
    (type) =>
    ({ text, duration = 5000 }) =>
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
