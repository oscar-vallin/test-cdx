import { useEffect, useState } from 'react';
import { DefaultButton, PanelType, PrimaryButton, Spinner, SpinnerSize, Stack, Text } from '@fluentui/react';
import { PanelBody, PanelHeader, PanelTitle, ThemedPanel } from 'src/layouts/Panels/Panels.styles';
import {
  useCopyXchangeFileTransmissionLazyQuery,
  XchangeFileTransmissionForm,
  useCreateXchangeFileTransmissionMutation,
  useUpdateXchangeFileTransmissionMutation,
  useXchangeFileTransmissionFormLazyQuery,
  usePreviewFilenamePatternLazyQuery,
  CdxWebCommandType,
  WebCommand,
} from 'src/data/services/graphql';
import { DialogYesNo, DialogYesNoProps } from 'src/containers/modals/DialogYesNo';
import { useNotification } from 'src/hooks/useNotification';
import { useQueryHandler } from 'src/hooks/useQueryHandler';
import { UIInputMultiSelect } from 'src/components/inputs/InputDropdown/UIInputMultiSelect';
import { Spacing } from 'src/components/spacings/Spacing';
import { Column, Container, Row } from 'src/components/layouts';
import { UIInputSelectOne } from 'src/components/inputs/InputDropdown';
import { InputText, UIInputText } from 'src/components/inputs/InputText';
import { UIInputCheck } from 'src/components/inputs/InputCheck';
import { ButtonLink } from 'src/components/buttons';
import { TestFileTransmissionModal } from 'src/containers/modals/TestFileTransmissionModal';
import { theme } from 'src/styles/themes/theme';

type XchangeTransmissionPanelProps = {
  isPanelOpen: boolean;
  closePanel: (data: boolean) => void;
  refreshDetailsPage: (data: boolean) => void;
  setShowIcons: (data: boolean) => void;
  setOptionXchangeTransmission: (data: string) => void;
  optionXchangeTransmission?: string;
  xchangeStepSid?: string;
  xchangeFileProcessSid?: string;
  orifinalFileTransmission?: string;
  qualifier?: string;
};

