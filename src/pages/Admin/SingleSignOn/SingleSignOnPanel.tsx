import React, { useEffect, useState } from 'react';
import {
  useIdentityProviderFormLazyQuery,
  IdentityProviderForm,
  useCreateIdentityProviderMutation,
  useUpdateIdentityProviderMutation,
  IdpType,
  GqOperationResponse,
} from 'src/data/services/graphql';
import {
  IconButton,
  PanelType,
  PrimaryButton,
  Spinner,
  SpinnerSize,
  MessageBar,
  MessageBarType,
} from '@fluentui/react';
import CodeMirror, { BasicSetupOptions } from '@uiw/react-codemirror';
import { javascript } from '@codemirror/lang-javascript';
import { createTheme } from '@uiw/codemirror-themes';
import { tags as t } from '@lezer/highlight';
import { Text } from 'src/components/typography';
import { PanelBody, ThemedPanel, WizardButtonRow } from 'src/layouts/Panels/Panels.styles';
import { useOrgSid } from 'src/hooks/useOrgSid';
import { useThemeStore } from 'src/store/ThemeStore';
import { Spacing } from 'src/components/spacings/Spacing';
import { UIInputText } from 'src/components/inputs/InputText';
import { useQueryHandler } from 'src/hooks/useQueryHandler';
import { UIInputCheck } from 'src/components/inputs/InputCheck';
import { useNotification } from 'src/hooks/useNotification';
import { DialogYesNo, DialogYesNoProps } from 'src/containers/modals/DialogYesNo';
import { ErrorIcon } from 'src/components/badges/ErrorIcon';
import { CodeMirrorRequired } from './SingleSignOn.styles';

type SingleSignOnPanelProps = {
    isPanelOpen: boolean;
    closePanel: (data: boolean) => void;
    sid?: string | null;
    refreshDetailsPage: (data: boolean) => void;
};

const myTheme = createTheme({
  theme: 'light',
  settings: {
    background: '#ffffff',
    foreground: 'black',
    lineHighlight: '#fff',
    gutterBackground: '#fff',
    gutterBorder: '#fff',
  },
  styles: [
    { tag: t.typeName, color: '#0078D4' },
    { tag: t.angleBracket, color: '#0078D4' },
  ],
});

const setupOption: BasicSetupOptions = {
  lineNumbers: false,
};

const defaultDialogProps: DialogYesNoProps = {
  id: '__SingleSignOn_Panel_Dlg',
  open: false,
  title: '',
  message: '',
  labelYes: 'Yes',
  labelNo: 'No',
  highlightNo: true,
  highlightYes: false,
};

