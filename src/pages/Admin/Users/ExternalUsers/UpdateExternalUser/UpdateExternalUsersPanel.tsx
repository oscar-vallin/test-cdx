/* eslint-disable react-hooks/exhaustive-deps */
import React, { ReactElement, useEffect, useState } from 'react';
import { MessageBar, MessageBarType, Panel, PanelType, Stack, ITag } from '@fluentui/react';

import { Tabs } from 'src/components/tabs/Tabs';
import { PanelBody, PanelHeader, PanelTitle } from 'src/layouts/Panels/Panels.styles';

import { useNotification } from 'src/hooks/useNotification';
import { Maybe, UserAccount, UserAccountForm, GqOperationResponse } from 'src/data/services/graphql';
import { DialogYesNo } from 'src/containers/modals/DialogYesNo';
import { Column } from 'src/components/layouts';
import { UseUpdateExternalUserPanel,  } from './UpdateExternalUsersService.service';
import SectionAccessManagement from './SectionAccessManagement';
import SectionSummary from './SectionSummary';

const defaultProps = {
  isOpen: false,
  onDismiss: () => null,
  onGrantAccessToExternalUser: () => null,
};

type UpdateExternalUsersPanelProps = {
  isOpen?: boolean;
  onDismiss?: any | null;
  onUpdateUser?: (form?: UserAccountForm) => void;
  useUpdateExternalUsers: UseUpdateExternalUserPanel
} & typeof defaultProps;

const tabs = ['#account', '#access'];

const enum Tab {
    Account = 0,
    Access = 1,
  }

const UpdateExternalUsersPanel = ({ isOpen, onDismiss, useUpdateExternalUsers, onUpdateUser }: UpdateExternalUsersPanelProps): ReactElement => {

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
  
    // Set it back to the first tab
    setStep(Tab.Account);
    setShowDialog(false);
    setUnsavedChanges(false);
 
    useUpdateExternalUsers.resetForm();
    useUpdateExternalUsers.closePanel();
    onDismiss();
  }; 

  const userName = () => {
    const { person } = useUpdateExternalUsers.userAccountForm;
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
          <PanelTitle id="__CreateUser_Panel_Title" variant="bold" size="large">
            {userName()}
          </PanelTitle>
        </Stack>
      </Column>
    </PanelHeader>
  );

  const handleSubmit = () =>{
    return
  }

  return (
    <>
      <Panel
        closeButtonAriaLabel="Close"
        type={PanelType.medium}
        headerText="New User"
        onRenderHeader={renderPanelHeader}
        isOpen={useUpdateExternalUsers.isPanelOpen}
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
            <>
              <Tabs
                items={[
                {
                    title: 'Summary',
                    content: (
                        <SectionSummary
                            form={useUpdateExternalUsers.userAccountForm}                           
                            onSubmit={handleSubmit}
                            isProcessing={isProcessing}
                        />
                    ),
                    hash: '#summary',
                    },
                  {
                    title: 'Access Management',
                    content: (
                      <SectionAccessManagement
                        form={useUpdateExternalUsers.userAccountForm}
                        onSubmit={handleSubmit}
                        saveOptions={(sids) => {
                          setUnsavedChanges(true);
                        }}
                      />
                    ),
                    hash: '#access',
                  }
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

UpdateExternalUsersPanel.defaultProps = defaultProps;

export default UpdateExternalUsersPanel;
