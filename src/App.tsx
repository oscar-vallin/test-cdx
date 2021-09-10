import React, { useEffect } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { useStoreState } from 'easy-peasy';
import { Routes } from './pages/Routes.js';
import { useQueryParams } from './hooks/useQueryParams.js';

const getQueryParams = ({ QueryParamStore }) => QueryParamStore.data;

export const App: React.FC = (): React.ReactElement => {
  const history = useHistory();
  const location = useLocation();

  const QueryParams = useQueryParams();

  const data = useStoreState(getQueryParams);

  useEffect(() => {
    history.replace(QueryParams.merge(location, data));
  }, [data.orgSid]);

  return (
    <React.Suspense fallback={null}>
      <Routes />
    </React.Suspense>
  );
};

export default App;
