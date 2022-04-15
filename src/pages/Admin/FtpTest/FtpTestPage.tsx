import React, { memo, useEffect, useState } from 'react';
import {
  FontIcon,
  IconButton,
  Link,
  Spinner,
  SpinnerSize,
  Stack,
  TextField,
  ChoiceGroup,
  MessageBar,
  MessageBarType,
} from '@fluentui/react';
import { LayoutDashboard } from 'src/layouts/LayoutDashboard';
import { Button } from 'src/components/buttons';
import { Spacing } from 'src/components/spacings/Spacing';
import { Column, Container, Row } from 'src/components/layouts';
import { InputText, UIInputText } from 'src/components/inputs/InputText';
import { UIInputCheck } from 'src/components/inputs/InputCheck';
import { PageTitle, Text } from 'src/components/typography';
import { ROUTE_FTP_TEST } from 'src/data/constants/RouteConstants';
import { PageHeader } from 'src/containers/headers/PageHeader';
import {
  ErrorSeverity,
  SftpTestSendTestFileForm,
  TestFileStrategy,
  useFtpTestMMutation,
  useXpsftpTestLazyQuery,
  WorkStatus,
  XpsftpForm,
} from 'src/data/services/graphql';
import { useOrgSid } from 'src/hooks/useOrgSid';
import { LogMessageItem } from 'src/components/collapses/LogMessageItem';
import { Badge } from 'src/components/badges/Badge';
import { StyledSelectedFile } from './FtpTestPage.styles';
import { useNotification } from 'src/hooks/useNotification';
import { UIInputTextArea } from 'src/components/inputs/InputTextArea';
import { yyyyMMdda } from 'src/utils/CDXUtils';

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
  const [testFile, setTestFile] = useState<File>();
  const { orgSid } = useOrgSid();
  const [fetchFtpTestForm, { data: dataForm, loading: loadingForm, error: errorForm }] = useXpsftpTestLazyQuery();
  const [callFtpTest, { data: ftpTestData, loading: ftpTestLoading, error: ftpTestError }] = useFtpTestMMutation();
  const [isProcessing, setProcessing] = useState<boolean>(false);
  const [isProcessingForm, setProcessingForm] = useState<boolean>(true);
  const [ftpTestForm, setFtpTestForm] = useState<XpsftpForm | null>();
  const [genTestFileForm, setGenTestFileForm] = useState<SftpTestSendTestFileForm | null>();
  const [message, setMessage] = useState<string | undefined>();
  const [messageType, setMessageType] = useState<MessageBarType>(MessageBarType.info);

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
      setGenTestFileForm(dataForm.xpsftpTest?.sendTestFileForm);
    }
    setProcessingForm(false);
  }, [dataForm, loadingForm]);

  const onTestBtn = async () => {
    setProcessing(true);
    setMessage(undefined);
    const { data, errors } = await callFtpTest({
      variables: {
        xpsftp: {
          host,
          user,
          password,
          port: +port,
          folder,
          stepWise,
        },
        sendTestFile: {
          sendTestFile: sendFileTest && !testFile,
          testFileStrategy: testFile ? TestFileStrategy.Upload : TestFileStrategy.Generate,
          fileName: !vendorFileName ? 'k2u-test-file.txt' : vendorFileName,
          fileBody: !testFile && !textFileContent ? 'Connection Test' : textFileContent,
        },
        testFile: sendFileTest && testFile ? testFile : null,
      },
    });

    if (data?.ftpTestM?.status === 'ERROR') {
      Toast.error({ text: data?.ftpTestM?.logMessage.body });
      if (data?.ftpTestM?.xpSFTPForm?.errSeverity === ErrorSeverity.Error) {
        const errorMsg =
          data.ftpTestM.xpSFTPForm.errMsg ??
          data.ftpTestM.logMessage.body ??
          'Error occurred, please verify the information and try again.';
        setMessageType(MessageBarType.error);
        setMessage(errorMsg);
      }
    }

    if (errors) {
      Toast.error({ text: errors[0].message });
    }

    if (data?.ftpTestM?.xpSFTPForm) {
      setFtpTestForm(data?.ftpTestM?.xpSFTPForm);
    }
    if (data?.ftpTestM?.sendTestFileForm) {
      setGenTestFileForm(data?.ftpTestM?.sendTestFileForm);
    }
    setProcessing(false);
  };

  const handleOnTestBtn = () => {
    onTestBtn();
    return null;
  };

  const handleChooseFile = (e) => {
    const {
      target: {
        validity,
        files: [file],
      },
    } = e;
    if (validity.valid) {
      setTestFile(file);
      setVendorFileName(file.name);
    }
  };

  const renderForm = () => {
    return (
      <Container>
        <Row>
          <Column xxl="12" xl="12">
            <Row>
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
                  <Spacing margin={{ bottom: 'normal', left: 'normal' }}>
                    <UIInputText
                      id="port"
                      uiField={ftpTestForm.port}
                      placeholder="port"
                      value={port}
                      type="number"
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
                  autocomplete="off"
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
                  autocomplete="new-password"
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
            {ftpTestForm?.stepWise?.visible && (
              <Spacing margin={{ top: 'normal', bottom: 'normal' }}>
                <UIInputCheck
                  id="stepWise"
                  uiField={ftpTestForm?.stepWise}
                  value={stepWise}
                  onChange={(event, _stepWise: any) => setStepWise(_stepWise)}
                />
              </Spacing>
            )}
            {genTestFileForm?.sendTestFile?.visible && (
              <Spacing margin={{ top: 'normal', bottom: 'normal' }}>
                <UIInputCheck
                  id="sendFileTest"
                  uiField={genTestFileForm?.sendTestFile}
                  onChange={(_event, _sendFileTest: any) => setSendFileTest(_sendFileTest)}
                />
              </Spacing>
            )}
            {sendFileTest && (
              <Spacing margin={{ bottom: 'normal' }} padding={{ left: 'normal' }}>
                <Spacing margin={{ bottom: 'normal' }}>
                  <ChoiceGroup
                    defaultSelectedKey={genTestFileForm?.testFileStrategy?.value?.value}
                    options={[
                      {
                        key: TestFileStrategy.Upload,
                        text: '',
                        styles: { choiceFieldWrapper: { marginTop: '10px', width: '100%' } },
                        onRenderLabel: (props) => {
                          return (
                            <Spacing margin={{ left: 'double' }}>
                              {testFile ? (
                                <StyledSelectedFile>
                                  <Text variant="normal">{testFile.name}</Text>
                                  <IconButton
                                    iconProps={{ iconName: 'Cancel' }}
                                    onClick={() => setTestFile(undefined)}
                                  />
                                </StyledSelectedFile>
                              ) : (
                                <Link
                                  underline
                                  target="_new"
                                  onClick={() => {
                                    inputFileRef.current.value = '';
                                    inputFileRef.current.click();
                                  }}
                                  disabled={!props?.checked}
                                  title={'Upload File'}
                                  style={{ cursor: 'pointer' }}
                                >
                                  Upload File...
                                </Link>
                              )}
                            </Spacing>
                          );
                        },
                        onRenderField: (props, render) => {
                          return (
                            <>
                              {render!(props)}
                              <input
                                style={{ display: 'none' }}
                                type="file"
                                ref={inputFileRef}
                                onChange={handleChooseFile}
                              />
                              {props?.checked && genTestFileForm?.fileName?.visible && (
                                <Spacing margin={{ bottom: 'normal', top: 'normal' }}>
                                  <UIInputText
                                    id="fileName"
                                    uiField={genTestFileForm?.fileName}
                                    value={vendorFileName}
                                    onChange={(event, newValue) => setVendorFileName(newValue ?? '')}
                                  />
                                </Spacing>
                              )}
                            </>
                          );
                        },
                      },
                      {
                        key: TestFileStrategy.Generate,
                        text: 'Generate a File',
                        styles: { choiceFieldWrapper: { marginTop: '10px', width: '100%' } },
                        onRenderField: (props, render) => {
                          return (
                            <>
                              {render!(props)}
                              {props?.checked && (
                                <>
                                  {genTestFileForm?.fileName?.visible && (
                                    <Spacing margin={{ bottom: 'normal', top: 'normal' }}>
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
                                      <UIInputTextArea
                                        id="textFileContent"
                                        uiField={genTestFileForm?.fileBody}
                                        value={textFileContent}
                                        multiline={true}
                                        onChange={(event, newValue: any) => setTextFileContent(newValue ?? '')}
                                        placeholder="Put the text you want in the file here, if you leave blank the text 'Connection Test' will be used for the file's contents."
                                        resizable={false}
                                        rows={10}
                                      />
                                    </Spacing>
                                  )}
                                </>
                              )}
                            </>
                          );
                        },
                      },
                    ]}
                    onChange={() => {
                      setVendorFileName('');
                      setTestFile(undefined);
                    }}
                  />
                </Spacing>
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
        {ftpTestData?.ftpTestM?.allMessages &&
          ftpTestData?.ftpTestM?.allMessages.map((logMessageItem, logMessageItemIndex) => (
            <LogMessageItem key={logMessageItemIndex} logMessage={logMessageItem} />
          ))}
      </>
    );
  };

  const renderClientProfileSnippet = () => {
    return (
      <Spacing margin={{ bottom: 'normal', top: 'normal' }}>
        {ftpTestData?.ftpTestM?.clientProfileSnippet && (
          <TextField
            id="clientProfileSnippet"
            multiline
            disabled
            value={ftpTestData?.ftpTestM?.clientProfileSnippet}
            rows={12}
            resizable={false}
          />
        )}
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

  const downloadLogsAsCsv = () => {
    if (ftpTestData?.ftpTestM?.allMessages?.length) {
      var jsonObject = JSON.stringify(ftpTestData?.ftpTestM?.allMessages);
      const str = ConvertToCSV(jsonObject);
      var downloadLink = document.createElement('a');
      var blob = new Blob(['\ufeff', str]);
      var url = URL.createObjectURL(blob);
      downloadLink.href = url;
      downloadLink.download = 'ftp-test-logs.csv';

      document.body.appendChild(downloadLink);
      downloadLink.click();
      document.body.removeChild(downloadLink);
    }
  };

  const ConvertToCSV = (objArray) => {
    var array = typeof objArray != 'object' ? JSON.parse(objArray) : objArray;
    const baseColumns = ['Timestamp', 'Severity', 'Name', 'Body'];
    var str = '';
    let maxAttributes = 0;
    for (var i = 0; i < array.length; i++) {
      var line = '';
      for (var index in array[i]) {
        if (index != '__typename') {
          if (line != '') line += ',';
          if (typeof array[i][index] != 'object') {
            if (index === 'timeStamp') {
              line += yyyyMMdda(new Date(array[i][index])).toString();
            } else {
              line += needsQuote(array[i][index]) ? quoteField(array[i][index]) : (array[i][index]);
            }
          } else if (array[i][index] && array[i][index].length) {
            let attributes = array[i][index];
            maxAttributes = Math.max(maxAttributes, attributes.length);
            for (let j = 0; j < attributes.length; j++) {
              for (var index in attributes[j]) {
                if (index != '__typename')  line += (needsQuote(attributes[j][index]) ? quoteField(attributes[j][index]) : (attributes[j][index])) + ',';
              }
            }
          }
        }
      }

      str += line + '\r\n';
    }
    let columnHeadersStr = baseColumns.join(',') + ',';
    for (let i = 0; i < maxAttributes; i++) {
      columnHeadersStr += `Attribute ${i + 1} Name,Attribute ${i + 1} Value,`;
    }
    str = columnHeadersStr + '\r\n' + str;
    return str;
  };

  const quoteField=(field: string)=> {    
    field = `"${field.replace(/"/g, '""')}"`
    return field
  }
  
  const needsQuote=(str: string)=>{
    const DEFAULT_FIELD_DELIMITER = ','
    return str.includes(DEFAULT_FIELD_DELIMITER) || str.includes('\r') || str.includes('\n') || str.includes('"')
  }

  const copyProfileSnippet = () => {
    navigator.clipboard.writeText(
      ftpTestData?.ftpTestM?.clientProfileSnippet ? ftpTestData.ftpTestM.clientProfileSnippet : ''
    );
    Toast.success({ text: 'Copied!' });
  };

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
          {isProcessingForm ? (
            <Spacing margin={{ top: 'double' }}>
              <Spinner size={SpinnerSize.large} label="Loading" />
            </Spacing>
          ) : (
            renderForm()
          )}
        </Column>
        <Column xxl="6" xl="6">
          {isProcessing && (
            <Spacing margin={{ top: 'double' }}>
              <Spinner size={SpinnerSize.large} label="Loading" />
            </Spacing>
          )}
          {ftpTestData?.ftpTestM?.status && (
            <Container>
              {message && (
                <Spacing margin={{ bottom: 'normal' }}>
                  <MessageBar
                    id="__OrgPanel_Msg"
                    messageBarType={messageType}
                    isMultiline
                    onDismiss={() => setMessage(undefined)}
                  >
                    {message}
                  </MessageBar>
                </Spacing>
              )}
              <Spacing margin={{ bottom: 'normal' }}>
                <Stack horizontal={true} horizontalAlign="space-between">
                  <Stack horizontal={true} tokens={{ childrenGap: 10 }}>
                    <Stack.Item align="center" disableShrink>
                      <Text variant="bold">Results</Text>
                    </Stack.Item>
                    <Stack.Item align="center" disableShrink>
                      <Badge
                        variant={getBadgeVariant(ftpTestData?.ftpTestM?.status)}
                        label={ftpTestData?.ftpTestM?.status ? ftpTestData?.ftpTestM?.status : ''}
                        pill
                      />
                    </Stack.Item>
                  </Stack>
                  {ftpTestData.ftpTestM.csvLog && (
                    <Stack.Item align="center" disableShrink>
                      <FontIcon
                        onClick={downloadLogsAsCsv}
                        iconName="DownloadDocument"
                        style={{ paddingRight: '.5em', cursor: 'pointer' }}
                      />
                      <Link target="_new" onClick={downloadLogsAsCsv} title={'Download Logs'}>
                        Download Logs
                      </Link>
                    </Stack.Item>
                  )}
                </Stack>
              </Spacing>
              {renderResults()}
              {ftpTestData?.ftpTestM?.clientProfileSnippet && (
                <Spacing margin={{ bottom: 'normal', top: 'normal' }}>
                  <Stack horizontal={true} horizontalAlign="space-between">
                    <Stack.Item align="center" disableShrink>
                      <Text variant="bold">Client Profile Snippet</Text>
                    </Stack.Item>
                    <Stack.Item align="center" disableShrink>
                      <FontIcon
                        iconName="Copy"
                        onClick={copyProfileSnippet}
                        style={{ paddingRight: '.5em', cursor: 'pointer' }}
                      />
                      <Link onClick={copyProfileSnippet} target="_new" title={'Copy To Clipboard'}>
                        Copy To Clipboard
                      </Link>
                    </Stack.Item>
                  </Stack>
                  {renderClientProfileSnippet()}
                </Spacing>
              )}
            </Container>
          )}
        </Column>
      </Row>
    </LayoutDashboard>
  );
};

const FtpTestPage = memo(_FtpTestPage);

export { FtpTestPage };