const SingleSignOnPanel = ({
  isPanelOpen,
  closePanel,
  sid,
  refreshDetailsPage,
}: SingleSignOnPanelProps) => {
  const { orgSid } = useOrgSid();
  const ThemeStore = useThemeStore();
  const Toast = useNotification();
  const [identityProviderForm, setIdentityProviderForm] = useState<IdentityProviderForm>();
  const [idpId, setIdpId] = useState('');
  const [name, setName] = useState('');
  const [samlMetaData, setSamlMetaData] = useState('');
  const [errMsgSamlMetaData, setErrMsgSamlMetaData] = useState('');
  const [unsavedChanges, setUnsavedChanges] = useState(false);
  const [showDialog, setShowDialog] = useState(false);
  const [dialogProps, setDialogProps] = useState<DialogYesNoProps>(defaultDialogProps);
  const [isDefault, setIsDefault] = useState(false);
  const [message, setMessage] = useState<string | null>();
  const [messageType, setMessageType] = useState<MessageBarType>(MessageBarType.info);
  const [
    identityProvider,
    {
      data: identityProviderFormData,
      loading: isLoadingForm,
    },
  ] = useQueryHandler(useIdentityProviderFormLazyQuery);

  const [
    createIdentityProvider,
    {
      data: identityProviderCreated,
      loading: isLoadingCreated,
    },
  ] = useQueryHandler(useCreateIdentityProviderMutation);
  const [
    updateIdentityProvider,
    {
      data: identityProviderUpdated,
      loading: isLoadingUpdated,
      error: identityProviderUpdatedError,
    },
  ] = useQueryHandler(useUpdateIdentityProviderMutation);

  const fetchData = () => {
    identityProvider({
      variables: {
        orgSid,
        sid,
      },
    })
  };

  useEffect(() => {
    if (isPanelOpen) {
      fetchData()
    }
  }, [isPanelOpen]);

  useEffect(() => {
    if (!isLoadingForm && identityProviderFormData) {
      setUnsavedChanges(false);
      setIdentityProviderForm(identityProviderFormData?.identityProviderForm);
      const idenProviderdata = identityProviderFormData?.identityProviderForm;
      setSamlMetaData(idenProviderdata.samlMetaData.value ?? '');
      setName(idenProviderdata.name.value ?? '');
      setIdpId(idenProviderdata.idpId.value ?? '');
    }
  }, [identityProviderFormData, isLoadingForm]);

  useEffect(() => {
    const response = identityProviderCreated?.createIdentityProvider;
    if (identityProviderCreated) {
      const responseCode = response?.response;
      setIdentityProviderForm(identityProviderCreated?.createIdentityProvider);
      const { errMsg } = identityProviderCreated.createIdentityProvider.samlMetaData;
      setErrMsgSamlMetaData(errMsg);
      if (responseCode === GqOperationResponse.Fail) {
        const errorMsg = identityProviderCreated?.createIdentityProvider?.errMsg
          ?? 'Error occurred, please verify the information and try again.';
        setMessageType(MessageBarType.error);
        setMessage(errorMsg);
      }

      if (responseCode === GqOperationResponse.Success) {
        refreshDetailsPage(true);
        setMessage(null);
        closePanel(false);
        setErrMsgSamlMetaData('');
        setName('');
        setIdpId('');
        setSamlMetaData('');
        setIsDefault(false);
        Toast.success({ text: 'Identity Provider Saved' });
      }
    }
  }, [identityProviderCreated, isLoadingCreated]);

  const saveIdentityProvider = () => {
    if (sid) {
      updateIdentityProvider({
        variables: {
          sid,
          name,
          samlMetaData,
          idpId,
          isDefault,
          type: IdpType.Saml2,
        },
      });
      return;
    }
    createIdentityProvider({
      variables: {
        idpInput: {
          orgSid,
          idpId,
          name,
          samlMetaData,
          isDefault,
          type: IdpType.Saml2,
        },
      },
    });
  };

  const hideDialog = () => {
    setShowDialog(false);
  };

  const showUnsavedChangesDialog = () => {
    const updatedDialog = { ...defaultDialogProps };
    updatedDialog.title = 'You have unsaved changes';
    updatedDialog.message = 'Are you sure you wish to continue and lose your changes?';

    updatedDialog.onYes = () => {
      hideDialog();
      closePanel(false);
      setErrMsgSamlMetaData('');
      setMessage(null);
      setUnsavedChanges(false);
      setIdpId('');
      setName('');
      setSamlMetaData('');
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
      setErrMsgSamlMetaData('');
      setUnsavedChanges(false);
      setMessage(null);
      setIdpId('');
      setName('');
      setSamlMetaData('');
    }
  };

  const renderBody = () => {
    if (isLoadingForm) {
      return (
        <Spacing margin={{ top: 'double' }}>
          <Spinner size={SpinnerSize.large} label="Loading Single Sign on Panel" />
        </Spacing>
      );
    }

    return (
      <PanelBody>
        {message && (
          <Spacing margin={{ bottom: 'normal' }}>
            <MessageBar
              id="__SingleSignOn_Msg"
              messageBarType={messageType}
              isMultiline
              onDismiss={() => setMessage(undefined)}
            >
              {message}
            </MessageBar>
          </Spacing>
        )}
        {identityProviderForm?.idpId.visible && (
        <UIInputText
          id="identityProviderId"
          uiField={identityProviderForm.idpId}
          value={idpId}
          onChange={(event, newValue) => {
            setUnsavedChanges(true);
            setIdpId(newValue ?? '');
          }}
        />
        )}
        {identityProviderForm?.name.visible && (
        <UIInputText
          id="identityProviderName"
          uiField={identityProviderForm.name}
          value={name}
          onChange={(event, newValue) => {
            setUnsavedChanges(true);
            setName(newValue ?? '');
          }}
        />
        )}
        <Spacing margin={{ top: 'double' }}>
          {identityProviderForm?.samlMetaData.visible && (
            <>
              <Text variant="semiBold">{identityProviderForm.samlMetaData.label}</Text>
              <IconButton
                title={identityProviderForm.samlMetaData.info ?? ''}
                iconProps={{ iconName: 'Info' }}
                style={{ color: ThemeStore.userTheme.colors.black }}
              />
              <CodeMirrorRequired>*</CodeMirrorRequired>
              {errMsgSamlMetaData && <ErrorIcon id="samlMetaData-error" errorMessage={errMsgSamlMetaData} />}
              <CodeMirror
                id="samlMetaData"
                height="255px"
                style={{ border: '1px solid gray', fontWeight: 'bold', fontSize: '14px' }}
                basicSetup={setupOption}
                value={samlMetaData}
                extensions={[javascript({ jsx: true })]}
                theme={myTheme}
                onChange={(value) => {
                  setUnsavedChanges(true);
                  setSamlMetaData(value);
                }}
              />
            </>
          )}
          {identityProviderForm?.isDefault.visible && (
            <Spacing margin={{ top: 'double', bottom: 'double' }}>
              <UIInputCheck
                id="__Default_Identy_Provider"
                uiField={identityProviderForm.isDefault}
                value={isDefault}
                onChange={() => setIsDefault((prevState) => !prevState)}
              />
            </Spacing>
          )}
        </Spacing>
        <WizardButtonRow>
          <PrimaryButton id="__AddIdentityProvider_Button" iconProps={{ iconName: 'Save' }} onClick={saveIdentityProvider}>
            Save
          </PrimaryButton>
        </WizardButtonRow>
      </PanelBody>
    )
  }

  return (
    <>
      <ThemedPanel
        closeButtonAriaLabel="Close"
        type={PanelType.medium}
        headerText={identityProviderForm?.idpId.value ? `Idp - ${identityProviderForm?.idpId.value}` : 'Setup Identity Provider'}
        isOpen={isPanelOpen}
        onDismiss={() => {
          onPanelClose();
        }}
      >
        {renderBody()}
      </ThemedPanel>
      <DialogYesNo {...dialogProps} open={showDialog} />
    </>
  )
};

export { SingleSignOnPanel };
