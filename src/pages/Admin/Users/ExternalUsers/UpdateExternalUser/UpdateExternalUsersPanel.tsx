/* eslint-disable react-hooks/exhaustive-deps */
import React, { ReactElement, useState } from 'react';
import { MessageBar, MessageBarType, PanelType, Stack } from '@fluentui/react';

import { Tabs } from 'src/components/tabs/Tabs';
import { PanelBody, PanelHeader, PanelTitle, ThemedPanel } from 'src/layouts/Panels/Panels.styles';

import { useNotification } from 'src/hooks/useNotification';
import { GqOperationResponse, UserAccountForm } from 'src/data/services/graphql';
import { DialogYesNo } from 'src/containers/modals/DialogYesNo';
import { Column } from 'src/components/layouts';
import { useExternalUsersAccessService } from 'src/pages/Admin/Users/ExternalUsers/ExternalUsersAccess.service';
import { ThemedCommandButton } from 'src/components/buttons/Button/Button.styles';
import SectionAccessManagement from './SectionAccessManagement';
import SectionSummary from './SectionSummary';
import { useWizardTabs } from 'src/pages/Admin/Users/useWizardTabs';

type UpdateExternalUsersPanelProps = {
  orgSid: string;
  userAccountSid?: string;
  isOpen?: boolean;
  onDismiss?: () => void;
  onUpdateUser?: (form?: UserAccountForm) => void;
};

const tabs = ['#account', '#access'];

