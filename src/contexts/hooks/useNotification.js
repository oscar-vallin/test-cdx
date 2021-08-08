import { useContext, useEffect } from 'react';
import { NotificationContext } from '../NotificationContext';

export const useNotification = () => {
  const { dispatch } = useContext(NotificationContext);

  const notify = (type) => ({ text }) =>
    dispatch({
      type: 'TOAST_SHOW',
      payload: { type, text },
    });

  return {
    success: notify('success'),
    warning: notify('warning'),
    error: notify('error'),
    info: notify('info'),
  };
};
