import React from 'react';
import { Route, Switch } from 'react-router-dom';

// Routes
import { LoginPage } from './Login';
import { DashboardPage } from './Dashboard';
import { NotFoundPage } from './NotFound';

export const Routes = () => {
  return (
    <Switch>
      <Route exact path="/">
        <LoginPage />
      </Route>

      <Route path="/dashboard">
        <DashboardPage />
      </Route>

      <Route>
        <NotFoundPage />
      </Route>
    </Switch>
  );
};
