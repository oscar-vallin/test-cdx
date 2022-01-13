import React, { useEffect } from 'react';
import { Routes } from './pages/Routes';
import { useApplicationStore } from './store/ApplicationStore';
import { useCSRFToken } from './hooks/useCSRFToken';

export const App: React.FC = (): React.ReactElement => {
  const ApplicationStore = useApplicationStore();
  const { callCSRFController } = useCSRFToken();

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
