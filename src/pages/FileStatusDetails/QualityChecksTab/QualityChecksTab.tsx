/* eslint-disable no-alert */
import { ReactElement } from 'react';
import { ActionButton, DetailsList, DetailsListLayoutMode, IColumn, SelectionMode } from '@fluentui/react';

import { Badge } from 'src/components/badges/Badge';
import { Card } from 'src/components/cards/Card';
import { ChartDonut } from 'src/components/charts/ChartDonut';
import { Row, Column } from 'src/components/layouts';
import { Spacing } from 'src/components/spacings/Spacing';
import { MessageBar } from 'src/components/notifications/MessageBar';
import { Separator } from 'src/components/separators/Separator';
import { FieldCreationEvent, Maybe, RecordCreationEvent, SequenceCreationEvent } from 'src/data/services/graphql';
import { theme } from 'src/styles/themes/theme';

const COLUMNS: IColumn[] = [
  { key: 'status', name: 'Status', fieldName: 'status', minWidth: 80, maxWidth: 80 },
  { key: 'employeeId', name: 'Employee ID', fieldName: 'employeeId', minWidth: 100, maxWidth: 100},
  { key: 'employee', name: 'Employee', fieldName: 'employee', minWidth: 100, maxWidth: 150 },
  { key: 'dependent', name: 'Dependent', fieldName: 'dependent', minWidth: 100, maxWidth: 150 },
  { key: 'message', name: 'Message', fieldName: 'message', minWidth: 150, grow: 1},
  { key: 'field', name: 'Field', fieldName: 'field', minWidth: 150 , grow: 1},
  { key: 'value', name: 'Value', fieldName: 'value', minWidth: 150 , grow: 1},
  { key: 'transformedValue', name: 'Transform value', fieldName: 'transformedValue', minWidth: 150 , grow: 1},
].map((col) => ({ ...col, data: 'string', isPadded: true }));

type RowType = {
  status: string;
  employeeId?: string;
  employee?: string;
  dependent?: string;
  messages?: Maybe<Maybe<string>[]>;
  field?: string;
  value?: string;
  transformValue?: string;
};

const onRenderItemColumn = (item: RowType, index?: number, column?: IColumn) => {
  switch (column?.key) {
    case 'status':
      return (
        <>
          {item.status === 'ERROR' && <Badge variant="error" label="Error" pill />}
          {item.status === 'WARNING' && <Badge variant="warning" label="Warning" pill />}
          {item.status === 'INFO' && <Badge variant="info" label="Information" pill />}
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
          {item?.messages?.map((message, _index) => (
            <div key={_index} title={message ?? undefined}>
              {message}
            </div>
          ))}
        </>
      );
    case 'field':
      return <span title={item.field}>{item.field}</span>;
    case 'value':
      return <span title={item.value}>{item.value}</span>;
    case 'transformedValue':
      return <span title={item.transformValue}>{item.transformValue}</span>;
    default:
      return '';
  }
};

type QualityChecksTabProps = {
  items?: Maybe<SequenceCreationEvent>[];
};

