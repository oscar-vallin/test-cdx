import React, { useState, useEffect } from 'react';
import {
  BeginLoginDocument,
  useBeginLoginLazyQuery,
  useBeginLoginQuery,
  usePasswordLoginMutation,
} from '../data/services/graphql';

export const useAuthBeginLogin = (userId) => {
  const [apiBeginLogin, { data, loading, error, networkStatus }] = useBeginLoginLazyQuery({
    variables: {
      userId,
    },
  });

  console.log('networkStatus: ', networkStatus);

  return { response: { data, loading, error }, apiBeginLogin };
};
