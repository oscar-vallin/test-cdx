import React, { memo, useEffect, useState } from 'react';
import { LayoutDashboard } from 'src/layouts/LayoutDashboard';
import { Column, Container } from 'src/components/layouts';
import { PageTitle } from 'src/components/typography';
import {
  ImplementationDeployStatus,
  useV1LibraryDeployMutation,
  useV1LibraryLogLazyQuery,
  useV1LibraryPollQuery,
  V1LibraryLogQuery,
  V1LibraryPollQuery,
} from 'src/data/services/graphql';
import { ROUTE_V1LIB_DEPLOY } from 'src/data/constants/RouteConstants';
import { PageHeader } from 'src/containers/headers/PageHeader';
import { PageBody } from 'src/components/layouts/Column';
import { ErrorHandler } from 'src/utils/ErrorHandler';
import { DeployButton, Row } from './ImplementationDeployPage.styles';
import { GitChangeLog } from './GitChangeLog';

const POLL_INTERVAL = 10000;

const _V1LibraryDeployPage = () => {
  const [lastPolled, setLastPolled] = useState(new Date());

  const handleError = ErrorHandler();

  const [status, setStatus] = useState<ImplementationDeployStatus>(ImplementationDeployStatus.Idle);
  const [requestDateTime, setRequestDateTime] = useState<Date>();
  const [changes, setChanges] = useState<string[]>([]);

  const onLogUpdate = (data: V1LibraryLogQuery) => {
    if (data.v1LibraryLog?.changes) {
      setChanges(data.v1LibraryLog.changes);
    } else {
      setChanges([]);
    }
    if (data.v1LibraryLog?.status) {
      setStatus(data.v1LibraryLog.status);
    } else {
      setStatus(ImplementationDeployStatus.Error);
    }
    if (data.v1LibraryLog?.timestamp) {
      setRequestDateTime(data.v1LibraryLog.timestamp);
    } else {
      setRequestDateTime(undefined);
    }
  };

  const [callLibraryLog] = useV1LibraryLogLazyQuery({
    errorPolicy: 'all',
    onError: handleError,
    onCompleted: onLogUpdate,
  });

  const [callLibraryDeploy] = useV1LibraryDeployMutation({
    errorPolicy: 'all',
    onCompleted: () => callLibraryLog(),
    onError: handleError,
  });

  const checkPollResult = (data: V1LibraryPollQuery) => {
    const updatedLogs = data.v1LibraryPoll ?? 0;
    if (updatedLogs > 0) {
      // console.log(`Updating Logs ${updatedLogs}`);
      setLastPolled(new Date());
      callLibraryLog();
    } else {
      // console.log(`Not updating: ${updatedLogs}`);
    }
  };

  const { data: pollData } = useV1LibraryPollQuery({
    variables: {
      lastUpdated: lastPolled,
    },
    skip: false,
    pollInterval: POLL_INTERVAL,
  });

  useEffect(() => {
    if (pollData) {
      checkPollResult(pollData);
    }
  }, [pollData]);

  useEffect(() => {
    callLibraryLog();
  }, []);

  const doDeploy = () => {
    setStatus(ImplementationDeployStatus.InProgress);
    callLibraryDeploy().then();
  };

  return (
    <LayoutDashboard id="PageV1LibDeploy" menuOptionSelected={ROUTE_V1LIB_DEPLOY.API_ID}>
      <PageHeader id="__V1LibDeployHeader">
        <Container>
          <Row>
            <Column lg="6" direction="row">
              <PageTitle id="__Page_Title" title="V1 Library Deploy" />
            </Column>
          </Row>
        </Container>
      </PageHeader>
      <PageBody id="__LibraryDeployBody">
        <Container>
          <GitChangeLog requestDateTime={requestDateTime} status={status} changes={changes} />
          <Row>
            <Column>
              <DeployButton
                id="__DeployBtn"
                variant="primary"
                disabled={status === ImplementationDeployStatus.InProgress}
                text="Deploy"
                onClick={doDeploy}
              />
            </Column>
          </Row>
        </Container>
      </PageBody>
    </LayoutDashboard>
  );
};

const V1LibraryDeployPage = memo(_V1LibraryDeployPage);

export { V1LibraryDeployPage };
