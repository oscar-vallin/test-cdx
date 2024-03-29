/* eslint-disable no-alert */
import React, { ReactElement, useState } from 'react';
import {
  Checkbox,
  DetailsList,
  DetailsListLayoutMode,
  ICheckboxProps,
  IColumn,
  MessageBar,
  MessageBarType,
  SelectionMode,
  Stack,
} from '@fluentui/react';

import { useThemeStore } from 'src/store/ThemeStore';
import { Badge } from 'src/components/badges/Badge';
import { Card } from 'src/components/cards/Card';
import { ChartDonut } from 'src/components/charts/ChartDonut';
import { Spacing } from 'src/components/spacings/Spacing';
import { DarkSeparator } from 'src/components/separators/Separator';
import {
  FieldCreationEvent, Maybe, RecordCreationEvent, WorkPacketStatusDetails,
} from 'src/data/services/graphql';
import { theme } from 'src/styles/themes/theme';
import { HideForMobile } from 'src/styles/GlobalStyles';
import { ChartDataType } from 'src/components/charts/ChartDonut/ChartDonut';
import { FormRow } from 'src/components/layouts/Row/Row.styles';
import { Text } from 'src/components/typography';
import { EmptyState } from 'src/containers/states';
import { TabBody, WhiteButton } from '../FileStatusDetails.styles';
import { QualityCheckMessage } from './QualityCheckMessage';

const COLUMNS: IColumn[] = [
  {
    key: 'status', name: 'Status', fieldName: 'status', minWidth: 80, maxWidth: 80,
  },
  {
    key: 'employeeId', name: 'Employee ID', fieldName: 'employeeId', minWidth: 100, maxWidth: 100,
  },
  {
    key: 'employee', name: 'Employee', fieldName: 'employee', minWidth: 100, maxWidth: 150,
  },
  {
    key: 'dependent', name: 'Dependent', fieldName: 'dependent', minWidth: 100, maxWidth: 150,
  },
  {
    key: 'field', name: 'Field', fieldName: 'field', minWidth: 100, maxWidth: 150,
  },
  {
    key: 'message', name: 'Message', fieldName: 'message', minWidth: 200, flexGrow: 1,
  },
].map((col) => ({ ...col, data: 'string', isPadded: true }));

const errorColors = [
  '#FA8072',
  '#FF2400',
  '#7C0A02',
  '#ED2939',
  '#CD5C5C',
  '#C21807',
  '#E0115F',
  '#B22222',
  '#960018',
];

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

const graphQLUrl = process.env.REACT_APP_API_SERVER;
const serverUrl = graphQLUrl?.replace('/graphql', '') ?? '';

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
        <QualityCheckMessage
          rowIndex={index}
          messages={item.messages}
          value={item.value}
          transformedValue={item.transformValue}
        />
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
  details?: WorkPacketStatusDetails | null;
};

