import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { ROUTES } from '../data/constants/RouteConstants';

// Routes
import { LoginPage } from './Login';
import { DashboardPage } from './Dashboard';
import { ArchivesPage } from './Archives';
import { SchedulePage } from './Schedule';
import { TransmissionsPage } from './Transmissions';
import { ErrorsPage } from './Errors';
import { AdminPage } from './Admin';
import { NotFoundPage } from './NotFound';
import { FileStatusPage } from './FileStatus';
import { FileStatusDetailsPage } from './FileStatusDetails';

export const Routes = () => {
  return (
    <Switch>
      <Route exact path="/">
        <LoginPage />
      </Route>
      <Route path={ROUTES.ROUTE_DASHBOARD.URL}>
        <DashboardPage />
      </Route>
      <Route path={ROUTES.ROUTE_FILE_STATUS_DETAILS.URL}>
        <FileStatusDetailsPage />
      </Route>
      <Route path={ROUTES.ROUTE_FILE_STATUS.URL}>
        <FileStatusPage />
      </Route>
      <Route path={ROUTES.ROUTE_ARCHIVES.URL}>
        <ArchivesPage />
      </Route>
      <Route path={ROUTES.ROUTE_SCHEDULE.URL}>
        <SchedulePage />
      </Route>
      <Route path={ROUTES.ROUTE_TRANSMISSIONS.URL}>
        <TransmissionsPage />
      </Route>
      <Route path={ROUTES.ROUTE_ERRORS.URL}>
        <ErrorsPage />
      </Route>
      <Route path={ROUTES.ROUTE_ADMIN.URL}>
        <AdminPage />
      </Route>
      <Route>
        <NotFoundPage />
      </Route>
    </Switch>
  );
};
