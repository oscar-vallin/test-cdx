/* eslint-disable react-hooks/exhaustive-deps */
import { ReactElement, useState, useEffect } from 'react';
import { Panel, PanelType } from '@fluentui/react/lib-commonjs/Panel';

import { Tabs } from 'src/components/tabs/Tabs';
import { Text } from 'src/components/typography';
import { PanelBody } from 'src/layouts/Panels/Panels.styles';
import { Spacing } from '../../../../components/spacings/Spacing';

import { useCreateUsersPanel } from './CreateUsersPanel.service';
import { SectionAccount } from './SectionAccount';
import SectionAccessManagement from './SectionAccessManagement';
import SectionAuthentication from './SectionAuthentication';
import SectionSummary from './SectionSummary';

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
  selectedUserId?: any | null;
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
  onCreateUser,
  selectedUserId,
}: CreateUsersPanelProps): ReactElement => {
  const createUserService = useCreateUsersPanel(orgSid);
  const [errorMessage, setErrorMessage] = useState<string | undefined>();

  const [step, setStep] = useState(Tab.Account);
  const { userAccountLoading } = createUserService ?? {};
  const [isProcessing, setProcessing] = useState<boolean>(false);

  const handleCreateUser = async () => {
    setProcessing(true);
    const responseCreate = await createUserService.createUserCall();
    setProcessing(false);
    //
    if (responseCreate?.createUser) {
      if (responseCreate?.createUser?.response.toLocaleUpperCase() === 'SUCCESS') {
        onCreateUser(responseCreate.createUser);
        onDismiss();
        return;
      }

      setErrorMessage(
        responseCreate?.createUser?.errMsg ?? responseCreate?.createUser?.response ?? 'Error Creating User'
      );

      setTimeout(() => {
        setErrorMessage(undefined);
      }, 3000);
    }

    //

    return null;
  };

  // const handleResetPassword = async () => {
  //   setProcessing(true);
  //   const responseReset = await createUserService.handleResetPassword(selectedUserId);
  //   setProcessing(false);
  //   //
  //   if (responseReset?.resetPassword) {
  //     if (responseReset?.resetPassword === 'SUCCESS') {
  //       onCreateUser(responseReset.resetPassword);
  //       onDismiss();
  //     }
  //   }
  // };

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

  return (
    <Panel
      closeButtonAriaLabel="Close"
      type={PanelType.medium}
      headerText="New User"
      isOpen={isOpen}
      onDismiss={() => {
        // Reset the form
        createUserService.resetForm();
        // Set it back to the first tab
        setStep(Tab.Account);
        onDismiss();
      }}
    >
      <PanelBody>
        {userAccountLoading && <Text>Loading...</Text>}
        {!userAccountLoading && (
          <>
            {/* {selectedUserId > 0 ?? ( */}
            {/*  <Link */}
            {/*    id="__CreateUsersPanel__ResetPassword_Field" */}
            {/*    onClick={() => { */}
            {/*      handleResetPassword(); */}
            {/*    }} */}
            {/*  > */}
            {/*    Reset Password */}
            {/*  </Link> */}
            {/* )} */}
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
            {errorMessage && (
              <>
                <Spacing margin={{ top: 'double' }} />
                <Text>{errorMessage}</Text>
              </>
            )}
          </>
        )}
      </PanelBody>
    </Panel>
  );
};

CreateUsersPanel.defaultProps = defaultProps;

export default CreateUsersPanel;