const QualityChecksTab = ({ items = [] }: QualityChecksTabProps): ReactElement => {
  const chartInfo = items
    .map((item) => ({
      errors: item?.recordCreationEvent?.map((item) => item?.error?.length).reduce((sum, i) => (sum ?? 0) + (i ?? 0), 0),
      warnings: item?.recordCreationEvent?.map((item) => item?.warning?.length).reduce((sum, i) => (sum ?? 0) + (i ?? 0), 0),
      infos: item?.recordCreationEvent?.map((item) => item?.information?.length).reduce((sum, i) => (sum ?? 0) + (i ?? 0), 0),
    }))
    .reduce(
      (curr, count) => ({
        errors: (curr?.errors ?? 0) + (count.errors ?? 0),
        warnings: (curr?.warnings ?? 0) + (count.warnings ?? 0),
        infos: (curr?.infos ?? 0) + (count.infos ?? 0)
      }),
      { errors: 0, warnings: 0, infos: 0 }
    );

  const eventToRow = (status: string, recordEvent: RecordCreationEvent, fieldEvent: FieldCreationEvent): RowType => {
    return {
      status,
      employeeId: recordEvent.unitId ?? '',
      employee: recordEvent.outerContext ?? '',
      dependent: recordEvent.context ?? '',
      messages: fieldEvent.message,
      field: fieldEvent.name ?? '',
      value: fieldEvent.rawValue ?? '',
      transformValue: fieldEvent.value ?? '',
    }
  };

  const data = (): RowType[] => {
    const rows: RowType[] = [];
    items?.forEach((item) => {
      if (item?.recordCreationEvent) {
        item?.recordCreationEvent?.forEach((creationEvent) => {
          if (creationEvent?.error) {
            creationEvent.error.forEach((fieldEvent) => {
              if (fieldEvent) {
                rows.push(eventToRow('ERROR', creationEvent, fieldEvent));
              }
            })
          }
          if (creationEvent?.warning) {
            creationEvent.warning.forEach((fieldEvent) => {
              if (fieldEvent) {
                rows.push(eventToRow('WARNING', creationEvent, fieldEvent));
              }
            })
          }
          if (creationEvent?.information) {
            creationEvent.information.forEach((fieldEvent) => {
              if (fieldEvent) {
                rows.push(eventToRow('INFO', creationEvent, fieldEvent));
              }
            })
          }
        })
      }
    });

    return rows;
  }

  return (
    <Spacing padding="normal">
      {(chartInfo?.errors ?? 0) > 0 && (
        <Spacing margin={{ bottom: 'normal' }}>
          <Row>
            <Column>
              <MessageBar
                type="error"
                content={`The error count (${chartInfo?.errors}) is greater than the configured ceiling of 0.`}
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
                  { name: '', key: 0, label: 'Errors', value: chartInfo.errors ?? 0, color: '#fde7e9' },
                  { name: '', key: 1, label: 'Warnings', value: chartInfo.warnings ?? 0, color: '#fff4ce' },
                  { name: '', key: 2, label: 'Information', value: chartInfo.infos ?? 0, color: '#005A9E' },
                ]}
              />
            </div>

            <Spacing margin={{ top: 'normal' }}>
              <Separator />
            </Spacing>

            <ActionButton
              id="__QualityChecksTabId"
              iconProps={{iconName: 'ExcelDocument', style: { fontSize: theme.fontSizes.normal }}}
              style={{ fontSize: theme.fontSizes.normal }}>
              Download errors
            </ActionButton>
          </Card>
        </Column>

        <Column xl={9}>
          <Card elevation="smallest">
            <DetailsList
              compact
              items={data()}
              columns={COLUMNS}
              selectionMode={SelectionMode.none}
              layoutMode={DetailsListLayoutMode.justified}
              onRenderItemColumn={onRenderItemColumn}
              isHeaderVisible
            />

            {/*<Separator />*/}

            {/*<div>*/}
            {/*  <Button id="__QualityChecksTabId" variant="primary" onClick={() => null}>*/}
            {/*    Continue processing*/}
            {/*  </Button>{' '}*/}
            {/*  &nbsp;*/}
            {/*  <Button*/}
            {/*    id="__QualityChecksTabId"*/}
            {/*    variant=""*/}
            {/*    split*/}
            {/*    text="Cancel processing"*/}
            {/*    onClick={() => {*/}
            {/*      alert('Click');*/}
            {/*      return null;*/}
            {/*    }}*/}
            {/*    menuProps={{*/}
            {/*      items: [{ text: 'Error out', key: 'ErrorOut' }],*/}
            {/*    }}*/}
            {/*  >*/}
            {/*    Cancel processing*/}
            {/*  </Button>*/}
            {/*</div>*/}
          </Card>
        </Column>
      </Row>
    </Spacing>
  );
};

export default QualityChecksTab;
