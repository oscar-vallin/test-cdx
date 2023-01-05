/* eslint-disable react-hooks/exhaustive-deps */
import React, { ReactElement, useState } from 'react';
import { useHistory } from 'react-router-dom';
import {
  MessageBar,
  MessageBarType,
  PanelType,
  Stack,
  ICommandBarItemProps,
  IButtonProps,
  CommandBar,
} from '@fluentui/react';

import { Tabs } from 'src/components/tabs/Tabs';
import {
  PanelBody, PanelHeader, PanelTitle, ThemedPanel,
} from 'src/layouts/Panels/Panels.styles';

import { UseUpdateUserPanel } from 'src/pages/Admin/Users/UpdateUsers/useUpdateUserPanel';
import { GqOperationResponse, UserAccount } from 'src/data/services/graphql';
import { Column } from 'src/components/layouts';
import { DialogYesNo, DialogYesNoProps } from 'src/containers/modals/DialogYesNo';
import { useOrgSid } from 'src/hooks/useOrgSid';
import { MigrateUserDialog } from 'src/pages/Admin/Users/UpdateUsers/MigrateUserDialog';
import { useWizardTabs } from 'src/pages/Admin/Users/useWizardTabs';
import SectionAccessManagement from './SectionAccessManagement';
import SectionAuthentication from './SectionAuthentication';
import { SectionAccount } from './SectionAccount';
import { ActiveIcon, EllipsisTitle, InactiveIcon } from './UpdateUserPanel.styles';

type UpdateUserPanelProps = {
  useUpdateUserPanel: UseUpdateUserPanel;
  onDismiss?: () => void;
  onUpdateUser?: () => void;
};

const tabs = ['#account', '#access', '#auth'];

const defaultDialogProps: DialogYesNoProps = {
  id: '__UpdateUser_Dialog',
  open: false,
  title: 'Are you sure?',
  message: '',
  labelYes: 'Yes',
  labelNo: 'No',
  highlightNo: true,
  highlightYes: false,
};

