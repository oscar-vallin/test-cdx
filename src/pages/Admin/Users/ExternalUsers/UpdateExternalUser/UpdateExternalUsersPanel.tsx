/* eslint-disable react-hooks/exhaustive-deps */
import React, { ReactElement, useState } from 'react';
import { MessageBar, MessageBarType, Panel, PanelType, Stack } from '@fluentui/react';

import { Tabs } from 'src/components/tabs/Tabs';
import { PanelBody, PanelHeader, PanelTitle } from 'src/layouts/Panels/Panels.styles';

import { useNotification } from 'src/hooks/useNotification';
import { GqOperationResponse, UserAccountForm } from 'src/data/services/graphql';
import { DialogYesNo } from 'src/containers/modals/DialogYesNo';
import { Column } from 'src/components/layouts';
import { useExternalUsersAccessService } from 'src/pages/Admin/Users/ExternalUsers/ExternalUsersAccess.service';
import SectionAccessManagement from './SectionAccessManagement';
import SectionSummary from './SectionSummary';

type UpdateExternalUsersPanelProps = {
  orgSid: string;
  userAccountSid?: string;
  isOpen?: boolean;
  onDismiss?: () => void;
  onUpdateUser?: (form?: UserAccountForm) => void;
};

const tabs = ['#account', '#access'];

const enum Tab {
  Account = 0,
  Access = 1,
}

const UpdateExternalUsersPanel = ({
  orgSid,
  userAccountSid,
  isOpen = false,
  onDismiss = () => {},
  onUpdateUser = () => {},
}: UpdateExternalUsersPanelProps): ReactElement => {
  const externalUsersAccessService = useExternalUsersAccessService(orgSid, userAccountSid);

  const [step, setStep] = useState(Tab.Account);
  const [showDialog, setShowDialog] = useState(false);
  const [unsavedChanges, setUnsavedChanges] = useState(false);
  const [isProcessing, setProcessing] = useState<boolean>(false);
  const [errorMsg, setErrorMsg] = useState<string | undefined>();

  const Toast = useNotification();

  const handleTabChange = (hash): void => {
    setStep(tabs.indexOf(hash));
  };

  const onPanelClose = () => {
    if (unsavedChanges) {
      setShowDialog(true);
    } else {
      doClosePanel();
    }
  };

  const doClosePanel = () => {
    setErrorMsg(undefined);

    externalUsersAccessService.resetForm();

    // Set it back to the first tab
    setStep(Tab.Account);
    setShowDialog(false);
    setUnsavedChanges(false);

    onDismiss();
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
      <Column lg="12">
        <Stack horizontal styles={{ root: { height: 44 } }}>
          <PanelTitle id="__UpdateExternalUser_Panel_Title" variant="bold" size="large">
            {userName()}
          </PanelTitle>
        </Stack>
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
        const errorMsg = response?.grantExternalUserAccess?.errMsg ?? 'Error Updating Access for External User';
        setErrorMsg(errorMsg);
      } else {
        setErrorMsg(undefined);
      }

      if (responseCode === GqOperationResponse.Success) {
        Toast.success({ text: 'External user access has been updated' });
      }
      if (responseCode === GqOperationResponse.PartialSuccess) {
        const errorMsg = response?.grantExternalUserAccess?.errMsg ?? 'Error Updating Access for External User';
        Toast.warning({ text: errorMsg });
      }

      if (responseCode === GqOperationResponse.Success || responseCode === GqOperationResponse.PartialSuccess) {
        onUpdateUser(response.grantExternalUserAccess);
        doClosePanel();
      }
    }
  };

  return (
    <>
      <Panel
        closeButtonAriaLabel="Close"
        type={PanelType.medium}
        headerText={userName()}
        onRenderHeader={renderPanelHeader}
        isOpen={isOpen}
        onDismiss={onPanelClose}
        onOuterClick={() => {}}
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
          <>
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
              selectedKey={step < 0 ? '0' : step.toString()}
              onClickTab={handleTabChange}
            />
          </>
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

export default UpdateExternalUsersPanel;
