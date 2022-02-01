import { WorkPacketStatusDetails } from 'src/data/services/graphql';
import { Badge } from 'src/components/badges/Badge';
import React from 'react';
import { FontIcon, Link, Stack } from '@fluentui/react';

type ArchivesTabType = {
  packet?: WorkPacketStatusDetails;
}

export const ArchivesTab = ({ packet }: ArchivesTabType) => {

  return (
    <Stack tokens={{childrenGap: 10, padding: 10}}>
      <Stack.Item>
        <Stack horizontal wrap={true}>
          <Stack.Item grow align="center">
            <Link><FontIcon iconName='TextDocument' style={{paddingRight: '.5em'}}/>{packet?.clientFileArchivePath?.split('/').pop()}</Link>
          </Stack.Item>
          <Stack.Item disableShrink align="center">
            <Badge variant="success" label="Client file" pill />
          </Stack.Item>
        </Stack>
      </Stack.Item>
      <Stack.Item>
        <Stack horizontal wrap={true}>
          <Stack.Item grow align="center">
            <Link><FontIcon iconName='TextDocument' style={{paddingRight: '.5em'}}/>{packet?.vendorFileArchivePath?.split('/').pop()}</Link>
          </Stack.Item>
          <Stack.Item disableShrink align="center">
            <Badge variant="info" label="Vendor file" pill />
          </Stack.Item>
        </Stack>
      </Stack.Item>
      {packet?.supplementalFilesArchivePaths?.map((itm, index) => (
        <Stack.Item key={`supp_${index}`}>
          <Stack horizontal wrap={true}>
            <Stack.Item grow align="center">
              <Link><FontIcon iconName='TextDocument' style={{paddingRight: '.5em'}}/>{itm?.split('/').pop()}</Link>
            </Stack.Item>
            <Stack.Item disableShrink align="center">
              <Badge variant="info" label="Supplemental" pill />
            </Stack.Item>
          </Stack>
        </Stack.Item>
      ))}
    </Stack>
  );
};