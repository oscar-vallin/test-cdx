import React from 'react';
import { Routes } from './pages/Routes.js';

export const App: React.FC = (): React.ReactElement => {
  return (
    <React.Suspense fallback={null}>
      <Routes />
    </React.Suspense>
  );
};

export default App;
