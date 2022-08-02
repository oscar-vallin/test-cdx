import { useEffect, useRef, useState } from 'react';
import {
  ChoiceGroup,
  DefaultButton,
  Dialog,
  DialogFooter,
  IconButton,
  PrimaryButton,
  Spinner,
  SpinnerSize,
  MessageBarType,
  TextField,
  Stack,
  FontIcon,
  MessageBar,
} from '@fluentui/react';
import {
  ErrorSeverity,
  SftpTestSendTestFileForm,
  useFtpTestMMutation,
  XpsftpForm,
  TestFileStrategy,
  WorkStatus,
  useXpsftpTestLazyQuery,
} from 'src/data/services/graphql';
import { useOrgSid } from 'src/hooks/useOrgSid';
import { useNotification } from 'src/hooks/useNotification';
import { UIInputCheck } from 'src/components/inputs/InputCheck';
import { Spacing } from 'src/components/spacings/Spacing';
import { UIInputText } from 'src/components/inputs/InputText';
import { UIInputTextArea } from 'src/components/inputs/InputTextArea';
import { Text } from 'src/components/typography';
import { StyledSelectedFile } from 'src/pages/Admin/FtpTest/FtpTestPage.styles';
import { LogMessageItem } from 'src/components/collapses/LogMessageItem';
import { ErrorHandler } from 'src/utils/ErrorHandler';
import { Container, Row } from 'src/components/layouts';
import { yyyyMMdda } from 'src/utils/CDXUtils';
import { Badge } from 'src/components/badges/Badge';
import { ButtonLink } from 'src/components/buttons';

const defaultProps = {
  open: false,
  isOpen: (data: boolean) => {},
};

type TestFileTransmissionModalProps = {
  open: boolean;
  isOpen: (data: boolean) => void;
} & typeof defaultProps;

