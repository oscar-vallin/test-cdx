import { Card } from 'src/components/cards';
import {
  DetailsList,
  DetailsListLayoutMode,
  IColumn,
  IDetailsColumnProps,
  IRenderFunction,
  SelectionMode,
  Stack,
} from '@fluentui/react';
import { Text } from 'src/components/typography';
import { EnrollmentStatType } from 'src/pages/FileStatusDetails/EnrollmentStatsTab/types';

const centerColumn = (item?: any, index?: number, column?: IColumn) => (
  <div style={{ display: 'block', textAlign: 'center' }}>
    {column?.fieldName && column?.fieldName in item ? item[column?.fieldName] : ''}
  </div>
);

const centerColumnHeader: IRenderFunction<IDetailsColumnProps> = (prop?: IDetailsColumnProps) => <div style={{ display: 'block', textAlign: 'center' }}>{prop?.column.name}</div>;

const commonProps = { data: 'string', isPadded: true };
const countColProps = {
  minWidth: 50, flexGrow: 1, onRender: centerColumn, onRenderHeader: centerColumnHeader,
};
const COLUMNS: IColumn[] = [
  {
    key: 'planCode', name: 'Plan Code', fieldName: 'planCode', minWidth: 250, flexGrow: 2, ...commonProps,
  },
  {
    key: 'activeSubscribers', name: 'Active', fieldName: 'activeSubscribers', ...commonProps, ...countColProps,
  },
  {
    key: 'endedSubscribers', name: 'Ended', fieldName: 'endedSubscribers', ...commonProps, ...countColProps,
  },
  {
    key: 'activeDependents', name: 'Active', fieldName: 'activeDependents', ...commonProps, ...countColProps,
  },
  {
    key: 'endedDependents', name: 'Ended', fieldName: 'endedDependents', ...commonProps, ...countColProps,
  },
];

type PlanInsuredStatsTableType = {
  header: string;
  caption?: string;
  planInsuredStats: EnrollmentStatType[];
};

export const PlanInsuredStatsTable = ({
  header, caption, planInsuredStats,
}: PlanInsuredStatsTableType) => (
  <Card>
    <Text variant="muted">{caption}</Text>
    <Stack horizontal tokens={{ childrenGap: 10, padding: 10 }}>
      <Stack.Item grow>
        <Text>{header}</Text>
      </Stack.Item>
      <Stack.Item grow>
        <Text>Subscribers</Text>
      </Stack.Item>
      <Stack.Item grow>
        <Text>Dependents</Text>
      </Stack.Item>
    </Stack>
    <DetailsList
      compact
      items={planInsuredStats}
      columns={COLUMNS}
      selectionMode={SelectionMode.none}
      layoutMode={DetailsListLayoutMode.justified}
    />
  </Card>
);
