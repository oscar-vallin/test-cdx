import { useState, useEffect } from 'react';

export const useErrorMessage = (time = 3000) => {
  const [message, setMessage] = useState('');

  useEffect(() => {
    const timer = setTimeout(() => {
      setMessage('');
    }, time);
    return () => clearTimeout(timer);
  }, [message, time]);

  return { message, setMessage };
};

export default useErrorMessage;
