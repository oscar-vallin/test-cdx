import { useEffect, useState } from 'react';
import {
  DefaultButton,
  MessageBar,
  MessageBarType,
  PanelType,
  PrimaryButton,
  Spinner,
  SpinnerSize,
  Stack,
  Text,
} from '@fluentui/react';
import {
  PanelBody,
  PanelHeader,
  PanelTitle,
  ThemedPanel,
} from 'src/layouts/Panels/Panels.styles';
import {
  useCopyXchangeFileTransmissionLazyQuery,
  XchangeFileTransmissionForm,
  useCreateXchangeFileTransmissionMutation,
  useUpdateXchangeFileTransmissionMutation,
  useXchangeFileTransmissionFormLazyQuery,
  usePreviewFilenamePatternLazyQuery,
  CdxWebCommandType,
  WebCommand,
  UiField,
  UiSelectManyField,
  GqOperationResponse,
} from 'src/data/services/graphql';
import { DialogYesNo, DialogYesNoProps } from 'src/containers/modals/DialogYesNo';
import { useNotification } from 'src/hooks/useNotification';
import { useQueryHandler } from 'src/hooks/useQueryHandler';
import { UIInputMultiSelect } from 'src/components/inputs/InputDropdown/UIInputMultiSelect';
import { Spacing } from 'src/components/spacings/Spacing';
import { Column } from 'src/components/layouts';
import { UIInputSelectOne } from 'src/components/inputs/InputDropdown';
import { InputText, UIInputText } from 'src/components/inputs/InputText';
import { UIInputCheck } from 'src/components/inputs/InputCheck';
import { ButtonLink } from 'src/components/buttons';
import { TestFileTransmissionModal } from 'src/containers/modals/TestFileTransmissionModal';
import { FormRow } from 'src/components/layouts/Row/Row.styles';
import { ThemeStore } from 'src/store/ThemeStore';
import { CommentBubble } from 'src/components/inputs/Comment';

