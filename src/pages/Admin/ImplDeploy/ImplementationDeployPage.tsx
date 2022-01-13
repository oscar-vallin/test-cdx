import { memo, useState } from 'react';
import { SpinnerSize, List } from '@fluentui/react';
import { format } from 'date-fns';
import { LayoutAdmin } from 'src/layouts/LayoutAdmin';
import { Spacing } from '../../../components/spacings/Spacing';
import { Column } from 'src/components/layouts';
import { PageTitle, Text } from 'src/components/typography';
import { ImplementationDeployMutation, useImplementationDeployMutation } from 'src/data/services/graphql';
import { Spinner } from 'src/components/spinners/Spinner';
import { Label } from '../../../components/labels/Label';
import { DeployButton, Row } from './ImplementationDeployPage.styles';

const _ImplementationDeployPage = () => {
  const onImplementationDeploy = (data: ImplementationDeployMutation) => {
    setInit(false);
    setDataLoading(false);
    const timestamp = format(new Date(data?.implementationDeploy?.timestamp), 'MM/dd/yyyy hh:mm a');
    setRequestDateTime(timestamp);
    setStatus(data?.implementationDeploy?.response ?? 'Unknown');
    setChanges(data?.implementationDeploy?.changes ?? []);
  };
  const [apiCall, { data }] = useImplementationDeployMutation({
    errorPolicy: 'all',
    onCompleted: onImplementationDeploy,
  });

  const [init, setInit] = useState(true);
  const [dataLoading, setDataLoading] = useState(false);
  const [status, setStatus] = useState<string>('Unknown');
  const [requestDateTime, setRequestDateTime] = useState<string>(format(new Date(), 'MM/dd/yyyy hh:mm a'));
  const [changes, setChanges] = useState<any[]>([]);

  const doDeploy = () => {
    setDataLoading(true);
    apiCall().then(() => {
      if (data) {
        setInit(false);
      }
    });
    return null;
  };

  const renderDeploymentResult = () => {
    if (dataLoading) {
      return (
        <Row>
          <Column>
            <Spinner size={SpinnerSize.large} label="Deploying..." />
          </Column>
        </Row>
      );
    }
    if (init) {
      return (
        <Row>
          <Column>
            <Text>
              Click the <strong>Deploy</strong> button to begin deploying the latest updates to the Implementations
            </Text>
          </Column>
        </Row>
      );
    }
    return (
      <>
        <Row>
          <Column lg="6">
            <Label>Status</Label>
            <Text>{status}</Text>
          </Column>
          <Column lg="6">
            <Label>Last Update</Label>
            <Text>{requestDateTime}</Text>
          </Column>
        </Row>
        <Row>
          <Column>
            <Label>Changes</Label>
            {renderChangesList()}
          </Column>
        </Row>
      </>
    );
  };

  const renderChangesList = () => {
    if (changes.length > 0) {
      return <List items={changes} onRenderCell={onRenderCell} />;
    }
    return <Text>No Changes since the last Deployment.</Text>;
  };

  const onRenderCell = (item: string | undefined) => {
    return <Text>{item}</Text>;
  };

  return (
    <LayoutAdmin id="PageDefaultTheme" sidebarOptionSelected="FTP_TEST">
      <Spacing margin="double">
        <Row>
          <Column>
            <PageTitle id="__Impl_Deploy_Title" title="Implementation Deploy" />
          </Column>
        </Row>
        {renderDeploymentResult()}
        <Row>
          <Column>
            <DeployButton id="__DeployBtn" variant="primary" disabled={dataLoading} text="Deploy" onClick={doDeploy} />
          </Column>
        </Row>
      </Spacing>
    </LayoutAdmin>
  );
};

const ImplementationDeployPage = memo(_ImplementationDeployPage);

export { ImplementationDeployPage };
