import { useState, memo, useEffect } from 'react';
import { Checkbox, TextField } from '@fluentui/react';
import { LayoutAdmin } from 'src/layouts/LayoutAdmin';
import { Button } from 'src/components/buttons';
import { Spacing } from 'src/components/spacings/Spacing';
import { Spinner } from 'src/components/spinners/Spinner';
import { Row, Column } from 'src/components/layouts';
import { InputText } from 'src/components/inputs/InputText';
import { Text } from 'src/components/typography';

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
                id="host"
                required
                label="Host"
                placeholder="host"
                value={host}
                onChange={(event, newValue) => setHost(newValue ?? '')}
              />
            </Spacing>
            <Spacing margin={{ bottom: 'normal' }}>
              <InputText
                id="user"
                required
                label="User"
                placeholder="user"
                value={user}
                onChange={(event, newValue) => setUser(newValue ?? '')}
              />
            </Spacing>
            <Spacing margin={{ bottom: 'normal' }}>
              <InputText
                id="password"
                required
                label="Password"
                type="password"
                placeholder="password"
                value={password}
                onChange={(event, newValue) => setPassword(newValue ?? '')}
              />
            </Spacing>
            <Spacing margin={{ bottom: 'normal' }}>
              <InputText
                id="folder"
                required
                label="Folder"
                placeholder="folder"
                value={folder}
                onChange={(event, newValue) => setFolder(newValue ?? '')}
              />
            </Spacing>
            <Spacing margin={{ bottom: 'normal' }}>
              <InputText
                id="port"
                required
                label="Port"
                type="number"
                placeholder="port"
                value={port}
                onChange={(event, newValue) => setPort(newValue ?? '')}
              />
            </Spacing>
            <Spacing margin={{ top: 'normal', bottom: 'normal' }}>
              <Checkbox id="stepWise" label="Step Wise" onChange={(event, _stepWise: any) => setStepWise(_stepWise)} />
            </Spacing>
            <Spacing margin={{ top: 'normal', bottom: 'normal' }}>
              <Checkbox
                id="sendFileTest"
                label="Send a test file"
                onChange={(_event, _sendFileTest: any) => setSendFileTest(_sendFileTest)}
              />
            </Spacing>
            {sendFileTest && (
              <Spacing margin={{ bottom: 'normal' }}>
                <Spacing margin={{ bottom: 'normal' }}>
                  <InputText
                    id="vendorFileName"
                    required
                    label="Vendor File Name"
                    value={vendorFileName}
                    onChange={(event, newValue) => setVendorFileName(newValue ?? '')}
                  />
                </Spacing>
                <Spacing margin={{ bottom: 'normal' }}>
                  <TextField
                    id="textFileContent"
                    label="Text File Contents"
                    placeholder="Put the text you want in the file here, if you leave blank the text 'Connection Test' will be used for the file's contents."
                    multiline
                    value={textFileContent}
                    onChange={(event, newValue: any) => setTextFileContent(newValue ?? '')}
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
            <Spinner id="__FtpTestPageId_Spinner" size="lg" label="Loading color palettes" />
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
export default FtpTestPage;
