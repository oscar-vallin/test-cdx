import { ReactElement } from 'react';
import {
  DetailsList,
  DetailsListLayoutMode,
  IColumn, IDetailsColumnProps, IRenderFunction,
  SelectionMode,
  Stack
} from '@fluentui/react';
import { WorkPacketStatusDetails } from 'src/data/services/graphql';
import { Card } from 'src/components/cards';
import { Text } from 'src/components/typography';
import { EmptyState } from 'src/containers/states';

const centerColumn = (item?: any, index?: number, column?: IColumn) => {
  return (
    <div style={{display: 'block', textAlign: 'center'}}>
      {column?.fieldName && column?.fieldName in item ? item[column?.fieldName] : ''}
    </div>
  );
}

const centerColumnHeader:IRenderFunction<IDetailsColumnProps> = (prop?: IDetailsColumnProps) => {
  return <div style={{display: 'block', textAlign: 'center'}}>{prop?.column.name}</div>
}


const commonProps = { data: 'string', isPadded: true };
const countColProps = { minWidth: 50, flexGrow: 1, onRender: centerColumn, onRenderHeader: centerColumnHeader };
const COLUMNS: IColumn[] = [
  { key: 'planCode', name: 'Plan Code', fieldName: 'planCode', minWidth: 250, flexGrow: 2, ...commonProps },
  { key: 'activeSubscribers', name: 'Active', fieldName: 'activeSubscribers', ...commonProps, ...countColProps},
  { key: 'endedSubscribers', name: 'Ended', fieldName: 'endedSubscribers', ...commonProps, ...countColProps },
  { key: 'activeDependents', name: 'Active', fieldName: 'activeDependents', ...commonProps, ...countColProps },
  { key: 'endedDependents', name: 'Ended', fieldName: 'endedDependents', ...commonProps, ...countColProps },
];

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
      <Stack horizontal={true} verticalAlign="start" wrap={true} tokens={{childrenGap: 15}}>
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
