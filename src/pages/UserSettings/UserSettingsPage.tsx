import { useState, memo } from 'react';

import { ROUTE_USER_SETTINGS } from '../../data/constants/RouteConstants';

import { LayoutDashboard } from '../../layouts/LayoutDashboard';
import { PageHeader } from '../../containers/headers/PageHeader';
import { Breadcrumb } from '../../components/breadcrumbs/Breadcrumb';
import { Column } from '../../components/layouts';
import { Spacing } from '../../components/spacings/Spacing';
import { PasswordChange } from './PasswordChange';
import { PasswordRules } from './PasswordRules';
import { ThemeSettings } from './ThemeSettings';
// import { useCurrentUserTheme } from '../../hooks/useCurrentUserTheme';

import { StyledBox, StyledRow, StyledCard } from './UserSettingsPage.styles';

const _UserSettingsPage = () => {
  // const { userTheme }: any = useCurrentUserTheme();

  const [validations, setValidations] = useState([]);
  const [passwords, setPasswords] = useState({
    current: '',
    new: '',
    confirmation: '',
  });

  return (
    <LayoutDashboard id="USER_SETTINGS">
      <>
        <PageHeader spacing="primary">
          <Breadcrumb id="__UserSetingsId" items={[ROUTE_USER_SETTINGS]} />
        </PageHeader>

        <StyledBox>
          <StyledRow>
            <Column lg="6">
              <StyledCard elevation="smallest">
                <Spacing padding={{ left: 'small' }}>
                  <PasswordChange state={passwords} onChange={setPasswords} validations={validations} />
                </Spacing>
              </StyledCard>
            </Column>
            <Column lg="6">
              <StyledCard elevation="smallest">
                <Spacing padding={{ left: 'small' }}>
                  <PasswordRules password={passwords.new} validations={validations} onChange={setValidations} />
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
      </>
    </LayoutDashboard>
  );
};

const UserSettingsPage = memo(_UserSettingsPage);

export { UserSettingsPage };
