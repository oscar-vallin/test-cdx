/* eslint-disable react-hooks/exhaustive-deps */
import React, { ReactElement, useState } from 'react';
import { MessageBar, MessageBarType, PanelType, Stack, ITag } from '@fluentui/react';
import { useApolloClient } from '@apollo/client';

import { Tabs } from 'src/components/tabs/Tabs';
import { PanelBody, PanelHeader, PanelTitle, ThemedPanel } from 'src/layouts/Panels/Panels.styles';

import { useNotification } from 'src/hooks/useNotification';
import { GqOperationResponse, UserAccountForm } from 'src/data/services/graphql';
import { DialogYesNo } from 'src/containers/modals/DialogYesNo';
import { Column } from 'src/components/layouts';
import { useExternalUsersAccessService } from 'src/pages/Admin/Users/ExternalUsers/ExternalUsersAccess.service';
import { ErrorHandler } from 'src/utils/ErrorHandler';
import { SectionAccount } from './SectionAccount';
import SectionAccessManagement from './SectionAccessManagement';
import SectionSummary from './SectionSummary';
import { useWizardTabs } from 'src/pages/Admin/Users/useWizardTabs';

type AddExternalUsersAccessPanelProps = {
  orgSid: string;
  isOpen?: boolean;
  onDismiss?: () => void;
  onGrantAccessToExternalUser?: (form?: UserAccountForm) => void;
};

const tabs = ['#account', '#access', '#summary'];

