import React, { useEffect } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { useStoreState } from 'easy-peasy';
import { Routes } from './pages/Routes';
import { useQueryParams } from './hooks/useQueryParams';

const getQueryParams = ({ QueryParamStore }) => QueryParamStore.params;

export const App: React.FC = (): React.ReactElement => {
  const history = useHistory();
  const location = useLocation();

  const QueryParams = useQueryParams();

  const params = useStoreState(getQueryParams);

  useEffect(() => {
    history.replace(QueryParams.merge(location, params));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params.orgSid]);

  return <Routes />;
};

export default App;
