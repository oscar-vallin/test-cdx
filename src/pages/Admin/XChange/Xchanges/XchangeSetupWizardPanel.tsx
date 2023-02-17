import React, { useEffect, useState } from 'react';
import {
  useSetupNewXchangeMutation,
  useCreateNewXchangeMutation,
  XchangeSetupForm,
  useVendorQuickSearchLazyQuery,
  useResumeXchangeSetupMutation,
  useUpdateXchangeSetupMutation,
  ExtractType,
  TransmissionProtocol,
  GqOperationResponse,
} from 'src/data/services/graphql';
import { useHistory } from 'react-router-dom';
import { useQueryHandler } from 'src/hooks/useQueryHandler';
import { useOrgSid } from 'src/hooks/useOrgSid';
import { PanelBody, ThemedPanel, WizardButtonRow } from 'src/layouts/Panels/Panels.styles';
import {
  PanelType,
  PrimaryButton,
  SearchBox,
  Text,
  MessageBar,
  MessageBarType,
  ComboBox,
} from '@fluentui/react';
import { FormRow } from 'src/components/layouts/Row/Row.styles';
import { UIInputSelectOne } from 'src/components/inputs/InputDropdown';
import { DialogYesNo, DialogYesNoProps } from 'src/containers/modals/DialogYesNo';
import { Column } from 'src/components/layouts';
import { UIInputText } from 'src/components/inputs/InputText';
import { UIInputToggle } from 'src/components/inputs/InputToggle';
import FormLabel, { UIFormLabel } from 'src/components/labels/FormLabel';
import { Spacing } from 'src/components/spacings/Spacing';
import { ButtonLink } from 'src/components/buttons';
import { useNotification } from 'src/hooks/useNotification';
import { StyledVendorOptions } from './XchangePage.styles';

type XchangeSetupWizardPanelProps = {
  isPanelOpen: boolean;
  closePanel: (data: boolean) => void;
  refreshPage: (data: boolean) => void;
  configSid?: string;
};

const defaultDialogProps: DialogYesNoProps = {
  id: '__XchangeSetupWizard_Panel_Dlg',
  open: false,
  title: '',
  message: '',
  labelYes: 'Yes',
  labelNo: 'No',
  highlightNo: true,
  highlightYes: false,
};

