import React, { useEffect, useState } from 'react';
import { DetailsList, PanelType, Stack, Text, List, PrimaryButton } from '@fluentui/react';
import {
  PanelBody,
  PanelHeader,
  PanelTitle,
  ThemedPanel,
  WizardBody,
  WizardButtonRow,
} from 'src/layouts/Panels/Panels.styles';

import { useOrgSid } from 'src/hooks/useOrgSid';
import { usePreviewConvertXchangeProfileLazyQuery, Organization } from 'src/data/services/graphql';
import { useQueryHandler } from 'src/hooks/useQueryHandler';
import { Container, Row } from 'src/components/layouts';
import { Spacing } from 'src/components/spacings/Spacing';
import { StyledTextList } from './PreviewConvertXchange.style';

type PreviewConvertXchangePanel = {
  isPanelOpen: boolean;
  closePanel: (data: boolean) => void;
};

const PreviewConvertXchangePanel = ({ isPanelOpen, closePanel }: PreviewConvertXchangePanel) => {
  const { orgSid } = useOrgSid();
  const [xchangePreviewConvert, { data: dataPreviewConvert, loading: loadingPreviewConvert }] = useQueryHandler(
    usePreviewConvertXchangeProfileLazyQuery
  );

  const [newUsersAccounts, setNewUsersAccounts] = useState([]);
  const [newVendors, setNewVendors] = useState<Organization[]>([]);

  const getPreviewConvertData = () => {
    xchangePreviewConvert({
      variables: {
        orgSid,
      },
    });
  };

  useEffect(() => {
    getPreviewConvertData();
  }, []);

  useEffect(() => {
    if (!loadingPreviewConvert && dataPreviewConvert) {
      console.log(dataPreviewConvert);
      setNewUsersAccounts(dataPreviewConvert.previewConvertXchangeProfile.newUserAccounts);
      setNewVendors(dataPreviewConvert.previewConvertXchangeProfile.newVendors);
    }
  }, [dataPreviewConvert, loadingPreviewConvert]);

  return (
    <ThemedPanel
      closeButtonAriaLabel="Close"
      type={PanelType.medium}
      headerText="Convert client profile"
      isOpen={isPanelOpen}
      onDismiss={() => closePanel(false)}
    >
      <PanelBody>
        <WizardBody>
          <Spacing margin={{ top: 'double', bottom: 'double' }}>
            {dataPreviewConvert && <Text>{dataPreviewConvert.previewConvertXchangeProfile.info ?? ''}</Text>}
          </Spacing>
          {newVendors.length > 0 && (
            <>
              <Spacing margin={{ top: 'double', bottom: 'normal' }}>
                <Text>Vendors</Text>
                <br />
                <Text>The following Vendor organization will be created in order to support this conversion.</Text>
              </Spacing>
              <List items={newVendors} />
            </>
          )}
          {newUsersAccounts.length > 0 && (
            <>
              <Spacing margin={{ top: 'double', bottom: 'normal' }}>
                <Text>User Accounts</Text>
                <br />
                <Text>The following User Accounts will be created in order to support this conversion.</Text>
              </Spacing>
              <List
                role="listbox"
                items={newUsersAccounts.map((user) => {
                  const userEmail = {};
                  userEmail['name'] = user;
                  return userEmail;
                })}
              />
            </>
          )}
        </WizardBody>
        <WizardButtonRow>
          <PrimaryButton id="__Convert-NewFormat" iconProps={{ iconName: 'Play' }}>
            Convert to new Format
          </PrimaryButton>
        </WizardButtonRow>
      </PanelBody>
    </ThemedPanel>
  );
};

export { PreviewConvertXchangePanel };
