/* eslint-disable no-alert */
import React, { ReactElement } from 'react';
import {
  ActionButton,
  DetailsList,
  DetailsListLayoutMode,
  IColumn,
  MessageBar,
  MessageBarType,
  SelectionMode,
  Stack
} from '@fluentui/react';

import { Badge } from 'src/components/badges/Badge';
import { Card } from 'src/components/cards/Card';
import { ChartDonut } from 'src/components/charts/ChartDonut';
import { Spacing } from 'src/components/spacings/Spacing';
import { Separator } from 'src/components/separators/Separator';
import {
  FieldCreationEvent,
  Maybe,
  QualityChecks,
  RecordCreationEvent,
  SequenceCreationEvent
} from 'src/data/services/graphql';
import { theme } from 'src/styles/themes/theme';
import { ChartDataType } from 'src/components/charts/ChartDonut/ChartDonut';
import { FormRow } from 'src/components/layouts/Row/Row.styles';

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
  qualityChecks?: QualityChecks | null;
  items?: Maybe<SequenceCreationEvent>[];
};

const QualityChecksTab = ({ qualityChecks }: QualityChecksTabProps): ReactElement => {
  const items = qualityChecks?.sequenceCreationEvent ?? [];

  const messages = [
    qualityChecks?.accStructReqError?.toleranceMsg,
    qualityChecks?.accStructTruncError?.toleranceMsg,
    qualityChecks?.clientSpecificReqError?.toleranceMsg,
    qualityChecks?.reqError?.toleranceMsg,
    qualityChecks?.truncError?.toleranceMsg,
    qualityChecks?.codeListMappingError?.toleranceMsg,
  ].filter((msg) => msg)

  const totalNumErrors = (qualityChecks?.accStructReqError?.count ?? 0) +
    (qualityChecks?.clientSpecificReqError?.count ?? 0) +
    (qualityChecks?.accStructTruncError?.count ?? 0) +
    (qualityChecks?.reqError?.count ?? 0) +
    (qualityChecks?.truncError?.count ?? 0) +
    (qualityChecks?.codeListMappingError?.count ?? 0);

  const addChartData = (data: ChartDataType[], name: string, key: string, count?: number) => {
    if (count && count > 0) {
      data.push({name: name, key: key, value: count})
    }
  };

  const errorData = () => {
    const data: ChartDataType[] = [];
    addChartData(data, 'Missing Account Structure', 'accStructReqError', qualityChecks?.accStructReqError?.count);
    addChartData(data, 'Missing Client Specific Mapping', 'clientSpecificReqError', qualityChecks?.clientSpecificReqError?.count);
    addChartData(data, 'Account Structure Truncated', 'accStructTruncError', qualityChecks?.accStructTruncError?.count);
    addChartData(data, 'Missing Required Field', 'reqError', qualityChecks?.reqError?.count);
    addChartData(data, 'Truncated Field', 'truncError', qualityChecks?.truncError?.count);
    addChartData(data, 'Code List Mapping', 'codeListMappingError', qualityChecks?.codeListMappingError?.count);
    return data;
  }

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
      {messages.length > 0 && (
        <FormRow>
          <MessageBar
            id="__QualityChecks_Msg"
            messageBarType={MessageBarType.error}
            isMultiline
          >
            {messages}
          </MessageBar>
        </FormRow>
      )}

      <FormRow>
        <Card elevation="smallest">
          <Stack horizontal wrap tokens={{childrenGap: 20}}>
            {(qualityChecks?.totalRecordCount ?? 0) > 0 && (
              <Stack.Item>
                <ChartDonut
                  id="__Quality_Overall_Donut"
                  size={70}
                  data={[
                    { key: 'ERROR', name: 'Errors', value: qualityChecks?.fieldCreationErrorCount ?? 0, color: '#990000' },
                    { key: 'WARNING', name: 'Warnings', value: qualityChecks?.fieldCreationWarningCount ?? 0, color: '#fcde54' },
                    { key: 'INFO', name: 'Information', value: qualityChecks?.fieldCreationInfoCount ?? 0, color: '#005A9E' },
                  ]}
                />
              </Stack.Item>
            )}
            {totalNumErrors > 0 && (
              <Stack.Item>
                <ChartDonut
                  id="__Quality_Errors_Donut"
                  size={70}
                  data={errorData()}
                />
              </Stack.Item>
            )}
          </Stack>


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
      </FormRow>
      <FormRow>
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
      </FormRow>
    </Spacing>
  );
};

export default QualityChecksTab;
