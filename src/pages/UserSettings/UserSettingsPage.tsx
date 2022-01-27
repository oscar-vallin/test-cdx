import { useState, memo, useEffect } from 'react';

import { LayoutDashboard } from 'src/layouts/LayoutDashboard';
import { PageHeader } from 'src/containers/headers/PageHeader';
import { Column, Container, Row } from 'src/components/layouts';
import { Spacing } from 'src/components/spacings/Spacing';
import { useSessionStore } from 'src/store/SessionStore';
import { StyledRow, StyledCard } from 'src/pages/Admin/DashboardSite/DefaultTheme/DefaultThemePage.styles';
import { PasswordChange } from './PasswordChange';
import { PasswordRules } from './PasswordRules';
import { ThemeSettings } from './ThemeSettings';

import { PasswordState } from './PasswordChange/PasswordChange';
import { PageTitle } from 'src/components/typography';

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
      <PageHeader id="__UserSettingsHeader" spacing="0">
        <Container>
          <Row>
            <Column lg="6" direction="row">
              <PageTitle id="__Page_Title" title="User Settings" />
            </Column>
          </Row>
        </Container>
      </PageHeader>
      <Container>
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
      </Container>
    </LayoutDashboard>
  );
};

const UserSettingsPage = memo(_UserSettingsPage);

export { UserSettingsPage };
