import { useEffect, useRef, useState } from 'react';
import {
  DefaultButton,
  Dialog,
  DialogFooter,
  PrimaryButton,
  Spinner,
  SpinnerSize,
  MessageBarType,
  Stack,
  MessageBar,
} from '@fluentui/react';
import {
  ErrorSeverity,
  SftpTestSendTestFileForm,
  useFtpTestMMutation,
  TestFileStrategy,
  WorkStatus,
  useXpsftpTestLazyQuery,
} from 'src/data/services/graphql';
import { useOrgSid } from 'src/hooks/useOrgSid';
import { useNotification } from 'src/hooks/useNotification';
import { UIInputCheck } from 'src/components/inputs/InputCheck';
import { Spacing } from 'src/components/spacings/Spacing';
import { Text } from 'src/components/typography';
import { ErrorHandler } from 'src/utils/ErrorHandler';
import { Container, Row } from 'src/components/layouts';
import { Badge } from 'src/components/badges/Badge';
import { FtpTestAllMessages, FtpTestClientProfileSnippet, FtpTestConvertCSV } from 'src/components/Ftp/FtpTest';
import { SendTestFile } from 'src/components/Ftp/SendTestFile/SendTestFile';

const defaultProps = {
  open: false,
  isOpen: (data: boolean) => {},
};

type ftpTestCurrentDataProps = {
  host: string;
  user: string;
  password: string;
  port: string;
  folder: string;
  stepWise: boolean;
  sshKeyPath: string;
};

type TestFileTransmissionModalProps = {
  open: boolean;
  isOpen: (data: boolean) => void;
  ftpTestCurrentData: ftpTestCurrentDataProps;
} & typeof defaultProps;

const TestFileTransmissionModal = ({ isOpen, open, ftpTestCurrentData }: TestFileTransmissionModalProps) => {
  const { orgSid } = useOrgSid();
  const Toast = useNotification();
  const handleError = ErrorHandler();
  const inputFileRef = useRef() as React.MutableRefObject<HTMLInputElement>;
  const [fetchFtpTestForm, { data: dataForm, loading: loadingForm, error: errorForm }] = useXpsftpTestLazyQuery();
  const [callFtpTest, { data: ftpTestData, loading: ftpTestLoading, error: ftpTestError }] = useFtpTestMMutation();
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
      setGenTestFileForm(dataForm.xpsftpTest?.sendTestFileForm);
    }
    setProcessingForm(false);
  }, [dataForm, loadingForm]);

  const onTestBtn = async () => {
    setProcessing(true);
    const { data, errors } = await callFtpTest({
      variables: {
        xpsftp: {
          host: ftpTestCurrentData.host,
          user: ftpTestCurrentData.user,
          password: ftpTestCurrentData.password,
          port: +ftpTestCurrentData.port,
          folder: ftpTestCurrentData.folder,
          stepWise: ftpTestCurrentData.stepWise,
          sshKeyPath: ftpTestCurrentData.sshKeyPath,
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

    if (data?.ftpTestM?.sendTestFileForm) {
      setGenTestFileForm(data?.ftpTestM?.sendTestFileForm);
    }
    setProcessing(false);
  };

  const handleOnTestBtn = () => {
    onTestBtn();
  };

  const getBadgeVariant = (ftpTestStatus?: WorkStatus): string => {
    if (!ftpTestStatus) {
      return 'info';
    }
    // purposely use a switch statement so if we add a WorkStatus, it will generate a compiler error.
    if (ftpTestStatus == 'QUEUED') {
      return 'info';
    }
    if (ftpTestStatus == 'PROCESSING') {
      return 'info';
    }
    if (ftpTestStatus == 'COMPLETE') {
      return 'success';
    }
    if (ftpTestStatus == 'ERROR') {
      return 'error';
    }
    if (ftpTestStatus == 'SUBMITTED') {
      return 'info';
    }
    if (ftpTestStatus == 'WARNING') {
      return 'warning';
    }
    if (ftpTestStatus == 'HOLD') {
      return 'warning';
    }
    if (ftpTestStatus == 'CANCELED') {
      return 'error';
    }
    if (ftpTestStatus == 'QUALITY_CHECK_FAILED') {
      return 'error';
    }
    if (ftpTestStatus == 'NO_RECORDS') {
      return 'warning';
    }
    if (ftpTestStatus == 'TECH_MIGRATION_CHECK_FAILED') {
      return 'error';
    }
    return 'info';
  };

  const renderForm = () => {
    if (isProcessing || isProcessingForm || loadingForm) {
      return (
        <Spacing margin={{ top: 'double' }}>
          <Spinner size={SpinnerSize.large} label="Loading" />
        </Spacing>
      );
    }

    if (dataForm && !loadingForm && !ftpTestData) {
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
              <SendTestFile
                genTestFileForm={genTestFileForm}
                testFile={testFile}
                setTestFile={setTestFile}
                inputFileRef={inputFileRef}
                vendorFileName={vendorFileName}
                setVendorFileName={setVendorFileName}
                textFileContent={textFileContent}
                setTextFileContent={setTextFileContent}
              />
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
                        id="__Status_result"
                        variant={getBadgeVariant(ftpTestData?.ftpTestM?.status)}
                        label={ftpTestData?.ftpTestM?.status ? ftpTestData?.ftpTestM?.status : ''}
                        pill
                      />
                    </Stack.Item>
                  </Stack>
                  {ftpTestData.ftpTestM.csvLog && (
                    <FtpTestConvertCSV allMessages={ftpTestData?.ftpTestM?.allMessages} />
                  )}
                </Stack>
              </Spacing>
              {ftpTestData.ftpTestM && <FtpTestAllMessages allMessages={ftpTestData?.ftpTestM?.allMessages} />}
              {ftpTestData?.ftpTestM?.clientProfileSnippet && (
                <FtpTestClientProfileSnippet clientProfileSnippet={ftpTestData?.ftpTestM?.clientProfileSnippet} />
              )}
            </>
          )}
        </Container>
      );
    }
    return null;
  };

  const renderButtons = () => {
    if (dataForm?.xpsftpTest?.includeFileUpload && !ftpTestData?.ftpTestM) {
      return (
        <>
          <PrimaryButton
            id="__TestFileTransmission_test_button"
            text="Test"
            iconProps={{ iconName: 'Phone' }}
            onClick={handleOnTestBtn}
          />
          <DefaultButton
            style={{ marginLeft: '10px' }}
            id="__TestFileTransmission_cancel_button"
            text="Cancel"
            onClick={() => isOpen(false)}
          />
        </>
      );
    }

    if (ftpTestData?.ftpTestM) {
      return <PrimaryButton id="__FtpTest_ok" text="ok" onClick={() => isOpen(false)} />;
    }
  };

  return (
    <Dialog hidden={false} dialogContentProps={{ title: 'Test File Transmission' }} minWidth="500px">
      {renderForm()}
      <DialogFooter>{renderButtons()}</DialogFooter>
    </Dialog>
  );
};

export { TestFileTransmissionModal };
