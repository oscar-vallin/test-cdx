import { useStoreState, useStoreActions } from 'easy-peasy';

const getStoreObj = ({ ApplicationStore }) => ApplicationStore;

export const useApplicationStore = (): any => {
  const { status } = useStoreState(getStoreObj);
  const { setIsOffline, reset } = useStoreActions(getStoreObj);

  return {
    status,
    setIsOffline,
    reset,
  };
};
