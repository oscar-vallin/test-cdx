/* eslint-disable react-hooks/exhaustive-deps */
import React, { ReactElement, useEffect, useState } from 'react';
import { MessageBar, MessageBarType, Panel, PanelType, Stack } from '@fluentui/react';

import { Tabs } from 'src/components/tabs/Tabs';
import { PanelBody, PanelHeader } from 'src/layouts/Panels/Panels.styles';

import { UseUpdateUserPanel } from 'src/pages/Admin/Users/UpdateUsers/useUpdateUserPanel';
import { SectionAccount } from './SectionAccount';
import SectionAccessManagement from './SectionAccessManagement';
import { GqOperationResponse, UserAccount, UserAccountForm } from "src/data/services/graphql";
import { Column, Row } from "src/components/layouts";
import { CommandButton } from 'office-ui-fabric-react';
import { DialogYesNo } from "src/containers/modals/DialogYesNo";

const defaultProps = {
  isOpen: false,
  onDismiss: () => {
  },
  onUpdateUser: () => {
  },
};

type UpdateUserPanelProps = {
  useUpdateUserPanel: UseUpdateUserPanel
  onDismiss?: () => void;
  onUpdateUser?: (form?: UserAccountForm) => void;
} & typeof defaultProps;

const tabs = ['#account', '#access'];

const enum Tab {
  Account = 0,
  Access = 1
}

const UpdateUserPanel = ({ useUpdateUserPanel,
                           onDismiss,
                           onUpdateUser
                         }: UpdateUserPanelProps): ReactElement => {

  const [step, setStep] = useState(Tab.Account);
  const [showDialog, setShowDialog] = useState(false);
  const [unsavedChanges, setUnsavedChanges] = useState(false);
  const [messageType, setMessageType] = useState<MessageBarType>(MessageBarType.info);
  const [message, setMessage] = useState<string | undefined>();

  const handleTabChange = (hash): void => {
    setStep(tabs.indexOf(hash));
  };

  const handleUpdateUser = async (userAccount: UserAccount) => {
     const responseCreate = await useUpdateUserPanel.callUpdateUser(userAccount);
    //
    if (responseCreate?.updateUser) {
      const responseCode = responseCreate?.updateUser?.response;

      if (responseCode === GqOperationResponse.Fail || responseCode === GqOperationResponse.PartialSuccess) {
        const errorMsg = responseCreate?.updateUser?.errMsg ?? responseCreate?.updateUser?.response ?? 'Error Updating User';
        setMessageType(MessageBarType.error);
        setMessage(errorMsg);
      }

      if (responseCode === GqOperationResponse.Success || responseCode === GqOperationResponse.PartialSuccess) {
        onUpdateUser(responseCreate.updateUser);
        setMessageType(MessageBarType.success);
        setMessage('User Profile Saved');
      }
    }
  };

  const handleAssignGroups = async (sids: string[]) => {
    const response = await useUpdateUserPanel.callAssignGroups(sids);
    if (response?.updateUserAccessPolicyGroups) {
      const responseCode = response.updateUserAccessPolicyGroups?.response;
      if (responseCode === GqOperationResponse.Fail || responseCode === GqOperationResponse.PartialSuccess) {
        const errorMsg = response?.updateUserAccessPolicyGroups?.errMsg ??
          response?.updateUserAccessPolicyGroups?.response ??
          'Error Updating Assigned Access Policy Groups';
        setMessageType(MessageBarType.error);
        setMessage(errorMsg);
      }

      if (responseCode === GqOperationResponse.Success || responseCode === GqOperationResponse.PartialSuccess) {
        onUpdateUser(response.updateUserAccessPolicyGroups);
        setMessageType(MessageBarType.success);
        setMessage('User Profile Saved');
      }
    }
  };

  const onFormChange = () => {
    setUnsavedChanges(true);
  }

  // const handleResetPassword = async () => {
  //   const responseReset = await userAccountService.handleResetPassword(userAccountSid);
  //   //
  //   if (responseReset?.resetPassword) {
  //     if (responseReset?.resetPassword === 'SUCCESS') {
  //       //onUpdateUser(responseReset.resetPassword);
  //       if (onDismiss) {
  //         onDismiss();
  //       }
  //     }
  //   }
  // };

  useEffect(() => {
    if (useUpdateUserPanel.responseCreateUser?.updateUser?.response === GqOperationResponse.Success) {
      setUnsavedChanges(false);
    }
  }, [useUpdateUserPanel.responseCreateUser]);

  const onPanelClose = () => {
    if (unsavedChanges) {
      setShowDialog(true);
    } else {
      doClosePanel();
    }
  }

  const doClosePanel = () => {
    setUnsavedChanges(false);
    setMessage(undefined);
    // Set it back to the first tab
    setStep(Tab.Account);
    // Reset the form
    useUpdateUserPanel.resetForm();
    useUpdateUserPanel.closePanel();
    onDismiss();
  }

  const userName = () => {
    const person = useUpdateUserPanel.userAccountForm.person;
    const firstNm = person?.firstNm?.value;
    const lastNm = person?.lastNm?.value;
    if (!firstNm && !lastNm) {
      return '<Unnamed User>';
    }
    return `${firstNm ?? ''} ${lastNm ?? ''}`;
  };

  const renderPanelHeader = () => (
      <Row>
        <Column lg="6">
          <Stack horizontal styles={ {root: {height: 44} }}>
            <PanelHeader id="__UserUpdate_Panel_Title" variant="bold">{userName()}</PanelHeader>
          </Stack>
        </Column>
        <Column lg="6">
            <CommandButton id="__ResetPassword_Button"
                           iconProps={{iconName: 'Permissions'}}
                           text="Reset Password"/>
        </Column>
      </Row>
  );

  return (
    <>
      <Panel
        closeButtonAriaLabel="Close"
        headerText={userName()}
        type={PanelType.medium}
        onRenderHeader={renderPanelHeader}
        isOpen={useUpdateUserPanel.isPanelOpen}
        onDismiss={onPanelClose}
      >
        <PanelBody>
          {message && (
            <MessageBar id="__UpdateUser_Msg"
                        messageBarType={messageType}
                        isMultiline={true}
                        onDismiss={() => setMessage(undefined)}>{message}</MessageBar>
          )}
          <Tabs
            items={[
              {
                title: 'Account',
                content: (
                  <SectionAccount
                    form={useUpdateUserPanel.userAccountForm}
                    onSave={handleUpdateUser}
                    onFormChange={onFormChange}
                  />
                ),
                hash: '#account',
              },
              {
                title: 'Access Management',
                content: (
                  <SectionAccessManagement
                    form={useUpdateUserPanel.userAccountForm}
                    onSave={handleAssignGroups}
                    onFormChange={onFormChange}
                  />
                ),
                hash: '#access',
              }
            ]}
            selectedKey={step < 0 ? '0' : step.toString()}
            onClickTab={handleTabChange}
          />
        </PanelBody>
      </Panel>
      <DialogYesNo
        open={showDialog}
        highlightNo
        title="You have unsaved changes"
        message="You are about to lose changes made to this user's profile. Are you sure you want to undo these changes?"
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

UpdateUserPanel.defaultProps = defaultProps;

export default UpdateUserPanel;
