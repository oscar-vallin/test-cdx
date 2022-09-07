import React, { useEffect, useState } from 'react';
import {
  PanelType, Text, PrimaryButton, Spinner, SpinnerSize,
} from '@fluentui/react';
import { PanelBody, ThemedPanel, WizardButtonRow } from 'src/layouts/Panels/Panels.styles';

import { useOrgSid } from 'src/hooks/useOrgSid';
import {
  usePreviewConvertXchangeProfileLazyQuery,
  Organization,
  useConvertXchangeProfileMutation,
  CdxWebCommandType,
  WebCommand,
} from 'src/data/services/graphql';
import { useQueryHandler } from 'src/hooks/useQueryHandler';
import { useNotification } from 'src/hooks/useNotification';
import { Spacing } from 'src/components/spacings/Spacing';
import { StyledList } from './PreviewConvertXchangePanel.style';

type PreviewConvertXchangePanel = {
  isPanelOpen: boolean;
  closePanel: (data: boolean) => void;
  refreshXchangePage: (data: boolean) => void;
};

const PreviewConvertXchangePanel = ({ isPanelOpen, closePanel, refreshXchangePage }: PreviewConvertXchangePanel) => {
  const { orgSid } = useOrgSid();
  const Toast = useNotification();

  const [xchangePreviewConvert, { data: dataPreviewConvert, loading: loadingPreviewConvert }] = useQueryHandler(
    usePreviewConvertXchangeProfileLazyQuery,
  );

  const [xchangeConvert, { data: dataConvert, loading: loadingConvert, error: errorConvert }] = useQueryHandler(
    useConvertXchangeProfileMutation,
  );

  const [newUsersAccounts, setNewUsersAccounts] = useState([]);
  const [newVendors, setNewVendors] = useState<Organization[]>([]);
  const [disableButton, setDisableButton] = useState(false);

  const [createCmd, setCreateCmd] = useState<WebCommand | null>();

  const getPreviewConvertData = () => {
    xchangePreviewConvert({
      variables: {
        orgSid,
      },
    });
  };

  const convertsClientProfile = () => {
    setDisableButton(true);
    xchangeConvert({
      variables: {
        orgSid,
      },
    });
  };

  const renderSpinner = () => {
    if (loadingConvert) {
      return (
        <Spacing margin={{ top: 'double' }}>
          <Spinner size={SpinnerSize.large} label="Converting" />
        </Spacing>
      );
    }
    if (loadingPreviewConvert) {
      return (
        <Spacing margin={{ top: 'double' }}>
          <Spinner size={SpinnerSize.large} label="Calculating Conversion Dependencies" />
        </Spacing>
      );
    }
    return null;
  };

  useEffect(() => {
    getPreviewConvertData();
  }, []);

  useEffect(() => {
    if (!loadingPreviewConvert && dataPreviewConvert) {
      setNewUsersAccounts(dataPreviewConvert.previewConvertXchangeProfile.newUserAccounts);
      setNewVendors(dataPreviewConvert.previewConvertXchangeProfile.newVendors);
      const pageCommands = dataPreviewConvert.previewConvertXchangeProfile.commands;
      const _createCmd = pageCommands?.find((cmd) => cmd?.commandType === CdxWebCommandType.Create);
      setCreateCmd(_createCmd);
    }
  }, [dataPreviewConvert, loadingPreviewConvert]);

  useEffect(() => {
    if (dataConvert && !loadingConvert) {
      Toast.success({ text: 'Client Profile converted successfully' });
      refreshXchangePage(true);
      closePanel(false);
      setDisableButton(false);
    }
    if (errorConvert && !loadingConvert) {
      Toast.error({ text: 'there was an error to Convert to new Format' });
      setDisableButton(false);
    }
  }, [dataConvert, errorConvert, loadingConvert]);

  const renderFooter = () => {
    if (dataPreviewConvert && createCmd) {
      return (
        <WizardButtonRow>
          <PrimaryButton
            disabled={disableButton}
            id="__Convert-NewFormat"
            iconProps={{ iconName: 'Play' }}
            onClick={convertsClientProfile}
          >
            Convert to new Format
          </PrimaryButton>
        </WizardButtonRow>
      );
    }

    return null;
  };

  return (
    <ThemedPanel
      closeButtonAriaLabel="Close"
      type={PanelType.medium}
      headerText="Convert client profile"
      isOpen={isPanelOpen}
      onDismiss={() => closePanel(false)}
      onRenderFooter={renderFooter}
    >
      <PanelBody>
        <Spacing margin={{ top: 'double', bottom: 'double' }}>
          {dataPreviewConvert && <Text>{dataPreviewConvert.previewConvertXchangeProfile.info ?? ''}</Text>}
        </Spacing>
        {newVendors.length > 0 && (
          <>
            <Spacing margin={{ top: 'double', bottom: 'normal' }}>
              <Text style={{ fontWeight: 'bold' }}>Vendors</Text>
              <br />
              <Text>The following Vendor organization will be created in order to support this conversion.</Text>
            </Spacing>
            <StyledList>
              {newVendors.map((vendor: Organization) => (
                <li key={vendor.orgId}>{vendor.name}</li>
              ))}
            </StyledList>
          </>
        )}
        {newUsersAccounts.length > 0 && (
          <>
            <Spacing margin={{ top: 'double', bottom: 'normal' }}>
              <Text style={{ fontWeight: 'bold' }}>User Accounts</Text>
              <br />
              <Text>The following User Accounts will be created in order to support this conversion.</Text>
            </Spacing>
            <StyledList>
              {newUsersAccounts.map((user: string, index: number) => (
                <li key={index}>{user}</li>
              ))}
            </StyledList>
          </>
        )}
        {renderSpinner()}
      </PanelBody>
    </ThemedPanel>
  );
};

export { PreviewConvertXchangePanel };
