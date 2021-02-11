import React, { useState, useEffect } from 'react';
import {
  BeginLoginDocument,
  useBeginLoginLazyQuery,
  useBeginLoginQuery,
  usePasswordLoginMutation,
} from '../data/services/graphql';

export const useAuthBeginLogin = (userId) => {
  const [apiBeginLogin, { data, loading, error }] = useBeginLoginLazyQuery({
    variables: {
      userId,
    },
  });

  return { response: { data, loading, error }, apiBeginLogin };
};
