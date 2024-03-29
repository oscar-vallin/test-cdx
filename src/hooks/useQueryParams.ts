import { useStoreState } from 'easy-peasy';
import { QueryParams } from '../utils/QueryParams';

export const useQueryParams = () => {
  const params = useStoreState(({ QueryParamStore }: any) => QueryParamStore.params);

  QueryParams.setSharedAttrs(params);

  return QueryParams;
};
