import React from 'react';
import { DetailsList, DetailsListLayoutMode, SelectionMode } from 'office-ui-fabric-react/lib/DetailsList';

import { Badge } from '../../../components/badges/Badge';
import { Button } from '../../../components/buttons/Button';
import { Card } from '../../../components/cards/Card';
import { ChartDonut } from '../../../components/charts/ChartDonut';
import { Row, Column } from '../../../components/layouts';
import { Spacing } from '../../../components/spacings/Spacing';
import { MessageBar } from '../../../components/notifications/MessageBar';
import { Separator } from '../../../components/separators/Separator';
import { TableQualityChecks } from '../../../containers/tables/TableQualityChecks';

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

const onRenderItemColumn = (item, index, column) => {
  const data = item.recordCreationEvent[0];
  const details = data.error.length > 0
    ? data.error[0]
    : data.warning.length > 0
      ? data.warning[0]
      : [{}];
      
  switch(column.key) {
    case 'status':
      return <>
        {data.error.length > 0 && <Badge variant="error" label="Error" pill />} &nbsp;
        {data.warning.length > 0 && <Badge variant="warning" label="Warning" pill />}
      </>
    case 'employeeId':
      return item.unitId;
    case 'employee':
      return data.outerContext;
    case 'dependent':
      return data.context;
    case 'message':
      return (details.message || [])[0];
    case 'field':
      return data.name;
    case 'value':
      return data.rawValue;
    case 'transformedValue':
      return data.value;
    default:
      return '';
  }
}

const QualityChecksTab = ({ items }) => {
  const chartInfo = items
    .map(({ recordCreationEvent }) => ({ errors: recordCreationEvent[0].error.length, warnings: recordCreationEvent[0].warning.length }))
    .reduce((curr, count) => ({ 
      errors: curr.errors + count.errors,
      warnings: curr.warnings + count.warnings,
    }), { errors: 0, warnings: 0 });
    
  return (
    <Spacing padding="normal">
      {items.length > 0 && (
        <Spacing margin={{ bottom: 'normal' }}>
          <Row>
            <Column>
              <MessageBar type="error" content={`The error count (${items.length}) is greater than the configured ceiling of 0.`} />
            </Column>
          </Row>
        </Spacing>
      )}

      <Row>
        <Column xl={3}>
          <Card elevation="smallest">
            <div style={{ display: 'flex', justifyContent: 'center' }}>
              <ChartDonut
                size={70}
                data={[
                  { key: 0, label: 'Errors', value: chartInfo.errors, color: '#fde7e9' },
                  { key: 1, label: 'Warnings', value: chartInfo.warnings, color: '#fff4ce' }
                ]}
              />
            </div>

            <Spacing margin={{ top: 'normal' }}>
              <Separator />
            </Spacing>

            <Button variant="light" block>
              Download errors
            </Button>
          </Card>
        </Column>

        <Column xl={9}>
          <Card elevation="smallest">
            <DetailsList
              compact
              items={items}
              columns={COLUMNS}
              selectionMode={SelectionMode.none}
              layoutMode={DetailsListLayoutMode.justified}
              onRenderItemColumn={onRenderItemColumn}
              isHeaderVisible
            />

            <Separator />

            <div>
              <Button variant="primary">Continue processing</Button> &nbsp;
              <Button
                split
                text="Cancel processing"
                onClick={() => alert('Click')}
                menuProps={{
                  items: [{ text: 'Error out', key: 'ErrorOut' }],
                }}
              >
                Cancel processing
              </Button>
            </div>
          </Card>
        </Column>
      </Row>
    </Spacing>
  );
};

export default QualityChecksTab;
