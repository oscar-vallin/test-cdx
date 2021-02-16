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
].map(col => ({ ...col, data: 'string', isPadded: true }));

const onRenderDetailsHeader = props => (
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
  return <StyledRow {...props} />
}

const EnrollmentStatsTab = ({ items }) => {
  const data = [
    { planCode: 'Any Plan' },
    { planCode: 'Dependent Life' },
    { planCode: 'Spousal Life' },
    { planCode: 'Suppl. Employee Life Nicotine User' },
    { planCode: 'Suppl. Employee Life Non-Nicotine User' },
    { planCode: 'All Plans' },
    { planCode: 'Buy-up STD' },
    { planCode: 'Core STD' },
    { planCode: 'LTD' },
    { planCode: 'STD' },
  ].map(row => ({
    ...row,
    activeSubscribers: items.insuredStat.subscribers.active?.value || 0,
    endedSubscribers: items.insuredStat.subscribers.ended?.value || 0,
    activeDependents: items.excludedInsuredStat.subscribers.active?.value || 0,
    endedDependents: items.excludedInsuredStat.subscribers.active?.value || 0,
  }));

  const GROUPS = [
    { count: 5, key: 'insuredStats', name: 'Included Subscribers / Enrollments', level: 0 },
    { count: 5, key: 'excludedStats', name: 'Excluded Subscribers / Enrollments', startIndex: 5, level: 0 },
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
}

export default EnrollmentStatsTab;