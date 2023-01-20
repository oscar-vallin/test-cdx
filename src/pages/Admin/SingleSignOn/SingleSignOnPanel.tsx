import React, { useEffect, useState } from 'react';
import {
  useIdentityProviderFormLazyQuery,
  IdentityProviderForm,
  OidcSettingsForm,
  useCreateIdentityProviderMutation,
  useUpdateIdentityProviderMutation,
  IdpType,
  OidcAuthenticationMethod,
  IdentityProviderMetaDataLink,
  GqOperationResponse,
  WebCommand,
  CdxWebCommandType,
} from 'src/data/services/graphql';
import {
  PanelType,
  PrimaryButton,
  Spinner,
  SpinnerSize,
  MessageBar,
  MessageBarType,
  IconButton,
  Stack,
} from '@fluentui/react';
import { Text } from 'src/components/typography';
import { PanelBody, ThemedPanel, WizardButtonRow } from 'src/layouts/Panels/Panels.styles';
import { useOrgSid } from 'src/hooks/useOrgSid';
import { Spacing } from 'src/components/spacings/Spacing';
import { InputText, UIInputText } from 'src/components/inputs/InputText';
import { useQueryHandler } from 'src/hooks/useQueryHandler';
import { UIInputCheck } from 'src/components/inputs/InputCheck';
import { useNotification } from 'src/hooks/useNotification';
import { DialogYesNo, DialogYesNoProps } from 'src/containers/modals/DialogYesNo';
import { UIInputSelectOne } from 'src/components/inputs/InputDropdown';
import { UIInputToggle } from 'src/components/inputs/InputToggle';
import { ButtonLink } from 'src/components/buttons';
import { UIFormLabel } from 'src/components/labels/FormLabel';
import { UIInputCode } from 'src/components/inputs/InputCode';
import { FormRow } from 'src/components/layouts/Row/Row.styles';
import { getEnumByValue } from 'src/utils/CDXUtils';
import { ConnectionInformationPanel } from './ConnectionInformationPanel';

