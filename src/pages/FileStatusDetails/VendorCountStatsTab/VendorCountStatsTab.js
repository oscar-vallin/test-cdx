import React from 'react';
import { Spacing } from '../../../components/spacings/Spacing';
import { DetailsList, DetailsListLayoutMode, SelectionMode } from 'office-ui-fabric-react/lib/DetailsList';

const COLUMNS = [
  { key: 'status', name: 'Status', fieldName: 'status' },
  { key: 'employeeId', name: 'Employee ID', fieldName: 'employeeId' },
  { key: 'employee', name: 'Employee', fieldName: 'employee' },
  { key: 'dependent', name: 'Dependent', fieldName: 'dependent' },
  { key: 'message', name: 'Message', fieldName: 'message' },
  { key: 'field', name: 'Field', fieldName: 'field' },
  { key: 'value', name: 'Value', fieldName: 'value' },
  { key: 'transformedValue', name: 'Transform value', fieldName: 'transformedValue' },
].map(col => ({ ...col, data: 'string', isPadded: true }))

const VendorCountStatsTab = () => {
  return (
    <Spacing padding="normal">
      {/* <DetailsList
        compact
        items={items}
        columns={COLUMNS}
        selectionMode={SelectionMode.none}
        layoutMode={DetailsListLayoutMode.justified}
        onRenderItemColumn={onRenderItemColumn}
        isHeaderVisible
      /> */}
    </Spacing>
  );
};

export default VendorCountStatsTab;
