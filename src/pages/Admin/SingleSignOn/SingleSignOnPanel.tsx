import React, { useEffect, useState } from 'react';
import {
  useIdentityProviderFormLazyQuery,
  IdentityProviderForm,
  OidcSettingsForm,
  useCreateIdentityProviderMutation,
  useUpdateIdentityProviderMutation,
  IdpType,
  OidcAuthenticationMethod,
  GqOperationResponse,
} from 'src/data/services/graphql';
import {
  PanelType,
  PrimaryButton,
  Spinner,
  SpinnerSize,
  MessageBar,
  MessageBarType,
  IconButton,
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
import { InputText, UIInputText } from 'src/components/inputs/InputText';
import { useQueryHandler } from 'src/hooks/useQueryHandler';
import { UIInputCheck } from 'src/components/inputs/InputCheck';
import { useNotification } from 'src/hooks/useNotification';
import { DialogYesNo, DialogYesNoProps } from 'src/containers/modals/DialogYesNo';
import { ErrorIcon } from 'src/components/badges/ErrorIcon';
import { UIInputSelectOne } from 'src/components/inputs/InputDropdown';
import { UIInputToggle } from 'src/components/inputs/InputToggle';
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
  const [oidcSettings, setOidcSettings] = useState<OidcSettingsForm>()
  const [idpId, setIdpId] = useState('');
  const [name, setName] = useState('');
  const [type, setType] = useState('');
  const [issuer, setIssuer] = useState('');
  const [clientId, setClientId] = useState('');
  const [clientSecret, setClientSecret] = useState('');
  const [authenticationMethod, setAuthenticationMethod] = useState('');
  const [autoDiscovery, setAutoDiscovery] = useState<boolean>();
  const [authorizationURL, setAuthorizationURL] = useState('');
  const [tokenURL, setTokenURL] = useState('');
  const [userInfoURL, setUserInfoURL] = useState('');
  const [samlMetaData, setSamlMetaData] = useState('');
  const [errMsgSamlMetaData, setErrMsgSamlMetaData] = useState('');
  const [unsavedChanges, setUnsavedChanges] = useState(false);
  const [showDialog, setShowDialog] = useState(false);
  const [dialogProps, setDialogProps] = useState<DialogYesNoProps>(defaultDialogProps);
  const [isDefault, setIsDefault] = useState<boolean>();
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
      error: identityProviderError,
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
      setOidcSettings(idenProviderdata.oidcSettings);
      setIdpId(idenProviderdata.idpId.value ?? '');
      setName(idenProviderdata.name.value ?? '');
      setType(idenProviderdata.type.value ?? '');
      setIssuer(idenProviderdata.oidcSettings.issuer.value ?? '');
      setClientId(idenProviderdata.oidcSettings.clientId.value ?? '');
      setClientSecret(idenProviderdata.oidcSettings.clientSecret.value ?? '');
      setAuthenticationMethod(idenProviderdata.oidcSettings.authenticationMethod.value ?? '');
      setAutoDiscovery(idenProviderdata.oidcSettings.autoDiscovery.value ?? false);
      setAuthorizationURL(idenProviderdata.oidcSettings.authorizationURL.value ?? '');
      setTokenURL(idenProviderdata.oidcSettings.tokenURL.value ?? '');
      setUserInfoURL(idenProviderdata.oidcSettings.userInfoURL.value ?? '');
      setIsDefault(idenProviderdata.isDefault.value ?? false);
    }
  }, [identityProviderFormData, isLoadingForm]);

  useEffect(() => {
    const response = identityProviderCreated?.createIdentityProvider;
    if (identityProviderCreated) {
      const responseCode = response?.response;
      setIdentityProviderForm(identityProviderCreated?.createIdentityProvider);
      setOidcSettings(identityProviderCreated?.createIdentityProvider.oidcSettings);
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
        setIsDefault(false);
        Toast.success({ text: 'Identity Provider Saved' });
      }
    }
    if (!isLoadingCreated && identityProviderError) {
      Toast.error({ text: 'There was an error creating Indentity Provider' });
    }
  }, [identityProviderCreated, isLoadingCreated, identityProviderError]);

  useEffect(() => {
    const response = identityProviderUpdated?.updateIdentityProvider;
    if (identityProviderUpdated) {
      const responseCode = response?.response;
      setIdentityProviderForm(identityProviderUpdated?.updateIdentityProvider);
      const { errMsg } = identityProviderUpdated.updateIdentityProvider.samlMetaData;
      setErrMsgSamlMetaData(errMsg);
      if (responseCode === GqOperationResponse.Fail) {
        const errorMsg = identityProviderUpdated?.updateIdentityProvider?.errMsg
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
        setIsDefault(false);
        Toast.success({ text: 'Identity Provider Saved' });
      }
    }
    if (!isLoadingUpdated && identityProviderUpdatedError) {
      Toast.error({ text: 'There was an error updating Indentity Provider' });
    }
  }, [identityProviderUpdated, isLoadingUpdated, identityProviderUpdatedError]);

  const saveIdentityProvider = () => {
    let authMeth = '';
    if (authenticationMethod === 'CLIENT_SECRET_POST') {
      authMeth = 'ClientSecretPost';
    } else if (authenticationMethod === 'CLIENT_SECRET_BASIC') {
      authMeth = 'ClientSecretBasic';
    } else if (authenticationMethod === 'CLIENT_SECRET_JWT') {
      authMeth = 'ClientSecretJwt';
    } else if (authenticationMethod === 'SIGNED_JWT') {
      authMeth = 'SignedJwt';
    }
    let idpType = '';
    if (type === 'SAML2') {
      idpType = 'Saml2';
    } else if (type === 'Oidc') {
      idpType = 'Oidc';
    }
    if (sid) {
      updateIdentityProvider({
        variables: {
          idpInput: {
            sid,
            name,
            samlMetaData,
            idpId,
            isDefault,
            type: IdpType[idpType],
          },
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
          oidcSettings: {
            issuer,
            clientId,
            clientSecret,
            authenticationMethod: OidcAuthenticationMethod[authMeth],
            autoDiscovery,
            authorizationURL,
            tokenURL,
            userInfoURL,
          }
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
        {identityProviderForm?.type.visible && (
          <UIInputSelectOne
            id="indentityType"
            uiField={identityProviderForm.type}
            options={identityProviderForm.options}
            value={type}
            onChange={(newValue) => {
              setUnsavedChanges(true);
              setType(newValue ?? '')
            }}
          />
        )}
        {IdpType.Saml2 === type && (
          <>
            <Text variant="semiBold">{identityProviderForm?.samlMetaData.label}</Text>
            <IconButton
              title={identityProviderForm?.samlMetaData.info ?? ''}
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
        {IdpType.Oidc === type && (
          <>
            {oidcSettings?.issuer.visible && (
              <UIInputText
                id="identityIssuer"
                uiField={oidcSettings.issuer}
                value={issuer}
                onChange={(event, newValue) => {
                  setUnsavedChanges(true);
                  setIssuer(newValue ?? '')
                }}
              />
            )}
            {oidcSettings?.clientId.visible && (
              <UIInputText
                id="identityClientId"
                uiField={oidcSettings.clientId}
                value={clientId}
                onChange={(event, newValue) => {
                  setUnsavedChanges(true);
                  setClientId(newValue ?? '')
                }}
              />
            )}
            {oidcSettings?.clientSecret.visible && (
              <InputText
                disabled={oidcSettings?.clientSecret?.readOnly ?? false}
                autofocus={false}
                label={oidcSettings?.clientSecret?.label}
                errorMessage={oidcSettings?.clientSecret?.errMsg ?? undefined}
                info={oidcSettings?.clientSecret?.info ?? undefined}
                required={oidcSettings?.clientSecret?.required ?? false}
                minLength={oidcSettings?.clientSecret?.min}
                maxLength={oidcSettings?.clientSecret?.max}
                canRevealPassword
                type="password"
                autocomplete="new-password"
                id="password"
                value={clientSecret}
                onChange={(event, newValue) => setClientSecret(newValue ?? '')}
              />
            )}
            {oidcSettings?.authenticationMethod.visible && (
              <UIInputSelectOne
                id="indentityAuthenticationMethod"
                uiField={oidcSettings.authenticationMethod}
                options={identityProviderForm?.options}
                value={authenticationMethod}
                onChange={(newValue) => {
                  setUnsavedChanges(true);
                  setAuthenticationMethod(newValue ?? '')
                }}
              />
            )}
            {oidcSettings?.autoDiscovery.visible && (
              <UIInputToggle
                id="identityAutoDiscoveryToggle"
                uiField={oidcSettings?.autoDiscovery}
                onText="On"
                offText="Off"
                role="checkbox"
                onChange={(event, checked) => {
                  setUnsavedChanges(true);
                  setAutoDiscovery(checked);
                }}
              />
            )}
            {oidcSettings?.authorizationURL.visible && (
              <UIInputText
                id="identityAuthorizationURL"
                uiField={oidcSettings.authorizationURL}
              />
            )}
            {oidcSettings?.tokenURL.visible && (
              <UIInputText
                id="identityTokenURL"
                uiField={oidcSettings.tokenURL}
                value={tokenURL}
                onChange={(event, newValue) => {
                  setUnsavedChanges(true);
                  setTokenURL(newValue ?? '')
                }}
              />
            )}
          </>
        )}
        <Spacing margin={{ top: 'double' }}>
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
