import { WorkPacketCommandType, WorkPacketStatusDetails } from 'src/data/services/graphql';
import { Badge } from 'src/components/badges/Badge';
import React, { ReactElement } from 'react';
import { FontIcon, Link, Stack } from '@fluentui/react';
import { Text } from 'src/components/typography';
import { theme } from 'src/styles/themes/theme';

type ArchivesTabType = {
  packet?: WorkPacketStatusDetails;
}

export const ArchivesTab = ({packet}: ArchivesTabType) => {

  const downloadCommand = packet?.commands?.find((cmd) => cmd?.commandType === WorkPacketCommandType.DownloadFile);

  const renderDownloadLink = (workOrderId: string, s3key: string | null, filename?: string): ReactElement => {
    const graphQLUrl = process.env.REACT_APP_API_SERVER;
    const serverUrl = graphQLUrl?.replace('/graphql', '') ?? '';

    const fileOnly = filename?.split('/').pop();

    if (downloadCommand) {
      return (
        <Link target="_new"
              href={`${serverUrl}k/archive/download?workOrderID=${workOrderId}&s3Key=${s3key}`}
              title={filename}
              style={{
                fontSize: theme.fontSizes.normal
              }}>
          <FontIcon iconName='DownloadDocument' style={{paddingRight: '.5em'}}/>
          {fileOnly}
        </Link>
      );
    }

    return (
      <Text>{fileOnly}</Text>
    );
  };

  const renderRow = (fileLabel: string, fileVariant: string, fullPath?: string | null, key?: string) => {
    if (packet?.workOrderId && fullPath) {
      return (
        <Stack.Item key={key}>
          <Stack horizontal wrap={true}>
            <Stack.Item grow align="center">
              {renderDownloadLink(packet?.workOrderId, fullPath, fullPath.split('/').pop())}
            </Stack.Item>
            <Stack.Item disableShrink align="center">
              <Badge variant={fileVariant} label={fileLabel} pill/>
            </Stack.Item>
          </Stack>
        </Stack.Item>
      );
    }
  };

  return (
    <Stack tokens={{childrenGap: 10, padding: 10}}>
      {renderRow('Client file', 'primary', packet?.clientFileArchivePath)}
      {packet?.supplementalFilesArchivePaths?.map((itm, index) =>
        renderRow('Supplemental', 'primary', itm, `supp_${index}`)
      )}
      {packet?.workStepStatus?.map((workStep, wsIndex) => (
        workStep?.stepFile?.map((stepFile, stepFileIndex) =>
          renderRow(stepFile?.label ?? workStep?.stepName ?? workStep?.stepType ?? 'Work Step',
            'info',
            stepFile?.value,
            `step_${wsIndex}_${stepFileIndex}`)
        )
      ))}
      {renderRow('Sent to Vendor', 'success', packet?.vendorFileArchivePath)}
    </Stack>
  );
};