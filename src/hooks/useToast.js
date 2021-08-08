import { useEffect, useReducer } from 'react';

const INITIAL_STATE = {
  type: 'info',
  text: '',
  visible: false,
};

const reducer = (state, newState) => ({ ...newState });

export const useToast = () => {
  const [toast, setToast] = useReducer(reducer, INITIAL_STATE);

  const setCustomToast = (type) => ({ text }) =>
    setToast({
      type,
      text,
      visible: true,
    });

  useEffect(() => {
    if (toast.text) {
      // setTimeout(() => {
      //   setToast({ ...INITIAL_STATE });
      // }, 5000);
    }
  }, [toast]);

  return {
    toast,
    show: setToast,
  };
};
