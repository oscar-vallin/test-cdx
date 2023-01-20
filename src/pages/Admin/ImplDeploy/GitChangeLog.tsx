import { Text } from 'src/components/typography';
import {
  Label,
  List,
  Spinner,
  SpinnerSize,
} from '@fluentui/react';
import { Row } from 'src/pages/Admin/ImplDeploy/ImplementationDeployPage.styles';
import { Column } from 'src/components/layouts';
import { prettyEnumValue } from 'src/utils/CDXUtils';
import { ImplementationDeployStatus } from 'src/data/services/graphql';
import React from 'react';

type GitChangeLogType = {
  requestDateTime?: Date;
  status: ImplementationDeployStatus;
  changes: string[];
};

export const GitChangeLog = ({ requestDateTime, status, changes }: GitChangeLogType) => {
  const onRenderCell = (item: string | undefined) => <Text>{item}</Text>;

  const renderChangesList = () => {
    if (changes.length > 0) {
      return <List items={changes} onRenderCell={onRenderCell} />;
    }
    return <Text>No recent updates found.</Text>;
  };

  return (
    <>
      <Row>
        <Column lg="6">
          <Label>Status</Label>
          <Text>{prettyEnumValue(status)}</Text>
          {status === ImplementationDeployStatus.InProgress
            && <Spinner size={SpinnerSize.large} />}
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
              Click the <strong>Deploy</strong> button
              to begin deploying the latest updates to the Implementations
            </Text>
          </Column>
        </Row>
      )}
    </>
  );
}
