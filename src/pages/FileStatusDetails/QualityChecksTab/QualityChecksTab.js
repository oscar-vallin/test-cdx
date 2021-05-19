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
].map((col) => ({ ...col, data: 'string', isPadded: true }));

const onRenderItemColumn = (item, index, column) => {
  switch (column.key) {
    case 'status':
      return (
        <>
          {item.status === 'ERROR' && <Badge variant="error" label="Error" pill />} <br />
          {item.status === 'WARNING' && <Badge variant="warning" label="Warning" pill />}
        </>
      );
    case 'employeeId':
      return <span title={item.employeeId}>{item.employeeId}</span>;
    case 'employee':
      return <span title={item.employee}>{item.employee}</span>;
    case 'dependent':
      return <span title={item.dependent}>{item.dependent}</span>;
    case 'message':
      return (
        <>
          {item.message.map((message, index) => (
            <div key={index} title={message}>
              {message}
            </div>
          ))}
        </>
      );
    case 'field':
      return <span title={item.field}>{item.field}</span>;
    case 'value':
      return <span title={item.rawValue}>{item.rawValue}</span>;
    case 'transformedValue':
      return <span title={item.value}>{item.value}</span>;
    default:
      return '';
  }
};

const QualityChecksTab = ({ items }) => {
  const chartInfo = items
    .map(({ recordCreationEvent }) => ({
      errors: recordCreationEvent.map((item) => item.error.length).reduce((sum, i) => sum + i, 0),
      warnings: recordCreationEvent.map((item) => item.warning.length).reduce((sum, i) => sum + i, 0),
    }))
    .reduce(
      (curr, count) => ({
        errors: curr.errors + count.errors,
        warnings: curr.warnings + count.warnings,
      }),
      { errors: 0, warnings: 0 }
    );

  const data = items
    .map(({ recordCreationEvent }) =>
      recordCreationEvent
        .map((evt) => {
          const arr = [];

          const parse = (status) => (item) => ({
            status: status,
            employeeId: evt.unitId,
            employee: evt.outerContext,
            dependent: evt.context,
            message: item.message,
            field: item.name,
            value: item.rawValue,
            transformValue: item.value,
          });

          if (evt.error.length > 0) {
            arr.push(evt.error.map(parse('ERROR')));
          }

          if (evt.warning.length > 0) {
            arr.push(evt.warning.map(parse('WARNING')));
          }

          return arr.reduce((arr, item) => [...arr, ...item], []);
        })
        .reduce((arr, item) => [...arr, ...(Array.isArray(item) ? item : [item])], [])
    )
    .reduce((arr, item) => [...arr, ...(Array.isArray(item) ? item : [item])], []);

  return (
    <Spacing padding="normal">
      {items.length > 0 && (
        <Spacing margin={{ bottom: 'normal' }}>
          <Row>
            <Column>
              <MessageBar
                type="error"
                content={`The error count (${data.length}) is greater than the configured ceiling of 0.`}
              />
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
                  { key: 1, label: 'Warnings', value: chartInfo.warnings, color: '#fff4ce' },
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
              items={data}
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
