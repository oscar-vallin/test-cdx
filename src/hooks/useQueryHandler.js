import { useEffect } from 'react';

export const useQueryHandler = (lazyQuery) => {
  const [callback, { data, loading, error }] = lazyQuery();

  useEffect(() => {
    if (error) {
      console.error('GraphQL =>', error);
    }
  }, [error]);

  return [callback, { data, loading, error }];
};
