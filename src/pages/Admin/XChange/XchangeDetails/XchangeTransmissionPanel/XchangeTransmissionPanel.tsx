import { useEffect, useState } from 'react';
import { PanelType, PrimaryButton, Spinner, SpinnerSize, Text } from '@fluentui/react';
import { PanelBody, ThemedPanel } from 'src/layouts/Panels/Panels.styles';
import {
  useCopyXchangeFileTransmissionLazyQuery,
  XchangeFileTransmissionForm,
  useCreateXchangeFileTransmissionMutation,
} from 'src/data/services/graphql';
import { DialogYesNo, DialogYesNoProps } from 'src/containers/modals/DialogYesNo';
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

const defaultDialogProps: DialogYesNoProps = {
  open: false,
  title: '',
  message: '',
  messageYes: 'Yes',
  messageNo: 'No',
  onYesNo: () => null,
  onYes: () => {},
  onNo: () => {},
  closeOnNo: true,
  closeOnYes: true,
  highlightNo: true,
  highlightYes: false,
  onClose: () => null,
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
  const [overrides, setOverrides] = useState<OverrideProps>(DefaultOverrideProps);
  const [showDialog, setShowDialog] = useState(false);
  const [dialogProps, setDialogProps] = useState<DialogYesNoProps>(defaultDialogProps);
  const [unsavedChanges, setUnsavedChanges] = useState(false);

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
          protocol: {
            value: overrides.protocol ? protocol : copyXchangeFileTransmission?.protocol.value?.value,
            inherited: overrides['protocol'],
          },
          host: {
            value: overrides.host ? host : copyXchangeFileTransmission?.port.value,
            inherited: overrides['host'],
          },
          port: { value: port, inherited: overrides['port'] },
          userName: {
            value: overrides.userName ? userName : copyXchangeFileTransmission?.userName.value,
            inherited: overrides['userName'],
          },
          password: {
            value: overrides.password ? password : copyXchangeFileTransmission?.password.value,
            inherited: overrides['password'],
          },
          authKeyName: { value: null, inherited: overrides['authKeyName'] },
          folder: {
            value: overrides.folder ? folder : copyXchangeFileTransmission?.folder.value,
            inherited: overrides['folder'],
          },
          filenamePattern: {
            value: overrides.filenamePattern ? filenamePattern : copyXchangeFileTransmission?.filenamePattern.value,
            inherited: overrides['filenamePattern'],
          },
          stepWise: {
            value: overrides.stepWise ? stepWise : copyXchangeFileTransmission?.stepWise.value,
            inherited: overrides['stepWise'],
          },
          encryptionKeyName: {
            value: overrides.encryptionKeyName
              ? encryptionKeyName
              : copyXchangeFileTransmission?.encryptionKeyName.value,
            inherited: overrides['encryptionKeyName'],
          },
        },
      },
    });
  };

  const enableUpdate = (file: string) => {
    if (overrides[file] || detach) {
      return (
        <Text
          style={{ color: '#0078D4', cursor: 'pointer' }}
          onClick={() => setOverrides({ ...overrides, [file]: false })}
        >
          inherit
        </Text>
      );
    }

    return (
      <Text
        style={{ color: '#0078D4', cursor: 'pointer' }}
        onClick={() => setOverrides({ ...overrides, [file]: true })}
      >
        override
      </Text>
    );
  };

  const overrideEnables = (uiFieldData, file: string) => {
    const uiField = { ...uiFieldData };
    if (overrides[file] || detach) {
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

  const reviewChanges = () => {
    if (detach) {
      setUnsavedChanges(true);
      return;
    }

    const validateOverides = Object.values(overrides);

    if (validateOverides.includes(true)) {
      setUnsavedChanges(true);
    } else {
      setUnsavedChanges(false);
    }
  };

  const hideDialog = () => {
    setShowDialog(false);
  };

  const showUnsavedChangesDialog = () => {
    const updatedDialog = { ...defaultDialogProps };
    updatedDialog.title = 'You have unsaved changes';
    updatedDialog.message =
      'Changes made to this Xchange step will be discarded?  Are you sure you wish to continue and lose your changes?';

    updatedDialog.onYes = () => {
      hideDialog();
      closePanel(false);
      setUnsavedChanges(false);
      setOverrides(DefaultOverrideProps);
      setDetach(false);
    };
    updatedDialog.onClose = () => {
      hideDialog();
    };
    setDialogProps(updatedDialog);
    setShowDialog(true);
  };

  const onPanelClose = () => {
    if (unsavedChanges) {
      showUnsavedChangesDialog();
    } else {
      closePanel(false);
      setOverrides(DefaultOverrideProps);
      setDetach(false);
    }
  };

  const renderBody = () => {
    if (loadingCopyTransmission) {
      return (
        <Spacing margin={{ top: 'double' }}>
          <Spinner size={SpinnerSize.large} label="Loading File Transmission" />
        </Spacing>
      );
    }

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
                  setOverrides({
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
      Toast.error({ text: `There was an error to add File Transmission` });
    }
  }, [dataCreateFile, loadingCreateFile, errorCreateFile]);

  useEffect(() => {
    reviewChanges();
  }, [overrides]);

  useEffect(() => {
    if (!loadingCopyTransmission && dataCopyTransmission) {
      setCopyXchangeFileTransmission(dataCopyTransmission.copyXchangeFileTransmission);
      setProtocol(copyXchangeFileTransmission?.protocol.value?.value ?? '');
      setPort(dataCopyTransmission.copyXchangeFileTransmission?.port.value ?? '22');
      setHost(dataCopyTransmission.copyXchangeFileTransmission.host.value ?? '');
      setUserName(dataCopyTransmission.copyXchangeFileTransmission?.userName.value ?? '');
      setPassword(dataCopyTransmission.copyXchangeFileTransmission?.password.value ?? '');
      setFolder(dataCopyTransmission.copyXchangeFileTransmission?.folder.value ?? '');
      setFilenamePattern(dataCopyTransmission.copyXchangeFileTransmission.filenamePattern.value ?? '');
      setStepWise(dataCopyTransmission.copyXchangeFileTransmission?.stepWise.value ?? false);
      setEncryptionKeyName(dataCopyTransmission.copyXchangeFileTransmission?.encryptionKeyName.value ?? '');
    }
  }, [dataCopyTransmission, loadingCopyTransmission]);
  return (
    <ThemedPanel
      closeButtonAriaLabel="Close"
      headerText="file transmission"
      type={PanelType.medium}
      isOpen={isPanelOpen}
      onDismiss={() => {
        onPanelClose();
      }}
    >
      {renderBody()}
      <DialogYesNo {...dialogProps} open={showDialog} />
    </ThemedPanel>
  );
};

export { XchangeTransmissionPanel };
