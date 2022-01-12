import { ReactElement } from 'react';
import { DetailsList, DetailsListLayoutMode, SelectionMode, IGroup } from '@fluentui/react';
import { Spacing } from 'src/components/spacings/Spacing';
import { StyledHeaderRow, StyledHeader, StyledRow } from '../FileStatusDetails.styles';

const COLUMNS: any = [
  { key: 'planCode', name: 'Plan Code', fieldName: 'planCode' },
  { key: 'activeSubscribers', name: 'Active', fieldName: 'activeSubscribers' },
  { key: 'endedSubscribers', name: 'Ended', fieldName: 'endedSubscribers' },
  { key: 'activeDependents', name: 'Active', fieldName: 'activeDependents' },
  { key: 'endedDependents', name: 'Ended', fieldName: 'endedDependents' },
].map((col) => ({ ...col, data: 'string', isPadded: true }));

const onRenderDetailsHeader = (props) => (
  <>
    <StyledHeaderRow>
      <div />
      <div>Subscribers</div>
      <div>Dependents</div>
    </StyledHeaderRow>

    <StyledHeader {...props} />
  </>
);

const onRenderRow = (props) => {
  return <StyledRow {...props} />;
};

const defaultProps = {
  items: '',
};

type EnrollmentStatsTabProps = {
  items?: any;
} & typeof defaultProps;

const EnrollmentStatsTab = ({ items }: EnrollmentStatsTabProps): ReactElement => {
  const data = [...items.planInsuredStat, ...items.excludedPlanInsuredStat].map((plan) => ({
    planCode: plan.planCode,
    activeSubscribers: plan.subscribers?.active?.value || 0,
    endedSubscribers: plan.subscribers?.ended?.value || 0,
    activeDependents: plan.dependents?.active?.value || 0,
    endedDependents: plan.dependents?.active?.value || 0,
  }));

  const GROUPS: IGroup[] = [
    {
      count: items.planInsuredStat.length,
      key: 'insuredStats',
      name: 'Included Subscribers / Enrollments',
      startIndex: [],
      level: 0,
    },
    {
      count: items.excludedPlanInsuredStat.length,
      key: 'excludedStats',
      name: 'Excluded Subscribers / Enrollments',
      startIndex: items.excludedPlanInsuredStat.length,
      level: 0,
    },
  ];

  return (
    <Spacing padding="normal">
      <DetailsList
        compact
        items={data}
        columns={COLUMNS}
        groups={GROUPS}
        selectionMode={SelectionMode.none}
        layoutMode={DetailsListLayoutMode.justified}
        onRenderDetailsHeader={onRenderDetailsHeader}
        onRenderRow={onRenderRow}
        isHeaderVisible
      />
    </Spacing>
  );
};

EnrollmentStatsTab.defaultProps = defaultProps;

export default EnrollmentStatsTab;