const defaultDialogProps: DialogYesNoProps = {
  id: '__FileTransmission_Dlg',
  open: false,
  title: '',
  message: '',
  labelYes: 'Yes',
  labelNo: 'No',
  highlightNo: true,
  highlightYes: false,
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
  setShowIcons,
  setOptionXchangeTransmission,
  optionXchangeTransmission,
  xchangeStepSid,
  xchangeFileProcessSid,
  orifinalFileTransmission,
  qualifier,
}: XchangeTransmissionPanelProps) => {
  const Toast = useNotification();
  const [xchangeFileTransmission, setXchangeFileTransmission] = useState<XchangeFileTransmissionForm>();
  const [authKeyName, setAuthKeyName] = useState('');
  const [filenameQualifiers, setFilenameQualifiers] = useState<string[]>();
  const [customFileQualifier, setCustomFileQualifier] = useState('');
  const [customQualifier, setCustomQualifier] = useState<boolean>();
  const [protocol, setProtocol] = useState('');
  const [choseArchive, setChoseArchive] = useState(false);
  const [host, setHost] = useState('');
  const [port, setPort] = useState('22');
  const [filenamePattern, setFilenamePattern] = useState('');
  const [previewFilenamePatternValue, setPreviewFilenamePatternValue] = useState('');
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [showSSHKeys, setShowSShKeys] = useState(false);
  const [sshKeyPath, setSshKeyPath] = useState<string>('');
  const [folder, setFolder] = useState('');
  const [stepWise, setStepWise] = useState(true);
  const [encryptionKeyName, setEncryptionKeyName] = useState('');
  const [comments, setComments] = useState('');
  const [copyCmd, setCopyCmd] = useState<WebCommand | null>();
  const [updateCmd, setUpdateCmd] = useState<WebCommand | null>();
  const [detach, setDetach] = useState(false);
  const [overrides, setOverrides] = useState<OverrideProps>(DefaultOverrideProps);
  const [showDialog, setShowDialog] = useState(false);
  const [dialogProps, setDialogProps] = useState<DialogYesNoProps>(defaultDialogProps);
  const [unsavedChanges, setUnsavedChanges] = useState(false);
  const [testFileTransmissionModal, setTestFileTransmissionModal] = useState(false);

  const [copyFileTransmission, { data: dataCopyTransmission, loading: loadingCopyTransmission }] = useQueryHandler(
    useCopyXchangeFileTransmissionLazyQuery
  );

  const [updateFileTransmission, { data: dataUpdateTransmission, loading: loadingUpdateTransmission }] =
    useQueryHandler(useXchangeFileTransmissionFormLazyQuery);

  const [createXchangeFileTransmission, { data: dataCreateFile, loading: loadingCreateFile, error: errorCreateFile }] =
    useQueryHandler(useCreateXchangeFileTransmissionMutation);

  const [updateXchangeFileTransmission, { data: dataUpdateFile, loading: loadingUpdateFile, error: errorUpdateFile }] =
    useQueryHandler(useUpdateXchangeFileTransmissionMutation);

  const [previewFilenamePattern, { data: dataFilenamePattern, loading: loadingFilenamePattern }] = useQueryHandler(
    usePreviewFilenamePatternLazyQuery
  );

  const getFileTransmissionData = () => {
    setCustomQualifier(false);
    if (optionXchangeTransmission === 'update' || optionXchangeTransmission === 'add') {
      updateFileTransmission({
        variables: {
          xchangeFileProcessSid,
          sid: xchangeStepSid,
        },
      });
    } else if (optionXchangeTransmission === 'copy') {
      copyFileTransmission({
        variables: {
          xchangeFileProcessSid,
          sid: xchangeStepSid,
        },
      });
    }
  };

  const saveFileTransmission = () => {
    if (copyCmd && optionXchangeTransmission === 'copy') {
      createXchangeFileTransmission({
        variables: {
          transInput: {
            xchangeFileProcessSid,
            parentSid: xchangeStepSid,
            filenameQualifiers,
            protocol: {
              value: overrides.protocol ? protocol : xchangeFileTransmission?.protocol.value?.value,
              inherited: overrides['protocol'],
            },
            host: {
              value: overrides.host ? host : xchangeFileTransmission?.host.value,
              inherited: overrides['host'],
            },
            port: { value: port, inherited: overrides['port'] },
            userName: {
              value: overrides.userName ? userName : xchangeFileTransmission?.userName.value,
              inherited: overrides['userName'],
            },
            password: {
              value: overrides.password ? password : xchangeFileTransmission?.password.value,
              inherited: overrides['password'],
            },
            authKeyName: { value: authKeyName, inherited: overrides['authKeyName'] },
            folder: {
              value: overrides.folder ? folder : xchangeFileTransmission?.folder.value,
              inherited: overrides['folder'],
            },
            filenamePattern: {
              value: overrides.filenamePattern ? filenamePattern : xchangeFileTransmission?.filenamePattern.value,
              inherited: overrides['filenamePattern'],
            },
            stepWise: {
              value: overrides.stepWise ? stepWise : xchangeFileTransmission?.stepWise.value,
              inherited: overrides['stepWise'],
            },
            encryptionKeyName: {
              value: overrides.encryptionKeyName ? encryptionKeyName : xchangeFileTransmission?.encryptionKeyName.value,
              inherited: overrides['encryptionKeyName'],
            },
            comments,
          },
        },
      });
    } else if (updateCmd && optionXchangeTransmission === 'update') {
      updateXchangeFileTransmission({
        variables: {
          transInput: {
            xchangeFileProcessSid,
            sid: xchangeFileTransmission?.sid,
            parentSid: xchangeStepSid,
            filenameQualifiers,
            protocol: {
              value: protocol,
              inherited: !overrides['protocol'],
            },
            host: {
              value: host,
              inherited: !overrides['host'],
            },
            port: { value: port, inherited: !overrides['port'] },
            userName: {
              value: userName,
              inherited: !overrides['userName'],
            },
            password: {
              value: password,
              inherited: !overrides['password'],
            },
            authKeyName: { value: authKeyName, inherited: !overrides['authKeyName'] },
            folder: {
              value: folder,
              inherited: !overrides['folder'],
            },
            filenamePattern: {
              value: filenamePattern,
              inherited: !overrides['filenamePattern'],
            },
            stepWise: {
              value: stepWise,
              inherited: !overrides['stepWise'],
            },
            encryptionKeyName: {
              value: encryptionKeyName,
              inherited: !overrides['encryptionKeyName'],
            },
            comments,
          },
        },
      });
    }
  };

  const enableUpdate = (file: string) => {
    if (overrides[file] || detach) {
      return (
        <ButtonLink
          onClick={() => {
            setOverrides({ ...overrides, [file]: false });
            if (file === 'protocol') setChoseArchive(false);
          }}
        >
          inherit
        </ButtonLink>
      );
    }

    return <ButtonLink onClick={() => setOverrides({ ...overrides, [file]: true })}>override</ButtonLink>;
  };

  const overrideEnables = (uiFieldData, file) => {
    const uiField = { ...uiFieldData };
    if (copyCmd) {
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
    }
    return uiField;
  };

  const hideDialog = () => {
    setShowDialog(false);
  };

  const keyBaseAuth = () => {
    if (updateCmd && !showSSHKeys) {
      return <ButtonLink onClick={() => setShowSShKeys(true)}>use key-based authentication</ButtonLink>;
    }

    if (copyCmd && overrides.password) {
      return <ButtonLink onClick={() => setShowSShKeys(true)}>use key-based authentication</ButtonLink>;
    }

    return null;
  };

  const showUnsavedChangesDialog = () => {
    const updatedDialog = { ...defaultDialogProps };
    updatedDialog.title = 'You have unsaved changes';
    updatedDialog.message =
      'Changes made to this Xchange step will be discarded?  Are you sure you wish to continue and lose your changes?';

    updatedDialog.onYes = () => {
      hideDialog();
      closePanel(false);
      setXchangeFileTransmission(undefined);
      setShowIcons(false);
      setUnsavedChanges(false);
      setFilenameQualifiers([]);
      setOptionXchangeTransmission('');
      setOverrides(DefaultOverrideProps);
      setDetach(false);
      setShowSShKeys(false);
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
      setXchangeFileTransmission(undefined);
      setShowIcons(false);
      setOverrides(DefaultOverrideProps);
      setShowSShKeys(false);
      setFilenameQualifiers([]);
      setOptionXchangeTransmission('');
      setDetach(false);
    }
  };

  const renderPanelHeader = () => (
    <PanelHeader id="__PanelHeader">
      <Container>
        <Row>
          <Column lg="12">
            <Stack horizontal styles={{ root: { height: 44 } }}>
              <PanelTitle id="__CreateGroup_Panel_Title" variant="bold" size="large">
                File transmission
              </PanelTitle>
            </Stack>
          </Column>
        </Row>
      </Container>
    </PanelHeader>
  );

  const filenamePatternValue = (newValueFilenamePattern: string) => {
    previewFilenamePattern({
      variables: {
        pattern: newValueFilenamePattern,
      },
    });
  };

  const optionArchive = () => {
    if (!choseArchive) {
      return (
        <>
          <Row>
            {xchangeFileTransmission?.host.visible && (
              <Column lg="8">
                <UIInputText
                  id="filenameTransmissionHost"
                  placeholder="host"
                  value={host}
                  autocomplete="off"
                  uiField={overrideEnables(xchangeFileTransmission?.host, 'host')}
                  onChange={(event, newValue) => {
                    setHost(newValue ?? '');
                    if (xchangeFileTransmission.host.value?.trim() !== newValue?.trim()) {
                      setUnsavedChanges(true);
                    } else {
                      setUnsavedChanges(false);
                    }
                  }}
                />
                {copyCmd && enableUpdate('host')}
              </Column>
            )}
            {xchangeFileTransmission?.port.visible && (
              <Column lg="4">
                <UIInputText
                  id="filenameTransmissionPort"
                  placeholder="port"
                  value={port}
                  autocomplete="off"
                  uiField={overrideEnables(xchangeFileTransmission?.port, 'port')}
                  onChange={(event, newValue) => {
                    setPort(newValue ?? '');
                    if (xchangeFileTransmission.host.value?.trim() !== newValue?.trim()) {
                      setUnsavedChanges(true);
                    } else {
                      setUnsavedChanges(false);
                    }
                  }}
                />
                {copyCmd && enableUpdate('port')}
              </Column>
            )}
          </Row>
          {xchangeFileTransmission?.userName.visible && (
            <Spacing margin={{ bottom: 'normal', top: 'normal' }}>
              <Row>
                <Column lg="12">
                  <UIInputText
                    id="userName"
                    value={userName}
                    autocomplete="off"
                    uiField={overrideEnables(xchangeFileTransmission?.userName, 'userName')}
                    placeholder="user"
                    onChange={(event, newValue) => {
                      setUserName(newValue ?? '');
                      if (xchangeFileTransmission.userName.value?.trim() !== newValue?.trim()) {
                        setUnsavedChanges(true);
                      } else {
                        setUnsavedChanges(false);
                      }
                    }}
                  />
                  {copyCmd && enableUpdate('userName')}
                </Column>
              </Row>
            </Spacing>
          )}
          {xchangeFileTransmission?.password.visible && (
            <Spacing margin={{ bottom: 'normal' }}>
              <Row>
                <Column lg="12">
                  <UIInputText
                    id="password"
                    type="password"
                    value={password}
                    autocomplete="off"
                    uiField={overrideEnables(xchangeFileTransmission?.password, 'password')}
                    placeholder="password"
                    onChange={(event, newValue) => {
                      setPassword(newValue ?? '');
                      if (xchangeFileTransmission.password.value?.trim() !== newValue?.trim()) {
                        setUnsavedChanges(true);
                      } else {
                        setUnsavedChanges(false);
                      }
                    }}
                  />
                  {copyCmd && enableUpdate('password')}
                  {keyBaseAuth()}
                  {xchangeFileTransmission?.authKeyName.visible && showSSHKeys && (
                    <UIInputSelectOne
                      id="sshKey"
                      uiField={xchangeFileTransmission?.authKeyName}
                      options={xchangeFileTransmission?.options}
                      value={sshKeyPath}
                      onChange={(newValue) => {
                        setSshKeyPath(newValue ?? '');
                        if (xchangeFileTransmission.authKeyName.value !== newValue?.trim()) {
                          setUnsavedChanges(true);
                        } else {
                          setUnsavedChanges(false);
                        }
                      }}
                      placeholder="(no key selected)"
                    />
                  )}
                </Column>
              </Row>
            </Spacing>
          )}
          {xchangeFileTransmission?.folder.visible && (
            <Spacing margin={{ bottom: 'normal' }}>
              <Row>
                <Column lg="12">
                  <UIInputText
                    id="folder"
                    value={folder}
                    autocomplete="off"
                    uiField={overrideEnables(xchangeFileTransmission?.folder, 'folder')}
                    onChange={(event, newValue) => {
                      setFolder(newValue ?? '');
                      if (xchangeFileTransmission.folder.value?.trim() !== newValue?.trim()) {
                        setUnsavedChanges(true);
                      } else {
                        setUnsavedChanges(false);
                      }
                    }}
                  />
                  {copyCmd && enableUpdate('folder')}
                </Column>
              </Row>
            </Spacing>
          )}
        </>
      );
    }

    return null;
  };

  const renderBody = () => {
    if (loadingCopyTransmission || loadingUpdateTransmission) {
      return (
        <Spacing margin={{ top: 'double' }}>
          <Spinner size={SpinnerSize.large} label="Loading File Transmission" />
        </Spacing>
      );
    }

    if (copyCmd || updateCmd) {
      return (
        <PanelBody>
          <Container>
            {copyCmd && (
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
                  <ButtonLink
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
                  </ButtonLink>
                </Column>
              </Row>
            )}
            {xchangeFileTransmission?.filenameQualifiers.visible && (
              <Spacing margin={{ bottom: 'normal', top: 'normal' }}>
                <Row>
                  <Column lg="12">
                    {!customQualifier ? (
                      <UIInputMultiSelect
                        id="__filenameQualifier"
                        value={filenameQualifiers ?? []}
                        uiField={xchangeFileTransmission?.filenameQualifiers}
                        options={xchangeFileTransmission?.options ?? []}
                        onChange={(newValue) => {
                          setFilenameQualifiers(newValue ?? []);
                        }}
                      />
                    ) : (
                      <InputText
                        id="__filenameQualifier"
                        value={customFileQualifier}
                        label="Enviroment"
                        required={xchangeFileTransmission.filenameQualifiers.required}
                        onChange={(event, newValue) => setCustomFileQualifier(newValue ?? '')}
                      />
                    )}
                    <ButtonLink onClick={() => setCustomQualifier(true)}>use a custom qualifier</ButtonLink>
                  </Column>
                </Row>
              </Spacing>
            )}
            {xchangeFileTransmission?.protocol.visible && (
              <Spacing margin={{ bottom: 'normal' }}>
                <Row>
                  <Column lg="12">
                    <UIInputSelectOne
                      id="protocol"
                      value={protocol}
                      uiField={overrideEnables(xchangeFileTransmission.protocol, 'protocol')}
                      options={xchangeFileTransmission?.options}
                      onChange={(newValue) => {
                        setProtocol(newValue ?? '');
                        if (newValue === 'ARCHIVE') {
                          setChoseArchive(true);
                        } else {
                          setChoseArchive(false);
                        }
                        if (xchangeFileTransmission.protocol.value?.value !== newValue) {
                          setUnsavedChanges(true);
                        } else {
                          setUnsavedChanges(false);
                        }
                      }}
                    />
                    {copyCmd && enableUpdate('protocol')}
                  </Column>
                </Row>
              </Spacing>
            )}
            {optionArchive()}
            {xchangeFileTransmission?.filenamePattern.visible && (
              <Spacing margin={{ bottom: 'normal' }}>
                <Row>
                  <Column lg="12">
                    <UIInputText
                      id="fileNamePattern"
                      value={filenamePattern}
                      autocomplete="off"
                      uiField={overrideEnables(xchangeFileTransmission?.filenamePattern, 'filenamePattern')}
                      onChange={(event, newValue) => {
                        setFilenamePattern(newValue ?? '');
                        filenamePatternValue(newValue ?? '');
                        if (xchangeFileTransmission.filenamePattern.value?.trim() !== newValue?.trim()) {
                          setUnsavedChanges(true);
                        } else {
                          setUnsavedChanges(false);
                        }
                      }}
                    />
                    {copyCmd && enableUpdate('filenamePattern')}
                    <Spacing margin={{ top: 'normal' }}>
                      <span style={{ color: '#605e5c', fontSize: '14px', fontWeight: 'bold' }}>
                        Ex:{' '}
                        <Text variant="small" style={{ color: '#a19f9d', fontWeight: 'bold' }}>
                          {previewFilenamePatternValue}
                        </Text>
                      </span>
                    </Spacing>
                  </Column>
                </Row>
              </Spacing>
            )}
            {!choseArchive && (
              <>
                <Row>
                  <Column lg="6">
                    <UIInputCheck
                      id="stepWise"
                      uiField={overrideEnables(xchangeFileTransmission?.stepWise, 'stepWise')}
                      value={stepWise}
                      onChange={(event, _stepWise: any) => {
                        setStepWise(_stepWise);
                        if (xchangeFileTransmission?.stepWise.value !== _stepWise) {
                          setUnsavedChanges(true);
                        } else {
                          setUnsavedChanges(false);
                        }
                      }}
                    />
                    {copyCmd && enableUpdate('stepWise')}
                  </Column>
                </Row>
                <Row>
                  <Column lg="12">
                    <UIInputSelectOne
                      id="vednorEncryptionKeyName"
                      value={encryptionKeyName}
                      uiField={overrideEnables(xchangeFileTransmission?.encryptionKeyName, 'encryptionKeyName')}
                      options={xchangeFileTransmission?.options}
                      onChange={(newValue) => {
                        setEncryptionKeyName(newValue ?? '');
                        if (xchangeFileTransmission?.encryptionKeyName.value !== newValue?.trim()) {
                          setUnsavedChanges(true);
                        } else {
                          setUnsavedChanges(false);
                        }
                      }}
                    />
                    {copyCmd && enableUpdate('encryptionKeyName')}
                  </Column>
                </Row>
              </>
            )}
            <Spacing margin={{ top: 'normal' }}>
              <PrimaryButton
                id="__Xchange_AddStep_Button"
                iconProps={{ iconName: 'Save' }}
                onClick={saveFileTransmission}
              >
                Save
              </PrimaryButton>
              {!choseArchive && (
                <DefaultButton
                  iconProps={{
                    iconName: 'Phone',
                    style: { color: theme.colors.black, fontWeight: theme.fontWeights.bold },
                  }}
                  text="Test Configuration"
                  onClick={() => setTestFileTransmissionModal(true)}
                />
              )}
            </Spacing>
          </Container>
        </PanelBody>
      );
    }
    return null;
  };

  useEffect(() => {
    if (isPanelOpen) {
      getFileTransmissionData();
    }
  }, [isPanelOpen]);

  useEffect(() => {
    if (!loadingCopyTransmission && dataCopyTransmission) {
      setOptionXchangeTransmission('copy');
      setXchangeFileTransmission(dataCopyTransmission.copyXchangeFileTransmission);
      setAuthKeyName(dataCopyTransmission.copyXchangeFileTransmission?.authKeyName.value ?? '');
      if (
        dataCopyTransmission.copyXchangeFileTransmission?.filenameQualifiers.value &&
        dataCopyTransmission.copyXchangeFileTransmission?.filenameQualifiers.value.length > 0
      ) {
        setFilenameQualifiers(
          [dataCopyTransmission.copyXchangeFileTransmission.filenameQualifiers.value[0].value] ?? []
        );
      }

      if (dataCopyTransmission.copyXchangeFileTransmission?.commands) {
        const pageCommands = dataCopyTransmission.copyXchangeFileTransmission?.commands;
        const _copyCmd = pageCommands?.find((cmd) => cmd?.commandType === CdxWebCommandType.Create);
        setCopyCmd(_copyCmd);
        setUpdateCmd(null);
      }
    }
  }, [dataCopyTransmission, loadingCopyTransmission]);

  useEffect(() => {
    if (!loadingUpdateTransmission && dataUpdateTransmission) {
      console.log(optionXchangeTransmission)
      setOptionXchangeTransmission('update');
      setXchangeFileTransmission(dataUpdateTransmission.xchangeFileTransmissionForm);
      if (
        dataUpdateTransmission.xchangeFileTransmissionForm?.filenameQualifiers.value &&
        dataUpdateTransmission.xchangeFileTransmissionForm?.filenameQualifiers.value.length > 0
      ) {
        setFilenameQualifiers(
          [dataUpdateTransmission.xchangeFileTransmissionForm.filenameQualifiers.value[0].value] ?? []
        );
      }
      if (dataUpdateTransmission.xchangeFileTransmissionForm?.commands) {
        const pageCommands = dataUpdateTransmission.xchangeFileTransmissionForm?.commands;
        const _updateCmd = pageCommands?.find((cmd) => cmd?.commandType === CdxWebCommandType.Update);
        setUpdateCmd(_updateCmd);
        setCopyCmd(null);
      }
    }
  }, [dataUpdateTransmission, loadingUpdateTransmission]);

  useEffect(() => {
    if (xchangeFileTransmission) {
      const currentProtocol = xchangeFileTransmission.protocol.value?.value ?? '';
      if (currentProtocol === 'ARCHIVE') setChoseArchive(true);
      setProtocol(currentProtocol);
      setHost(xchangeFileTransmission.host.value ?? '');
      setUserName(xchangeFileTransmission?.userName.value ?? '');
      setPassword(xchangeFileTransmission?.password.value ?? '');
      setFolder(xchangeFileTransmission?.folder.value ?? '');
      setFilenamePattern(xchangeFileTransmission.filenamePattern.value ?? '');
      setStepWise(xchangeFileTransmission?.stepWise.value ?? false);
      setComments(xchangeFileTransmission?.comments.value ?? '');
      setEncryptionKeyName(xchangeFileTransmission?.encryptionKeyName.value?.value ?? '');
    }

    if (xchangeFileTransmission) {
      previewFilenamePattern({
        variables: {
          pattern: xchangeFileTransmission.filenamePattern.value,
        },
      });
    }
  }, [xchangeFileTransmission]);

  useEffect(() => {
    if (!loadingFilenamePattern && dataFilenamePattern) {
      setPreviewFilenamePatternValue(dataFilenamePattern.previewFilenamePattern);
    }
  }, [dataFilenamePattern, loadingFilenamePattern]);

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
    if (!loadingUpdateFile && dataUpdateFile) {
      refreshDetailsPage(true);
      Toast.success({ text: 'File transmission updated' });
      closePanel(false);
    }

    if (!loadingUpdateFile && errorUpdateFile) {
      Toast.error({ text: `There was an error to update File Transmission` });
    }
  }, [dataUpdateFile, loadingUpdateFile, errorUpdateFile]);

  return (
    <ThemedPanel
      closeButtonAriaLabel="Close"
      onRenderHeader={renderPanelHeader}
      type={PanelType.medium}
      isOpen={isPanelOpen}
      onDismiss={() => {
        onPanelClose();
      }}
    >
      {renderBody()}
      <DialogYesNo {...dialogProps} open={showDialog} />
      {testFileTransmissionModal && (
        <TestFileTransmissionModal isOpen={setTestFileTransmissionModal} open={testFileTransmissionModal}/>
      )}
    </ThemedPanel>
  );
};

export { XchangeTransmissionPanel };