const AddExternalUsersAccessPanel = ({
  orgSid,
  isOpen = false,
  onDismiss = () => {},
  onGrantAccessToExternalUser = () => {},
}: AddExternalUsersAccessPanelProps): ReactElement => {
  const externalUsersAccessService = useExternalUsersAccessService(orgSid);

  const { selectedTab, handleNext, handlePrev, handleTabChange, resetTabs } = useWizardTabs(tabs);
  const [showDialog, setShowDialog] = useState(false);
  const [unsavedChanges, setUnsavedChanges] = useState(false);
  const [isProcessing, setProcessing] = useState<boolean>(false);
  const [errorMsg, setErrorMsg] = useState<string | undefined>();
  const [createExternalUser, setCreateExternalUser] = useState(false);
  const [userSelected, setUserSelected] = useState(false);
  const client = useApolloClient();
  const handleError = ErrorHandler();

  const Toast = useNotification();

  const onPanelClose = () => {
    if (unsavedChanges) {
      setShowDialog(true);
    } else {
      doClosePanel();
    }
  };

  const onCreateExternalUser = (val: boolean) => {
    setUserSelected(true);
    setCreateExternalUser(val);
  };

  const doClosePanel = () => {
    setErrorMsg(undefined);
    // Reset the form
    externalUsersAccessService.resetForm();
    // Set it back to the first tab
    resetTabs();
    setShowDialog(false);
    setUnsavedChanges(false);
    onDismiss();
  };

  const handleFindExternalUsers = (text: string) => {
    return findExternalUsers(text);
  };

  const findExternalUsers = async (text: string): Promise<ITag[]> => {
    return externalUsersAccessService.callFindExternalUsers(client, handleError, text);
  };

  const handleGrantAccess = async () => {
    setProcessing(true);
    const response = await externalUsersAccessService.callGrantUserAccess();
    setProcessing(false);

    if (response?.grantExternalUserAccess) {
      const responseCode = response?.grantExternalUserAccess?.response;

      if (responseCode === GqOperationResponse.Fail) {
        const errorMsg = response?.grantExternalUserAccess?.errMsg ?? 'Error Granting Access to External User';
        setErrorMsg(errorMsg);
      } else {
        setErrorMsg(undefined);
      }

      if (responseCode === GqOperationResponse.Success) {
        Toast.success({ text: 'External user has been granted access' });
      }
      if (responseCode === GqOperationResponse.PartialSuccess) {
        const errorMsg = response?.grantExternalUserAccess?.errMsg ?? 'Error Granting Access to External User';
        Toast.warning({ text: errorMsg });
      }

      if (responseCode === GqOperationResponse.Success || responseCode === GqOperationResponse.PartialSuccess) {
        onGrantAccessToExternalUser(response.grantExternalUserAccess);
        doClosePanel();
      }
    }
  };

  const handleCreateExternalUser = async () => {
    setProcessing(true);
    const response = await externalUsersAccessService.callCreateExternalUser();
    setProcessing(false);

    if (response?.createExternalUser) {
      const responseCode = response?.createExternalUser?.response;

      if (responseCode === GqOperationResponse.Fail) {
        const errorMsg = response?.createExternalUser?.errMsg ?? 'Error creating external user';
        setErrorMsg(errorMsg);
      } else {
        setErrorMsg(undefined);
      }

      if (responseCode === GqOperationResponse.Success) {
        Toast.success({ text: 'External user created and granted access' });
      }
      if (responseCode === GqOperationResponse.PartialSuccess) {
        const errorMsg = response?.createExternalUser?.errMsg ?? 'Error creating external user';
        Toast.warning({ text: errorMsg });
      }

      if (responseCode === GqOperationResponse.Success || responseCode === GqOperationResponse.PartialSuccess) {
        onGrantAccessToExternalUser(response.createExternalUser);
        doClosePanel();
      }
    }
  };

  const renderPanelHeader = () => (
    <PanelHeader>
      <Column lg="12">
        <Stack horizontal styles={{ root: { height: 44 } }}>
          <PanelTitle id="__CreateUser_Panel_Title" variant="bold" size="large">
            Add access
          </PanelTitle>
        </Stack>
      </Column>
    </PanelHeader>
  );

  return (
    <>
      <ThemedPanel
        closeButtonAriaLabel="Close"
        type={PanelType.medium}
        headerText="New User"
        onRenderHeader={renderPanelHeader}
        isOpen={isOpen}
        onDismiss={onPanelClose}
        onOuterClick={() => {}}
      >
        <PanelBody>
          {errorMsg && (
            <MessageBar
              id="__CreateExternalUser_Error"
              messageBarType={MessageBarType.error}
              isMultiline
              onDismiss={() => setErrorMsg(undefined)}
            >
              {errorMsg}
            </MessageBar>
          )}
          <>
            <Tabs
              items={[
                {
                  title: 'External User',
                  content: (
                    <SectionAccount
                      searchExternalUsers={handleFindExternalUsers}
                      form={externalUsersAccessService.userAccountForm}
                      onNext={handleNext}
                      userSelected={userSelected}
                      setUserSelected={setUserSelected}
                      createExternalUser={createExternalUser}
                      setCreateExternalUser={onCreateExternalUser}
                      saveOptions={(user) => {
                        externalUsersAccessService.updateAccountInfo(user);
                        setUnsavedChanges(true);
                        if (user.sid) {
                          setUserSelected(true);
                        }
                      }}
                      saveActivationEmailOptions={(send) => {
                        externalUsersAccessService.setSendAccountActivation(send);
                        setUnsavedChanges(true);
                        setUserSelected(true);
                      }}
                    />
                  ),
                  hash: '#account',
                },
                {
                  title: 'Access Management',
                  content: (
                    <SectionAccessManagement
                      form={externalUsersAccessService.userAccountForm}
                      onPrev={handlePrev}
                      onNext={handleNext}
                      saveOptions={(sids) => {
                        externalUsersAccessService.updateAccessPolicyGroups(sids);
                        setUnsavedChanges(true);
                      }}
                    />
                  ),
                  hash: '#access',
                  disabled: !userSelected,
                },
                {
                  title: 'Summary',
                  content: (
                    <SectionSummary
                      form={externalUsersAccessService.userAccountForm}
                      onPrev={handlePrev}
                      onSubmit={createExternalUser ? handleCreateExternalUser : handleGrantAccess}
                      isProcessing={isProcessing}
                    />
                  ),
                  hash: '#summary',
                  disabled: !userSelected,
                },
              ]}
              selectedKey={selectedTab}
              onClickTab={handleTabChange}
            />
          </>
        </PanelBody>
      </ThemedPanel>
      <DialogYesNo
        open={showDialog}
        highlightNo
        title="You have unsaved changes"
        message="You are about cancel creating this new account. Are you sure you want to undo these changes?"
        onYes={() => {
          setShowDialog(false);
          doClosePanel();
          return null;
        }}
        onClose={() => {
          setShowDialog(false);
          return null;
        }}
      />
    </>
  );
};

export default AddExternalUsersAccessPanel;