const TestFileTransmissionModal = ({ isOpen, open }: TestFileTransmissionModalProps) => {
  const { orgSid } = useOrgSid();
  const Toast = useNotification();
  const handleError = ErrorHandler();
  const inputFileRef = useRef() as React.MutableRefObject<HTMLInputElement>;
  const [fetchFtpTestForm, { data: dataForm, loading: loadingForm, error: errorForm }] = useXpsftpTestLazyQuery();
  const [callFtpTest, { data: ftpTestData, loading: ftpTestLoading, error: ftpTestError }] = useFtpTestMMutation();
  const [ftpTestForm, setFtpTestForm] = useState<XpsftpForm | null>();
  const [genTestFileForm, setGenTestFileForm] = useState<SftpTestSendTestFileForm | null>();
  const [sendFileTest, setSendFileTest] = useState(false);
  const [vendorFileName, setVendorFileName] = useState('');
  const [textFileContent, setTextFileContent] = useState('');
  const [testFile, setTestFile] = useState<File>();
  const [isProcessing, setProcessing] = useState<boolean>(false);
  const [isProcessingForm, setProcessingForm] = useState<boolean>(true);
  const [message, setMessage] = useState<string | undefined>();
  const [messageType, setMessageType] = useState<MessageBarType>(MessageBarType.info);

  useEffect(() => {
    handleError(errorForm);
  }, [errorForm]);

  useEffect(() => {
    handleError(ftpTestError);
  }, [ftpTestError]);

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
      console.log(dataForm);
      setFtpTestForm(dataForm.xpsftpTest?.xpSFTPForm);
      setGenTestFileForm(dataForm.xpsftpTest?.sendTestFileForm);
    }
    setProcessingForm(false);
  }, [dataForm, loadingForm]);

  const onTestBtn = async () => {
    setProcessing(true);
    const { data, errors } = await callFtpTest({
      variables: {
        xpsftp: {
          host: 'files.known2u.com',
          user: 'guestfiles',
          password: 'w=A.Q2[#qP]4XpKq',
          port: ftpTestForm?.port?.value,
          folder: 'test/inbox',
          stepWise: ftpTestForm?.stepWise?.value,
          sshKeyPath: ftpTestForm?.sshKeyPath?.value?.value,
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

    console.log(data)
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

  const handleOnTestBtn = () => {
    onTestBtn();
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

  const ConvertToCSV = (objArray) => {
    const array = typeof objArray !== 'object' ? JSON.parse(objArray) : objArray;
    const baseColumns = ['Timestamp', 'Severity', 'Name', 'Body'];
    let str = '';
    let maxAttributes = 0;
    for (let i = 0; i < array.length; i++) {
      let line = '';
      for (const index in array[i]) {
        if (index != '__typename') {
          if (line != '') line += ',';
          if (typeof array[i][index] !== 'object') {
            if (index === 'timeStamp') {
              line += yyyyMMdda(new Date(array[i][index])).toString();
            } else {
              line += needsQuote(array[i][index]) ? quoteField(array[i][index]) : array[i][index];
            }
          } else if (array[i][index] && array[i][index].length) {
            const attributes = array[i][index];
            maxAttributes = Math.max(maxAttributes, attributes.length);
            for (let j = 0; j < attributes.length; j++) {
              for (const index in attributes[j]) {
                if (index != '__typename')
                  line += `${
                    needsQuote(attributes[j][index]) ? quoteField(attributes[j][index]) : attributes[j][index]
                  },`;
              }
            }
          }
        }
      }

      str += `${line}\r\n`;
    }
    let columnHeadersStr = `${baseColumns.join(',')},`;
    for (let i = 0; i < maxAttributes; i++) {
      columnHeadersStr += `Attribute ${i + 1} Name,Attribute ${i + 1} Value,`;
    }
    str = `${columnHeadersStr}\r\n${str}`;
    return str;
  };

  const quoteField = (field: string) => {
    field = `"${field.replace(/"/g, '""')}"`;
    return field;
  };

  const needsQuote = (str: string) => {
    const DEFAULT_FIELD_DELIMITER = ',';
    return str.includes(DEFAULT_FIELD_DELIMITER) || str.includes('\r') || str.includes('\n') || str.includes('"');
  };

  const downloadLogsAsCsv = () => {
    if (ftpTestData?.ftpTestM?.allMessages?.length) {
      const jsonObject = JSON.stringify(ftpTestData?.ftpTestM?.allMessages);
      const str = ConvertToCSV(jsonObject);
      const downloadLink = document.createElement('a');
      const blob = new Blob(['\ufeff', str]);
      downloadLink.href = URL.createObjectURL(blob);
      downloadLink.download = 'ftp-test-logs.csv';

      document.body.appendChild(downloadLink);
      downloadLink.click();
      document.body.removeChild(downloadLink);
    }
  };

  const copyProfileSnippet = () => {
    navigator.clipboard
      .writeText(ftpTestData?.ftpTestM?.clientProfileSnippet ? ftpTestData.ftpTestM.clientProfileSnippet : '')
      .then(() => {
        Toast.success({ text: 'Copied!' });
      });
  };

  const renderForm = () => {
    if (isProcessing || isProcessingForm || loadingForm) {
      return (
        <Spacing margin={{ top: 'double' }}>
          <Spinner size={SpinnerSize.large} label="Loading" />
        </Spacing>
      );
    }

    if (!ftpTestData && !isProcessingForm && genTestFileForm) {
      return (
        <Container>
          <Row>
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
                        // eslint-disable-next-line react/no-unstable-nested-components
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
                                <ButtonLink
                                  underline
                                  target="_new"
                                  onClick={() => {
                                    inputFileRef.current.value = '';
                                    inputFileRef.current.click();
                                  }}
                                  disabled={!props?.checked}
                                  title="Upload File"
                                  style={{ cursor: 'pointer' }}
                                >
                                  Upload File...
                                </ButtonLink>
                              )}
                            </Spacing>
                          );
                        },
                        // eslint-disable-next-line react/no-unstable-nested-components
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
                        // eslint-disable-next-line react/no-unstable-nested-components
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
          </Row>
        </Container>
      );
    }

    if (!isProcessing && ftpTestData) {
      return (
        <Container>
          {ftpTestData?.ftpTestM?.status && (
            <>
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
                      <ButtonLink target="_new" onClick={downloadLogsAsCsv} title="Download Logs">
                        Download Logs
                      </ButtonLink>
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
                      <ButtonLink onClick={copyProfileSnippet} target="_new" title="Copy To Clipboard">
                        Copy To Clipboard
                      </ButtonLink>
                    </Stack.Item>
                  </Stack>
                  {renderClientProfileSnippet()}
                </Spacing>
              )}
            </>
          )}
        </Container>
      );
    }
    return null;
  };

  return (
    <Dialog hidden={false} dialogContentProps={{ title: 'Test File Transmission' }} minWidth="500px">
      {renderForm()}
      <DialogFooter>
        {!ftpTestData ? (
          <>
            <PrimaryButton
              id="__TestFileTransmission_test_button"
              text="Test"
              iconProps={{ iconName: 'Phone' }}
              onClick={handleOnTestBtn}
            />
            <DefaultButton id="__TestFileTransmission_cancel_button" text="Cancel" onClick={() => isOpen(false)} />
          </>
        ) : (
          <PrimaryButton id="__FtpTest_ok" text="ok" onClick={() => isOpen(false)} />
        )}
      </DialogFooter>
    </Dialog>
  );
};

export { TestFileTransmissionModal };
