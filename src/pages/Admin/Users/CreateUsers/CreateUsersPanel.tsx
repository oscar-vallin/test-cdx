/* eslint-disable react-hooks/exhaustive-deps */
import { ReactElement, useState, useEffect } from 'react';
import { Panel, PanelType } from '@fluentui/react/lib-commonjs/Panel';

import { Tabs } from 'src/components/tabs/Tabs';
import { Text } from 'src/components/typography';
import { Spacing } from '../../../../components/spacings/Spacing';
import { Button } from '../../../../components/buttons/Button';
import { Row, Column } from '../../../../components/layouts';
import { Separator } from '../../../../components/separators/Separator';
import { InputText } from '../../../../components/inputs/InputText';

import { useCreateUserMutation } from '../../../../data/services/graphql';

import { useOrgSid } from '../../../../hooks/useOrgSid';
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

const CreateUsersPanel = ({ orgSid, isOpen, onDismiss, onCreateUser }: CreateUsersPanelProps): ReactElement => {
  const CreateUserService = useCreateUsersPanel(orgSid);
  const [errorMessage, setErrorMessage] = useState<string | undefined>();

  const [step, setStep] = useState(Tab.Account);
  const [selectedTab, setSelectedTab] = useState(tabs[Tab.Account]);
  const { userAccountForm, userAccountLoading } = CreateUserService ?? {};
  const [isProcessing, setProcessing] = useState<boolean>(false);

  useEffect(() => {
    if (step >= 0 && step < 4) {
      setSelectedTab(tabs[step]);
    }
  }, [step]);

  const handleCreateUser = async () => {
    setProcessing(true);
    const responseCreate = await CreateUserService.createUserCall();
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

  const handleNext = (): null => {
    console.log('createpanel handleNext');

    setStep(step + 1);
    console.log('🚀 ~ file: CreateUsersPanel.tsx ~ line 64 ~ handleNext ~ step', step);
    return null;
  };

  const handlePrev = (): null => {
    console.log('createpanel handlePrev');

    setStep(step - 1);
    return null;
  };

  const handleTabChange = (hash): void => {
    setStep(tabs.indexOf(hash));
    setSelectedTab(hash);
  };

  useEffect(() => {
    if (CreateUserService.isUserCreated && CreateUserService.responseCreateUser) {
      onDismiss();
    }
  }, [CreateUserService.isUserCreated]);

  return (
    <Panel
      closeButtonAriaLabel="Close"
      type={PanelType.medium}
      headerText="New User"
      isOpen={isOpen}
      onDismiss={() => {
        onDismiss();
      }}
    >
      <>
        {userAccountLoading && <Text>Loading...</Text>}
        {!userAccountLoading && (
          <>
            <Tabs
              items={[
                {
                  title: 'Account',
                  content: (
                    <SectionAccount
                      form={CreateUserService.form}
                      onNext={handleNext}
                      saveOptions={CreateUserService.setForm}
                    />
                  ),
                  hash: '#account',
                },
                {
                  title: 'Access Management',
                  content: (
                    <SectionAccessManagement
                      form={CreateUserService.form}
                      onPrev={handlePrev}
                      onNext={handleNext}
                      saveOptions={CreateUserService.setForm}
                    />
                  ),
                  hash: '#access',
                },
                {
                  title: 'Authentication',
                  content: (
                    <SectionAuthentication
                      form={CreateUserService.form}
                      onPrev={handlePrev}
                      onNext={handleNext}
                      saveOptions={CreateUserService.setForm}
                    />
                  ),
                  hash: '#auth',
                },
                {
                  title: 'Summary',
                  content: (
                    <SectionSummary
                      form={CreateUserService.form}
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
      </>
    </Panel>
  );
};

CreateUsersPanel.defaultProps = defaultProps;

export default CreateUsersPanel;
