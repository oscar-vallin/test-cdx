/* eslint-disable react-hooks/exhaustive-deps */
import { ReactElement, useEffect, useState } from 'react';
import { Link, Panel, PanelType } from '@fluentui/react';

import { Tabs } from 'src/components/tabs/Tabs';
import { PanelBody } from 'src/layouts/Panels/Panels.styles';

import { UseUpdateUserPanel } from 'src/pages/Admin/Users/UpdateUsers/useUpdateUserPanel';
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
  const [unsavedChanges, setUnsavedChanges] = useState(false);
  const Toast = useNotification();

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
        Toast.error({text: errorMsg});
      }

      if (responseCode === GqOperationResponse.Success || responseCode === GqOperationResponse.PartialSuccess) {
        onUpdateUser(responseCreate.updateUser);
        Toast.info({text: 'User Profile Saved'});
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
    if (useUpdateUserPanel.responseCreateUser?.updateUser?.response === GqOperationResponse.Success) {
      setUnsavedChanges(false);
    }
  }, [useUpdateUserPanel.responseCreateUser]);

  const onPanelClose = () => {
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

  return (
    <Panel
      closeButtonAriaLabel="Close"
      type={PanelType.medium}
      headerText={userName()}
      isOpen={useUpdateUserPanel.isPanelOpen}
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
                  form={useUpdateUserPanel.userAccountForm}
                  onSave={handleUpdateUser}
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
