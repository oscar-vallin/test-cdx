/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from 'react';
import { ErrorHandler } from '../utils/ErrorHandler';

export const useQueryHandler = (lazyQuery) => {
  const [callback, { data, loading, error }] = lazyQuery();
  const handleError = ErrorHandler();

  useEffect(() => {
    handleError(error);
  }, [error]);

  return [callback, { data, loading, error }];
};
