/* eslint-disable react-hooks/exhaustive-deps */
import React, { ReactElement, useEffect, useState } from 'react';
import { MessageBar, MessageBarType, PanelType, Stack } from '@fluentui/react';

import { Tabs } from 'src/components/tabs/Tabs';
import { Text } from 'src/components/typography';
import { PanelBody, PanelHeader, PanelTitle, ThemedPanel } from 'src/layouts/Panels/Panels.styles';

import { useNotification } from 'src/hooks/useNotification';
import { GqOperationResponse } from 'src/data/services/graphql';
import { DialogYesNo } from 'src/containers/modals/DialogYesNo';
import { Column } from 'src/components/layouts';
import { useWizardTabs } from 'src/pages/Admin/Users/useWizardTabs';
import { useCreateUsersPanel } from './CreateUsersPanel.service';
import { SectionAccount } from './SectionAccount';
import SectionAccessManagement from './SectionAccessManagement';
import SectionAuthentication from './SectionAuthentication';
import SectionSummary from './SectionSummary';

const defaultProps = {
  isOpen: false,
  onDismiss: () => null,
  onCreateUser: () => null,
};

type CreateUsersPanelProps = {
  orgSid: string;
  isOpen?: boolean;
  onDismiss?: any | null;
  onCreateUser?: any | null;
} & typeof defaultProps;

const tabs = ['#account', '#access', '#auth', '#summary'];

const CreateUsersPanel = ({ orgSid, isOpen, onDismiss, onCreateUser }: CreateUsersPanelProps): ReactElement => {
  const createUserService = useCreateUsersPanel(orgSid);

  const { selectedTab, handleNext, handlePrev, handleTabChange, resetTabs } = useWizardTabs(tabs);
  const { userAccountLoading } = createUserService ?? {};
  const [showDialog, setShowDialog] = useState(false);
  const [unsavedChanges, setUnsavedChanges] = useState(false);
  const [isProcessing, setProcessing] = useState<boolean>(false);
  const [errorMsg, setErrorMsg] = useState<string | undefined>();
  const Toast = useNotification();

  const handleCreateUser = async () => {
    setProcessing(true);
    const responseCreate = await createUserService.callUpdateUser();
    setProcessing(false);
    //
    if (responseCreate?.createUser) {
      const responseCode = responseCreate?.createUser?.response;

      if (responseCode === GqOperationResponse.Fail) {
        const errorMsg =
          responseCreate?.createUser?.errMsg ?? responseCreate?.createUser?.response ?? 'Error Creating User';
        setErrorMsg(errorMsg);
      } else {
        setErrorMsg(undefined);
      }

      if (responseCode === GqOperationResponse.Success) {
        Toast.success({ text: 'User Account Successfully Created' });
      }
      if (responseCode === GqOperationResponse.PartialSuccess) {
        const errorMsg =
          responseCreate?.createUser?.errMsg ?? responseCreate?.createUser?.response ?? 'Error Creating User';
        Toast.warning({ text: errorMsg });
      }

      if (responseCode === GqOperationResponse.Success || responseCode === GqOperationResponse.PartialSuccess) {
        onCreateUser(responseCreate.createUser);
        doClosePanel();
      }
    }
  };

  useEffect(() => {
    if (createUserService.isUserCreated && createUserService.responseCreateUser) {
      onDismiss();
    }
  }, [createUserService.isUserCreated]);

  const onPanelClose = () => {
    if (unsavedChanges) {
      setShowDialog(true);
    } else {
      doClosePanel();
    }
  };

  const doClosePanel = () => {
    setErrorMsg(undefined);
    // Reset the form
    createUserService.resetForm();
    // Set it back to the first tab
    resetTabs();
    setShowDialog(false);
    setUnsavedChanges(false);
    onDismiss();
  };

  const renderPanelHeader = () => (
    <PanelHeader>
      <Column lg="12">
        <Stack horizontal styles={{ root: { height: 44 } }}>
          <PanelTitle id="__CreateUser_Panel_Title" variant="bold" size="large">
            New User
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
              id="__CreateUser_Error"
              messageBarType={MessageBarType.error}
              isMultiline
              onDismiss={() => setErrorMsg(undefined)}
            >
              {errorMsg}
            </MessageBar>
          )}
          {userAccountLoading && <Text>Loading...</Text>}
          {!userAccountLoading && (
            <Tabs
              items={[
                {
                  title: 'Account',
                  content: (
                    <SectionAccount
                      form={createUserService.userAccountForm}
                      onNext={handleNext}
                      saveOptions={(userAccount) => {
                        createUserService.updateAccountInfo(userAccount);
                        setUnsavedChanges(true);
                      }}
                    />
                  ),
                  hash: '#account',
                },
                {
                  title: 'Access Management',
                  content: (
                    <SectionAccessManagement
                      form={createUserService.userAccountForm}
                      onPrev={handlePrev}
                      onNext={handleNext}
                      saveOptions={(sids) => {
                        createUserService.updateAccessPolicyGroups(sids);
                        setUnsavedChanges(true);
                      }}
                    />
                  ),
                  hash: '#access',
                },
                {
                  title: 'Authentication',
                  content: (
                    <SectionAuthentication
                      form={createUserService.userAccountForm}
                      onPrev={handlePrev}
                      onNext={handleNext}
                      saveOptions={(send) => {
                        createUserService.setSendAccountActivation(send);
                        setUnsavedChanges(true);
                      }}
                    />
                  ),
                  hash: '#auth',
                },
                {
                  title: 'Summary',
                  content: (
                    <SectionSummary
                      form={createUserService.userAccountForm}
                      onPrev={handlePrev}
                      onSubmit={handleCreateUser}
                      isProcessing={isProcessing}
                    />
                  ),
                  hash: '#summary',
                },
              ]}
              selectedKey={selectedTab}
              onClickTab={handleTabChange}
            />
          )}
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
        }}
        onClose={() => {
          setShowDialog(false);
        }}
      />
    </>
  );
};

CreateUsersPanel.defaultProps = defaultProps;

export default CreateUsersPanel;
