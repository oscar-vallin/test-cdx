/* eslint-disable react-hooks/exhaustive-deps */
import React, { ReactElement, useEffect, useState } from 'react';
import { MessageBar, MessageBarType, Panel, PanelType, Stack, ITag } from '@fluentui/react';

import { Tabs } from 'src/components/tabs/Tabs';
import { PanelBody, PanelHeader, PanelTitle } from 'src/layouts/Panels/Panels.styles';

import { useNotification } from 'src/hooks/useNotification';
import { Maybe, UserAccount, GqOperationResponse } from 'src/data/services/graphql';
import { DialogYesNo } from 'src/containers/modals/DialogYesNo';
import { Column } from 'src/components/layouts';
import { useAddExternalUsersAccessService } from './AddExternalUsersAccess.service';
import { SectionAccount } from './SectionAccount';
import SectionAccessManagement from './SectionAccessManagement';
import SectionSummary from './SectionSummary';

const defaultProps = {
  isOpen: false,
  onDismiss: () => null,
  onGrantAccessToExternalUser: () => null,
};

type AddExternalUsersAccessPanelProps = {
  orgSid: string;
  isOpen?: boolean;
  onDismiss?: any | null;
  onGrantAccessToExternalUser?: any | null;
} & typeof defaultProps;

const tabs = ['#account', '#access', '#summary'];
const enum Tab {
  Account = 0,
  Access = 1,
  Summary = 2,
}

const AddExternalUsersAccessPanel = ({ orgSid, isOpen, onDismiss, onGrantAccessToExternalUser }: AddExternalUsersAccessPanelProps): ReactElement => {
  const addExternalUsersAccessService = useAddExternalUsersAccessService(orgSid);

  const [step, setStep] = useState(Tab.Account);
  const [showDialog, setShowDialog] = useState(false);
  const [unsavedChanges, setUnsavedChanges] = useState(false);
  const [isProcessing, setProcessing] = useState<boolean>(false);
  const [errorMsg, setErrorMsg] = useState<string | undefined>();
  const[ createExternalUser, setCreateExternalUser] = useState(false)

  const Toast = useNotification();


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
    addExternalUsersAccessService.resetForm();
    // Set it back to the first tab
    setStep(Tab.Account);
    setShowDialog(false);
    setUnsavedChanges(false);
    onDismiss();
  }; 


  const parseToPickerOpts = (arr?: Maybe<UserAccount>[] | null): ITag[] => {
    if (!arr) {
      return [];
    }
    return arr.map((user) => ({ 
      name: user?.email ?? '', 
      key: user?.sid ?? '', 
      email: user?.email ?? '',
      firstName: user?.person?.firstNm ?? '',
      lastName: user?.person?.lastNm ?? '',
    }));
  };

  const handleFindExternalUsers =  (text: string) =>{
    return findExternalUsers(text)
  }
  
  const findExternalUsers = async (text: string): Promise<ITag[]> =>{
    let externalUsers: ITag[] = []

    const res: any = await addExternalUsersAccessService.callFindExternalUsers({
      variables: {
        searchText: text
      }
    })

    if(res?.data?.findExternalUsers){
      externalUsers=parseToPickerOpts(res.data.findExternalUsers)
    }

    return externalUsers;
  }

  
  const handleGrantAccess = async () => {
    setProcessing(true);
    const response = await addExternalUsersAccessService.callGrantUserAccess();
    setProcessing(false);
    
    if (response?.grantExternalUserAccess) {
      const responseCode = response?.grantExternalUserAccess?.response;

      if (responseCode === GqOperationResponse.Fail) {
        const errorMsg =
        response?.grantExternalUserAccess?.errMsg ?? 'Error Granting Access to External User';
        setErrorMsg(errorMsg);
      } else {
        setErrorMsg(undefined);
      }

      if (responseCode === GqOperationResponse.Success) {
        Toast.success({ text: 'External user has been granted access'});
      }
      if (responseCode === GqOperationResponse.PartialSuccess) {
        const errorMsg =
        response?.grantExternalUserAccess?.errMsg ?? 'Error Granting Access to External User';
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
    const response = await addExternalUsersAccessService.callCreateExternalUser();
    setProcessing(false);
    
    if (response?.createExternalUser) {
      const responseCode = response?.createExternalUser?.response;

      if (responseCode === GqOperationResponse.Fail) {
        const errorMsg =
        response?.createExternalUser?.errMsg ?? 'Error creating external user';
        setErrorMsg(errorMsg);
      } else {
        setErrorMsg(undefined);
      }

      if (responseCode === GqOperationResponse.Success) {
        Toast.success({ text: 'External user created and granted access'});
      }
      if (responseCode === GqOperationResponse.PartialSuccess) {
        const errorMsg =
        response?.createExternalUser?.errMsg ?? 'Error creating external user';
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
      <Panel
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
            <>
              <Tabs
                items={[
                  {
                    title: 'External User',
                    content: (
                      <SectionAccount
                        searchExternalUsers={handleFindExternalUsers}
                        form={addExternalUsersAccessService.userAccountForm}
                        onNext={handleNext}
                        createExternalUser={createExternalUser}
                        setCreateExternalUser={setCreateExternalUser}
                        saveOptions={(user) => {
                          addExternalUsersAccessService.updateAccountInfo(user);
                          setUnsavedChanges(true);
                        }}
                        saveActivationEmailOptions={(send) => {
                          addExternalUsersAccessService.setSendAccountActivation(send);
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
                        form={addExternalUsersAccessService.userAccountForm}
                        onPrev={handlePrev}
                        onNext={handleNext}
                        saveOptions={(sids) => {
                          addExternalUsersAccessService.updateAccessPolicyGroups(sids);
                          setUnsavedChanges(true);
                        }}
                      />
                    ),
                    hash: '#access',
                  },
                  {
                    title: 'Summary',
                    content: (
                      <SectionSummary
                        form={addExternalUsersAccessService.userAccountForm}
                        onPrev={handlePrev}
                        onSubmit={createExternalUser ? handleCreateExternalUser :  handleGrantAccess}
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

AddExternalUsersAccessPanel.defaultProps = defaultProps;

export default AddExternalUsersAccessPanel;
