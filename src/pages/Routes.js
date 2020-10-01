import React from 'react';
import { Route, Switch } from 'react-router-dom';

// Routes
import { PageLogin } from './Login';
import { PageDashboard } from './Dashboard';
import { PageNotFound } from './NotFound';

export const Routes = () => {
  return (
    <Switch>
      <Route exact path="/">
        <PageLogin />
      </Route>

      <Route path="/dashboard">
        <PageDashboard />
      </Route>

      <Route>
        <PageNotFound />
      </Route>
    </Switch>
  );
};
