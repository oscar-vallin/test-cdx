/* eslint-disable react-hooks/exhaustive-deps */
import { ReactElement, useEffect, useState } from 'react';
import { Panel, PanelType } from '@fluentui/react';

import { Tabs } from 'src/components/tabs/Tabs';
import { Text } from 'src/components/typography';
import { PanelBody } from 'src/layouts/Panels/Panels.styles';

import { useCreateUsersPanel} from './CreateUsersPanel.service';
import { SectionAccount } from './SectionAccount';
import SectionAccessManagement from './SectionAccessManagement';
import SectionAuthentication from './SectionAuthentication';
import SectionSummary from './SectionSummary';
import { useNotification } from "src/hooks/useNotification";
import { GqOperationResponse } from "src/data/services/graphql";

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
  const [isProcessing, setProcessing] = useState<boolean>(false);
  const Toast = useNotification();

  const handleCreateUser = async () => {
    setProcessing(true);
    const responseCreate = await createUserService.callUpdateUser();
    setProcessing(false);
    //
    if (responseCreate?.createUser) {
      const responseCode = responseCreate?.createUser?.response

      if (responseCode === GqOperationResponse.Fail || responseCode === GqOperationResponse.PartialSuccess) {
        const errorMsg = responseCreate?.createUser?.errMsg ?? responseCreate?.createUser?.response ?? 'Error Creating User';
        Toast.error({text: errorMsg });
      }

      if (responseCode === GqOperationResponse.Success || responseCode === GqOperationResponse.PartialSuccess) {
        onCreateUser(responseCreate.createUser);
        onPanelClose();
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
    // Reset the form
    createUserService.resetForm();
    // Set it back to the first tab
    setStep(Tab.Account);
    onDismiss();
  }

  return (
    <Panel
      closeButtonAriaLabel="Close"
      type={PanelType.medium}
      headerText="New User"
      isOpen={isOpen}
      onDismiss={onPanelClose}
    >
      <PanelBody>
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
                      saveOptions={createUserService.updateAccountInfo}
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
                      saveOptions={createUserService.updateAccessPolicyGroups}
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
                      saveOptions={createUserService.setSendAccountActivation}
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
  );
};

CreateUsersPanel.defaultProps = defaultProps;

export default CreateUsersPanel;
