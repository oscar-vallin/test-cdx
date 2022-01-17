import { useState, memo, useEffect } from 'react';

import { ROUTE_USER_SETTINGS } from 'src/data/constants/RouteConstants';

import { LayoutDashboard } from 'src/layouts/LayoutDashboard';
import { PageHeader } from 'src/containers/headers/PageHeader';
import { Breadcrumb } from 'src/components/breadcrumbs/Breadcrumb';
import { Column } from 'src/components/layouts';
import { Spacing } from 'src/components/spacings/Spacing';
import { useSessionStore } from 'src/store/SessionStore';
import { StyledRow, StyledCard } from 'src/pages/Admin/DashboardSite/DefaultTheme/DefaultThemePage.styles';
import { PasswordChange } from './PasswordChange';
import { PasswordRules } from './PasswordRules';
import { ThemeSettings } from './ThemeSettings';

import { StyledBox } from './UserSettingsPage.styles';
import { PasswordState } from './PasswordChange/PasswordChange';

const _UserSettingsPage = () => {
  const { user } = useSessionStore();

  const [validationPassed, setValidationPassed] = useState<boolean>(false);
  const [passwords, setPasswords] = useState<PasswordState>({
    current: '',
    new: '',
    confirmation: '',
  });

  const [delayedPassword, setDelayedPassword] = useState('');

  const passwordValidationStateChange = (passes: boolean) => {
    setValidationPassed(passes);
  };

  useEffect(() => {
    const timeOutId = setTimeout(() => {
      setDelayedPassword(passwords.new);
    }, 500);
    return () => clearTimeout(timeOutId);
  }, [passwords.new]);

  return (
    <LayoutDashboard id="USER_SETTINGS">
      <StyledBox>
        <PageHeader id="__UserSettingsHeader" spacing="primary">
          <Breadcrumb id="__UserSettingsBreadCrumb" items={[ROUTE_USER_SETTINGS]} />
        </PageHeader>

        <StyledRow>
          <Column lg="6">
            <StyledCard elevation="smallest">
              <Spacing padding={{ left: 'small' }}>
                <PasswordChange state={passwords} onChange={setPasswords} validationPassed={validationPassed} />
              </Spacing>
            </StyledCard>
          </Column>
          <Column lg="6">
            <StyledCard elevation="smallest">
              <Spacing padding={{ left: 'small' }}>
                <PasswordRules user={user} password={delayedPassword} onChange={passwordValidationStateChange} />
              </Spacing>
            </StyledCard>
          </Column>
        </StyledRow>

        <br />

        <StyledRow>
          <Column>
            <StyledCard elevation="smallest">
              <Spacing padding={{ left: 'small' }}>
                <ThemeSettings />
              </Spacing>
            </StyledCard>
          </Column>
        </StyledRow>
      </StyledBox>
    </LayoutDashboard>
  );
};

const UserSettingsPage = memo(_UserSettingsPage);

export { UserSettingsPage };
