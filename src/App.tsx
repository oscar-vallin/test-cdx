import React, { useEffect } from 'react';
import { Routes } from './pages/Routes';
import { useApplicationStore } from './store/ApplicationStore';
import 'react-quill/dist/quill.snow.css';

export const App: React.FC = (): React.ReactElement => {
  const ApplicationStore = useApplicationStore();

  useEffect(() => {
    ApplicationStore.initStatusCheck();
  }, []);

  useEffect(() => {
    if (ApplicationStore.status.isOffline) {
      // eslint-disable-next-line no-console
      // !Todo: add offline notification
    }
  }, [ApplicationStore.status]);

  return <Routes />;
};

export default App;
