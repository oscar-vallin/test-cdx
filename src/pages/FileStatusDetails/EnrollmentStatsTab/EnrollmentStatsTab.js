import React, { Fragment } from 'react';
import { Spacing } from '../../../components/spacings/Spacing';
import { StyledHeaderRow, StyledHeader, StyledRow } from '../FileStatusDetails.styles';
import { DetailsList, DetailsListLayoutMode, SelectionMode } from 'office-ui-fabric-react/lib/DetailsList';

const COLUMNS = [
  { key: 'planCode', name: 'Plan Code', fieldName: 'planCode' },
  { key: 'activeSubscribers', name: 'Active', fieldName: 'activeSubscribers' },
  { key: 'endedSubscribers', name: 'Ended', fieldName: 'endedSubscribers' },
  { key: 'activeDependents', name: 'Active', fieldName: 'activeDependents' },
  { key: 'endedDependents', name: 'Ended', fieldName: 'endedDependents' },
].map((col) => ({ ...col, data: 'string', isPadded: true }));

const onRenderDetailsHeader = (props) => (
  <Fragment>
    <StyledHeaderRow>
      <div></div>
      <div>Subscribers</div>
      <div>Dependents</div>
    </StyledHeaderRow>

    <StyledHeader {...props} />
  </Fragment>
);

const onRenderRow = (props) => {
  return <StyledRow {...props} />;
};

const EnrollmentStatsTab = ({ items }) => {
  const data = [...items.planInsuredStat, ...items.excludedPlanInsuredStat].map((plan) => ({
    planCode: plan.planCode,
    activeSubscribers: plan.subscribers?.active?.value || 0,
    endedSubscribers: plan.subscribers?.ended?.value || 0,
    activeDependents: plan.dependents?.active?.value || 0,
    endedDependents: plan.dependents?.active?.value || 0,
  }));

  const GROUPS = [
    {
      count: items.planInsuredStat.length,
      key: 'insuredStats',
      name: 'Included Subscribers / Enrollments',
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

export default EnrollmentStatsTab;
