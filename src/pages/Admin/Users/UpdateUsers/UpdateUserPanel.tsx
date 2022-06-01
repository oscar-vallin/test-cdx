/*eslint-disable react-hooks/exhaustive-deps */
import React, { ReactElement, useState } from 'react';
import { useHistory } from 'react-router-dom';
import {
  MessageBar,
  MessageBarType,
  Panel,
  PanelType,
  Stack,
  CommandButton,
  CommandBar,
  ICommandBarItemProps,
  IButtonProps,
} from '@fluentui/react';

import { Tabs } from 'src/components/tabs/Tabs';
import { PanelBody, PanelHeader, PanelTitle } from 'src/layouts/Panels/Panels.styles';

import { UseUpdateUserPanel } from 'src/pages/Admin/Users/UpdateUsers/useUpdateUserPanel';
import { GqOperationResponse, UserAccount } from 'src/data/services/graphql';
import { Column } from 'src/components/layouts';
import { DialogYesNo, DialogYesNoProps } from 'src/containers/modals/DialogYesNo';
import SectionAccessManagement from './SectionAccessManagement';
import { SectionAccount } from './SectionAccount';
import { ActiveIcon, InactiveIcon } from './UpdateUserPanel.styles';
import { useOrgSid } from 'src/hooks/useOrgSid';
import { MigrateUserDialog } from 'src/pages/Admin/Users/UpdateUsers/MigrateUserDialog';

const defaultProps = {
  onDismiss: () => {},
  onUpdateUser: () => {},
};

type UpdateUserPanelProps = {
  useUpdateUserPanel: UseUpdateUserPanel;
  onDismiss?: () => void;
  onUpdateUser?: () => void;
} & typeof defaultProps;

const tabs = ['#account', '#access'];

const enum Tab {
  Account = 0,
  Access = 1,
}

const defaultDialogProps: DialogYesNoProps = {
  open: false,
  title: 'Are you sure?',
  message: '',
  messageYes: 'Yes',
  messageNo: 'No',
  onYesNo: () => null,
  onYes: () => {},
  onNo: () => {},
  closeOnNo: true,
  closeOnYes: true,
  highlightNo: true,
  highlightYes: false,
  onClose: () => null,
};

