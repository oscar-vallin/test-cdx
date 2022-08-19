import { WorkPacketCommandType, WorkPacketStatusDetails } from 'src/data/services/graphql';
import { Badge } from 'src/components/badges/Badge';
import React, { ReactElement } from 'react';
import { FontIcon, Link } from '@fluentui/react';
import { Text } from 'src/components/typography';
import { theme } from 'src/styles/themes/theme';
import { Column } from 'src/components/layouts';
import { Spacing } from 'src/components/spacings/Spacing';
import { Archive } from '../FileStatusDetails.styles';

type ArchivesTabType = {
  packet?: WorkPacketStatusDetails;
};

export const ArchivesTab = ({ packet }: ArchivesTabType) => {
  const downloadCommand = packet?.commands?.find((cmd) => cmd?.commandType === WorkPacketCommandType.DownloadFile);

  const renderDownloadLink = (workOrderId: string, s3key: string | null, filename?: string): ReactElement => {
    const graphQLUrl = process.env.REACT_APP_API_SERVER;
    const serverUrl = graphQLUrl?.replace('/graphql', '') ?? '';

    const fileOnly = filename?.split('/').pop();

    if (downloadCommand) {
      return (
        <Link
          target="_new"
          href={`${serverUrl}k/archive/download?workOrderID=${workOrderId}&fileName=${filename}`}
          title={filename}
          style={{
            fontSize: theme.fontSizes.normal,
          }}
        >
          <FontIcon iconName="DownloadDocument" style={{ paddingRight: '.5em' }} />
          {fileOnly}
        </Link>
      );
    }

    return <Text>{fileOnly}</Text>;
  };

  const renderRow = (fileLabel: string, fileVariant: string, fullPath?: string | null, key?: string) => {
    if (packet?.workOrderId && fullPath) {
      return (
        <Column key={key} lg="12" xl="6">
          <Archive>
            {renderDownloadLink(packet?.workOrderId, fullPath, fullPath.split('/').pop())}
            <Badge variant={fileVariant} label={fileLabel} pill />
          </Archive>
        </Column>
      );
    }
    return null;
  };

  return (
    <Spacing padding="normal">
      {renderRow('Client file', 'primary', packet?.clientFileArchivePath)}
      {packet?.supplementalFilesArchivePaths?.map((itm, index) =>
        renderRow('Supplemental', 'primary', itm, `supp_${index}`)
      )}
      {packet?.workStepStatus?.map((workStep, wsIndex) =>
        workStep?.stepFile?.map((stepFile, stepFileIndex) =>
          renderRow(
            stepFile?.label ?? workStep?.stepName ?? workStep?.stepType ?? 'Work Step',
            'info',
            stepFile?.value,
            `step_${wsIndex}_${stepFileIndex}`
          )
        )
      )}
      {renderRow('Sent to Vendor', 'success', packet?.vendorFileArchivePath)}
    </Spacing>
  );
};
