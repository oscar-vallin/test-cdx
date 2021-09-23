import { useStoreState, useStoreActions } from 'easy-peasy';

const getStoreObj = ({ QueryParamStore }) => QueryParamStore;

export const useQueryParamStore = (): any => {
  const { params } = useStoreState(getStoreObj);
  const { setGlobalParam, reset } = useStoreActions(getStoreObj);

  return {
    params,
    setGlobalParam,
    reset,
  };
};
