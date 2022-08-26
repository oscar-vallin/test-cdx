import { FontIcon, Stack, TextField } from '@fluentui/react';
import { ButtonLink } from 'src/components/buttons';
import { Spacing } from 'src/components/spacings/Spacing';
import { Text } from 'src/components/typography';
import { useNotification } from 'src/hooks/useNotification';

const FtpTestClientProfileSnippet = ({ clientProfileSnippet }) => {
  const Toast = useNotification();
  const copyProfileSnippet = () => {
    navigator.clipboard.writeText(clientProfileSnippet ?? '').then(() => {
      Toast.success({ text: 'Copied!' });
    });
  };
  const renderClientProfileSnippet = () => {
    return (
      <Spacing margin={{ bottom: 'normal', top: 'normal' }}>
        {clientProfileSnippet && (
          <TextField
            id="clientProfileSnippet"
            multiline
            disabled
            value={clientProfileSnippet}
            rows={12}
            resizable={false}
          />
        )}
      </Spacing>
    );
  };
  return (
    <Spacing margin={{ bottom: 'normal', top: 'normal' }}>
      <Stack horizontal={true} horizontalAlign="space-between">
        <Stack.Item align="center" disableShrink>
          <Text variant="bold">Client Profile Snippet</Text>
        </Stack.Item>
        <Stack.Item align="center" disableShrink>
          <FontIcon iconName="Copy" onClick={copyProfileSnippet} style={{ paddingRight: '.5em', cursor: 'pointer' }} />
          <ButtonLink id="__ClientProfile_Copy" onClick={copyProfileSnippet} target="_new" title="Copy To Clipboard">
            Copy To Clipboard
          </ButtonLink>
        </Stack.Item>
      </Stack>
      {renderClientProfileSnippet()}
    </Spacing>
  );
};

export { FtpTestClientProfileSnippet };
