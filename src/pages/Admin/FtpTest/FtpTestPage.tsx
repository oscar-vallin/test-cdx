import React, { useState, useEffect, useRef, memo } from 'react';
import { Checkbox, IconButton, TextField, FontIcon, Link, Stack, Spinner, SpinnerSize, Icon} from '@fluentui/react';
import { LayoutDashboard } from 'src/layouts/LayoutDashboard';
import { Button } from 'src/components/buttons';
import { Spacing } from 'src/components/spacings/Spacing';
import { Row, Column, Container } from 'src/components/layouts';
import { UIInputText, InputText } from 'src/components/inputs/InputText';
import { PageTitle } from 'src/components/typography';
import { ROUTE_FTP_TEST } from 'src/data/constants/RouteConstants';
import { PageHeader } from 'src/containers/headers/PageHeader';
import {
  useXpsftpTestLazyQuery,
  XpsftpForm,
  SftpTestGenerateTestFileForm,
  useFtpTestMMutation,
  WorkStatus
} from 'src/data/services/graphql';
import { useOrgSid } from 'src/hooks/useOrgSid';
import { Text } from 'src/components/typography';
import { LogMessageItem } from 'src/components/collapses/LogMessageItem';
import { Badge } from 'src/components/badges/Badge';
import { StyledSelectedFile } from './FtpTestPage.styles';
import { useNotification } from 'src/hooks/useNotification';

