import React, { memo, useEffect, useState } from 'react';
import { Label, List } from '@fluentui/react';
import { LayoutDashboard } from 'src/layouts/LayoutDashboard';
import { Column, Container } from 'src/components/layouts';
import { PageTitle, Text } from 'src/components/typography';
import {
  ImplementationDeployStatus,
  ImplementationLogQuery,
  ImplementationPollQuery,
  useImplementationDeployMutation,
  useImplementationLogLazyQuery,
  useImplementationPollQuery,
} from 'src/data/services/graphql';
import { ROUTE_IMPL_DEPLOY } from 'src/data/constants/RouteConstants';
import { PageHeader } from 'src/containers/headers/PageHeader';
import { PageBody } from 'src/components/layouts/Column';
import { ErrorHandler } from 'src/utils/ErrorHandler';
import { prettyEnumValue } from 'src/utils/CDXUtils';
import { DeployButton, Row } from './ImplementationDeployPage.styles';

const POLL_INTERVAL = 10000;

const _ImplementationDeployPage = () => {
  const [lastPolled, setLastPolled] = useState(new Date());

  const handleError = ErrorHandler();

  const [status, setStatus] = useState<ImplementationDeployStatus>(ImplementationDeployStatus.Idle);
  const [requestDateTime, setRequestDateTime] = useState<Date>();
  const [changes, setChanges] = useState<string[]>([]);

  const onLogUpdate = (data: ImplementationLogQuery) => {
    if (data.implementationLog?.changes) {
      setChanges(data.implementationLog.changes);
    } else {
      setChanges([]);
    }
    if (data.implementationLog?.status) {
      setStatus(data.implementationLog.status);
    } else {
      setStatus(ImplementationDeployStatus.Error);
    }
    if (data.implementationLog?.timestamp) {
      setRequestDateTime(data.implementationLog.timestamp);
    } else {
      setRequestDateTime(undefined);
    }
  };

  const [callImplLog] = useImplementationLogLazyQuery({
    errorPolicy: 'all',
    onError: handleError,
    onCompleted: onLogUpdate,
  });

  const [callImplDeploy] = useImplementationDeployMutation({
    errorPolicy: 'all',
    onCompleted: () => callImplLog(),
    onError: handleError,
  });

  const checkPollResult = (data: ImplementationPollQuery) => {
    const updatedLogs = data.implementationPoll ?? 0;
    if (updatedLogs > 0) {
      console.log(`Updating Logs ${updatedLogs}`);
      setLastPolled(new Date());
      callImplLog();
    } else {
      console.log(`Not updating: ${updatedLogs}`);
    }
  };

  const { data: pollData } = useImplementationPollQuery({
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
    callImplLog();
  }, []);

  const doDeploy = () => {
    callImplDeploy().then();
  };

  const onRenderCell = (item: string | undefined) => <Text>{item}</Text>;

  const renderChangesList = () => {
    if (changes.length > 0) {
      return <List items={changes} onRenderCell={onRenderCell} />;
    }
    return <Text>No recent updates found.</Text>;
  };

  const renderDeploymentResult = () => (
    <>
      <Row>
        <Column lg="6">
          <Label>Status</Label>
          <Text>{prettyEnumValue(status)}</Text>
        </Column>
        <Column lg="6">
          <Label>Last Deployment</Label>
          <Text>{requestDateTime}</Text>
        </Column>
      </Row>
      <Row>
        <Column>
          <Label>Latest Updates</Label>
          {renderChangesList()}
        </Column>
      </Row>
      {status !== ImplementationDeployStatus.InProgress && (
      <Row>
        <Column>
          <Text>
            Click the <strong>Deploy</strong> button to begin deploying the latest updates to the Implementations
          </Text>
        </Column>
      </Row>
      )}
    </>
  );

  return (
    <LayoutDashboard id="PageImplDeploy" menuOptionSelected={ROUTE_IMPL_DEPLOY.API_ID}>
      <PageHeader id="__ImplDeployHeader">
        <Container>
          <Row>
            <Column lg="6" direction="row">
              <PageTitle id="__Page_Title" title="Implementation Deploy" />
            </Column>
          </Row>
        </Container>
      </PageHeader>
      <PageBody id="__ImplDeployBody">
        <Container>
          {renderDeploymentResult()}
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

const ImplementationDeployPage = memo(_ImplementationDeployPage);

export { ImplementationDeployPage };
