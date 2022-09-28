import { useState, useEffect } from 'react';
import { DetailsList, PrimaryButton, Spinner, SpinnerSize } from '@fluentui/react';
import { useXchangeJobGroupsLazyQuery, XchangeJobGroupConnection, XchangeJobGroup } from 'src/data/services/graphql';
import { Container, Row, Column } from 'src/components/layouts'
import { PageTitle } from 'src/components/typography'
import { PageHeader } from 'src/containers/headers/PageHeader'
import { ROUTE_XCHANGE_JOB_GROUPS } from 'src/data/constants/RouteConstants'
import { LayoutDashboard } from 'src/layouts/LayoutDashboard'
import { useOrgSid } from 'src/hooks/useOrgSid';
import { Spacing } from 'src/components/spacings/Spacing';
import { EmptyState } from 'src/containers/states';
import { JobGroupsPanel } from './JobGroupsPanel';

const JobGroups = () => {
  const { orgSid } = useOrgSid();
  const [xchangeJobGroups, setXchangeJobGroups] = useState<XchangeJobGroupConnection | null>();
  const [nodesJobGroups, setNodesjobGroups] = useState<XchangeJobGroup[] | null>();
  const [isOpenPanel, setIsOpenPanel] = useState(false);

  const [
    jobGroups, { data: jobGroupsData, loading: isLoadingJobGroups },
  ] = useXchangeJobGroupsLazyQuery();

  const fetchdataJobGroups = () => {
    jobGroups({
      variables: {
        orgSid,
      },
    });
  };

  useEffect(() => {
    fetchdataJobGroups();
  }, [orgSid]);

  useEffect(() => {
    if (!isLoadingJobGroups && jobGroupsData) {
      setXchangeJobGroups(jobGroupsData.xchangeJobGroups);
      setNodesjobGroups(jobGroupsData.xchangeJobGroups?.nodes);
    }
  }, [jobGroupsData, isLoadingJobGroups]);

  const renderCreateButton = () => (
    <PrimaryButton
      id="__JobGroup"
      iconProps={{ iconName: 'ReminderTime' }}
      onClick={() => {
        console.log('here')
        setIsOpenPanel(true)
      }}
    >
      Create Job Group
    </PrimaryButton>
  );

  const renderBody = () => {
    if (isLoadingJobGroups) {
      return (
        <Spacing margin={{ top: 'double' }}>
          <Spinner size={SpinnerSize.large} label="Loading Job Groups" />
        </Spacing>
      );
    }

    if (nodesJobGroups && nodesJobGroups.length > 0) {
      return (
        <DetailsList
          items={nodesJobGroups}
        />
      )
    }
    return (
      <EmptyState
        description="There are no configured Job Groups"
      />
    )
  }
  return (
    <LayoutDashboard id="XchangeJobGroup" menuOptionSelected={ROUTE_XCHANGE_JOB_GROUPS.API_ID}>
      <PageHeader id="__XchangejobGroupHeader">
        <Container>
          <Row>
            <Column lg="6" direction="row">
              <PageTitle id="__Page_Title_Xchange_JobGroups" title="Xchange Job Groups" />
            </Column>
            <Column lg="6" right>
              {renderCreateButton()}
            </Column>
          </Row>
          {renderBody()}
        </Container>
      </PageHeader>
      <JobGroupsPanel
        isPanelOpen={isOpenPanel}
        closePanel={setIsOpenPanel}
      />
    </LayoutDashboard>
  );
};

export { JobGroups };
