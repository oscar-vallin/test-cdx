/* eslint-disable react-hooks/exhaustive-deps */
import { ReactElement, useState, useEffect } from 'react';
import { Panel, PanelType } from '@fluentui/react/lib-commonjs/Panel';

import { Tabs } from 'src/components/tabs/Tabs';
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

const CreateUsersPanel = ({ isOpen, onDismiss, onCreateUser }: CreateUsersPanelProps): ReactElement => {
  const CreateUserService = useCreateUsersPanel();
  const [step, setStep] = useState(0);
  const [selectedTab, setSelectedTab] = useState(Tab.Account);

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
        <Tabs
          items={[
            {
              title: 'Account',
              content: <SectionAccount data={CreateUserService.infoAccess} onNext={handleNext} />,
              hash: '#account',
            },
            {
              title: 'Vendor Count Stats',
              content: (
                <SectionAccessManagement data={CreateUserService.infoAccess} onPrev={handlePrev} onNext={handleNext} />
              ),
              hash: '#access',
            },
            {
              title: 'Work Steps',
              content: (
                <SectionAuthentication data={CreateUserService.infoAccess} onPrev={handlePrev} onNext={handleNext} />
              ),
              hash: '#auth',
            },
            {
              title: 'Quality Checks',
              content: (
                <SectionSummary data={CreateUserService.infoAccess} onPrev={handlePrev} onSubmit={handleCreateUser} />
              ),
              hash: '#quality',
            },
          ]}
          selectedKey={selectedTab < 0 ? Tab.Account.toString() : selectedTab.toString()}
        />
      </>
    </Panel>
  );
};

CreateUsersPanel.defaultProps = defaultProps;

export default CreateUsersPanel;
