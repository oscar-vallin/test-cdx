import React, { useEffect, useState } from 'react';
import {
  IconButton,
  Link,
  PanelType,
  Spinner,
  SpinnerSize,
  Stack,
} from '@fluentui/react';
import {
  useIdentityProviderConnectionInformationLazyQuery,
  Saml2ConnectionInfo,
  OidcConnectionInfo,
} from 'src/data/services/graphql';
import { Text } from 'src/components/typography';
import { ThemedPanel } from 'src/layouts/Panels/Panels.styles';
import { Spacing } from 'src/components/spacings/Spacing';
import { ButtonLink } from 'src/components/buttons';
import { useNotification } from 'src/hooks/useNotification';
import { EmptyMessage } from 'src/containers/tables/TableCurrentActivity/TableActivity.styles';

type AlertsPanelProps = {
    isOpen: boolean;
    closePanel: (data: boolean) => void;
    indetityProviderSid: string;
};

const ConnectionInformationPanel = (
  { closePanel, indetityProviderSid, isOpen }: AlertsPanelProps,
) => {
  const Toast = useNotification();
  const [saml2ConnectionInfo, setSaml2ConnectionInfo] = useState<Saml2ConnectionInfo | null>();
  const [oidcConnectionInfo, setOidcConnectionInfo] = useState<OidcConnectionInfo | null>();
  const [
    providerConnectionInformation,
    {
      data: connectionInfoData,
      loading: isLoadingConnectionInfo,
      error: connectionInfoError,
    },
  ] = useIdentityProviderConnectionInformationLazyQuery();

  const fetchData = () => {
    providerConnectionInformation({
      variables: {
        idpSid: indetityProviderSid,
      },
    });
  };

  useEffect(() => {
    if (isOpen) {
      fetchData();
    }
  }, [isOpen]);

  useEffect(() => {
    if (!isLoadingConnectionInfo && connectionInfoData) {
      const { identityProviderConnectionInformation } = connectionInfoData;
      if (identityProviderConnectionInformation.oidcConnectionInfo) {
        setOidcConnectionInfo(identityProviderConnectionInformation.oidcConnectionInfo);
        setSaml2ConnectionInfo(null);
      }
      if (identityProviderConnectionInformation.saml2ConnectionInfo) {
        setSaml2ConnectionInfo(identityProviderConnectionInformation.saml2ConnectionInfo);
        setOidcConnectionInfo(null);
      }
    }
  }, [connectionInfoData, connectionInfoError, isLoadingConnectionInfo]);

  const copyToClipboard = (text: string, title?: string) => {
    navigator.clipboard.writeText(text).then(() => {
      Toast.info({ text: `${title} copied`, duration: 2000 });
    });
  };

  const renderBody = () => {
    if (isLoadingConnectionInfo) {
      return (
        <Spacing margin={{ top: 'double' }}>
          <Spinner size={SpinnerSize.large} label="Loading Connection Information" />
        </Spacing>
      );
    }

    if (saml2ConnectionInfo) {
      return (
        <Spacing id="saml2ConnectionInfo" margin={{ top: 'normal' }}>
          <Text id="__SamlServiceProvider">
            The CDX Dashboard supports SAML v2.0 SSO as a Service Provider (Sp) Using
            HTTP POST binding.
          </Text>
          <Spacing margin={{ top: 'normal', bottom: 'normal' }}>
            <Text id="__serviceMetadata">Download the service provider metadata here: </Text>
          </Spacing>
          <Link id="__metadata" href={saml2ConnectionInfo.metaDataURL ?? '#'} target="_new">
            {saml2ConnectionInfo.metaDataURL}
          </Link>
          <Spacing margin={{ top: 'normal', bottom: 'normal' }}>
            <Text variant="bold">
              Configuring your Identity Provider (Idp) to connect to the CDX Dashboard
            </Text>
          </Spacing>
          <Text>
            The following configuration properties are
            <span style={{ fontWeight: 'bold' }}> required</span> to be configured in your idP:
          </Text>
          <Spacing id="_SamlEntityId" margin={{ top: 'normal' }}>
            <Text variant="semiBold">Entity Id</Text>
            <Stack horizontal>
              <IconButton
                id="__EntityId"
                iconProps={{ iconName: 'Copy' }}
                text={saml2ConnectionInfo.entityId ?? ''}
                onClick={() => {
                  copyToClipboard(saml2ConnectionInfo.entityId ?? '', 'Entity Id');
                }}
              />
              <Text id="entityId">{saml2ConnectionInfo.entityId}</Text>
            </Stack>
          </Spacing>
          <Spacing id="__SamlassertionConsumerURL" margin={{ top: 'normal', bottom: 'normal' }}>
            <Text variant="semiBold">
              Assertion Consumer Service POST Binding URl
            </Text>
            <Stack horizontal>
              <Stack.Item align="center">
                <IconButton
                  id="__ConsumerURL"
                  iconProps={{ iconName: 'Copy' }}
                  text={saml2ConnectionInfo.assertionConsumerURL ?? ''}
                  onClick={() => {
                    copyToClipboard(saml2ConnectionInfo.assertionConsumerURL ?? '', 'Assertion Consumer Service POST Binding URl');
                  }}
                />
                <Text>{saml2ConnectionInfo.assertionConsumerURL}</Text>
              </Stack.Item>
            </Stack>
          </Spacing>
          <Stack>
            <Text id="__DownloadURL" variant="semiBold">x509 Certificate</Text>
            <ButtonLink
              id="__CertificateDownloadURL"
              underline
              href={saml2ConnectionInfo.certificateDownloadURL ?? ''}
            >
              Download here
            </ButtonLink>
          </Stack>
          <Spacing id="__NameIdFormat" margin={{ top: 'normal', bottom: 'double' }}>
            <Stack>
              <Text id="__IdFormat" variant="semiBold">Name id Format</Text>
              <Text id="__SamlEmail">email</Text>
              <Text>-- or --</Text>
              <Text>urn:oasis:names:tc:SAML:1.1:nameid-format:emailAddr</Text>
            </Stack>
          </Spacing>
          <Text>
            The Following configuration properties are
            <span style={{ fontWeight: 'bold' }}> optionally </span>configured in your idP
          </Text>
          <Spacing id="OptionallyConfiguredIdP" margin={{ top: 'double', bottom: 'normal' }}>
            <Text variant="semiBold">Logo URL</Text>
            <Stack horizontal>
              <Stack.Item align="center">
                <IconButton
                  id="__SamlLogoURL"
                  iconProps={{ iconName: 'Copy' }}
                  text={saml2ConnectionInfo.logoURL ?? ''}
                  onClick={() => {
                    copyToClipboard(saml2ConnectionInfo.logoURL ?? '', 'Logo URL');
                  }}
                />
                <Text id="__LogoUrl">{saml2ConnectionInfo.logoURL}</Text>
              </Stack.Item>
            </Stack>
            <Text variant="semiBold">Single Logout service POST Binding URL</Text>
            <Stack horizontal>
              <Stack.Item align="center">
                <IconButton
                  id="__SamlSingleLogoutURL"
                  iconProps={{ iconName: 'Copy' }}
                  text={saml2ConnectionInfo.singleLogoutURL ?? ''}
                  onClick={() => {
                    copyToClipboard(saml2ConnectionInfo.singleLogoutURL ?? '', 'Single Logout service POST Binding URL');
                  }}
                />
                <Text id="__SingleLogOutSerPOSTBindingURL">{saml2ConnectionInfo.singleLogoutURL}</Text>
              </Stack.Item>
            </Stack>
          </Spacing>
        </Spacing>
      )
    }

    return (
      <Spacing>
        <Spacing margin={{ top: 'normal', bottom: 'double' }}>
          <Text>
            The CDX Dashboard supports Open ID Connect 1.0 SSO as a Client or Relying <br />
            PArty (RP) using Authorization Code Flow (sometimes referred to as &quot;Standard<br />
            Flow&quot;).
          </Text>
        </Spacing>
        <Text variant="bold">Configuring your Identity Provider (IdP) to connect to the CDX Dashboard</Text>
        <Spacing margin={{ top: 'normal', bottom: 'normal' }}>
          <Text>
            The following configuration properties are
            <span style={{ fontWeight: 'bold' }}> required</span> to be configured in your IdP
          </Text>
        </Spacing>
        <Stack>
          <Text variant="semiBold">Authentication Flow</Text>
          <Text>Authorization Code Flow (or Standard Flow)</Text>
        </Stack>
        <Spacing margin={{ top: 'normal', bottom: 'normal' }}>
          <Text variant="semiBold">Client id</Text>
          <Stack horizontal>
            <Stack.Item align="center">
              <IconButton
                id="__oidcClientId"
                iconProps={{ iconName: 'Copy' }}
                onClick={() => {
                  copyToClipboard(oidcConnectionInfo?.clientId ?? '');
                }}
              />
              <Text>{oidcConnectionInfo?.clientId}</Text>
            </Stack.Item>
          </Stack>
        </Spacing>
        <Text variant="semiBold">Client Secret</Text>
        <Stack horizontal>
          <Stack.Item align="center">
            <IconButton
              id="__oidcClientSecret"
              disabled={!oidcConnectionInfo?.clientSecret}
              iconProps={{ iconName: 'Copy' }}
              onClick={() => {
                copyToClipboard(oidcConnectionInfo?.clientSecret ?? '');
              }}
            />
            {oidcConnectionInfo?.clientSecret ? (
              <ButtonLink
                onClick={() => {
                  copyToClipboard(oidcConnectionInfo?.clientSecret ?? '');
                }}
              >
                Click to copy to clipboard
              </ButtonLink>
            ) : (
              <EmptyMessage size="normal">
                {'<none>'}
              </EmptyMessage>
            )}
          </Stack.Item>
        </Stack>
        <Spacing margin={{ top: 'normal', bottom: 'double' }}>
          <Stack>
            <Text variant="semiBold">Client Scopes</Text>
            <Text>Must include: email</Text>
          </Stack>
        </Spacing>
        <Text>
          The following configuration properties are
          <span style={{ fontWeight: 'bold' }}> optionally </span>
          configured in your idP
        </Text>
        <Spacing margin={{ top: 'normal' }}>
          <Text variant="semiBold">Logo URL</Text>
          <Stack horizontal>
            <Stack.Item align="center">
              <IconButton
                id="__oidcLogoURL"
                iconProps={{ iconName: 'Copy' }}
                onClick={() => {
                  copyToClipboard(oidcConnectionInfo?.logoURL ?? '');
                }}
              />
              <Text>{oidcConnectionInfo?.logoURL}</Text>
            </Stack.Item>
          </Stack>
        </Spacing>
      </Spacing>
    )
  }
  return (
    <ThemedPanel
      closeButtonAriaLabel="Close"
      headerText={`Connecting to the CDX ${saml2ConnectionInfo ? 'Service Provider (SP)' : 'OIDC Client'}`}
      headerTextProps={{
        id: '__ConnectionInformation_title',
      }}
      type={PanelType.medium}
      isLightDismiss={false}
      isOpen={isOpen}
      onDismiss={() => closePanel(false)}
    >
      {renderBody()}
    </ThemedPanel>
  )
};

export { ConnectionInformationPanel };
