import { useEffect, useState } from 'react';
import { PanelType, PrimaryButton, Spinner, SpinnerSize, Text } from '@fluentui/react';
import { PanelBody, ThemedPanel } from 'src/layouts/Panels/Panels.styles';
import {
  useCopyXchangeFileTransmissionLazyQuery,
  XchangeFileTransmissionForm,
  useCreateXchangeFileTransmissionMutation,
  NvpStr,
} from 'src/data/services/graphql';
import { useNotification } from 'src/hooks/useNotification';
import { useQueryHandler } from 'src/hooks/useQueryHandler';
import { UIInputMultiSelect } from 'src/components/inputs/InputDropdown/UIInputMultiSelect';
import { Spacing } from 'src/components/spacings/Spacing';
import { Column, Container, Row } from 'src/components/layouts';
import { UIInputSelectOne } from 'src/components/inputs/InputDropdown';
import { UIInputText } from 'src/components/inputs/InputText';
import { UIInputCheck } from 'src/components/inputs/InputCheck';

type XchangeTransmissionPanelProps = {
  isPanelOpen: boolean;
  closePanel: (data: boolean) => void;
  refreshDetailsPage: (data: boolean) => void;
  xchangeStepSid?: string;
  xchangeFileProcessSid?: string;
  orifinalFileTransmission?: string;
  qualifier?: string;
};

type OverrideProps = {
  protocol: boolean;
  host: boolean;
  port: boolean;
  userName: boolean;
  password: boolean;
  authKeyName: boolean;
  folder: boolean;
  filenamePattern: boolean;
  stepWise: boolean;
  encryptionKeyName: boolean;
};

const DefaultOverrideProps: OverrideProps = {
  protocol: false,
  host: false,
  port: false,
  userName: false,
  password: false,
  authKeyName: false,
  folder: false,
  filenamePattern: false,
  stepWise: false,
  encryptionKeyName: false,
};

