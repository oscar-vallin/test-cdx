import { useState, memo, useEffect } from 'react';
import { Checkbox } from '@fluentui/react';
import { TextField } from '@fluentui/react/lib/TextField';
import { LayoutAdmin } from '../../../layouts/LayoutAdmin';
import { Button } from '../../../components/buttons/Button';
import { Spacing } from '../../../components/spacings/Spacing';
import { Spinner } from '../../../components/spinners/Spinner';
import { Row, Column } from '../../../components/layouts';
import { InputText } from '../../../components/inputs/InputText';
import { Text } from '../../../components/typography/Text';

const _FtpTestPage = () => {
  const [host, setHost] = useState('');
  const [user, setUser] = useState('');
  const [password, setPassword] = useState('');
  const [folder, setFolder] = useState('');
  const [port, setPort] = useState('');
  const [vendorFileName, setVendorFileName] = useState('');
  const [textFileContent, setTextFileContent] = useState('');
  const [stepWise, setStepWise] = useState(false);
  const [sendFileTest, setSendFileTest] = useState(false);
  const [loading, setLoading] = useState(true);

  const onTestBtn = () => {
    return {
      host,
      user,
      password,
      folder,
      port,
      vendorFileName,
      textFileContent,
      stepWise,
    };
  };

  useEffect(() => setLoading(false), []);

  const handleOnTestBtn = () => {
    onTestBtn();
    return null;
  };

  const renderForm = () => {
    return loading ? (
      <Spacing margin={{ top: 'double' }}>
        <Spinner size="lg" label="Loading color palette" />
      </Spacing>
    ) : (
      <>
        <Row>
          <Column>
            <Spacing margin={{ bottom: 'normal' }}>
              <Text variant="bold">SFTP TEST</Text>
            </Spacing>
          </Column>
        </Row>

        <Row>
          <Column xxl="6" xl="12">
            <Spacing margin={{ bottom: 'normal' }}>
              <InputText
                required
                label="Host"
                placeholder="host"
                value={host}
                onChange={({ target }) => setHost(target.value)}
              />
            </Spacing>
            <Spacing margin={{ bottom: 'normal' }}>
              <InputText
                required
                label="User"
                placeholder="user"
                value={user}
                onChange={({ target }) => setUser(target.value)}
              />
            </Spacing>
            <Spacing margin={{ bottom: 'normal' }}>
              <InputText
                required
                label="Password"
                type="password"
                placeholder="password"
                value={password}
                onChange={({ target }) => setPassword(target.value)}
              />
            </Spacing>
            <Spacing margin={{ bottom: 'normal' }}>
              <InputText
                required
                label="Folder"
                placeholder="folder"
                value={folder}
                onChange={({ target }) => setFolder(target.value)}
              />
            </Spacing>
            <Spacing margin={{ bottom: 'normal' }}>
              <InputText
                required
                label="Port"
                type="number"
                placeholder="port"
                value={port}
                onChange={({ target }) => setPort(target.value)}
              />
            </Spacing>
            <Spacing margin={{ top: 'normal', bottom: 'normal' }}>
              <Checkbox label="Step Wise" onChange={(event, _stepWise: any) => setStepWise(_stepWise)} />
            </Spacing>
            <Spacing margin={{ top: 'normal', bottom: 'normal' }}>
              <Checkbox
                label="Send a test file"
                onChange={(_event, _sendFileTest: any) => setSendFileTest(_sendFileTest)}
              />
            </Spacing>
            {sendFileTest && (
              <Spacing margin={{ bottom: 'normal' }}>
                <Spacing margin={{ bottom: 'normal' }}>
                  <InputText
                    required
                    label="Vendor File Name"
                    value={vendorFileName}
                    onChange={({ target }) => setVendorFileName(target.value)}
                  />
                </Spacing>
                <Spacing margin={{ bottom: 'normal' }}>
                  <TextField
                    label="Text File Contents"
                    placeholder="Put the text you want in the file here, if you leave blank the text 'Connection Test' will be used for the file's contents."
                    multiline
                    value={textFileContent}
                    onChange={({ target }: any) => setTextFileContent(target.value)}
                    rows={10}
                  />
                </Spacing>
              </Spacing>
            )}

            <Spacing margin={{ bottom: 'normal' }}>
              <Button id="__FtpTestPageId" variant="primary" disabled={false} text="Test" onClick={handleOnTestBtn} />
            </Spacing>
          </Column>
        </Row>
      </>
    );
  };

  return (
    <LayoutAdmin id="PageDefaultTheme" sidebarOptionSelected="FTP_TEST">
      <Spacing margin="double">
        {loading ? (
          <Spacing margin={{ top: 'double' }}>
            <Spinner size="lg" label="Loading color palettes" />
          </Spacing>
        ) : (
          <>{renderForm()}</>
        )}
      </Spacing>
    </LayoutAdmin>
  );
};

const FtpTestPage = memo(_FtpTestPage);

export { FtpTestPage };
