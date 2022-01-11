/* eslint-disable react-hooks/exhaustive-deps */
import React, { ReactElement, useEffect, useState } from 'react';
import { MessageBar, MessageBarType, Panel, PanelType } from '@fluentui/react';

import { Tabs } from 'src/components/tabs/Tabs';
import { Text } from 'src/components/typography';
import { PanelBody } from 'src/layouts/Panels/Panels.styles';

import { useCreateUsersPanel } from './CreateUsersPanel.service';
import { SectionAccount } from './SectionAccount';
import SectionAccessManagement from './SectionAccessManagement';
import SectionAuthentication from './SectionAuthentication';
import SectionSummary from './SectionSummary';
import { useNotification } from "src/hooks/useNotification";
import { GqOperationResponse } from "src/data/services/graphql";
import { DialogYesNo } from "src/containers/modals/DialogYesNo";

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
const enum Tab {
  Account = 0,
  Access = 1,
  Auth = 2,
  Summary = 3,
}

const CreateUsersPanel = ({
  orgSid,
  isOpen,
  onDismiss,
  onCreateUser
}: CreateUsersPanelProps): ReactElement => {
  const createUserService = useCreateUsersPanel(orgSid);

  const [step, setStep] = useState(Tab.Account);
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
      const responseCode = responseCreate?.createUser?.response

      if (responseCode === GqOperationResponse.Fail) {
        const errorMsg = responseCreate?.createUser?.errMsg ?? responseCreate?.createUser?.response ?? 'Error Creating User';
        setErrorMsg(errorMsg);
      } else {
        setErrorMsg(undefined);
      }

      if (responseCode === GqOperationResponse.Success) {
        Toast.success({text: 'User Account Successfully Created'});
      }
      if (responseCode === GqOperationResponse.PartialSuccess) {
        const errorMsg = responseCreate?.createUser?.errMsg ?? responseCreate?.createUser?.response ?? 'Error Creating User';
        Toast.warning({text: errorMsg });
      }

      if (responseCode === GqOperationResponse.Success || responseCode === GqOperationResponse.PartialSuccess) {
        onCreateUser(responseCreate.createUser);
        doClosePanel();
      }
    }
  };

  const handleNext = (): null => {
    setStep(step + 1);
    return null;
  };

  const handlePrev = (): null => {
    setStep(step - 1);
    return null;
  };

  const handleTabChange = (hash): void => {
    setStep(tabs.indexOf(hash));
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
  }

  const doClosePanel = () => {
    setErrorMsg(undefined);
    // Reset the form
    createUserService.resetForm();
    // Set it back to the first tab
    setStep(Tab.Account);
    setShowDialog(false);
    setUnsavedChanges(false);
    onDismiss();
  }

  return (
    <>
      <Panel
        closeButtonAriaLabel="Close"
        type={PanelType.medium}
        headerText="New User"
        isOpen={isOpen}
        onDismiss={onPanelClose}
      >
        <PanelBody>
          {errorMsg && (
            <MessageBar id="__CreateUser_Error"
                        messageBarType={MessageBarType.error}
                        isMultiline={true}
                        onDismiss={() => setErrorMsg(undefined)}>{errorMsg}</MessageBar>
          )}
          {userAccountLoading && <Text>Loading...</Text>}
          {!userAccountLoading && (
            <>
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
                selectedKey={step < 0 ? '0' : step.toString()}
                onClickTab={handleTabChange}
              />
            </>
          )}
        </PanelBody>
      </Panel>
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

CreateUsersPanel.defaultProps = defaultProps;

export default CreateUsersPanel;
