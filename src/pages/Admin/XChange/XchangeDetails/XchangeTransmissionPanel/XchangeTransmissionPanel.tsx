import { useEffect, useState } from 'react';
import {
  DefaultButton,
  DirectionalHint,
  PanelType,
  PrimaryButton,
  Spinner,
  SpinnerSize,
  Stack,
  Text,
  TooltipHost,
} from '@fluentui/react';
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
import { Comment20Filled } from '@fluentui/react-icons';
import { UIInputTextArea } from 'src/components/inputs/InputTextArea';

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
  const [openUpdateComments, setOpenUpdateComments] = useState(false);
  const [closeTooltipHost, setCloseTooltipHost] = useState(true);
  const [copyCmd, setCopyCmd] = useState<WebCommand | null>();
  const [updateCmd, setUpdateCmd] = useState<WebCommand | null>();
  const [createCmd, setCreateCmd] = useState<WebCommand | null>();
  const [detach, setDetach] = useState(false);
  const [overrides, setOverrides] = useState<OverrideProps>(DefaultOverrideProps);
  const [showDialog, setShowDialog] = useState(false);
  const [dialogProps, setDialogProps] = useState<DialogYesNoProps>(defaultDialogProps);
  const [unsavedChanges, setUnsavedChanges] = useState(false);
  const [testFileTransmissionModal, setTestFileTransmissionModal] = useState(false);

  const [copyFileTransmission, { data: dataCopyTransmission, loading: loadingCopyTransmission }] = useQueryHandler(
    useCopyXchangeFileTransmissionLazyQuery
  );

  const [fileTransmissionForm, { data: dataFileTransmissionForm, loading: loadingFileTransmissionForm }] =
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
      fileTransmissionForm({
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
    if ((copyCmd && optionXchangeTransmission === 'copy') || (createCmd && optionXchangeTransmission === 'add')) {
      createXchangeFileTransmission({
        variables: {
          transInput: {
            xchangeFileProcessSid,
            parentSid: xchangeStepSid,
            filenameQualifiers,
            protocol: {
              value: overrides.protocol ? protocol : xchangeFileTransmission?.protocol.value?.value,
              inherited: copyCmd ? overrides['protocol'] : !overrides['protocol'],
            },
            host: {
              value: overrides.host ? host : xchangeFileTransmission?.host.value,
              inherited: copyCmd ? overrides['host'] : !overrides['host'],
            },
            port: { value: port, inherited: copyCmd ? overrides['port'] : !overrides['port'] },
            userName: {
              value: overrides.userName ? userName : xchangeFileTransmission?.userName.value,
              inherited: copyCmd ? overrides['userName'] : !overrides['userName'],
            },
            password: {
              value: overrides.password ? password : xchangeFileTransmission?.password.value,
              inherited: copyCmd ? overrides['password'] : !overrides['password'],
            },
            authKeyName: {
              value: authKeyName,
              inherited: copyCmd ? overrides['authKeyName'] : !overrides['authKeyName'],
            },
            folder: {
              value: overrides.folder ? folder : xchangeFileTransmission?.folder.value,
              inherited: copyCmd ? overrides['folder'] : !overrides['folder'],
            },
            filenamePattern: {
              value: overrides.filenamePattern ? filenamePattern : xchangeFileTransmission?.filenamePattern.value,
              inherited: copyCmd ? overrides['filenamePattern'] : !overrides['filenamePattern'],
            },
            stepWise: {
              value: overrides.stepWise ? stepWise : xchangeFileTransmission?.stepWise.value,
              inherited: copyCmd ? overrides['stepWise'] : !overrides['stepWise'],
            },
            encryptionKeyName: {
              value: overrides.encryptionKeyName ? encryptionKeyName : xchangeFileTransmission?.encryptionKeyName.value,
              inherited: copyCmd ? overrides['encryptionKeyName'] : !overrides['encryptionKeyName'],
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
              inherited: xchangeFileTransmission?.protocol.inheritedFrom
                ? overrides['protocol']
                : !overrides['protocol'],
            },
            host: {
              value: host,
              inherited: xchangeFileTransmission?.host.inheritedFrom ? overrides['host'] : !overrides['host'],
            },
            port: {
              value: port,
              inherited: xchangeFileTransmission?.port.inheritedFrom ? overrides['port'] : !overrides['port'],
            },
            userName: {
              value: userName,
              inherited: xchangeFileTransmission?.userName.inheritedFrom
                ? overrides['userName']
                : !overrides['userName'],
            },
            password: {
              value: password,
              inherited: xchangeFileTransmission?.password.inheritedFrom
                ? overrides['password']
                : !overrides['password'],
            },
            authKeyName: {
              value: authKeyName,
              inherited: xchangeFileTransmission?.authKeyName.inheritedFrom
                ? overrides['authKeyName']
                : !overrides['authKeyName'],
            },
            folder: {
              value: folder,
              inherited: xchangeFileTransmission?.folder.inheritedFrom ? overrides['folder'] : !overrides['folder'],
            },
            filenamePattern: {
              value: filenamePattern,
              inherited: xchangeFileTransmission?.filenamePattern.inheritedFrom
                ? overrides['filenamePattern']
                : !overrides['filenamePattern'],
            },
            stepWise: {
              value: stepWise,
              inherited: xchangeFileTransmission?.stepWise.inheritedFrom
                ? overrides['stepWise']
                : !overrides['stepWise'],
            },
            encryptionKeyName: {
              value: encryptionKeyName,
              inherited: xchangeFileTransmission?.encryptionKeyName.inheritedFrom
                ? overrides['encryptionKeyName']
                : !overrides['encryptionKeyName'],
            },
            comments,
          },
        },
      });
    }
  };

  const enableUpdate = (file: string, typeInput?) => {
    if (typeInput && typeInput.inheritedFrom) {
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
    }

    return null;
  };

  const overrideEnables = (uiFieldData, file) => {
    const uiField = { ...uiFieldData };
    if (uiField.inheritedFrom) {
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
    if ((updateCmd || createCmd) && !showSSHKeys) {
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

  const tooltipHostComments = () => {
    if (!openUpdateComments && xchangeFileTransmission) {
      return (
        <>
          {closeTooltipHost && (
            <TooltipHost
              directionalHint={DirectionalHint['rightBottomEdge']}
              content={comments ? 'This File Transmission has comments. Click to see them.' : 'Click to add a comment'}
            >
              <Comment20Filled
                style={comments ? { color: '#cdcd00', cursor: 'pointer' } : { color: 'gray', cursor: 'pointer' }}
                onClick={() => {
                  setOpenUpdateComments(true);
                }}
              />
            </TooltipHost>
          )}
          {!closeTooltipHost && (
            <Comment20Filled
              style={comments ? { color: '#cdcd00', cursor: 'pointer' } : { color: 'gray', cursor: 'pointer' }}
              onClick={() => {
                setOpenUpdateComments(true);
              }}
            />
          )}
        </>
      );
    }

    const updateComment = () => (
      <UIInputTextArea
        id="FileTransmissionComment"
        uiField={xchangeFileTransmission?.comments}
        value={comments}
        onChange={(event, newValue: any) => {
          setComments(newValue ?? '');
          if (!xchangeFileTransmission?.comments.value) {
            if (newValue.trim() !== '') {
              setUnsavedChanges(true);
            } else {
              setUnsavedChanges(false);
            }
          } else if (xchangeFileTransmission.comments.value?.trim() !== newValue?.trim()) {
            setUnsavedChanges(true);
          } else {
            setUnsavedChanges(false);
          }
        }}
        resizable={false}
        rows={12}
      />
    );

    if (openUpdateComments) {
      return (
        <TooltipHost
          directionalHintForRTL={DirectionalHint['bottomAutoEdge']}
          closeDelay={5000000}
          style={{ background: '#cdcd00', width: '400px', padding: '0 10px 10px 10px' }}
          tooltipProps={{
            calloutProps: {
              styles: {
                beak: { background: '#cdcd00' },
                beakCurtain: { background: '#cdcd00' },
                calloutMain: { background: '#cdcd00' },
              },
            },
          }}
          content={updateComment()}
        >
          <Comment20Filled
            style={comments ? { color: '#cdcd00', cursor: 'pointer' } : { color: 'gray', cursor: 'pointer' }}
          />
        </TooltipHost>
      );
    }
    return null;
  };

  const renderPanelHeader = () => (
    <PanelHeader id="__PanelHeader">
      <Container>
        <Row>
          <Column lg="4">
            <Stack horizontal styles={{ root: { height: 44, marginTop: '5px' } }}>
              <PanelTitle id="__CreateGroup_Panel_Title" variant="bold" size="large">
                File transmission
              </PanelTitle>
            </Stack>
          </Column>
          <Column lg="8">
            <Spacing margin={{ top: 'normal' }}>{tooltipHostComments()}</Spacing>
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
                {enableUpdate('host', xchangeFileTransmission.host)}
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
                {enableUpdate('port', xchangeFileTransmission.port)}
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
                  {enableUpdate('userName', xchangeFileTransmission.userName)}
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
                  {enableUpdate('password', xchangeFileTransmission.password)}
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
                  {enableUpdate('folder', xchangeFileTransmission.folder)}
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
    if (loadingCopyTransmission || loadingFileTransmissionForm) {
      return (
        <Spacing margin={{ top: 'double' }}>
          <Spinner size={SpinnerSize.large} label="Loading File Transmission" />
        </Spacing>
      );
    }

    if (copyCmd || updateCmd || createCmd) {
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
                    {enableUpdate('protocol', xchangeFileTransmission.protocol)}
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
                    {enableUpdate('filenamePattern', xchangeFileTransmission.filenamePattern)}
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
                    {enableUpdate('stepWise', xchangeFileTransmission?.stepWise)}
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
                    {enableUpdate('encryptionKeyName', xchangeFileTransmission?.encryptionKeyName)}
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
                  style={{ marginLeft: '10px' }}
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
        setCreateCmd(null);
      }
    }
  }, [dataCopyTransmission, loadingCopyTransmission]);

  useEffect(() => {
    if (!loadingFileTransmissionForm && dataFileTransmissionForm) {
      setOptionXchangeTransmission('update');
      setXchangeFileTransmission(dataFileTransmissionForm.xchangeFileTransmissionForm);
      if (
        dataFileTransmissionForm.xchangeFileTransmissionForm?.filenameQualifiers.value &&
        dataFileTransmissionForm.xchangeFileTransmissionForm?.filenameQualifiers.value.length > 0
      ) {
        setFilenameQualifiers(
          [dataFileTransmissionForm.xchangeFileTransmissionForm.filenameQualifiers.value[0].value] ?? []
        );
      }
      if (dataFileTransmissionForm.xchangeFileTransmissionForm?.commands) {
        const pageCommands = dataFileTransmissionForm.xchangeFileTransmissionForm?.commands;
        const _updateCmd = pageCommands?.find((cmd) => cmd?.commandType === CdxWebCommandType.Update);
        const _createCmd = pageCommands?.find((cmd) => cmd?.commandType === CdxWebCommandType.Create);
        setUpdateCmd(_updateCmd);
        setCreateCmd(_createCmd);
        if (_updateCmd) {
          setOptionXchangeTransmission('update');
        } else {
          setOptionXchangeTransmission('add');
        }
        setCopyCmd(null);
      }
    }
  }, [dataFileTransmissionForm, loadingFileTransmissionForm]);

  useEffect(() => {
    if (xchangeFileTransmission) {
      console.log(xchangeFileTransmission);
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

    if (xchangeFileTransmission && (updateCmd || copyCmd)) {
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
      onClick={() => {
        if (openUpdateComments) {
          setOpenUpdateComments(false);
          setCloseTooltipHost(false);
          setTimeout(() => {
            setCloseTooltipHost(true);
          }, 0.001);
        }
      }}
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
        <TestFileTransmissionModal isOpen={setTestFileTransmissionModal} open={testFileTransmissionModal} />
      )}
    </ThemedPanel>
  );
};

export { XchangeTransmissionPanel };