const UpdateUserPanel = ({ useUpdateUserPanel, onDismiss, onUpdateUser }: UpdateUserPanelProps): ReactElement => {
  const history = useHistory();
  const { orgSid } = useOrgSid();
  const { selectedTab, handleTabChange, resetTabs } = useWizardTabs(tabs);
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

  const overflowItems = (): ICommandBarItemProps[] => {
    const _overflowItems: ICommandBarItemProps[] = [];

    if (useUpdateUserPanel.auditActivityCmd) {
      _overflowItems.push({
        key: 'audit',
        text: useUpdateUserPanel.auditActivityCmd?.label ?? 'Audit Activity',
        onClick: handleUserAuditLogsClick,
        iconProps: { iconName: 'ComplianceAudit' },
        className: 'audit-button',
      });
    }

    if (useUpdateUserPanel.changeHistoryCmd) {
      _overflowItems.push({
        key: 'history',
        text: useUpdateUserPanel.changeHistoryCmd?.label ?? 'Change History',
        onClick: handleUserChangeHistoryLogsClick,
        iconProps: { iconName: 'FullHistory' },
        className: 'history-button',
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
        className: 'migrate-button',
      });
    }

    if (_overflowItems.length === 0) {
      _overflowItems.push({ key: '' });
    }
    return _overflowItems;
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
        if (onUpdateUser) {
          onUpdateUser();
        }
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
        const errorMsg = response?.updateUserAccessPolicyGroups?.errMsg
          ?? response?.updateUserAccessPolicyGroups?.response
          ?? 'Error Updating Assigned Access Policy Groups';
        setMessageType(MessageBarType.error);
        setMessage(errorMsg);
      }

      if (responseCode === GqOperationResponse.Success || responseCode === GqOperationResponse.PartialSuccess) {
        if (onUpdateUser) {
          onUpdateUser();
        }
        setMessageType(MessageBarType.success);
        setMessage('User Profile Saved');
        setUnsavedChanges(false);
      }
    }
  };

  const handleupdateUserAuth = async (identityProvider: string) => {
    const { sid } = form;
    const responseAuth = await useUpdateUserPanel.callUpdateUserAuth(sid ?? '', identityProvider);
    if (responseAuth?.updateUserAuthentication) {
      const responseCode = responseAuth.updateUserAuthentication?.response;
      if (responseCode === GqOperationResponse.Fail || responseCode === GqOperationResponse.PartialSuccess) {
        const errorMsg = responseAuth?.updateUserAuthentication?.errMsg
          ?? responseAuth?.updateUserAuthentication?.response
          ?? 'Error Updating Authenticate User';
        setMessageType(MessageBarType.error);
        setMessage(errorMsg);
      }

      if (responseCode === GqOperationResponse.Success || responseCode === GqOperationResponse.PartialSuccess) {
        if (onUpdateUser) {
          onUpdateUser();
        }
        setMessageType(MessageBarType.success);
        setMessage('User Profile Saved');
        setUnsavedChanges(false);
      }
    }
  }

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
        if (onUpdateUser) {
          onUpdateUser();
        }
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
        if (onUpdateUser) {
          onUpdateUser();
        }
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
    resetTabs();
    // Reset the form
    useUpdateUserPanel.resetForm();
    useUpdateUserPanel.closePanel();
    if (onDismiss) {
      onDismiss();
    }
  };

  const showUnsavedChangesDialog = () => {
    const updatedDialog = { ...defaultDialogProps };
    updatedDialog.title = 'You have unsaved changes';
    updatedDialog.message = "You are about to lose changes made to this user's profile. Are you sure you want to undo these changes?";
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
    updatedDialog.message = "You are about to send a password reset link to this user's email? Are you sure you want to continue?";
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
    updatedDialog.message = 'You are about to deactivate this user which will prevent this user from logging in. Are you sure you want to continue?';
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
    updatedDialog.message = 'You are about to activate this user which will allow this user to log in. Are you sure you want to continue?';
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

  const commandItems = (): ICommandBarItemProps[] => {
    const items: ICommandBarItemProps[] = [];

    if (useUpdateUserPanel.resetPasswordCmd) {
      items.push({
        key: 'reset',
        text: useUpdateUserPanel.resetPasswordCmd?.label ?? 'Reset',
        onClick: showResetPasswordDialog,
        iconProps: { iconName: 'Permissions' },
        className: 'reset-button',
      });
    }

    if (useUpdateUserPanel.deactivateUserCmd) {
      items.push({
        key: 'deactivate',
        text: useUpdateUserPanel.deactivateUserCmd?.label ?? 'Deactivate',
        onClick: showDeactivateUserDialog,
        iconProps: { iconName: 'UserRemove' },
        className: 'deactivate-button',
      });
    }

    if (useUpdateUserPanel.activateUserCmd) {
      items.push({
        key: 'activate',
        text: useUpdateUserPanel.activateUserCmd?.label ?? 'Activate',
        onClick: showActivateUserDialog,
        iconProps: { iconName: 'UserFollowed' },
        className: 'activate-button',
      });
    }

    return items;
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
    if (onUpdateUser) {
      onUpdateUser();
    }
    doClosePanel();
  };

  const renderPanelHeader = () => (
    <PanelHeader>
      <Column lg="6">
        <Stack horizontal styles={{ root: { height: 44 } }}>
          <PanelTitle id="__UserUpdate_Panel_Title" variant="bold" size="large">
            <EllipsisTitle>{userName()}</EllipsisTitle>
            {useUpdateUserPanel.userAccountForm.active?.value ? (
              <ActiveIcon iconName="CompletedSolid" title="Active" />
            ) : (
              <InactiveIcon iconName="StatusErrorFull" title="Inactive" />
            )}
          </PanelTitle>
        </Stack>
      </Column>
      <Column lg="6" right>
        <CommandBar
          items={commandItems()}
          overflowItems={overflowItems()}
          overflowButtonProps={overflowProps}
          ariaLabel="User actions"
          onReduceData={() => undefined}
        />
      </Column>
    </PanelHeader>
  );

  return (
    <>
      <ThemedPanel
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
              {
                title: 'Authentication',
                content: (
                  <SectionAuthentication
                    form={useUpdateUserPanel.userAccountForm}
                    onSave={handleupdateUserAuth}
                  />
                ),
                hash: '#auth',
              },
            ]}
            selectedKey={selectedTab}
            onClickTab={handleTabChange}
          />
        </PanelBody>
      </ThemedPanel>
      <DialogYesNo {...dialogProps} open={showDialog} />
      {showMigrateUserDialog && (
        <MigrateUserDialog
          useUpdateUserPanel={useUpdateUserPanel}
          userName={userName()}
          onMigrateUser={onMigrateUser}
          onCancel={() => setShowMigrateUserDialog(false)}
        />
      )}
    </>
  );
};

export default UpdateUserPanel;
