import { useState, useEffect } from 'react';
import { PrimaryButton } from '@fluentui/react';
import { useXchangeJobGroupsLazyQuery } from 'src/data/services/graphql';
import { Container, Row, Column } from 'src/components/layouts'
import { PageTitle } from 'src/components/typography'
import { PageHeader } from 'src/containers/headers/PageHeader'
import { ROUTE_XCHANGE_JOB_GROUPS } from 'src/data/constants/RouteConstants'
import { LayoutDashboard } from 'src/layouts/LayoutDashboard'
import { useOrgSid } from 'src/hooks/useOrgSid';

const JobGroups = () => {
  const { orgSid } = useOrgSid();
  const [some, setSome] = useState('');

  const [
    xchangeJobGroups, { data: jobGroupsData, loading: isLoadingJobGroups },
  ] = useXchangeJobGroupsLazyQuery();

  const fetchdataJobGroups = () => {
    xchangeJobGroups({
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
        console.log(jobGroupsData)
    }
  }, [jobGroupsData, isLoadingJobGroups]);

  const renderCreateButton = () => (
    <PrimaryButton
      id="__JobGroup"
      iconProps={{ iconName: 'ReminderTime' }}
    >
      Create Job Group
    </PrimaryButton>
  )
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
        </Container>
      </PageHeader>
    </LayoutDashboard>
  );
};

export { JobGroups };