const UpdateUserPanel = ({ useUpdateUserPanel, onDismiss, onUpdateUser }: UpdateUserPanelProps): ReactElement => {
  const history = useHistory();
  const { orgSid } = useOrgSid();
  const [step, setStep] = useState(Tab.Account);
  const [showDialog, setShowDialog] = useState(false);
  const [showMigrateUserDialog, setShowMigrateUserDialog] = useState(false);
  const [dialogProps, setDialogProps] = useState<DialogYesNoProps>(defaultDialogProps);
  const [unsavedChanges, setUnsavedChanges] = useState(false);
  const [messageType, setMessageType] = useState<MessageBarType>(MessageBarType.info);
  const [message, setMessage] = useState<string | undefined>();

  const overflowProps: IButtonProps = { ariaLabel: 'More commands' };

  const form = useUpdateUserPanel.userAccountForm;

  const handleUserAuditLogsClick = () => {
    if (useUpdateUserPanel.auditActivityCmd) {
      history.push(`/user-audit-logs?orgSid=${orgSid}&changedByUserSid=${form.person?.sid}`);
    }
  };
  const handleUserChangeHistoryLogsClick = () => {
    if (useUpdateUserPanel.changeHistoryCmd) {
      history.push(`/user-audit-logs?orgSid=${orgSid}&userSid=${form.person?.sid}`);
    }
  };

  const overflowItems = (): ICommandBarItemProps[] | undefined => {
    const _overflowItems: ICommandBarItemProps[] = [];

    if (useUpdateUserPanel.auditActivityCmd) {
      _overflowItems.push({
        key: 'audit',
        text: useUpdateUserPanel.auditActivityCmd?.label ?? '',
        onClick: handleUserAuditLogsClick,
        iconProps: { iconName: 'ComplianceAudit' },
      });
    }

    if (useUpdateUserPanel.changeHistoryCmd) {
      _overflowItems.push({
        key: 'history',
        text: useUpdateUserPanel.changeHistoryCmd?.label ?? '',
        onClick: handleUserChangeHistoryLogsClick,
        iconProps: { iconName: 'FullHistory' },
      });
    }

    if (useUpdateUserPanel.migrateUserCmd) {
      _overflowItems.push({
        key: 'migrate',
        text: useUpdateUserPanel.migrateUserCmd?.label ?? 'Migrate',
        onClick: () => {
          setShowMigrateUserDialog(true);
        },
        iconProps: { iconName: 'FollowUser' },
      })
    }

    if (_overflowItems.length === 0) {
      _overflowItems.push({ key: '' });
    }
    return _overflowItems;
  };

  const handleTabChange = (hash): void => {
    setStep(tabs.indexOf(hash));
  };

  const handleUpdateUser = async (userAccount: UserAccount) => {
    const responseCreate = await useUpdateUserPanel.callUpdateUser(userAccount);
    //
    if (responseCreate?.updateUser) {
      const responseCode = responseCreate?.updateUser?.response;

      if (responseCode === GqOperationResponse.Fail || responseCode === GqOperationResponse.PartialSuccess) {
        const errorMsg =
          responseCreate?.updateUser?.errMsg ?? responseCreate?.updateUser?.response ?? 'Error Updating User';
        setMessageType(MessageBarType.error);
        setMessage(errorMsg);
      }

      if (responseCode === GqOperationResponse.Success || responseCode === GqOperationResponse.PartialSuccess) {
        onUpdateUser();
        setMessageType(MessageBarType.success);
        setMessage('User Profile Saved');
        setUnsavedChanges(false);
      }
    }
  };

  const handleAssignGroups = async (sids: string[]) => {
    const response = await useUpdateUserPanel.callAssignGroups(sids);
    if (response?.updateUserAccessPolicyGroups) {
      const responseCode = response.updateUserAccessPolicyGroups?.response;
      if (responseCode === GqOperationResponse.Fail || responseCode === GqOperationResponse.PartialSuccess) {
        const errorMsg =
          response?.updateUserAccessPolicyGroups?.errMsg ??
          response?.updateUserAccessPolicyGroups?.response ??
          'Error Updating Assigned Access Policy Groups';
        setMessageType(MessageBarType.error);
        setMessage(errorMsg);
      }

      if (responseCode === GqOperationResponse.Success || responseCode === GqOperationResponse.PartialSuccess) {
        onUpdateUser();
        setMessageType(MessageBarType.success);
        setMessage('User Profile Saved');
        setUnsavedChanges(false);
      }
    }
  };

  const onFormChange = () => {
    setUnsavedChanges(true);
  };

  const handleResetPassword = async () => {
    const responseReset = await useUpdateUserPanel.callResetPassword();
    if (responseReset?.resetPassword) {
      if (responseReset?.resetPassword === GqOperationResponse.Success) {
        setMessageType(MessageBarType.success);
        setMessage('Password Reset link has been sent');
      } else {
        setMessageType(MessageBarType.error);
        setMessage("An error occurred resetting this user's password.  Please contact your administrator.");
      }
    }
  };

  const handleDeactivateUser = async () => {
    const responseReset = await useUpdateUserPanel.callDeactivateUser();
    if (responseReset?.deactivateUser) {
      if (responseReset?.deactivateUser === GqOperationResponse.Success) {
        onUpdateUser();
        setMessageType(MessageBarType.success);
        setMessage('User has been deactivated');
      } else {
        setMessageType(MessageBarType.error);
        setMessage('An error occurred deactivating this user.  Please contact your administrator.');
      }
    }
  };

  const handleActivateUser = async () => {
    const responseReset = await useUpdateUserPanel.callActivateUser();
    if (responseReset?.activateUser) {
      if (responseReset?.activateUser === GqOperationResponse.Success) {
        onUpdateUser();
        setMessageType(MessageBarType.success);
        setMessage('User has been activated');
      } else {
        setMessageType(MessageBarType.error);
        setMessage('An error occurred activating this user.  Please contact your administrator.');
      }
    }
  };

  const hideDialog = () => {
    setShowDialog(false);
  };

  const doClosePanel = () => {
    setUnsavedChanges(false);
    setMessage(undefined);
    // Set it back to the first tab
    setStep(Tab.Account);
    // Reset the form
    useUpdateUserPanel.resetForm();
    useUpdateUserPanel.closePanel();
    onDismiss();
  };

  const showUnsavedChangesDialog = () => {
    const updatedDialog = { ...defaultDialogProps };
    updatedDialog.title = 'You have unsaved changes';
    updatedDialog.message =
      "You are about to lose changes made to this user's profile. Are you sure you want to undo these changes?";
    updatedDialog.onYes = () => {
      hideDialog();
      doClosePanel();
    };
    updatedDialog.onClose = () => {
      hideDialog();
    };
    setDialogProps(updatedDialog);
    setShowDialog(true);
  };

  const showResetPasswordDialog = () => {
    const updatedDialog = { ...defaultDialogProps };
    updatedDialog.title = "Reset this user's password?";
    updatedDialog.message =
      "You are about to send a password reset link to this user's email? Are you sure you want to continue?";
    updatedDialog.onYes = () => {
      handleResetPassword().then();
      hideDialog();
    };
    updatedDialog.onClose = () => {
      hideDialog();
    };
    setDialogProps(updatedDialog);
    setShowDialog(true);
  };

  const showDeactivateUserDialog = () => {
    const updatedDialog = { ...defaultDialogProps };
    updatedDialog.title = 'Deactivate User?';
    updatedDialog.message =
      'You are about to deactivate this user which will prevent this user from logging in. Are you sure you want to continue?';
    updatedDialog.onYes = () => {
      handleDeactivateUser().then();
      hideDialog();
    };
    updatedDialog.onClose = () => {
      hideDialog();
    };
    setDialogProps(updatedDialog);
    setShowDialog(true);
  };

  const showActivateUserDialog = () => {
    const updatedDialog = { ...defaultDialogProps };
    updatedDialog.title = 'Activate User?';
    updatedDialog.message =
      'You are about to activate this user which will allow this user to log in. Are you sure you want to continue?';
    updatedDialog.onYes = () => {
      handleActivateUser().then();
      hideDialog();
    };
    updatedDialog.onClose = () => {
      hideDialog();
    };
    setDialogProps(updatedDialog);
    setShowDialog(true);
  };

  const onPanelClose = () => {
    if (unsavedChanges) {
      showUnsavedChangesDialog();
    } else {
      doClosePanel();
    }
  };

  const userName = () => {
    const { person } = useUpdateUserPanel.userAccountForm;
    const firstNm = person?.firstNm?.value;
    const lastNm = person?.lastNm?.value;
    if (!firstNm && !lastNm) {
      return '<Unnamed User>';
    }
    return `${firstNm ?? ''} ${lastNm ?? ''}`;
  };

  const onMigrateUser = () => {
    setShowMigrateUserDialog(false);
    onUpdateUser();
    doClosePanel();
  };

  const renderPanelHeader = () => (
    <PanelHeader>
      <Column lg="6">
        <Stack horizontal styles={{ root: { height: 44 } }}>
          <PanelTitle id="__UserUpdate_Panel_Title" variant="bold" size="large">
            {userName()}
            {useUpdateUserPanel.userAccountForm.active?.value ? (
              <ActiveIcon iconName="CompletedSolid" title="Active" />
            ) : (
              <InactiveIcon iconName="StatusErrorFull" title="Inactive" />
            )}
          </PanelTitle>
        </Stack>
      </Column>
      <Column lg="6" right>
        <Stack horizontal>
          {useUpdateUserPanel.resetPasswordCmd && (
            <CommandButton
              id="__ResetPassword_Button"
              iconProps={{ iconName: 'Permissions' }}
              text={useUpdateUserPanel.resetPasswordCmd.label ?? 'Reset'}
              onClick={showResetPasswordDialog}
            />
          )}
          {useUpdateUserPanel.deactivateUserCmd && (
            <CommandButton
              id="__DeactivateUser_Button"
              iconProps={{ iconName: 'UserRemove' }}
              text={useUpdateUserPanel.deactivateUserCmd.label ?? 'Deactivate'}
              onClick={showDeactivateUserDialog}
            />
          )}
          {useUpdateUserPanel.activateUserCmd && (
            <CommandButton
              id="__ActivateUser_Button"
              iconProps={{ iconName: 'UserFollowed' }}
              text={useUpdateUserPanel.activateUserCmd.label ?? 'Activate'}
              onClick={showActivateUserDialog}
            />
          )}
          <CommandBar
            items={[]}
            overflowItems={overflowItems()}
            overflowButtonProps={overflowProps}
            ariaLabel="Inbox actions"
            primaryGroupAriaLabel="Email actions"
            farItemsGroupAriaLabel="More actions"
          />
        </Stack>
      </Column>
    </PanelHeader>
  );

  return (
    <>
      <Panel
        closeButtonAriaLabel="Close"
        headerText={userName()}
        type={PanelType.medium}
        onRenderHeader={renderPanelHeader}
        isOpen={useUpdateUserPanel.isPanelOpen}
        isLightDismiss={false}
        onDismiss={() => {
          onPanelClose();
        }}
        onOuterClick={() => {}}
      >
        <PanelBody>
          {message && (
            <MessageBar
              id="__UpdateUser_Msg"
              messageBarType={messageType}
              isMultiline
              onDismiss={() => setMessage(undefined)}
            >
              {message}
            </MessageBar>
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
              },
            ]}
            selectedKey={step < 0 ? '0' : step.toString()}
            onClickTab={handleTabChange}
          />
        </PanelBody>
      </Panel>
      <DialogYesNo {...dialogProps} open={showDialog} />
      {showMigrateUserDialog && (
        <MigrateUserDialog useUpdateUserPanel={useUpdateUserPanel}
                           userName={userName()}
                           onMigrateUser={onMigrateUser}
                           onCancel={() => setShowMigrateUserDialog(false)}/>
      )}
    </>
  );
};

UpdateUserPanel.defaultProps = defaultProps;

export default UpdateUserPanel;