type XchangeTransmissionPanelProps = {
  isPanelOpen: boolean;
  closePanel: (data: boolean) => void;
  refreshDetailsPage: (data: boolean) => void;
  setShowIcons: (data: boolean) => void;
  setOptionXchangeTransmission: (data: string) => void;
  optionXchangeTransmission?: string;
  xchangeFileTransmissionSid?: string;
  xchangeFileProcessSid?: string;
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
  authKeyPassphrase: boolean;
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
  authKeyPassphrase: false,
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
  xchangeFileTransmissionSid,
  xchangeFileProcessSid,
}: XchangeTransmissionPanelProps) => {
  const Toast = useNotification();
  const [
    xchangeFileTransmission,
    setXchangeFileTransmission,
  ] = useState<XchangeFileTransmissionForm>();
  const [authKeyName, setAuthKeyName] = useState('');
  const [createFileTransmission, setCreateFileTransmission] = useState(false);
  const [authKeyPassphrase, setAuthKeyPassphrase] = useState('');
  const [filenameQualifiers, setFilenameQualifiers] = useState<string[]>();
  const [filenameQualifierUIField, setFilenameQualifierUIField] = useState<UiSelectManyField>()
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
  const [folder, setFolder] = useState('');
  const [stepWise, setStepWise] = useState(true);
  const [encryptionKeyName, setEncryptionKeyName] = useState('');
  const [comments, setComments] = useState('');
  const [copyCmd, setCopyCmd] = useState<WebCommand | null>();
  const [updateCmd, setUpdateCmd] = useState<WebCommand | null>();
  const [createCmd, setCreateCmd] = useState<WebCommand | null>();
  const [detach, setDetach] = useState(false);
  const [overrides, setOverrides] = useState<OverrideProps>(DefaultOverrideProps);
  const [showDialog, setShowDialog] = useState(false);
  const [dialogProps, setDialogProps] = useState<DialogYesNoProps>(defaultDialogProps);
  const [unsavedChanges, setUnsavedChanges] = useState(false);
  const [testFileTransmissionModal, setTestFileTransmissionModal] = useState(false);
  const [message, setMessage] = useState<string | null>();
  const [messageType, setMessageType] = useState<MessageBarType>(MessageBarType.info);

  const [copyFileTransmission,
    { data: dataCopyTransmission, loading: loadingCopyTransmission }] = useQueryHandler(
    useCopyXchangeFileTransmissionLazyQuery,
  );

  const [fileTransmissionForm,
    { data: dataFileTransmissionForm, loading: loadingFileTransmissionForm },
  ] = useQueryHandler(useXchangeFileTransmissionFormLazyQuery);

  const [createXchangeFileTransmission,
    { data: dataCreateFile, loading: loadingCreateFile, error: errorCreateFile },
  ] = useQueryHandler(useCreateXchangeFileTransmissionMutation);

  const [updateXchangeFileTransmission,
    { data: dataUpdateFile, loading: loadingUpdateFile, error: errorUpdateFile },
  ] = useQueryHandler(useUpdateXchangeFileTransmissionMutation);

  const [previewFilenamePattern,
    { data: dataFilenamePattern, loading: loadingFilenamePattern }] = useQueryHandler(
    usePreviewFilenamePatternLazyQuery,
  );

  const getFileTransmissionData = () => {
    setCustomQualifier(false);
    if (optionXchangeTransmission === 'update' || optionXchangeTransmission === 'add') {
      fileTransmissionForm({
        variables: {
          xchangeFileProcessSid,
          sid: xchangeFileTransmissionSid,
        },
      });
    } else if (optionXchangeTransmission === 'copy') {
      copyFileTransmission({
        variables: {
          xchangeFileProcessSid,
          sid: xchangeFileTransmissionSid,
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
            parentSid: detach ? null : xchangeFileTransmission?.parent?.sid,
            filenameQualifiers: customQualifier ? customFileQualifier : filenameQualifiers,
            protocol: {
              value: overrides.protocol || createFileTransmission ? protocol
                : xchangeFileTransmission?.protocol.value?.value,
              inherited: !overrides['protocol'],
            },
            host: {
              value: overrides.host || createFileTransmission ? host
                : xchangeFileTransmission?.host.value,
              inherited: !overrides['host'],
            },
            port: { value: port, inherited: !overrides['port'] },
            userName: {
              value: overrides.userName || createFileTransmission ? userName
                : xchangeFileTransmission?.userName.value,
              inherited: !overrides['userName'],
            },
            password: {
              value: overrides.password || createFileTransmission ? password
                : xchangeFileTransmission?.password.value,
              inherited: !overrides['password'],
            },
            authKeyName: {
              value: authKeyName,
              inherited: !overrides['authKeyName'],
            },
            authKeyPassphrase: {
              value: authKeyPassphrase,
              inherited: !overrides['authKeyPassphrase'],
            },
            folder: {
              value: overrides.folder || createFileTransmission ? folder
                : xchangeFileTransmission?.folder.value,
              inherited: !overrides['folder'],
            },
            filenamePattern: {
              value: overrides.filenamePattern || createFileTransmission
                ? filenamePattern : xchangeFileTransmission?.filenamePattern.value,
              inherited: !overrides['filenamePattern'],
            },
            stepWise: {
              value: overrides.stepWise || createFileTransmission ? stepWise
                : xchangeFileTransmission?.stepWise.value,
              inherited: !overrides['stepWise'],
            },
            encryptionKeyName: {
              value: overrides.encryptionKeyName || createFileTransmission
                ? encryptionKeyName
                : xchangeFileTransmission?.encryptionKeyName?.value?.value,
              inherited: !overrides['encryptionKeyName'],
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
            parentSid: detach ? null : xchangeFileTransmission?.parent?.sid,
            filenameQualifiers: customQualifier ? customFileQualifier : filenameQualifiers,
            protocol: {
              value: protocol,
              inherited: overrides['protocol'] ? false : xchangeFileTransmission?.protocol.inheritedFrom,
            },
            host: {
              value: host,
              inherited: overrides['host'] ? false : xchangeFileTransmission?.host.inheritedFrom,
            },
            port: {
              value: port,
              inherited: overrides['port'] ? false : xchangeFileTransmission?.port.inheritedFrom,
            },
            userName: {
              value: userName,
              inherited: overrides['userName'] ? false : xchangeFileTransmission?.userName.inheritedFrom,
            },
            password: {
              value: password,
              inherited: overrides['password'] ? false : xchangeFileTransmission?.password.inheritedFrom,
            },
            authKeyName: {
              value: authKeyName,
              inherited: overrides['authKeyName'] ? false : xchangeFileTransmission?.authKeyName.inheritedFrom,
            },
            authKeyPassphrase: {
              value: authKeyPassphrase,
              inherited: overrides['authKeyPassphrase']
                ? false
                : xchangeFileTransmission?.authKeyPassphrase.inheritedFrom,
            },
            folder: {
              value: folder,
              inherited: overrides['folder'] ? false : xchangeFileTransmission?.folder.inheritedFrom,
            },
            filenamePattern: {
              value: filenamePattern,
              inherited: overrides['filenamePattern'] ? false : xchangeFileTransmission?.filenamePattern.inheritedFrom,
            },
            stepWise: {
              value: stepWise,
              inherited: overrides['stepWise'] ? false : xchangeFileTransmission?.stepWise.inheritedFrom,
            },
            encryptionKeyName: {
              value: encryptionKeyName,
              inherited: overrides['encryptionKeyName']
                ? false
                : xchangeFileTransmission?.encryptionKeyName.inheritedFrom,
            },
            comments,
          },
        },
      });
    }
  };

  const enableUpdate = (file: string, typeInput?) => {
    if (typeInput.readOnly === true) return null;
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
      return (
        <ButtonLink
          onClick={() => {
            setOverrides({ ...overrides, [file]: true })
          }}
        >
          override
        </ButtonLink>
      );
    }

    return null;
  };

  const overrideEnables = (uiFieldData, fieldName): UiField => {
    const uiField = { ...uiFieldData };
    // HAX: Force required for host and user name
    if (fieldName === 'host') {
      uiField.required = true;
    }
    if (fieldName === 'userName') {
      uiField.required = true;
    }
    if (uiField.inheritedFrom) {
      if (overrides[fieldName] || detach) {
        uiField.inheritedFrom = null;
      } else {
        if (fieldName === 'password' || fieldName === 'authKeyPassphrase') {
          uiField.value = '********';
        }
        if (fieldName === 'port') {
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
      return (
        <ButtonLink onClick={() => setShowSShKeys(true)}>
          use key-based authentication
        </ButtonLink>
      )
    }

    if (copyCmd && overrides.password) {
      return (
        <ButtonLink onClick={() => setShowSShKeys(true)}>
          use key-based authentication
        </ButtonLink>
      )
    }

    return null;
  };

  const showUnsavedChangesDialog = () => {
    const updatedDialog = { ...defaultDialogProps };
    updatedDialog.title = 'You have unsaved changes';
    updatedDialog.message = 'Changes made to this Xchange step will be discarded?  Are you sure you wish to continue and lose your changes?';

    updatedDialog.onYes = () => {
      hideDialog();
      closePanel(false);
      setMessage(null);
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
      setMessage(null);
      setXchangeFileTransmission(undefined);
      setShowIcons(false);
      setOverrides(DefaultOverrideProps);
      setShowSShKeys(false);
      setFilenameQualifiers([]);
      setOptionXchangeTransmission('');
      setDetach(false);
    }
  };

  const updateComments = (comment?: string) => {
    setComments(comment ?? '');
    if (!xchangeFileTransmission?.comments.value) {
      if (comment?.trim() !== '') {
        setUnsavedChanges(true);
      } else {
        setUnsavedChanges(false);
      }
    } else if (xchangeFileTransmission.comments.value?.trim() !== comment?.trim()) {
      setUnsavedChanges(true);
    } else {
      setUnsavedChanges(false);
    }
  };

  const renderPanelHeader = () => (
    <PanelHeader id="__FileTransmission_PanelHeader">
      <Column lg="12">
        <Stack horizontal styles={{ root: { height: 44 } }}>
          <PanelTitle id="__FileTransmission_Panel_Title" variant="bold" size="large">
            File transmission
            <CommentBubble
              id="__FileTransmissionComment"
              value={comments}
              uiField={xchangeFileTransmission?.comments}
              onChange={updateComments}
              title={
                comments ? 'This File Transmission has comments. Click to see them.'
                  : 'Click to add a comment'
              }
            />
          </PanelTitle>
        </Stack>
      </Column>
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
          <FormRow>
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
                {(updateCmd || copyCmd) && enableUpdate('host', xchangeFileTransmission.host)}
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
                {(updateCmd || copyCmd) && enableUpdate('port', xchangeFileTransmission.port)}
              </Column>
            )}
          </FormRow>
          {xchangeFileTransmission?.userName.visible && (
            <FormRow>
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
                {(updateCmd || copyCmd) && enableUpdate('userName', xchangeFileTransmission.userName)}
              </Column>
            </FormRow>
          )}
          {xchangeFileTransmission?.password.visible && (
            <>
              <FormRow>
                <Column lg="12">
                  <UIInputText
                    id="password"
                    type="password"
                    value={password}
                    autocomplete="new-password"
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
                  {(updateCmd || copyCmd) && enableUpdate('password', xchangeFileTransmission.password)}
                  {keyBaseAuth()}
                </Column>
              </FormRow>
              {xchangeFileTransmission?.authKeyName.visible && showSSHKeys && (
                <>
                  <FormRow>
                    <Column lg="12">
                      <UIInputSelectOne
                        id="authKeyName"
                        uiField={overrideEnables(xchangeFileTransmission?.authKeyName, 'authKeyName')}
                        options={xchangeFileTransmission?.options}
                        value={authKeyName}
                        onChange={(newValue) => {
                          setAuthKeyName(newValue ?? '');
                          if (xchangeFileTransmission.authKeyName.value !== newValue?.trim()) {
                            setUnsavedChanges(true);
                          } else {
                            setUnsavedChanges(false);
                          }
                        }}
                        placeholder="(no key selected)"
                      />
                      {(updateCmd || copyCmd) && enableUpdate('authKeyName', xchangeFileTransmission.authKeyName)}
                    </Column>
                  </FormRow>
                  <FormRow>
                    <Column lg="12">
                      <UIInputText
                        id="authKeyPassphrase"
                        type="password"
                        value={authKeyPassphrase}
                        autocomplete="off"
                        uiField={overrideEnables(xchangeFileTransmission?.authKeyPassphrase, 'authKeyPassphrase')}
                        placeholder="Passphrase"
                        onChange={(event, newValue) => {
                          setAuthKeyPassphrase(newValue ?? '');
                          if (xchangeFileTransmission.authKeyPassphrase.value?.trim()
                            !== newValue?.trim()) {
                            setUnsavedChanges(true);
                          } else {
                            setUnsavedChanges(false);
                          }
                        }}
                      />
                      {(updateCmd || copyCmd) && enableUpdate('authKeyPassphrase', xchangeFileTransmission.authKeyPassphrase)}
                    </Column>
                  </FormRow>
                </>
              )}
            </>
          )}
          {xchangeFileTransmission?.folder.visible && (
            <FormRow>
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
                {(updateCmd || copyCmd) && enableUpdate('folder', xchangeFileTransmission.folder)}
              </Column>
            </FormRow>
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

    const parent = xchangeFileTransmission?.parent;

    if (optionXchangeTransmission) {
      if (optionXchangeTransmission === 'add' && !createCmd) return null;
    }
    return (
      <PanelBody>
        {message && (
          <Spacing margin={{ bottom: 'normal' }}>
            <MessageBar
              id="__TransmissionPanel_Msg"
              messageBarType={messageType}
              isMultiline
              onDismiss={() => setMessage(undefined)}
            >
              {message}
            </MessageBar>
          </Spacing>
        )}
        {parent && optionXchangeTransmission === 'copy' && (
          <FormRow>
            {!detach && (
              <Column lg="10">
                <span>
                  Copied from{' '}
                  <Text style={{ fontWeight: 'bold' }}>
                    {parent.host} (
                    {parent.filenameQualifiers
                      ?.find((itm) => itm)
                      ?.split('-')
                      ?.reduce((prev, current) => current)}
                    )
                  </Text>
                </span>
              </Column>
            )}
            <Column lg="2">
              <ButtonLink
                onClick={() => {
                  setDetach(true);
                  setOverrides({
                    protocol: true,
                    host: true,
                    port: true,
                    userName: true,
                    password: true,
                    authKeyName: true,
                    authKeyPassphrase: true,
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
          </FormRow>
        )}
        {xchangeFileTransmission?.filenameQualifiers.visible && (
          <FormRow>
            <Column lg="12">
              {!customQualifier ? (
                <UIInputMultiSelect
                  id="__filenameQualifier"
                  value={filenameQualifiers ?? []}
                  uiField={filenameQualifierUIField}
                  options={xchangeFileTransmission?.options ?? []}
                  onChange={(newValue) => {
                    setFilenameQualifiers(newValue ?? []);
                  }}
                />
              ) : (
                <InputText
                  id="__filenameQualifier"
                  value={customFileQualifier}
                  label={xchangeFileTransmission.filenameQualifiers?.label}
                  info={xchangeFileTransmission.filenameQualifiers?.info ?? undefined}
                  required={xchangeFileTransmission.filenameQualifiers.required}
                  onChange={(event, newValue) => setCustomFileQualifier(newValue ?? '')}
                />
              )}
              {createCmd || updateCmd ? (
                <ButtonLink onClick={() => setCustomQualifier((prevState) => !prevState)}>
                  {!customQualifier ? 'use a custom qualifier' : 'use a standard environment-based qualifier'}
                </ButtonLink>
              ) : null}
            </Column>
          </FormRow>
        )}
        {xchangeFileTransmission?.protocol.visible && (
          <FormRow>
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
          </FormRow>
        )}
        {optionArchive()}
        {xchangeFileTransmission?.filenamePattern.visible && (
          <FormRow>
            <Column lg="12">
              <UIInputText
                id="fileNamePattern"
                value={filenamePattern}
                autocomplete="off"
                uiField={overrideEnables(xchangeFileTransmission?.filenamePattern, 'filenamePattern')}
                onChange={(event, newValue) => {
                  setFilenamePattern(newValue ?? '');
                  filenamePatternValue(newValue ?? '');
                  if (xchangeFileTransmission.filenamePattern.value?.trim()
                  !== newValue?.trim()) {
                    setUnsavedChanges(true);
                  } else {
                    setUnsavedChanges(false);
                  }
                }}
              />
              {(updateCmd || copyCmd) && enableUpdate('filenamePattern', xchangeFileTransmission.filenamePattern)}
              {(updateCmd || copyCmd || createCmd)
                && !xchangeFileTransmission.filenamePattern.readOnly && (
                <Spacing margin={{ top: 'normal' }}>
                  <span style={{ color: '#605e5c', fontSize: '14px', fontWeight: 'bold' }}>
                    Ex:{' '}
                    <Text variant="small" style={{ color: '#a19f9d', fontWeight: 'bold' }}>
                      {previewFilenamePatternValue}
                    </Text>
                  </span>
                </Spacing>
              )}
            </Column>
          </FormRow>
        )}
        {!choseArchive && (
          <>
            <FormRow>
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
                {(updateCmd || copyCmd) && enableUpdate('stepWise', xchangeFileTransmission?.stepWise)}
              </Column>
            </FormRow>
            <FormRow>
              <Column lg="12">
                <UIInputSelectOne
                  id="vendorEncryptionKeyName"
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
                {(updateCmd || copyCmd) && enableUpdate('encryptionKeyName', xchangeFileTransmission?.encryptionKeyName)}
              </Column>
            </FormRow>
          </>
        )}
      </PanelBody>
    );
  };

  const renderPanelFooter = () => {
    if (loadingCopyTransmission || loadingFileTransmissionForm) {
      return null;
    }

    if (updateCmd || createCmd || copyCmd) {
      return (
        <>
          <PrimaryButton id="__Xchange_AddStep_Button" iconProps={{ iconName: 'Save' }} onClick={saveFileTransmission}>
            Save
          </PrimaryButton>
          {!choseArchive && (
          <DefaultButton
            style={{ marginLeft: '10px' }}
            iconProps={{
              iconName: 'Phone',
              style: {
                color: ThemeStore.userTheme.colors.black,
                fontWeight: ThemeStore.userTheme.fontWeights.bold,
              },
            }}
            text="Test Configuration"
            onClick={() => setTestFileTransmissionModal(true)}
          />
          )}
        </>
      )
    }

    if (optionXchangeTransmission === 'update' && !choseArchive) {
      return (
        <DefaultButton
          style={{ marginLeft: '10px' }}
          iconProps={{
            iconName: 'Phone',
            style: {
              color: ThemeStore.userTheme.colors.black,
              fontWeight: ThemeStore.userTheme.fontWeights.bold,
            },
          }}
          text="Test Configuration"
          onClick={() => setTestFileTransmissionModal(true)}
        />
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
      const { copyXchangeFileTransmission } = dataCopyTransmission
      setOptionXchangeTransmission('copy');
      setXchangeFileTransmission(copyXchangeFileTransmission);
      const filename = { ...copyXchangeFileTransmission?.filenameQualifiers };
      filename.label = 'Environment';
      filename.info = null;
      setFilenameQualifierUIField(filename);
      if (
        copyXchangeFileTransmission?.filenameQualifiers.value
        && copyXchangeFileTransmission?.filenameQualifiers.value.length > 0
      ) {
        setFilenameQualifiers(
          copyXchangeFileTransmission.filenameQualifiers.value
            .map((file) => file.value) ?? [],
        );
      }
      if (copyXchangeFileTransmission?.commands) {
        const pageCommands = copyXchangeFileTransmission?.commands;
        const _copyCmd = pageCommands?.find((cmd) => cmd?.commandType === CdxWebCommandType.Create);
        setCopyCmd(_copyCmd);
        setUpdateCmd(null);
        setCreateCmd(null);
      }
    }
  }, [dataCopyTransmission, loadingCopyTransmission]);

  useEffect(() => {
    setOptionXchangeTransmission(optionXchangeTransmission ?? '');
    if (optionXchangeTransmission === 'add') {
      setCreateFileTransmission(true);
    }
  }, [optionXchangeTransmission]);

  useEffect(() => {
    if (!loadingFileTransmissionForm && dataFileTransmissionForm) {
      setXchangeFileTransmission(dataFileTransmissionForm.xchangeFileTransmissionForm);

      const filename = {
        ...dataFileTransmissionForm.xchangeFileTransmissionForm?.filenameQualifiers,
      };
      filename.label = 'Environment';
      filename.info = null;
      setFilenameQualifierUIField(filename);
      if (
        dataFileTransmissionForm.xchangeFileTransmissionForm?.filenameQualifiers.value
        && dataFileTransmissionForm.xchangeFileTransmissionForm?.filenameQualifiers.value.length > 0
      ) {
        const fileTransmissionValue = dataFileTransmissionForm.xchangeFileTransmissionForm
          .filenameQualifiers.value[0].value;
        const customQualifierValue = dataFileTransmissionForm.xchangeFileTransmissionForm.options
          .find((opt) => opt.key === 'filenameQualifier').values.find((val) => val.value === fileTransmissionValue);
        if (customQualifierValue) {
          const fileTransmissionValues = dataFileTransmissionForm.xchangeFileTransmissionForm
            .filenameQualifiers.value;
          setFilenameQualifiers(fileTransmissionValues.map((ft) => ft.value))
        } else {
          setCustomQualifier(true);
          setCustomFileQualifier(fileTransmissionValue);
        }
      }
      if (dataFileTransmissionForm.xchangeFileTransmissionForm?.commands) {
        const pageCommands = dataFileTransmissionForm.xchangeFileTransmissionForm?.commands;
        const _updateCmd = pageCommands?.find(
          (cmd) => cmd?.commandType === CdxWebCommandType.Update,
        );
        const _createCmd = pageCommands?.find(
          (cmd) => cmd?.commandType === CdxWebCommandType.Create,
        );
        setUpdateCmd(_updateCmd);
        setCreateCmd(_createCmd);
        setCopyCmd(null);
      }
    }
  }, [dataFileTransmissionForm, loadingFileTransmissionForm]);

  useEffect(() => {
    if (xchangeFileTransmission) {
      const currentProtocol = xchangeFileTransmission.protocol.value?.value ?? '';
      if (currentProtocol === 'ARCHIVE') setChoseArchive(true);
      setProtocol(currentProtocol);
      setHost(xchangeFileTransmission.host.value ?? '');
      setUserName(xchangeFileTransmission?.userName.value ?? '');
      setPassword(xchangeFileTransmission?.password.value ?? '');
      setShowSShKeys(!!xchangeFileTransmission?.authKeyName?.value?.value);
      setAuthKeyName(xchangeFileTransmission?.authKeyName?.value?.value ?? '');
      setAuthKeyPassphrase(xchangeFileTransmission?.authKeyPassphrase?.value ?? '');
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
    const response = dataCreateFile?.createXchangeFileTransmission;
    if (dataCreateFile) {
      const responseCode = response?.response;
      setXchangeFileTransmission(dataCreateFile?.createXchangeFileTransmission);
      if (responseCode === GqOperationResponse.Fail) {
        const errorMsg = dataCreateFile?.createXchangeFileTransmissio?.errMsg
          ?? 'Error occurred, please verify the information and try again.';
        setMessageType(MessageBarType.error);
        setMessage(errorMsg);
      }

      if (responseCode === GqOperationResponse.Success) {
        refreshDetailsPage(true);
        closePanel(false);
        setMessage(null);
        Toast.success({ text: 'File transmission added' });
      }
    }

    if (!loadingCreateFile && errorCreateFile) {
      Toast.error({ text: 'There was an error to add File Transmission' });
    }
  }, [dataCreateFile, loadingCreateFile, errorCreateFile]);

  useEffect(() => {
    if (!loadingUpdateFile && dataUpdateFile) {
      refreshDetailsPage(true);
      Toast.success({ text: 'File transmission updated' });
      closePanel(false);
    }

    if (!loadingUpdateFile && errorUpdateFile) {
      Toast.error({ text: 'There was an error to update File Transmission' });
    }
  }, [dataUpdateFile, loadingUpdateFile, errorUpdateFile]);

  return (
    <ThemedPanel
      closeButtonAriaLabel="Close"
      onRenderHeader={renderPanelHeader}
      onRenderFooterContent={renderPanelFooter}
      type={PanelType.medium}
      isOpen={isPanelOpen}
      onDismiss={() => {
        onPanelClose();
      }}
    >
      {renderBody()}
      <DialogYesNo {...dialogProps} open={showDialog} />
      {testFileTransmissionModal && (
        <TestFileTransmissionModal
          isOpen={setTestFileTransmissionModal}
          open={testFileTransmissionModal}
          ftpTestCurrentData={{
            host,
            user: userName,
            password,
            port,
            folder,
            stepWise,
            sshKeyPath: authKeyName,
          }}
        />
      )}
    </ThemedPanel>
  );
};

export { XchangeTransmissionPanel };
