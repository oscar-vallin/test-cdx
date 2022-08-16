import React from 'react';
import { StyledSelectedFile } from 'src/pages/Admin/FtpTest/FtpTestPage.styles';
import { Text } from 'src/components/typography';
import { IconButton } from '@fluentui/react';

export const CancelTestFile = ({ setTestFile, testFile }) => {
  return (
    <StyledSelectedFile>
      <Text variant="normal">{testFile.name}</Text>
      <IconButton iconProps={{ iconName: 'Cancel' }} onClick={() => setTestFile(undefined)} />
    </StyledSelectedFile>
  );
};