const UpdateExternalUsersPanel = ({
  orgSid,
  userAccountSid,
  isOpen = false,
  onDismiss = undefined,
  onUpdateUser = undefined,
}: UpdateExternalUsersPanelProps): ReactElement => {
  const externalUsersAccessService = useExternalUsersAccessService(orgSid, userAccountSid);

  const { selectedTab, handleTabChange, resetTabs } = useWizardTabs(tabs);
  const [showRevokeAccessDialog, setShowRevokeAccessDialog] = useState(false);
  const [showUnsavedChangesDialog, setShowUnsavedChangesDialog] = useState(false);
  const [unsavedChanges, setUnsavedChanges] = useState(false);
  const [isProcessing, setProcessing] = useState<boolean>(false);
  const [errorMsg, setErrorMsg] = useState<string | undefined>();

  const Toast = useNotification();

  const onPanelClose = () => {
    if (unsavedChanges) {
      setShowUnsavedChangesDialog(true);
    } else {
      doClosePanel();
    }
  };

  const doClosePanel = () => {
    setErrorMsg(undefined);

    externalUsersAccessService.resetForm();

    // Set it back to the first tab
    resetTabs();
    setShowUnsavedChangesDialog(false);
    setUnsavedChanges(false);

    if (onDismiss) {
      onDismiss();
    }
  };

  const userName = () => {
    const { person } = externalUsersAccessService.userAccountForm;
    const firstNm = person?.firstNm?.value;
    const lastNm = person?.lastNm?.value;
    if (!firstNm && !lastNm) {
      return '<Unnamed User>';
    }
    return `${firstNm ?? ''} ${lastNm ?? ''}`;
  };

  const renderPanelHeader = () => (
    <PanelHeader>
      <Column lg="6">
        <Stack horizontal styles={{ root: { height: 44 } }}>
          <PanelTitle id="__UpdateExternalUser_Panel_Title" variant="bold" size="large">
            {userName()}
          </PanelTitle>
        </Stack>
      </Column>
      <Column lg="6" right>
        {externalUsersAccessService.revokeAccessCmd && (
          <Stack horizontal>
            <ThemedCommandButton
              id="__RevokeAccess_Button"
              iconProps={{ iconName: 'UserRemove' }}
              text={externalUsersAccessService.revokeAccessCmd.label ?? 'Revoke'}
              onClick={() => setShowRevokeAccessDialog(true)}
            />
          </Stack>
        )}
      </Column>
    </PanelHeader>
  );

  const handleGrantAccess = async () => {
    setProcessing(true);
    const response = await externalUsersAccessService.callGrantUserAccess();
    setProcessing(false);

    if (response?.grantExternalUserAccess) {
      const responseCode = response?.grantExternalUserAccess?.response;

      if (responseCode === GqOperationResponse.Fail) {
        const errMsg = response?.grantExternalUserAccess?.errMsg ?? 'Error Updating Access for External User';
        setErrorMsg(errMsg);
      } else {
        setErrorMsg(undefined);
      }

      if (responseCode === GqOperationResponse.Success) {
        Toast.success({ text: 'External user access has been updated' });
      }
      if (responseCode === GqOperationResponse.PartialSuccess) {
        const errMsg = response?.grantExternalUserAccess?.errMsg ?? 'Error Updating Access for External User';
        Toast.warning({ text: errMsg });
      }

      if (responseCode === GqOperationResponse.Success || responseCode === GqOperationResponse.PartialSuccess) {
        if (onUpdateUser) {
          onUpdateUser(response.grantExternalUserAccess);
        }
        doClosePanel();
      }
    }
  };

  const handleRevokeAccess = async () => {
    setProcessing(true);
    const response = await externalUsersAccessService.callRevokeExternalUserAccess();
    setProcessing(false);
    if (response?.revokeExternalUserAccess?.response === GqOperationResponse.Success) {
      setErrorMsg(undefined);
      setShowRevokeAccessDialog(false);
      doClosePanel();
      Toast.success({ text: `${userName()}'s access has been revoked` });
      if (onUpdateUser) {
        onUpdateUser();
      }
    } else {
      const errMsg = response?.revokeExternalUserAccess?.errMsg ?? 'Unexpected error';
      setErrorMsg(errMsg);
    }
  };

  return (
    <>
      <ThemedPanel
        closeButtonAriaLabel="Close"
        type={PanelType.medium}
        headerText={userName()}
        onRenderHeader={renderPanelHeader}
        isOpen={isOpen}
        onDismiss={onPanelClose}
        onOuterClick={undefined}
      >
        <PanelBody>
          {errorMsg && (
            <MessageBar
              id="__UpdateExternalUser_Error"
              messageBarType={MessageBarType.error}
              isMultiline
              onDismiss={() => setErrorMsg(undefined)}
            >
              {errorMsg}
            </MessageBar>
          )}
          <Tabs
            items={[
              {
                title: 'Summary',
                content: (
                  <SectionSummary
                    form={externalUsersAccessService.userAccountForm}
                    onSubmit={handleGrantAccess}
                    isProcessing={isProcessing}
                  />
                ),
                hash: '#summary',
              },
              {
                title: 'Access Management',
                content: (
                  <SectionAccessManagement
                    form={externalUsersAccessService.userAccountForm}
                    onSubmit={handleGrantAccess}
                    saveOptions={(sids) => {
                      externalUsersAccessService.updateAccessPolicyGroups(sids);
                      setUnsavedChanges(true);
                    }}
                  />
                ),
                hash: '#access',
              },
            ]}
            selectedKey={selectedTab}
            onClickTab={handleTabChange}
          />
        </PanelBody>
      </ThemedPanel>
      <DialogYesNo
        open={showUnsavedChangesDialog}
        highlightNo
        title="You have unsaved changes"
        message="You are about cancel creating this new account. Are you sure you want to undo these changes?"
        onYes={() => {
          setShowUnsavedChangesDialog(false);
          doClosePanel();
          return null;
        }}
        onClose={() => {
          setShowUnsavedChangesDialog(false);
          return null;
        }}
      />
      <DialogYesNo
        open={showRevokeAccessDialog}
        highlightNo
        title="Revoke Access?"
        message="Are you sure you want to revoke this user's access to this Organization? This user will no longer have access to any data in this organization."
        onYes={() => {
          handleRevokeAccess().then();
        }}
        onClose={() => {
          setShowRevokeAccessDialog(false);
        }}
      />
    </>
  );
};

export default UpdateExternalUsersPanel;
