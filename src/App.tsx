import React, { useEffect } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { useStoreState } from 'easy-peasy';
import { Routes } from './pages/Routes';
import { useQueryParams } from './hooks/useQueryParams';
import { useApplicationStore } from './store/ApplicationStore';
import { useCSRFToken } from './hooks/useCSRFToken';

const getQueryParams = ({ QueryParamStore }) => QueryParamStore.params;

export const App: React.FC = (): React.ReactElement => {
  const history = useHistory();
  const location = useLocation();
  const ApplicationStore = useApplicationStore();
  const { callCSRFController } = useCSRFToken();

  const QueryParams = useQueryParams();

  const params = useStoreState(getQueryParams);

  useEffect(() => {
    history.replace(QueryParams.merge(location, params));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params.orgSid]);

  useEffect(ApplicationStore.initStatusCheck, []);

  useEffect(() => {
    if (ApplicationStore.status.isOffline) {
      // eslint-disable-next-line no-console
      // !Todo: add offline notification
    }
  }, [ApplicationStore.status]);

  useEffect(() => {
    callCSRFController();
  }, []);

  return <Routes />;
};

export default App;