const _FtpTestPage = () => {
  const [host, setHost] = useState('');
  const [user, setUser] = useState('');
  const [password, setPassword] = useState('');
  const [folder, setFolder] = useState('');
  const [port, setPort] = useState('22');
  const [vendorFileName, setVendorFileName] = useState('');
  const [textFileContent, setTextFileContent] = useState('');
  const [stepWise, setStepWise] = useState(true);
  const [sendFileTest, setSendFileTest] = useState(false);
  const [testFile, setTestFile] = useState<File>()
  const { orgSid } = useOrgSid();
  const [fetchFtpTestForm, { data: dataForm, loading: loadingForm, error: errorForm }] = useXpsftpTestLazyQuery();
  const [callFtpTest, { data: ftpTestData, loading: ftpTestLoading, error: ftpTestError }] = useFtpTestMMutation();
  const [isProcessing, setProcessing] = useState<boolean>(false);
  const [isProcessingForm, setProcessingForm] = useState<boolean>(true);

  const [ftpTestForm, setFtpTestForm] = useState<XpsftpForm | null>();
  const [genTestFileForm, setGenTestFileForm] = useState<SftpTestGenerateTestFileForm | null>();

  const inputFileRef = React.useRef() as React.MutableRefObject<HTMLInputElement>;
  const Toast = useNotification();

  useEffect(() => {
    if (orgSid) {
      fetchFtpTestForm({
        variables: {
          orgSid,
        },
      });
    } 
  }, [orgSid]);

  useEffect(() => {
    setProcessingForm(true);
    if (dataForm && !loadingForm) {
      setFtpTestForm(dataForm.xpsftpTest?.xpSFTPForm);
      setGenTestFileForm(dataForm.xpsftpTest?.genTestFileForm)
    }
    setProcessingForm(false);
  }, [dataForm, loadingForm]);

  const onTestBtn = async () => {
    setProcessing(true);
   
    const { data, errors } = await callFtpTest(
      {
        variables: { 
          xpsftp: {
            host,
            user,
            password,              
            port: +port,
            folder,
            stepWise,
          },
          genTestFile: {
            generate: sendFileTest && !testFile ? true : false,
            fileName: !testFile && !vendorFileName ? 'default k2u-test-file.txt' : vendorFileName,
            fileBody:  !testFile && !textFileContent ? 'Connection Test' : textFileContent,
          },
          testFile: sendFileTest && testFile ? testFile : null
        },
      })

      if (data?.ftpTestM?.status === 'ERROR'){
        Toast.error({ text: data?.ftpTestM?.logMessage.body})
      }

      if (errors){
        Toast.error({ text: errors[0].message})
      }

      if (data?.ftpTestM?.xpSFTPForm) {
        setFtpTestForm(data?.ftpTestM?.xpSFTPForm);
      }
      if (data?.ftpTestM?.genTestFileForm) {
        setGenTestFileForm(data?.ftpTestM?.genTestFileForm);
      }
      setProcessing(false);
  };

  const handleOnTestBtn = () => {
    onTestBtn();
    return null;
  };

  const handleChooseFile =(e) =>{
    const {
      target: {
        validity,
        files: [file],
      }
    } = e
    if (validity.valid) setTestFile(file)
  }

  const renderForm = () => {
    return (
      <Container>
        <Row>
          <Column xxl="12" xl="12">
            <Row >
              <Column sm="8">
                {ftpTestForm?.host?.visible && (
                  <Spacing margin={{ bottom: 'normal' }}>
                    <UIInputText
                      id="host"
                      uiField={ftpTestForm.host}
                      placeholder="host"
                      value={host}
                      onChange={(event, newValue) => setHost(newValue ?? '')}                
                    />
                  </Spacing> 
                )}
                </Column>
                <Column sm="4">
                  {ftpTestForm?.port?.visible && (
                    <Spacing margin={{ bottom: 'normal', left: 'normal'}}>
                      <InputText
                        disabled={ftpTestForm?.port?.readOnly ?? false}
                        autofocus={false}
                        label={ftpTestForm?.port?.label}
                        errorMessage={ftpTestForm?.port?.errMsg ?? undefined}
                        info={ftpTestForm?.port?.info ?? undefined}
                        required={ftpTestForm?.port?.required ?? false}                  
                        id="port"
                        type="number"
                        placeholder="port"
                        value={port}
                        onChange={(event, newValue) => setPort(newValue ?? '')}
                      />
                    </Spacing>
                  )}
                </Column>
              </Row>
            {ftpTestForm?.user?.visible && (
              <Spacing margin={{ bottom: 'normal' }}>
                <UIInputText
                  id="user"
                  uiField={ftpTestForm.user}
                  placeholder="user"
                  value={user}
                  onChange={(event, newValue) => setUser(newValue ?? '')}
                />
              </Spacing> 
            )}
            {ftpTestForm?.password?.visible && (
              <Spacing margin={{ bottom: 'normal' }}>
                <InputText
                  disabled={ftpTestForm?.password?.readOnly ?? false}
                  autofocus={false}
                  label={ftpTestForm?.password?.label}
                  errorMessage={ftpTestForm?.password?.errMsg ?? undefined}
                  info={ftpTestForm?.password?.info ?? undefined}
                  required={ftpTestForm?.password?.required ?? false}                  
                  minLength={ftpTestForm?.password?.min}
                  maxLength={ftpTestForm?.password?.max}
                  canRevealPassword
                  type="password"
                  id="password"
                  placeholder="password"                  
                  value={password}
                  onChange={(event, newValue) => setPassword(newValue ?? '')}
                  />
              </Spacing>
            )}
            {ftpTestForm?.folder?.visible && (
              <Spacing margin={{ bottom: 'normal' }}>
                <UIInputText
                  id="folder"
                  uiField={ftpTestForm.folder}
                  value={folder}
                  onChange={(event, newValue) => setFolder(newValue ?? '')}
                />
              </Spacing>
            )}
            {ftpTestForm?.stepWise?.visible &&(
              <Spacing margin={{ top: 'normal', bottom: 'normal' }}>
                <Checkbox checked={stepWise} id="stepWise" label="Step Wise" onChange={(event, _stepWise: any) => setStepWise(_stepWise)} />
              </Spacing>
            )}
            {genTestFileForm && (
              <Spacing margin={{ top: 'normal', bottom: 'normal' }}>
                <Checkbox                 
                  id="sendFileTest"
                  label="Send a test file"
                  onChange={(_event, _sendFileTest: any) => setSendFileTest(_sendFileTest)}
                />
              </Spacing> 
            )}
            {sendFileTest && (
              <Spacing margin={{ bottom: 'normal' }} padding={{left: 'normal'}}>               
                {testFile ? 
                  <StyledSelectedFile>
                    <Text variant='semiBold'>{testFile.name}</Text>                  
                    <IconButton
                      iconProps={{ iconName: 'Cancel' }}
                      onClick={() => setTestFile(undefined)}                        
                    />
                  </StyledSelectedFile> :
                  <Link
                    underline
                    target="_new"
                    onClick={()=>{inputFileRef.current.value='';inputFileRef.current.click();}}
                    title={'Upload File'}>
                      Upload File...
                  </Link>
                }
                <input style={{display: 'none'}} type="file" ref={inputFileRef} onChange={handleChooseFile}/>
                <Spacing margin={{top: 'double', left: 'normal', bottom: 'normal'}}>
                  <Text variant='semiBold'>Or</Text>
                </Spacing>
                {genTestFileForm?.fileName?.visible && (
                  <Spacing margin={{ bottom: 'normal' }}>
                    <UIInputText
                      id="fileName"
                      uiField={genTestFileForm?.fileName}
                      value={vendorFileName}
                      onChange={(event, newValue) => setVendorFileName(newValue ?? '')}
                    />
                  </Spacing>
                )}
                {genTestFileForm?.fileBody?.visible && (
                  <Spacing margin={{ bottom: 'normal' }}>
                    <TextField
                      id="textFileContent"
                      label="Text File Contents"
                      placeholder="Put the text you want in the file here, if you leave blank the text 'Connection Test' will be used for the file's contents."
                      multiline
                      value={textFileContent}
                      onChange={(event, newValue: any) => setTextFileContent(newValue ?? '')}
                      rows={10}
                      resizable={false}
                    />
                  </Spacing>
                )}
              </Spacing>
            )}
            {ftpTestForm && ( 
              <Spacing margin={{ bottom: 'normal' }}>
                <Button id="__FtpTestPageId" variant="primary" disabled={false} text="Test" onClick={handleOnTestBtn} />
              </Spacing>
            )}
          </Column>
        </Row>
      </Container>
    );
  };

  const renderResults = () => {
    return (
      <>
          {ftpTestData?.ftpTestM?.allMessages && ftpTestData?.ftpTestM?.allMessages.map((logMessageItem, logMessageItemIndex) => (            
            <LogMessageItem key={logMessageItemIndex} logMessage={logMessageItem}/>
          ))}
      </>
    );
  };
  
  const renderClientProfileSnippet = () => {
    return (
      <Spacing margin={{ bottom: 'normal' }}>
        {ftpTestData?.ftpTestM?.clientProfileSnippet && ( 
        <TextField
          id="clientProfileSnippet"              
          multiline
          disabled
          value={ftpTestData?.ftpTestM?.clientProfileSnippet}
          rows={12}
          resizable={false}
        />)}
      </Spacing>
    );
  };

  const getBadgeVariant = (ftpTestStatus?: WorkStatus): string => {
    if (!ftpTestStatus) {
      return 'info';
    }
    // purposely use a switch statement so if we add a WorkStatus, it will generate a compiler error.
    switch (ftpTestStatus) {
      case WorkStatus.Queued:
        return 'info';
      case WorkStatus.Processing:
        return 'info';
      case WorkStatus.Complete:
        return 'success';
      case WorkStatus.Error:
        return 'error';
      case WorkStatus.Submitted:
        return 'info';
      case WorkStatus.Warning:
        return 'warning';
      case WorkStatus.Hold:
        return 'warning';
      case WorkStatus.Canceled:
        return 'error';
      case WorkStatus.QualityCheckFailed:
        return 'error';
      case WorkStatus.NoRecords:
        return 'warning';
      case WorkStatus.TechMigrationCheckFailed:
        return 'error';
      default:
        return 'info';
    }
  };

  const downloadLogsAsCsv =()=>{
    if(ftpTestData?.ftpTestM?.csvLog){
      var downloadLink = document.createElement("a");
      var blob = new Blob(["\ufeff", ftpTestData?.ftpTestM?.csvLog]);
      var url = URL.createObjectURL(blob);
      downloadLink.href = url;
      downloadLink.download = "ftp-test-logs.csv";
  
      document.body.appendChild(downloadLink);
      downloadLink.click();
      document.body.removeChild(downloadLink);
    }
  }

  return (
    <LayoutDashboard id="PageFtpTest" menuOptionSelected={ROUTE_FTP_TEST.API_ID}>
      <PageHeader id="__FTPTestHeader">
        <Container>
          <Row>
            <Column lg="6" direction="row">
              <PageTitle id="__Page_Title" title="SFTP Testing" />
            </Column>
          </Row>
        </Container>
      </PageHeader>
      <Row>
        <Column xxl="6" xl="6">
          {isProcessingForm ?
            <Spacing margin={{ top: 'double' }}>
              <Spinner size={SpinnerSize.large} label="Loading" />
            </Spacing> : 
            renderForm()}
        </Column>
        <Column xxl="6" xl="6">
        {isProcessing && (
          <Spacing margin={{ top: 'double' }}>
            <Spinner size={SpinnerSize.large} label="Loading" />
          </Spacing>
        )}
        {ftpTestData?.ftpTestM?.status && (
          <Container>
            <Spacing margin={{ bottom: 'normal' }}>
              <Stack horizontal={true} horizontalAlign="space-between"> 
                <Stack horizontal={true} tokens={{ childrenGap: 10 }}> 
                  <Stack.Item align="center" disableShrink >
                    <Text variant="bold">Results</Text> 
                  </Stack.Item>
                  <Stack.Item align="center" disableShrink>
                    <Badge variant={getBadgeVariant(ftpTestData?.ftpTestM?.status)} label={ftpTestData?.ftpTestM?.status ? ftpTestData?.ftpTestM?.status : ''} pill />
                  </Stack.Item>
                </Stack>
                {ftpTestData.ftpTestM.csvLog && (
                  <Stack.Item align="center" disableShrink>
                    <FontIcon iconName="DownloadDocument" style={{ paddingRight: '.5em' }} />
                    <Link
                      target="_new"
                      onClick={downloadLogsAsCsv}
                      title={'Download Logs'}>
                      Download Logs
                    </Link>
                  </Stack.Item>)}
              </Stack>
            </Spacing>            
            {renderResults()}    
            {ftpTestData?.ftpTestM?.clientProfileSnippet && (
              <Spacing margin={{ bottom: 'normal', top: 'normal'}}>
                <Stack horizontal={true} horizontalAlign="space-between"> 
                  <Stack.Item align="center" disableShrink>
                    <Text variant="bold">Client Profile Snippet</Text>
                  </Stack.Item>
                  <Stack.Item align="center" disableShrink>
                    <FontIcon iconName="Copy" style={{ paddingRight: '.5em' }} />
                    <Link
                      onClick={() => {
                        navigator.clipboard.writeText(ftpTestData?.ftpTestM?.clientProfileSnippet ? 
                          ftpTestData.ftpTestM.clientProfileSnippet 
                          : '')
                        }}
                      target="_new"
                      title={'Copy To Clipboard'}>
                      Copy To Clipboard
                    </Link>
                  </Stack.Item>
                </Stack>
                {renderClientProfileSnippet()}
              </Spacing>)}            
          </Container>)}
        </Column>
      </Row>
      
    </LayoutDashboard>
  );
};

const FtpTestPage = memo(_FtpTestPage);

export { FtpTestPage };
