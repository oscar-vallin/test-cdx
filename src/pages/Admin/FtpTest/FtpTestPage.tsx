import React, { useState, memo } from 'react';
import { Checkbox, TextField } from '@fluentui/react';
import { LayoutDashboard } from 'src/layouts/LayoutDashboard';
import { Button } from 'src/components/buttons';
import { Spacing } from 'src/components/spacings/Spacing';
import { Row, Column, Container } from 'src/components/layouts';
import { InputText } from 'src/components/inputs/InputText';
import { PageTitle } from 'src/components/typography';
import { ROUTE_FTP_TEST } from 'src/data/constants/RouteConstants';
import { PageHeader } from 'src/containers/headers/PageHeader';

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

  const handleOnTestBtn = () => {
    onTestBtn();
    return null;
  };

  const renderForm = () => {
    return (
      <Container>
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
      </Container>
    );
  };

  return (
    <LayoutDashboard id="PageFtpTest" menuOptionSelected={ROUTE_FTP_TEST.API_ID}>
      <PageHeader id="__FTPTestHeader">
        <Container>
          <Row>
            <Column lg="6" direction="row">
              <PageTitle id="__Page_Title" title="SFTP TEST" />
            </Column>
          </Row>
        </Container>
      </PageHeader>
      {renderForm()}
    </LayoutDashboard>
  );
};

const FtpTestPage = memo(_FtpTestPage);

export { FtpTestPage };