const XchangeTransmissionPanel = ({
  isPanelOpen,
  closePanel,
  refreshDetailsPage,
  xchangeStepSid,
  xchangeFileProcessSid,
  orifinalFileTransmission,
  qualifier,
}: XchangeTransmissionPanelProps) => {
  const Toast = useNotification();
  const [copyXchangeFileTransmission, setCopyXchangeFileTransmission] = useState<XchangeFileTransmissionForm>();
  const [filenameQualifiers, setFilenameQualifiers] = useState<string[]>();
  const [protocol, setProtocol] = useState('');
  const [host, setHost] = useState('');
  const [port, setPort] = useState('');
  const [filenamePattern, setFilenamePattern] = useState('');
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [folder, setFolder] = useState('');
  const [stepWise, setStepWise] = useState<boolean>();
  const [encryptionKeyName, setEncryptionKeyName] = useState('');
  const [detach, setDetach] = useState(false);
  const [override, setOverride] = useState<OverrideProps>(DefaultOverrideProps);

  const [xchangeFileTransmission, { data: dataCopyTransmission, loading: loadingCopyTransmission }] = useQueryHandler(
    useCopyXchangeFileTransmissionLazyQuery
  );

  const [createXchangeFileTransmission, { data: dataCreateFile, loading: loadingCreateFile, error: errorCreateFile }] =
    useQueryHandler(useCreateXchangeFileTransmissionMutation);

  const getFileTransmissionData = () => {
    xchangeFileTransmission({
      variables: {
        xchangeFileProcessSid,
        sid: xchangeStepSid,
      },
    });
  };

  const saveFileTransmission = () => {
    createXchangeFileTransmission({
      variables: {
        transInput: {
          xchangeFileProcessSid,
          parentSid: xchangeStepSid,
          filenameQualifiers,
          protocol: { value: protocol, inherited: override['protocol'] },
          host: { value: host, inherited: override['host'] },
          port: { value: port, inherited: override['port'] },
          userName: { value: userName, inherited: override['userName'] },
          password: { value: password, inherited: override['password'] },
          authKeyName: { value: null, inherited: override['authKeyName'] },
          folder: { value: folder, inherited: override['folder'] },
          filenamePattern: { value: filenamePattern, inherited: override['filenamePattern'] },
          stepWise: { value: stepWise, inherited: override['stepWise'] },
          encryptionKeyName: { value: encryptionKeyName, inherited: override['encryptionKeyName'] },
        },
      },
    });
  };

  const renderBody = () => {
    if (loadingCopyTransmission) {
      return (
        <Spacing margin={{ top: 'double' }}>
          <Spinner size={SpinnerSize.large} label="Loading File Transmission" />
        </Spacing>
      );
    }

    const overrideEnables = (uiFieldData, file: string) => {
      const uiField = { ...uiFieldData };
      if (override[file] || detach) {
        uiField.inheritedFrom = null;
      } else {
        if (file === 'password') {
          uiField.value = '********';
        }
        if (file === 'port') {
          uiField.value = '22';
        }
        uiField.readOnly = true;
      }
      return uiField;
    };

    const enableUpdate = (file: string) => {
      if (override[file] || detach) {
        return (
          <Text
            style={{ color: '#0078D4', cursor: 'pointer' }}
            onClick={() => setOverride({ ...override, [file]: false })}
          >
            inherit
          </Text>
        );
      }

      return (
        <Text
          style={{ color: '#0078D4', cursor: 'pointer' }}
          onClick={() => setOverride({ ...override, [file]: true })}
        >
          override
        </Text>
      );
    };

    return (
      <PanelBody>
        <Container>
          <Row>
            {!detach && (
              <Column lg="10">
                <span>
                  Copied from{' '}
                  <Text style={{ fontWeight: 'bold' }}>
                    {orifinalFileTransmission} {qualifier}
                  </Text>
                </span>
              </Column>
            )}
            <Column lg="2">
              <Text
                style={{ color: '#0078D4', cursor: 'pointer' }}
                onClick={() => {
                  setDetach(true);
                  setOverride({
                    protocol: true,
                    host: true,
                    port: true,
                    userName: true,
                    password: true,
                    authKeyName: true,
                    folder: true,
                    filenamePattern: true,
                    stepWise: true,
                    encryptionKeyName: true,
                  });
                }}
              >
                detach
              </Text>
            </Column>
          </Row>
          {copyXchangeFileTransmission?.filenameQualifiers.visible && (
            <Spacing margin={{ bottom: 'normal', top: 'normal' }}>
              <Row>
                <Column lg="12">
                  <UIInputMultiSelect
                    id="__filenameQualifier"
                    value={filenameQualifiers}
                    uiField={copyXchangeFileTransmission?.filenameQualifiers}
                    options={copyXchangeFileTransmission?.options ?? []}
                    onChange={(newValue) => {
                      setFilenameQualifiers(newValue ?? []);
                    }}
                  />
                </Column>
              </Row>
            </Spacing>
          )}
          {copyXchangeFileTransmission?.protocol.visible && (
            <Spacing margin={{ bottom: 'normal' }}>
              <Row>
                <Column lg="12">
                  <UIInputSelectOne
                    id="protocol"
                    value={protocol}
                    uiField={overrideEnables(copyXchangeFileTransmission.protocol, 'protocol')}
                    options={copyXchangeFileTransmission?.options}
                    onChange={(newValue) => setProtocol(newValue ?? '')}
                  />
                  {enableUpdate('protocol')}
                </Column>
              </Row>
            </Spacing>
          )}

          <Row>
            {copyXchangeFileTransmission?.host.visible && (
              <Column lg="8">
                <UIInputText
                  id="filenameTransmissionHost"
                  placeholder="host"
                  value={host}
                  uiField={overrideEnables(copyXchangeFileTransmission?.host, 'host')}
                  onChange={(event, newValue) => setHost(newValue ?? '')}
                />
                {enableUpdate('host')}
              </Column>
            )}
            {copyXchangeFileTransmission?.port.visible && (
              <Column lg="4">
                <UIInputText
                  id="filenameTransmissionPort"
                  placeholder="port"
                  value={port}
                  uiField={overrideEnables(copyXchangeFileTransmission?.port, 'port')}
                  onChange={(event, newValue) => setPort(newValue ?? '')}
                />
                {enableUpdate('port')}
              </Column>
            )}
          </Row>
          {copyXchangeFileTransmission?.userName.visible && (
            <Spacing margin={{ bottom: 'normal', top: 'normal' }}>
              <Row>
                <Column lg="12">
                  <UIInputText
                    id="userName"
                    value={userName}
                    uiField={overrideEnables(copyXchangeFileTransmission?.userName, 'userName')}
                    placeholder="user"
                    onChange={(event, newValue) => setUserName(newValue ?? '')}
                  />
                  {enableUpdate('userName')}
                </Column>
              </Row>
            </Spacing>
          )}
          {copyXchangeFileTransmission?.password.visible && (
            <Spacing margin={{ bottom: 'normal' }}>
              <Row>
                <Column lg="12">
                  <UIInputText
                    id="password"
                    type="password"
                    value={password}
                    uiField={overrideEnables(copyXchangeFileTransmission?.password, 'password')}
                    placeholder="password"
                    onChange={(event, newValue) => setPassword(newValue ?? '')}
                  />
                  {enableUpdate('password')}
                </Column>
              </Row>
            </Spacing>
          )}
          {copyXchangeFileTransmission?.folder.visible && (
            <Spacing margin={{ bottom: 'normal' }}>
              <Row>
                <Column lg="12">
                  <UIInputText
                    id="folder"
                    value={folder}
                    uiField={overrideEnables(copyXchangeFileTransmission?.folder, 'folder')}
                    onChange={(event, newValue) => setFolder(newValue ?? '')}
                  />
                  {enableUpdate('folder')}
                </Column>
              </Row>
            </Spacing>
          )}
          {copyXchangeFileTransmission?.filenamePattern.visible && (
            <Spacing margin={{ bottom: 'normal' }}>
              <Row>
                <Column lg="12">
                  <UIInputText
                    id="fileNamePattern"
                    value={filenamePattern}
                    uiField={overrideEnables(copyXchangeFileTransmission?.filenamePattern, 'filenamePattern')}
                    onChange={(event, newValue) => setFilenamePattern(newValue ?? '')}
                  />
                  {enableUpdate('filenamePattern')}
                </Column>
              </Row>
            </Spacing>
          )}
          <Row>
            <Column lg="6">
              <UIInputCheck
                id="stepWise"
                uiField={overrideEnables(copyXchangeFileTransmission?.stepWise, 'stepWise')}
                value={stepWise}
                onChange={(event, _stepWise: any) => setStepWise(_stepWise)}
              />
              {enableUpdate('stepWise')}
            </Column>
          </Row>
          <Row>
            <Column lg="12">
              <UIInputSelectOne
                id="vednorEncryptionKeyName"
                value={encryptionKeyName}
                uiField={overrideEnables(copyXchangeFileTransmission?.encryptionKeyName, 'encryptionKeyName')}
                options={copyXchangeFileTransmission?.options}
                onChange={(newValue) => setEncryptionKeyName(newValue ?? '')}
              />
              {enableUpdate('encryptionKeyName')}
            </Column>
          </Row>
          <Spacing margin={{ top: 'normal' }}>
            <PrimaryButton
              id="__Xchange_AddStep_Button"
              iconProps={{ iconName: 'Save' }}
              onClick={saveFileTransmission}
            >
              Save
            </PrimaryButton>
          </Spacing>
        </Container>
      </PanelBody>
    );
  };

  useEffect(() => {
    if (isPanelOpen) {
      getFileTransmissionData();
    }
  }, [isPanelOpen]);

  useEffect(() => {
    if (!loadingCreateFile && dataCreateFile) {
      refreshDetailsPage(true);
      Toast.success({ text: 'File transmission added' });
      closePanel(false);
    }

    if (!loadingCreateFile && errorCreateFile) {
      console.log(errorCreateFile)
      Toast.error({ text: `There was an error to add File Transmission` });
    }
  }, [dataCreateFile, loadingCreateFile, errorCreateFile]);

  useEffect(() => {
    if (!loadingCopyTransmission && dataCopyTransmission) {
      console.log(dataCopyTransmission);
      setCopyXchangeFileTransmission(dataCopyTransmission.copyXchangeFileTransmission);
      setProtocol(copyXchangeFileTransmission?.protocol.value?.value ?? '');
      setPort(dataCopyTransmission.copyXchangeFileTransmission?.port.value ?? '22');
      setFilenamePattern(dataCopyTransmission.copyXchangeFileTransmission.filenamePattern.value ?? '');
      setHost(dataCopyTransmission.copyXchangeFileTransmission.protocol.value ?? '');
      setUserName(dataCopyTransmission.copyXchangeFileTransmission?.userName.value ?? '');
      setPassword(dataCopyTransmission.copyXchangeFileTransmission.password.value ?? '');
      setFolder(dataCopyTransmission.copyXchangeFileTransmission?.folder.value ?? '');
      setStepWise(dataCopyTransmission.copyXchangeFileTransmission?.stepWise.value ?? false);
      setEncryptionKeyName(dataCopyTransmission.copyXchangeFileTransmission?.encryptionKeyName ?? '');
    }
  }, [dataCopyTransmission, loadingCopyTransmission]);
  return (
    <ThemedPanel
      closeButtonAriaLabel="Close"
      headerText="file transmission"
      type={PanelType.medium}
      isOpen={isPanelOpen}
      onDismiss={() => {
        closePanel(false);
        setOverride(DefaultOverrideProps);
        setDetach(false);
      }}
    >
      {renderBody()}
    </ThemedPanel>
  );
};

export { XchangeTransmissionPanel };
