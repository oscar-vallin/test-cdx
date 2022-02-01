import { ReactElement } from 'react';
import {
  DetailsList,
  DetailsListLayoutMode,
  IColumn,
  SelectionMode,
  Stack
} from '@fluentui/react';
import { WorkPacketStatusDetails } from 'src/data/services/graphql';
import { Card } from 'src/components/cards';
import { Text } from 'src/components/typography';
import { EmptyState } from 'src/containers/states';

const COLUMNS: IColumn[] = [
  { key: 'planCode', name: 'Plan Code', fieldName: 'planCode', minWidth: 250, flexGrow: 2 },
  { key: 'activeSubscribers', name: 'Active', fieldName: 'activeSubscribers', minWidth: 50, flexGrow: 1 },
  { key: 'endedSubscribers', name: 'Ended', fieldName: 'endedSubscribers', minWidth: 50, flexGrow: 1 },
  { key: 'activeDependents', name: 'Active', fieldName: 'activeDependents', minWidth: 50, flexGrow: 1 },
  { key: 'endedDependents', name: 'Ended', fieldName: 'endedDependents', minWidth: 50, flexGrow: 1 },
].map((col) => ({ ...col, data: 'string', isPadded: true }));

type EnrollmentStatsTabProps = {
  packet?: WorkPacketStatusDetails;
}

const EnrollmentStatsTab = ({ packet }: EnrollmentStatsTabProps): ReactElement => {
  const insuredStats = packet?.enrollmentStats?.planInsuredStat
    ?.filter((itm) => itm)
    ?.map((plan) => ({
    planCode: plan?.planCode,
    activeSubscribers: plan?.subscribers?.active?.value || 0,
    endedSubscribers: plan?.subscribers?.ended?.value || 0,
    activeDependents: plan?.dependents?.active?.value || 0,
    endedDependents: plan?.dependents?.active?.value || 0,
  })) ?? [];

  const excludedInsuredStats = packet?.enrollmentStats?.excludedPlanInsuredStat
    ?.filter((itm) => itm)
    ?.map((plan) => ({
      planCode: plan?.planCode,
      activeSubscribers: plan?.subscribers?.active?.value || 0,
      endedSubscribers: plan?.subscribers?.ended?.value || 0,
      activeDependents: plan?.dependents?.active?.value || 0,
      endedDependents: plan?.dependents?.active?.value || 0,
    })) ?? [];

  if (insuredStats?.length > 0 || excludedInsuredStats?.length > 0) {
    return (
      <Stack horizontal={true} verticalAlign="start" wrap={true} tokens={{childrenGap: 10}}>
        {insuredStats?.length > 0 && (
          <Stack.Item>
            <Card>
              <Stack horizontal tokens={{childrenGap: 10, padding: 10}}>
                <Stack.Item grow><Text>Included Subscribers / Enrollments</Text></Stack.Item>
                <Stack.Item grow><Text>Subscribers</Text></Stack.Item>
                <Stack.Item grow><Text>Dependents</Text></Stack.Item>
              </Stack>

              <DetailsList
                compact
                items={insuredStats}
                columns={COLUMNS}
                selectionMode={SelectionMode.none}
                layoutMode={DetailsListLayoutMode.justified}
              />
            </Card>
          </Stack.Item>
        )}

        {excludedInsuredStats?.length > 0 && (
          <Stack.Item>
            <Card>
              <Stack horizontal tokens={{childrenGap: 10, padding: 10}}>
                <Stack.Item grow><Text>Excluded Subscribers / Enrollments</Text></Stack.Item>
                <Stack.Item grow><Text>Subscribers</Text></Stack.Item>
                <Stack.Item grow><Text>Dependents</Text></Stack.Item>
              </Stack>
              <DetailsList
                compact
                items={excludedInsuredStats}
                columns={COLUMNS}
                selectionMode={SelectionMode.none}
                layoutMode={DetailsListLayoutMode.justified}
              />
            </Card>
          </Stack.Item>
        )}
      </Stack>
    );
  }

  return (
    <EmptyState title="No Enrollment Stats for this exchange"/>
  );
};

export default EnrollmentStatsTab;