const QualityChecksTab = ({ details }: QualityChecksTabProps): ReactElement => {
  const ThemeStore = useThemeStore();
  const qualityChecks = details?.qualityChecks;

  const items = qualityChecks?.sequenceCreationEvent ?? [];

  const totalNumErrors = (qualityChecks?.accStructReqError?.count ?? 0)
    + (qualityChecks?.clientSpecificReqError?.count ?? 0)
    + (qualityChecks?.accStructTruncError?.count ?? 0)
    + (qualityChecks?.reqError?.count ?? 0)
    + (qualityChecks?.truncError?.count ?? 0)
    + (qualityChecks?.codeListMappingError?.count ?? 0);

  const hasQualityCheckStats = (qualityChecks?.totalRecordCount ?? 0) > 0;
  const hasErrors = totalNumErrors > 0;

  const totalRecords = qualityChecks?.totalRecordCount ?? 0;
  let errorPercent: number;
  if (qualityChecks?.errorRecordPercentage) {
    errorPercent = qualityChecks?.errorRecordPercentage;
  } else {
    errorPercent = totalRecords === 0 ? 0 : (totalNumErrors / totalRecords) * 100;
  }

  const addChartData = (data: ChartDataType[], name: string, key: string, count?: number) => {
    if (count && count > 0) {
      data.push({ name, key, value: count });
    }
  };

  const errorData = () => {
    const data: ChartDataType[] = [];
    addChartData(data, 'Missing Account Structure', 'accStructReqError', qualityChecks?.accStructReqError?.count);
    addChartData(
      data,
      'Missing Client Specific Mapping',
      'clientSpecificReqError',
      qualityChecks?.clientSpecificReqError?.count,
    );
    addChartData(data, 'Account Structure Truncated', 'accStructTruncError', qualityChecks?.accStructTruncError?.count);
    addChartData(data, 'Missing Required Field', 'reqError', qualityChecks?.reqError?.count);
    addChartData(data, 'Truncated Field', 'truncError', qualityChecks?.truncError?.count);
    addChartData(data, 'Code List Mapping', 'codeListMappingError', qualityChecks?.codeListMappingError?.count);
    return data;
  };

  const eventToRow = (
    status: string,
    recordEvent: RecordCreationEvent,
    fieldEvent: FieldCreationEvent,
  ): RowType => ({
    status,
    employeeId: recordEvent.unitId ?? '',
    employee: recordEvent.outerContext ?? '',
    dependent: recordEvent.context ?? '',
    messages: fieldEvent.message,
    field: fieldEvent.name ?? '',
    value: fieldEvent.rawValue ?? '',
    transformValue: fieldEvent.value ?? '',
  });

  // Toggles for the details table
  const [showInfo, setShowInfo] = useState(true);
  const [showWarn, setShowWarn] = useState(true);
  const [showError, setShowError] = useState(true);

  const data = (): RowType[] => {
    const rows: RowType[] = [];
    items?.forEach((item) => {
      if (item?.recordCreationEvent) {
        item?.recordCreationEvent?.forEach((creationEvent) => {
          if (showError && creationEvent?.error) {
            creationEvent.error.forEach((fieldEvent) => {
              if (fieldEvent) {
                rows.push(eventToRow('ERROR', creationEvent, fieldEvent));
              }
            });
          }
          if (showWarn && creationEvent?.warning) {
            creationEvent.warning.forEach((fieldEvent) => {
              if (fieldEvent) {
                rows.push(eventToRow('WARNING', creationEvent, fieldEvent));
              }
            });
          }
          if (showInfo && creationEvent?.information) {
            creationEvent.information.forEach((fieldEvent) => {
              if (fieldEvent) {
                rows.push(eventToRow('INFO', creationEvent, fieldEvent));
              }
            });
          }
        });
      }
    });

    return rows;
  };

  const renderCheckboxLabel = (props?: ICheckboxProps) => <Text>{props?.label}</Text>;

  const renderQualityChecksTruncation = () => {
    if (details?.qualityChecks?.hasMoreEvents === true) {
      return (
        <>
          <Spacing margin={{ bottom: 'normal' }} />
          <MessageBar messageBarType={MessageBarType.warning}>
            There are a large number of quality check messages.
            Not all messages are displayed here. Please click the
            Download button to see the full list of quality check messages.
          </MessageBar>
        </>
      );
    }
    return null;
  };

  const renderBody = () => (
    <TabBody>
      {(hasQualityCheckStats || hasErrors) && (
        <FormRow>
          <Stack horizontal wrap tokens={{ childrenGap: 20 }}>
            {hasQualityCheckStats && (
              <Stack.Item>
                <Card id="__Quality_Messages_Chart_Card" elevation="smallest">
                  <Stack tokens={{ childrenGap: 15 }}>
                    <Stack.Item>
                      <Stack horizontal tokens={{ childrenGap: 5 }} verticalAlign="center">
                        <Stack.Item>
                          <Text variant="bold">
                            {errorPercent > 0 && errorPercent < 1 ? 'Less than 1' : errorPercent.toFixed(2)}%
                          </Text>
                          <Text variant="muted">&nbsp;of the records&nbsp;</Text>
                          <Text variant="bold">
                            ({totalRecords})
                          </Text>
                          <Text variant="muted">&nbsp;contain errors</Text>
                        </Stack.Item>
                      </Stack>
                    </Stack.Item>
                    <Stack.Item>
                      <DarkSeparator />
                    </Stack.Item>
                    <Stack.Item>
                      <ChartDonut
                        id="__Quality_Overall_Donut"
                        size={70}
                        data={[
                          {
                            key: 'ERROR',
                            name: 'Errors',
                            value: qualityChecks?.fieldCreationErrorCount ?? 0,
                            color: ThemeStore.userTheme.colors.custom.error,
                          },
                          {
                            key: 'WARNING',
                            name: 'Warnings',
                            value: qualityChecks?.fieldCreationWarningCount ?? 0,
                            color: ThemeStore.userTheme.colors.custom.warningAlt,
                          },
                          {
                            key: 'INFO',
                            name: 'Information',
                            value: qualityChecks?.fieldCreationInfoCount ?? 0,
                            color: ThemeStore.userTheme.colors.custom.info,
                          },
                        ]}
                        onClickSlice={(key: string) => {
                          switch (key) {
                            case 'ERROR': {
                              setShowInfo(false);
                              setShowWarn(false);
                              setShowError(true);
                              break;
                            }
                            case 'WARNING': {
                              setShowInfo(false);
                              setShowWarn(true);
                              setShowError(false);
                              break;
                            }
                            case 'INFO': {
                              setShowInfo(true);
                              setShowWarn(false);
                              setShowError(false);
                              break;
                            }
                            default: {
                              setShowInfo(true);
                              setShowWarn(true);
                              setShowError(true);
                            }
                          }
                        }}
                      />
                    </Stack.Item>
                  </Stack>
                </Card>
              </Stack.Item>
            )}
            {hasErrors && (
              <Stack.Item>
                <Card id="__Quality_Error_Chart_Card" elevation="smallest">
                  <Stack tokens={{ childrenGap: 15 }}>
                    <Stack.Item>
                      <Stack horizontal tokens={{ childrenGap: 10 }} verticalAlign="center">
                        <Stack.Item grow={1}>
                          <Text variant="muted">Record error breakdown</Text>
                        </Stack.Item>
                      </Stack>
                    </Stack.Item>
                    <Stack.Item>
                      <DarkSeparator />
                    </Stack.Item>
                    <Stack.Item>
                      <ChartDonut
                        id="__Quality_Errors_Donut"
                        size={70}
                        data={errorData()}
                        colorPalette={errorColors}
                      />
                    </Stack.Item>
                  </Stack>
                </Card>
              </Stack.Item>
            )}
          </Stack>
        </FormRow>
      )}

      <FormRow>
        <Card elevation="smallest">
          <Stack horizontal={true} tokens={{ childrenGap: 10 }} style={{ paddingBottom: 10 }} verticalAlign="center">
            <Stack.Item>
              <WhiteButton
                id="__QualityChecksTabId"
                iconProps={{ iconName: 'ExcelDocument', style: { fontSize: theme.fontSizes.normal } }}
                href={`${serverUrl}excel/qualitychecks?orgSid=${details?.orgSid}&workOrderID=${details?.workOrderId}`}
              >
                <HideForMobile>Download</HideForMobile>
              </WhiteButton>
            </Stack.Item>
            <Stack.Item grow={1}>
              <DarkSeparator />
            </Stack.Item>
            <Stack.Item>
              <Checkbox
                label="Info"
                checked={showInfo}
                onChange={() => setShowInfo(!showInfo)}
                onRenderLabel={renderCheckboxLabel}
              />
            </Stack.Item>
            <Stack.Item>
              <Checkbox
                label="Warning"
                checked={showWarn}
                onChange={() => setShowWarn(!showWarn)}
                onRenderLabel={renderCheckboxLabel}
              />
            </Stack.Item>
            <Stack.Item>
              <Checkbox
                label="Error"
                checked={showError}
                onChange={() => setShowError(!showError)}
                onRenderLabel={renderCheckboxLabel}
              />
            </Stack.Item>
            <Stack.Item grow={1}>
              <DarkSeparator />
            </Stack.Item>
          </Stack>
          <DetailsList
            compact
            items={data()}
            columns={COLUMNS}
            selectionMode={SelectionMode.none}
            layoutMode={DetailsListLayoutMode.justified}
            onRenderItemColumn={onRenderItemColumn}
            isHeaderVisible
          />
          {renderQualityChecksTruncation()}
        </Card>
      </FormRow>
    </TabBody>
  );

  if (qualityChecks) {
    return renderBody();
  }

  return <EmptyState title="There are no Quality Checks for this Exchange" />;
};

export default QualityChecksTab;
