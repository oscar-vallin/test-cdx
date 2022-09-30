import { useState, useEffect } from 'react';
import {
  DetailsList,
  DetailsListLayoutMode,
  IColumn,
  PrimaryButton,
  SelectionMode,
  Spinner,
  SpinnerSize,
  Stack,
  Text,
} from '@fluentui/react';
import { useXchangeJobGroupsLazyQuery, XchangeJobGroupConnection, XchangeJobGroup } from 'src/data/services/graphql';
import { Container, Row, Column } from 'src/components/layouts'
import { PageTitle } from 'src/components/typography'
import { PageHeader } from 'src/containers/headers/PageHeader'
import { ROUTE_XCHANGE_JOB_GROUPS } from 'src/data/constants/RouteConstants'
import { LayoutDashboard } from 'src/layouts/LayoutDashboard'
import { useOrgSid } from 'src/hooks/useOrgSid';
import { Spacing } from 'src/components/spacings/Spacing';
import { EmptyState } from 'src/containers/states';
import { SchedulePanel } from '../SchedulePanel';
import { ButtonLink } from 'src/components/buttons';

const JobGroups = () => {
  const { orgSid } = useOrgSid();
  const [xchangeJobGroups, setXchangeJobGroups] = useState<XchangeJobGroupConnection | null>();
  const [nodesJobGroups, setNodesjobGroups] = useState<XchangeJobGroup[] | null>([]);
  const [isOpenPanel, setIsOpenPanel] = useState(false);
  const [refreshJobGroupPage, setRefreshJobGroup] = useState(false);
  const [currentSid, setCurrentSid] = useState('');

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
    setRefreshJobGroup(false);
    fetchdataJobGroups();
  }, [orgSid, refreshJobGroupPage]);

  useEffect(() => {
    if (!isLoadingJobGroups && jobGroupsData) {
      setXchangeJobGroups(jobGroupsData.xchangeJobGroups);
      setNodesjobGroups(jobGroupsData.xchangeJobGroups?.nodes ?? []);
      console.log(jobGroupsData)
    }
  }, [jobGroupsData, isLoadingJobGroups]);

  const columns: IColumn[] = [
    {
      name: 'Name',
      key: 'name',
      fieldName: 'name',
      data: 'string',
      isPadded: true,
      minWidth: 150,
      maxWidth: 400,
      flexGrow: 1,
    },
    {
      name: 'Schedule',
      key: 'schedule',
      fieldName: 'schedule',
      data: 'string',
      isPadded: true,
      minWidth: 300,
      maxWidth: 400,
      flexGrow: 1,
    },
    {
      name: 'Included Xchanges',
      key: 'includedExchanges',
      fieldName: 'includedExchanges',
      data: 'string',
      isPadded: true,
      minWidth: 300,
      maxWidth: 400,
      flexGrow: 1,
    },
  ];

  const renderCreateButton = () => (
    <PrimaryButton
      id="__JobGroup"
      iconProps={{ iconName: 'ReminderTime' }}
      onClick={() => {
        setIsOpenPanel(true)
      }}
    >
      Create Job Group
    </PrimaryButton>
  );

  const onRenderItemColumn = (item: XchangeJobGroup, itemIndex?: number, column?: IColumn) => {
    let columnVal: string | undefined;
    if (column?.key === 'name') {
      columnVal = item.name ?? '';
    }

    return (
      <Stack horizontal horizontalAlign="start" tokens={{ childrenGap: 10 }}>
        {column?.key === 'name' && (
          <ButtonLink underline>
            {columnVal}
          </ButtonLink>
        )}
        {column?.key === 'schedule' && (
          <Stack>
            <Text>
              {item.schedule.expectedRunSchedule}
            </Text>
            <Text>
              {item.schedule.expectedCompletionTime}
            </Text>
          </Stack>
        )}
      </Stack>
    );
  };

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
          items={nodesJobGroups ?? []}
          columns={columns}
          onRenderItemColumn={onRenderItemColumn}
          selectionMode={SelectionMode.none}
          layoutMode={DetailsListLayoutMode.justified}
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
      <SchedulePanel
        isPanelOpen={isOpenPanel}
        closePanel={setIsOpenPanel}
        xchangeConfigSid={currentSid}
        refreshPage={setRefreshJobGroup}
        schedule={false}
        xchangePorcessed={[]}
      />
    </LayoutDashboard>
  );
};

export { JobGroups };
