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

  const [step, setStep] = useState(0);
  const [selectedTab, setSelectedTab] = useState(Tab.Account);
  const { userAccountForm, userAccountLoading } = CreateUserService ?? {};
  // console.log('🚀 ~ file: CreateUsersPanel.tsx ~ line 46 ~ CreateUsersPanel ~ CreateUserService', CreateUserService);
  // console.log('🚀 ~ file: CreateUsersPanel.tsx ~ line 49 ~ CreateUsersPanel ~ userAccountForm', userAccountForm);

  const handleCreateUser = (): void => {
    CreateUserService.createUserCall();
    onCreateUser();
    onDismiss();
  };

  const handleNext = (): void => {
    setStep(step + 1);
  };

  const handlePrev = (): void => {
    setStep(step - 1);
  };

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
          <Tabs
            items={[
              {
                title: 'Account',
                content: (
                  <SectionAccount form={userAccountForm} data={CreateUserService.infoAccess} onNext={handleNext} />
                ),
                hash: '#account',
              },
              {
                title: 'Access Management',
                content: (
                  <SectionAccessManagement
                    form={userAccountForm}
                    data={CreateUserService.infoAccess}
                    onPrev={handlePrev}
                    onNext={handleNext}
                  />
                ),
                hash: '#access',
              },
              {
                title: 'Authentication',
                content: (
                  <SectionAuthentication
                    form={userAccountForm}
                    data={CreateUserService.infoAuthentication}
                    onPrev={handlePrev}
                    onNext={handleNext}
                  />
                ),
                hash: '#auth',
              },
              {
                title: 'Summary',
                content: (
                  <SectionSummary
                    form={userAccountForm}
                    data={CreateUserService}
                    onPrev={handlePrev}
                    onSubmit={handleCreateUser}
                  />
                ),
                hash: '#summary',
              },
            ]}
            selectedKey={selectedTab < 0 ? Tab.Account.toString() : selectedTab.toString()}
          />
        )}
      </>
    </Panel>
  );
};

CreateUsersPanel.defaultProps = defaultProps;

export default CreateUsersPanel;