const XchangeSetupWizardPanel = ({
  closePanel, isPanelOpen, refreshPage, configSid,
}: XchangeSetupWizardPanelProps) => {
  const { orgSid } = useOrgSid();
  const Toast = useNotification();
  const history = useHistory();
  const [setupNewXchangeForm, setSetupNewXchangeForm] = useState<XchangeSetupForm | null>();
  const [refreshForm, setRefreshForm] = useState(false);
  const [vendorSid, setVendorSid] = useState('');
  const [vendorErrorMsg, setVendorErrorMesg] = useState('')
  const [vendorName, setVendorName] = useState('');
  const [currentVendor, setCurrentVendor] = useState('');
  const [vendorSpec, setVendorSpec] = useState('');
  const [qualifier, setQualifier] = useState('');
  const [sourcePlatform, setSourcePlatform] = useState('');
  const [incomingFormat, setIncomingFormat] = useState('');
  const [deliveryProtocol, setDeliveryProtocol] = useState('');
  const [fileContents, setFileContents] = useState('');
  const [supportsFullFile, setSupportsFullFile] = useState<boolean>();
  const [supportsChangesOnly, setSupportsChangesOnly] = useState<boolean>();
  const [host, setHost] = useState('');
  const [port, setPort] = useState('22');
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [showKeyBasedAuth, setShowKeyBasedAuth] = useState(false);
  const [authKeyName, setAuthKeyName] = useState('');
  const [authKeyPassphrase, setAuthKeyPassphrase] = useState('');
  const [folder, setFolder] = useState('');
  const [message, setMessage] = useState<string | null>();
  const [messageType, setMessageType] = useState<MessageBarType>(MessageBarType.info);
  const [unsavedChanges, setUnsavedChanges] = useState(false);
  const [showDialog, setShowDialog] = useState(false);
  const [dialogProps, setDialogProps] = useState<DialogYesNoProps>(defaultDialogProps);
  const [
    newXchangeForm,
    {
      data: setupNewXchangeFormData,
      loading: isLoadingForm,
    },
  ] = useQueryHandler(useSetupNewXchangeMutation);
  const [
    resumeXchangeForm,
    {
      data: setupResumeXchangeFormData,
      loading: isLoadingResumeForm,
    },
  ] = useQueryHandler(useResumeXchangeSetupMutation);
  const [
    createNewXchangeForm,
    {
      data: setupNewXchangeFormCreatedData,
      loading: isLoadingCreateNewXchange,
    },
  ] = useQueryHandler(useCreateNewXchangeMutation);
  const [
    updateNewXchangeForm,
    {
      data: setupNewXchangeFormUpdateData,
      loading: isLoadingUpdateNewXchange,
    },
  ] = useQueryHandler(useUpdateXchangeSetupMutation);
  const [vendorQuickSearch,
    { data: quickSearchData }] = useVendorQuickSearchLazyQuery();

  const transProtocolType = () => {
    let transProtocol = '';
    if (deliveryProtocol === TransmissionProtocol.Archive) {
      transProtocol = 'Archive';
    } else if (deliveryProtocol === TransmissionProtocol.Sftp) {
      transProtocol = 'Sftp';
    } else if (deliveryProtocol === TransmissionProtocol.Ftps) {
      transProtocol = 'Ftps';
    } else if (deliveryProtocol === TransmissionProtocol.Ftp) {
      transProtocol = 'Ftp';
    }
    return transProtocol;
  };

  const extractType = () => {
    let extract = '';
    if (fileContents === ExtractType.Enrollment) {
      extract = 'Enrollment';
    } else if (fileContents === ExtractType.Census) {
      extract = 'Census';
    } else if (fileContents === ExtractType.CensusWithEnrollment) {
      extract = 'CensusWithEnrollment';
    } else if (fileContents === ExtractType.Payroll) {
      extract = 'Payroll';
    } else if (fileContents === ExtractType.CobraQe) {
      extract = 'CobraQe';
    } else if (fileContents === ExtractType.CobraIr) {
      extract = 'CobraIr';
    }

    return extract;
  };

  const getFormResumeData = () => {
    resumeXchangeForm({
      variables: {
        xchangeConfigSid: configSid,
      },
    });
  };

  const getFormData = () => {
    newXchangeForm({
      variables: {
        setup: {
          orgSid,
          vendorSid,
          vendorSpec,

          sourcePlatform,
          incomingFormat,
          fileContents: ExtractType[extractType()],
          supportsFullFile,
          supportsChangesOnly,
          deliveryProtocol: TransmissionProtocol[transProtocolType()],
          host,
          port,
          userName,
          password,
          authKeyName,
          authKeyPassphrase,
          folder,
        },
      },
    });
  };

  useEffect(() => {
    if (configSid) {
      getFormResumeData();
      return;
    }
    getFormData();
  }, []);

  useEffect(() => {
    if (!isLoadingForm && setupNewXchangeFormData) {
      setSetupNewXchangeForm(setupNewXchangeFormData.setupNewXchange);
    }
  }, [setupNewXchangeFormData, isLoadingForm]);

  useEffect(() => {
    if (setupNewXchangeForm) {
      setCurrentVendor(setupNewXchangeForm?.vendor?.value?.label ?? '');
      setQualifier(setupNewXchangeForm.qualifier?.value ?? '');
      setVendorSid(setupNewXchangeForm.vendor?.value?.value ?? '');
      setVendorSpec(setupNewXchangeForm.vendorSpec?.value?.value ?? '');
      setSourcePlatform(setupNewXchangeForm.sourcePlatform?.value?.value ?? '');
      setIncomingFormat(setupNewXchangeForm.incomingFormat?.value?.value ?? '');
      setDeliveryProtocol(setupNewXchangeForm.deliveryProtocol.value?.value ?? '');
      setFileContents(setupNewXchangeForm.fileContents?.value?.value ?? '');
      setSupportsFullFile(setupNewXchangeForm.supportsFullFile?.value ?? false);
      setSupportsChangesOnly(setupNewXchangeForm.supportsChangesOnly?.value ?? false);
      setHost(setupNewXchangeForm.host.value ?? '');
      setUserName(setupNewXchangeForm.userName.value ?? '');
      setPassword(setupNewXchangeForm.password.value ?? '');
      setAuthKeyName(setupNewXchangeForm.authKeyName.value?.value ?? '');
      setAuthKeyPassphrase(setupNewXchangeForm.authKeyPassphrase.value ?? '');
      setFolder(setupNewXchangeForm.folder.value ?? '');
    }
  }, [setupNewXchangeForm]);

  useEffect(() => {
    const response = setupResumeXchangeFormData?.resumeXchangeSetup;
    if (setupResumeXchangeFormData) {
      const responseCode = response?.response;
      if (responseCode === GqOperationResponse.Fail) {
        closePanel(false);
        Toast.error({ text: 'An internal server error has occurred. Please contact your administrator.' });
      }
      setSetupNewXchangeForm(setupResumeXchangeFormData.resumeXchangeSetup);
      const resumeForm:XchangeSetupForm = setupResumeXchangeFormData?.resumeXchangeSetup;
      setCurrentVendor(resumeForm?.vendor?.value?.label ?? '');
      setVendorSid(resumeForm.vendor?.value?.value ?? '');
      setVendorSpec(resumeForm.vendorSpec?.value?.value ?? '');
      setSourcePlatform(resumeForm.sourcePlatform?.value?.value ?? '');
      setIncomingFormat(resumeForm.incomingFormat?.value?.value ?? '');
      setDeliveryProtocol(resumeForm.deliveryProtocol.value?.value ?? '');
      setFileContents(resumeForm.fileContents?.value?.value ?? '');
      setSupportsFullFile(resumeForm.supportsFullFile?.value ?? false);
      setSupportsChangesOnly(resumeForm.supportsChangesOnly?.value ?? false);
      setHost(resumeForm.host.value ?? '');
      setUserName(resumeForm.userName.value ?? '');
      setPassword(resumeForm.password.value ?? '');
      setAuthKeyName(resumeForm.authKeyName.value?.value ?? '');
      setAuthKeyPassphrase(resumeForm.authKeyPassphrase.value ?? '');
      setFolder(resumeForm.folder.value ?? '');
    }
  }, [setupResumeXchangeFormData, isLoadingResumeForm]);

  useEffect(() => {
    setRefreshForm(false);
    if (refreshForm) {
      getFormData()
    }
  }, [refreshForm]);

  useEffect(() => {
    if (currentVendor.trim() === '') {
      setVendorName('');
    }
  }, [currentVendor]);

  useEffect(() => {
    const response = setupNewXchangeFormCreatedData?.createNewXchange;

    if (setupNewXchangeFormCreatedData) {
      const responseCode = response?.response;
      const { createNewXchange } = setupNewXchangeFormCreatedData;
      setSetupNewXchangeForm(createNewXchange);
      const vendorError = createNewXchange?.vendor?.errMsg;
      setVendorErrorMesg(vendorError);
      if (responseCode === GqOperationResponse.Fail) {
        const errorMsg = createNewXchange.errMsg
        ?? 'Error occurred, please verify the information and try again.';
        setMessageType(MessageBarType.error);
        setMessage(errorMsg);
      }

      if (responseCode === GqOperationResponse.Success) {
        history.push(`/xchange-details?orgSid=${orgSid}&coreFilename=${createNewXchange?.coreFilename}`)
        setMessage(null);
        closePanel(false);
      }
    }
  }, [setupNewXchangeFormCreatedData, isLoadingCreateNewXchange]);

  useEffect(() => {
    const response = setupNewXchangeFormUpdateData?.updateXchangeSetup;

    if (setupNewXchangeFormUpdateData) {
      const responseCode = response?.response;
      const { updateXchangeSetup } = setupNewXchangeFormUpdateData;
      setSetupNewXchangeForm(updateXchangeSetup);
      const vendorError = updateXchangeSetup?.vendor?.errMsg;
      setVendorErrorMesg(vendorError);
      if (responseCode === GqOperationResponse.Fail) {
        const errorMsg = updateXchangeSetup.errMsg
        ?? 'Error occurred, please verify the information and try again.';
        setMessageType(MessageBarType.error);
        setMessage(errorMsg);
      }

      if (responseCode === GqOperationResponse.Success) {
        refreshPage(true);
        setMessage(null);
        closePanel(false);
      }
    }
  }, [setupNewXchangeFormUpdateData, isLoadingUpdateNewXchange]);

  const doSearch = () => {
    if (quickSearchData?.vendorQuickSearch?.length
      && quickSearchData.vendorQuickSearch.length > 0) {
      const vendors = quickSearchData.vendorQuickSearch;
      return vendors.map((vendor, index) => (
        <Spacing margin={{ left: 'normal', top: 'normal', bottom: 'normal' }} key={index}>
          <Text
            id="__QuickSearch__Users"
            style={{ cursor: 'pointer' }}
            onClick={() => {
              setVendorSid(vendor.sid ?? '');
              setVendorName(vendor.name ?? '');
              setCurrentVendor(vendor.name ?? '');
              setRefreshForm(true);
            }}
          >
            {vendor.name}
          </Text>
        </Spacing>
      ));
    }

    return null;
  };

  const hideDialog = () => {
    setShowDialog(false);
  };

  const showUnsavedChangesDialog = () => {
    const updatedDialog = { ...defaultDialogProps };
    updatedDialog.title = 'You have unsaved changes';
    updatedDialog.message = 'Changes made to this Xchange will be discarded?  Are you sure you wish to continue and lose your changes';

    updatedDialog.onYes = () => {
      hideDialog();
      closePanel(false);
      setMessage(null);
      setUnsavedChanges(false);
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
      setUnsavedChanges(false);
    }
  };

  const createNewXchange = () => {
    if (configSid) {
      updateNewXchangeForm({
        variables: {
          setup: {
            xchangeConfigSid: configSid,
            orgSid,
            qualifier,
            vendorSid,
            vendorSpec,
            sourcePlatform,
            incomingFormat,
            fileContents: ExtractType[extractType()],
            supportsFullFile,
            supportsChangesOnly,
            deliveryProtocol: TransmissionProtocol[transProtocolType()],
            host,
            port,
            userName,
            password,
            authKeyName,
            authKeyPassphrase,
            folder,
          },
        },
      });
      return;
    }
    createNewXchangeForm({
      variables: {
        setup: {
          orgSid,
          qualifier,
          vendorSid,
          vendorSpec,
          sourcePlatform,
          incomingFormat,
          fileContents: ExtractType[extractType()],
          supportsFullFile,
          supportsChangesOnly,
          deliveryProtocol: TransmissionProtocol[transProtocolType()],
          host,
          port,
          userName,
          password,
          authKeyName,
          authKeyPassphrase,
          folder,
        },
      },
    })
  };

  const onRenderLabel = () => <UIFormLabel id="__newXghangeSpecLabel" uiField={setupNewXchangeForm?.vendorSpec} />;

  const renderBody = () => (
    <PanelBody>
      {message && (
        <Spacing margin={{ bottom: 'normal' }}>
          <MessageBar
            id="__SetupNewXchange_Msg"
            messageBarType={messageType}
            isMultiline
            onDismiss={() => setMessage(undefined)}
          >
            {message}
          </MessageBar>
        </Spacing>
      )}
      <FormRow>
        <Column lg="12">
          <FormLabel
            id="__searchVendor"
            required={setupNewXchangeForm?.vendor?.required ?? true}
            info={setupNewXchangeForm?.vendor?.info ?? ''}
            label={setupNewXchangeForm?.vendor?.label ?? ''}
            errorMessage={vendorErrorMsg}
          />
          <SearchBox
            styles={{ root: { width: '100%', borderColor: 'gray' } }}
            id="__newXghangeSpec"
            value={currentVendor}
            onChange={(event, searchText) => {
              vendorQuickSearch({
                variables: {
                  orgOwnerSid: orgSid,
                  searchText: searchText ?? '',
                },
              });
              setCurrentVendor(searchText ?? '');
              if (vendorName.trim() === '') {
                setVendorName('');
              }
            }}
          />
          {currentVendor.trim() !== '' && !vendorName && (
            <StyledVendorOptions>{doSearch()}</StyledVendorOptions>
          )}
        </Column>
      </FormRow>
      <FormRow>
        <Column>
          <UIInputText
            id="__newXghangeQualifier"
            uiField={setupNewXchangeForm?.qualifier}
            value={qualifier}
            onChange={(event, _newValue) => {
              setUnsavedChanges(true);
              setQualifier(_newValue ?? '');
            }}
          />
        </Column>
      </FormRow>
      <FormRow>
        <Column lg="12">
          {setupNewXchangeForm?.vendorSpec?.readOnly ? (
            <ComboBox
              disabled={true}
              options={[]}
              onRenderLabel={onRenderLabel}
              style={{
                width: '100%',
              }}
            />
          ) : (
            <UIInputSelectOne
              id="__newXghangeSpec"
              uiField={setupNewXchangeForm?.vendorSpec}
              options={setupNewXchangeForm?.options}
              value={vendorSpec}
              onChange={(newValue) => {
                setUnsavedChanges(true);
                setVendorSpec(newValue ?? '');
                setRefreshForm(true);
              }}
            />
          )}
        </Column>
      </FormRow>
      <FormRow>
        <Column lg="12">
          <UIInputSelectOne
            id="__newXghangeSourcePlatform"
            uiField={setupNewXchangeForm?.sourcePlatform}
            options={setupNewXchangeForm?.options}
            value={sourcePlatform}
            onChange={(newValue) => {
              setUnsavedChanges(true);
              setSourcePlatform(newValue ?? '');
              setRefreshForm(true);
            }}
          />
        </Column>
      </FormRow>
      <FormRow>
        <Column lg="12">
          <UIInputSelectOne
            id="__newXghangeIncomingFormat"
            uiField={setupNewXchangeForm?.incomingFormat}
            options={setupNewXchangeForm?.options}
            value={incomingFormat}
            onChange={(newValue) => {
              setUnsavedChanges(true);
              setIncomingFormat(newValue ?? '');
            }}
          />
        </Column>
      </FormRow>
      {vendorSpec && (
        <>
          <FormRow>
            <Column lg="12">
              <UIInputSelectOne
                id="__newXghangefileContents"
                uiField={setupNewXchangeForm?.fileContents}
                options={setupNewXchangeForm?.options}
                value={setupResumeXchangeFormData ? fileContents : undefined}
                onChange={(newValue) => {
                  setUnsavedChanges(true);
                  setFileContents(newValue ?? '');
                }}
              />
            </Column>
          </FormRow>
          <FormRow>
            <Column lg="12">
              <UIInputToggle
                id="__newXghangeSupportsFullFile"
                uiField={setupNewXchangeForm?.supportsFullFile}
                value={setupResumeXchangeFormData ? supportsFullFile : undefined}
                onChange={(event, checked) => {
                  setUnsavedChanges(true);
                  setSupportsFullFile(checked);
                  setRefreshForm(true);
                }}
              />
            </Column>
          </FormRow>
          <FormRow>
            <Column lg="12">
              <UIInputToggle
                id="__newXghangeSupportsChangesOnly"
                uiField={setupNewXchangeForm?.supportsChangesOnly}
                value={setupResumeXchangeFormData ? supportsChangesOnly : undefined}
                onChange={(event, checked) => {
                  setUnsavedChanges(true);
                  setSupportsChangesOnly(checked);
                  setRefreshForm(true);
                }}
              />
            </Column>
          </FormRow>
        </>
      )}
      <FormRow>
        <Column lg="12">
          <UIInputSelectOne
            id="__newXghangeDeliveryProtocol"
            uiField={setupNewXchangeForm?.deliveryProtocol}
            options={setupNewXchangeForm?.options}
            value={deliveryProtocol}
            onChange={(newValue) => {
              setUnsavedChanges(true);
              setDeliveryProtocol(newValue ?? '');
              setRefreshForm(true);
            }}
          />
        </Column>
      </FormRow>
      <FormRow>
        <Column lg="8">
          <UIInputText
            id="__newXghangeHost"
            uiField={setupNewXchangeForm?.host}
            value={host}
            placeholder="host"
            autocomplete="off"
            onChange={(event, _newValue) => {
              setUnsavedChanges(true);
              setHost(_newValue ?? '');
            }}
          />
        </Column>
        <Column lg="4">
          <UIInputText
            id="__newXghangePort"
            uiField={setupNewXchangeForm?.port}
            value={port}
            placeholder="port"
            autocomplete="off"
            onChange={(event, _newValue) => {
              setUnsavedChanges(true);
              setPort(_newValue ?? '');
            }}
          />
        </Column>
      </FormRow>
      <FormRow>
        <Column>
          <UIInputText
            id="__newXghangeUsername"
            uiField={setupNewXchangeForm?.userName}
            value={userName}
            onChange={(event, _newValue) => {
              setUnsavedChanges(true);
              setUserName(_newValue ?? '');
            }}
          />
        </Column>
      </FormRow>
      <FormRow>
        <Column lg="12">
          <UIInputText
            id="__newXghangePassword"
            uiField={setupNewXchangeForm?.password}
            type="password"
            autocomplete="new-password"
            placeholder="password"
            value={password}
            onChange={(event, _newValue) => {
              setUnsavedChanges(true);
              setPassword(_newValue ?? '');
            }}
          />
        </Column>
        {!showKeyBasedAuth && setupNewXchangeForm?.password.visible && (
        <Spacing>
          <Column>
            <ButtonLink
              onClick={() => setShowKeyBasedAuth(true)}
            >use key-based authentication
            </ButtonLink>
          </Column>
        </Spacing>
        )}
      </FormRow>
      {showKeyBasedAuth && (
        <>
          <FormRow>
            <Column lg="12">
              <UIInputSelectOne
                id="__newXghangeAuthKeyName"
                uiField={setupNewXchangeForm?.authKeyName}
                options={setupNewXchangeForm?.options}
                value={authKeyName}
                onChange={(newValue) => {
                  setUnsavedChanges(true);
                  setAuthKeyName(newValue ?? '');
                }}
              />
            </Column>
          </FormRow>
          <FormRow>
            <Column lg="12">
              <UIInputText
                id="__newXghangeAuthKeyPassphrase"
                uiField={setupNewXchangeForm?.authKeyPassphrase}
                autocomplete="off"
                placeholder="Passphrase"
                value={authKeyPassphrase}
                onChange={(event, _newValue) => {
                  setUnsavedChanges(true);
                  setAuthKeyPassphrase(_newValue ?? '');
                }}
              />
            </Column>
          </FormRow>
        </>
      )}
      <FormRow>
        <Column lg="12">
          <UIInputText
            id="__newXghangeFolder"
            uiField={setupNewXchangeForm?.folder}
            autocomplete="off"
            placeholder="Passphrase"
            value={folder}
            onChange={(event, _newValue) => {
              setUnsavedChanges(true);
              setFolder(_newValue ?? '');
            }}
          />
        </Column>
      </FormRow>
      <WizardButtonRow>
        <Spacing margin={{ top: 'double' }}>
          <PrimaryButton
            id="__CreateNewXchange_Button"
            onClick={() => createNewXchange()}
          >
            Create Xchange
          </PrimaryButton>
        </Spacing>
      </WizardButtonRow>
    </PanelBody>
  )
  return (
    <ThemedPanel
      id="__SetupNewXchangePanel"
      closeButtonAriaLabel="Close"
      type={PanelType.medium}
      headerText="Setup new Xchange"
      isOpen={isPanelOpen}
      headerTextProps={{
        id: '__SetupNewXchangePanel_Title',
      }}
      onDismiss={() => {
        onPanelClose();
      }}
    >
      {renderBody()}
      <DialogYesNo {...dialogProps} open={showDialog} />
    </ThemedPanel>
  )
};

export { XchangeSetupWizardPanel };
