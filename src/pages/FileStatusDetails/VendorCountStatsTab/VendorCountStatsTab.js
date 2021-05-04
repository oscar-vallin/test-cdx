import React from 'react';
import { Spacing } from '../../../components/spacings/Spacing';
import { DetailsList, DetailsListLayoutMode, SelectionMode } from 'office-ui-fabric-react/lib/DetailsList';
import { StyledRow, StyledVendorHeaderRow, StyledFooter } from '../FileStatusDetails.styles';

const COLUMNS = [
  { key: 'name', name: 'Record Name', fieldName: 'name' },
  { key: 'count', name: 'Count', fieldName: 'count', },
].map(col => ({ ...col, data: 'string', isPadded: true }));

const onRenderRow = (props) => {
  return <StyledRow {...props} />
}

const onRenderDetailsHeader = props => {
  return (
    <StyledVendorHeaderRow>
     {props.columns.map(column => <div>{column.name}</div>)}
    </StyledVendorHeaderRow>
  )
}

const onRenderDetailsFooter = (count, props) => {
  return (
    <StyledFooter>
      <div>Total</div>
      <div>{count}</div>
    </StyledFooter>
  );
}

const VendorCountStatsTab = ({ items }) => {
  return (
    <Spacing padding="normal">
      <DetailsList
        compact
        items={items.recordCount}
        columns={COLUMNS}
        selectionMode={SelectionMode.none}
        layoutMode={DetailsListLayoutMode.justified}
        onRenderRow={onRenderRow}
        onRenderDetailsHeader={onRenderDetailsHeader}
        onRenderDetailsFooter={(args) => onRenderDetailsFooter(items.totalCount, args)}
        isHeaderVisible
      />
    </Spacing>
  );
};

export default VendorCountStatsTab;
