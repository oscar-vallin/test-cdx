/* eslint-disable react-hooks/exhaustive-deps */
import { ReactElement, useEffect, useState } from 'react';
import { Link, Panel, PanelType } from '@fluentui/react';

import { Tabs } from 'src/components/tabs/Tabs';
import { PanelBody } from 'src/layouts/Panels/Panels.styles';

import { useUpdateUsersPanel } from './UpdateUsersPanel.service';
import { SectionAccount } from './SectionAccount';
import SectionAccessManagement from './SectionAccessManagement';
import { useNotification } from "src/hooks/useNotification";
import { GqOperationResponse, UserAccountForm, UserAccount } from "src/data/services/graphql";

const defaultProps = {
  isOpen: false,
  onDismiss: () => {
  },
  onUpdateUser: (form?: UserAccountForm) => {
  },
};

type UpdateUserPanelProps = {
  userAccountSid: string;
  orgSid: string;
  isOpen?: boolean;
  onDismiss?: () => void;
  onUpdateUser?: (form?: UserAccountForm) => void;
} & typeof defaultProps;

const tabs = ['#account', '#access'];

const enum Tab {
  Account = 0,
  Access = 1
}

const UpdateUserPanel = ({ userAccountSid,
                           isOpen,
                           onDismiss,
                           onUpdateUser
                         }: UpdateUserPanelProps): ReactElement => {
  const userAccountService = useUpdateUsersPanel(userAccountSid);

  const [step, setStep] = useState(Tab.Account);
  const [unsavedChanges, setUnsavedChanges] = useState(false);
  const Toast = useNotification();

  const handleTabChange = (hash): void => {
    setStep(tabs.indexOf(hash));
  };

  const handleUpdateUser = async (userAccount: UserAccount) => {
    userAccountService.updateAccountInfo(userAccount);
    const responseCreate = await userAccountService.callUpdateUser();
    //
    if (responseCreate?.updateUser) {
      const responseCode = responseCreate?.updateUser?.response;

      if (responseCode === GqOperationResponse.Fail || responseCode === GqOperationResponse.PartialSuccess) {
        const errorMsg = responseCreate?.updateUser?.errMsg ?? responseCreate?.updateUser?.response ?? 'Error Updating User';
        Toast.error({text: errorMsg});
      }

      if (responseCode === GqOperationResponse.Success || responseCode === GqOperationResponse.PartialSuccess) {
        onUpdateUser(responseCreate.updateUser);
        Toast.info({text: 'User Profile Saved'});
      }
    }
  };

  const handleAssignGroups = async (sids: string[]) => {
    userAccountService.updateAccessPolicyGroups(sids);
    const response = await userAccountService.callAssignGroups();
    if (response?.updateUserAccessPolicyGroups) {
      const responseCode = response.updateUserAccessPolicyGroups?.response;
      if (responseCode === GqOperationResponse.Fail || responseCode === GqOperationResponse.PartialSuccess) {
        const errorMsg = response?.updateUserAccessPolicyGroups?.errMsg ??
          response?.updateUserAccessPolicyGroups?.response ??
          'Error Updating Assigned Access Policy Groups';
        Toast.error({text: errorMsg});
      }

      if (responseCode === GqOperationResponse.Success || responseCode === GqOperationResponse.PartialSuccess) {
        onUpdateUser(response.updateUserAccessPolicyGroups);
        Toast.info({text: 'User Profile Saved'});
      }
    }
  };

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
    if (userAccountService.responseCreateUser?.updateUser?.response === GqOperationResponse.Success) {
      setUnsavedChanges(false);
    }
  }, [userAccountService.responseCreateUser]);

  const onPanelClose = () => {
    // Reset the form
    userAccountService.resetForm();
    onDismiss();
  }

  const userName = () => {
    const person = userAccountService.userAccountForm.person;
    const firstNm = person?.firstNm?.value;
    const lastNm = person?.lastNm?.value;
    if (!firstNm && !lastNm) {
      return '<Unnamed User>';
    }
    return `${firstNm ?? ''} ${lastNm ?? ''}`;
  };

  return (
    <Panel
      closeButtonAriaLabel="Close"
      type={PanelType.medium}
      headerText={userName()}
      isOpen={isOpen}
      onDismiss={onPanelClose}
    >
      <PanelBody>
        <Link
          id="__CreateUsersPanel__ResetPassword_Field"
          onClick={() => {
            //handleResetPassword();
          }}
        >
          Reset Password
        </Link>
        <Tabs
          items={[
            {
              title: 'Account',
              content: (
                <SectionAccount
                  form={userAccountService.userAccountForm}
                  onSave={handleUpdateUser}
                />
              ),
              hash: '#account',
            },
            {
              title: 'Access Management',
              content: (
                <SectionAccessManagement
                  form={userAccountService.userAccountForm}
                  onSave={handleAssignGroups}
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
  );
};

UpdateUserPanel.defaultProps = defaultProps;

export default UpdateUserPanel;