type SingleSignOnPanelProps = {
    isPanelOpen: boolean;
    closePanel: (data: boolean) => void;
    sid?: string | null;
    refreshDetailsPage: (data: boolean) => void;
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
  const Toast = useNotification();
  const [identityProviderForm, setIdentityProviderForm] = useState<IdentityProviderForm>();
  const [priorMetaData, setPriorMetaData] = useState<IdentityProviderMetaDataLink[] | null>();
  const [oidcSettings, setOidcSettings] = useState<OidcSettingsForm>();
  const [updateCmd, setUpdateCmd] = useState<WebCommand | null>();
  const [createCmd, setCreateCmd] = useState<WebCommand | null>();
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
  const [jwkSetURL, setJwkSetURL] = useState('');
  const [samlMetaData, setSamlMetaData] = useState<string>();
  const [unsavedChanges, setUnsavedChanges] = useState(false);
  const [showDialog, setShowDialog] = useState(false);
  const [dialogProps, setDialogProps] = useState<DialogYesNoProps>(defaultDialogProps);
  const [isDefault, setIsDefault] = useState<boolean>();
  const [message, setMessage] = useState<string | null>();
  const [messageType, setMessageType] = useState<MessageBarType>(MessageBarType.info);
  const [isOpenConnectionInfoPanel, setIsOpenConnectionInfo] = useState(false);

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
      const identProviderData = identityProviderFormData?.identityProviderForm;
      setOidcSettings(identProviderData.oidcSettings);
      setIdpId(identProviderData.idpId.value ?? '');
      setName(identProviderData.name.value ?? '');
      setPriorMetaData(identProviderData.priorMetaData);
      setSamlMetaData(identProviderData.samlMetaData.value ?? '');
      setType(identProviderData.type.value?.value ?? '');
      setIssuer(identProviderData.oidcSettings.issuer.value ?? '');
      setClientId(identProviderData.oidcSettings.clientId.value ?? '');
      setClientSecret(identProviderData.oidcSettings.clientSecret.value ?? '');
      setAuthenticationMethod(identProviderData.oidcSettings.authenticationMethod.value?.value ?? '');
      setAutoDiscovery(identProviderData.oidcSettings.autoDiscovery.value ?? true);
      setAuthorizationURL(identProviderData.oidcSettings.authorizationURL.value ?? '');
      setTokenURL(identProviderData.oidcSettings.tokenURL.value ?? '');
      setUserInfoURL(identProviderData.oidcSettings.userInfoURL.value ?? '');
      setIsDefault(identProviderData.isDefault.value ?? false);

      if (identProviderData.commands) {
        const pageCommands = identProviderData.commands;
        const _createCmd = pageCommands.find((cmd) => cmd.commandType === CdxWebCommandType.Create);
        setCreateCmd(_createCmd);
        const _updateCmd = pageCommands.find((cmd) => cmd.commandType === CdxWebCommandType.Update);
        setUpdateCmd(_updateCmd);
      }
    }
  }, [identityProviderFormData, isLoadingForm]);

  useEffect(() => {
    const response = identityProviderCreated?.createIdentityProvider;
    if (identityProviderCreated) {
      const responseCode = response?.response;
      setIdentityProviderForm(identityProviderCreated?.createIdentityProvider);
      setOidcSettings(identityProviderCreated?.createIdentityProvider.oidcSettings);
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
        setName('');
        setIdpId('');
        setIsDefault(false);
        Toast.success({ text: 'Identity Provider Saved' });
      }
    }
    if (!isLoadingCreated && identityProviderError) {
      Toast.error({ text: 'There was an error creating Identity Provider' });
    }
  }, [identityProviderCreated, isLoadingCreated, identityProviderError]);

  useEffect(() => {
    const response = identityProviderUpdated?.updateIdentityProvider;
    if (identityProviderUpdated) {
      const responseCode = response?.response;
      setIdentityProviderForm(identityProviderUpdated?.updateIdentityProvider);
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
        setName('');
        setIdpId('');
        setIsDefault(false);
        Toast.success({ text: 'Identity Provider Saved' });
      }
    }
    if (!isLoadingUpdated && identityProviderUpdatedError) {
      Toast.error({ text: 'There was an error updating Identity Provider' });
    }
  }, [identityProviderUpdated, isLoadingUpdated, identityProviderUpdatedError]);

  const saveIdentityProvider = () => {
    const authMeth = getEnumByValue(OidcAuthenticationMethod, authenticationMethod);
    const idpType = getEnumByValue(IdpType, type);

    if (sid) {
      updateIdentityProvider({
        variables: {
          idpInput: {
            sid,
            name,
            samlMetaData,
            idpId,
            isDefault,
            type: idpType,
            oidcSettings: {
              issuer,
              clientId,
              clientSecret,
              authenticationMethod: authMeth,
              autoDiscovery,
              authorizationURL,
              tokenURL,
              userInfoURL,
              jwkSetURL,
            },
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
          type: idpType,
          oidcSettings: {
            issuer,
            clientId,
            clientSecret,
            authenticationMethod: authMeth,
            autoDiscovery,
            authorizationURL,
            tokenURL,
            userInfoURL,
            jwkSetURL,
          },
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
      setUnsavedChanges(false);
      setMessage(null);
      setIdpId('');
      setName('');
    }
  };

  const renderMetaData = () => {
    if (!identityProviderForm?.historicalMetaData.visible) {
      return null;
    }
    if (!priorMetaData?.length) return null;

    const updateDate = (date: string) => {
      const currentDate = new Date(date);
      let formattedDate = currentDate.toDateString();
      formattedDate = formattedDate.split(' ').slice(1, 4).toLocaleString().replace(',', ' ')
      return formattedDate;
    }
    return (
      <FormRow>
        <UIFormLabel
          id="historicalMetaData"
          uiField={identityProviderForm?.historicalMetaData}
        />
        <Stack>
          {priorMetaData.map((metaData, metaDataIndex: number) => (
            <Stack horizontal key={metaDataIndex}>
              <Stack.Item align="center">
                <Text>Created on {updateDate(metaData.creationDateTime)}</Text>
                <IconButton
                  iconProps={{ iconName: 'Trash' }}
                />
              </Stack.Item>
            </Stack>
          ))}
        </Stack>
      </FormRow>
    )
  }

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
        <FormRow>
          <UIInputText
            id="identityProviderId"
            uiField={identityProviderForm?.idpId}
            value={idpId}
            onChange={(event, newValue) => {
              setUnsavedChanges(true);
              setIdpId(newValue ?? '');
            }}
          />
        </FormRow>
        <FormRow>
          <UIInputText
            id="identityProviderName"
            uiField={identityProviderForm?.name}
            value={name}
            onChange={(event, newValue) => {
              setUnsavedChanges(true);
              setName(newValue ?? '');
            }}
          />
        </FormRow>
        <FormRow>
          <UIInputSelectOne
            id="identityType"
            uiField={identityProviderForm?.type}
            options={identityProviderForm?.options}
            value={type}
            onChange={(newValue) => {
              setUnsavedChanges(true);
              setType(newValue ?? '')
            }}
          />
        </FormRow>
        {IdpType.Saml2 === type && (
          <>
            <FormRow>
              <UIInputCode
                id="samlMetaData"
                mode="xml"
                uiField={identityProviderForm?.samlMetaData}
                value={samlMetaData}
                onChange={(_, value) => {
                  setSamlMetaData(value);
                  setUnsavedChanges(true);
                }}
              />
            </FormRow>
            {renderMetaData()}
          </>
        )}
        {IdpType.Oidc === type && (
          <>
            <FormRow>
              <UIInputText
                id="identityIssuer"
                uiField={oidcSettings?.issuer}
                value={issuer}
                onChange={(event, newValue) => {
                  setUnsavedChanges(true);
                  setIssuer(newValue ?? '')
                }}
              />
            </FormRow>
            <FormRow>
              <UIInputText
                id="identityClientId"
                uiField={oidcSettings?.clientId}
                value={clientId}
                onChange={(event, newValue) => {
                  setUnsavedChanges(true);
                  setClientId(newValue ?? '')
                }}
              />
            </FormRow>
            {oidcSettings?.clientSecret.visible && (
              <FormRow>
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
                  onChange={(event, newValue) => {
                    setUnsavedChanges(true);
                    setClientSecret(newValue ?? '')
                  }}
                />
              </FormRow>
            )}
            <FormRow>
              <UIInputSelectOne
                id="identityAuthenticationMethod"
                uiField={oidcSettings?.authenticationMethod}
                options={identityProviderForm?.options}
                value={authenticationMethod}
                onChange={(newValue) => {
                  setUnsavedChanges(true);
                  setAuthenticationMethod(newValue ?? '')
                }}
              />
            </FormRow>
            <FormRow>
              <UIInputToggle
                id="identityAutoDiscoveryToggle"
                uiField={oidcSettings?.autoDiscovery}
                onText="On"
                offText="Off"
                value={autoDiscovery}
                role="checkbox"
                onChange={(event, checked) => {
                  setUnsavedChanges(true);
                  setAutoDiscovery(checked);
                }}
              />
            </FormRow>
            {!autoDiscovery && (
              <>
                <FormRow>
                  <UIInputText
                    id="identityAuthorizationURL"
                    value={authorizationURL}
                    uiField={oidcSettings?.authorizationURL}
                    onChange={(event, newValue) => {
                      setUnsavedChanges(true);
                      setAuthorizationURL(newValue ?? '')
                    }}
                  />
                </FormRow>
                <FormRow>
                  <UIInputText
                    id="identityTokenURL"
                    uiField={oidcSettings?.tokenURL}
                    value={tokenURL}
                    onChange={(event, newValue) => {
                      setUnsavedChanges(true);
                      setTokenURL(newValue ?? '')
                    }}
                  />
                </FormRow>
                <FormRow>
                  <UIInputText
                    id="identityUserInfoURL"
                    uiField={oidcSettings?.userInfoURL}
                    value={userInfoURL}
                    onChange={(event, newValue) => {
                      setUnsavedChanges(true);
                      setUserInfoURL(newValue ?? '');
                    }}
                  />
                </FormRow>
                <FormRow>
                  <UIInputText
                    id="jwkSetURL"
                    uiField={oidcSettings?.jwkSetURL}
                    value={jwkSetURL}
                    onChange={(event, newValue) => {
                      setUnsavedChanges(true);
                      setJwkSetURL(newValue ?? '');
                    }}
                  />
                </FormRow>
              </>
            )}
          </>
        )}
        <Spacing margin={{ top: 'double' }}>
          {identityProviderForm?.isDefault.visible && (
            <Spacing margin={{ top: 'double', bottom: 'double' }}>
              <UIInputCheck
                id="isDefault"
                uiField={identityProviderForm.isDefault}
                value={isDefault}
                onChange={() => setIsDefault((prevState) => !prevState)}
              />
            </Spacing>
          )}
        </Spacing>
        <WizardButtonRow>
          {updateCmd || createCmd ? (
            <PrimaryButton id="__AddIdentityProvider_Button" iconProps={{ iconName: 'Save' }} onClick={saveIdentityProvider}>
              Save
            </PrimaryButton>
          ) : null}
          {sid && (
            <ButtonLink
              underline
              id="__identityProviderConnectionInfoPanel"
              onClick={() => {
                setIsOpenConnectionInfo(true);
              }}
            >
              Connection Information
            </ButtonLink>
          )}
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
      <ConnectionInformationPanel
        isOpen={isOpenConnectionInfoPanel}
        closePanel={setIsOpenConnectionInfo}
        indetityProviderSid={sid ?? ''}
      />
      <DialogYesNo {...dialogProps} open={showDialog} />
    </>
  )
};

export { SingleSignOnPanel };
