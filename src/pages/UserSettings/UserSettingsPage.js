import React, { useEffect, useState } from 'react';

import { ROUTE_USER_SETTINGS } from '../../data/constants/RouteConstants';

import { useThemeContext } from '../../contexts/ThemeContext';

import { LayoutDashboard } from '../../layouts/LayoutDashboard';
import { PageHeader } from '../../containers/headers/PageHeader';
import { Breadcrumb } from '../../components/breadcrumbs/Breadcrumb';
import { CardSection } from '../../components/cards';
import { Column } from '../../components/layouts';
import { Spacing } from '../../components/spacings/Spacing';
import { PasswordChange } from './PasswordChange';
import { PasswordRules } from './PasswordRules';

import {
  StyledBox,
  StyledRow,
  StyledCard,
  StyledTitle,
  StyledChoiceGroup,
} from './UserSettingsPage.styles';

const _UserSettingsPage = () => {
  const [validations, setValidations] = useState([]);
  const [passwords, setPasswords] = useState({
    current: '',
    new: '',
    confirmation: ''
  });
  
  const activeTheme = localStorage.getItem('CURRENT_THEME');
  const { changeTheme } = useThemeContext();

  const [theme, setTheme] = useState(activeTheme ? JSON.parse(activeTheme).name : 'LIGHT');

  return (
    <LayoutDashboard id="USER_SETTINGS">
      <PageHeader>
        <Breadcrumb items={[ROUTE_USER_SETTINGS]} />
      </PageHeader>

      <StyledBox>
        <StyledRow>
          <Column lg="6">
            <StyledCard elevation="smallest">
              <Spacing padding={{ left: 'small' }}>
                <PasswordChange
                  state={passwords}
                  onChange={setPasswords}
                  validations={validations}
                />

                <CardSection>
                  <StyledTitle>Theme</StyledTitle>

                  <StyledChoiceGroup
                    label="Choose a theme"
                    defaultSelectedKey={theme}
                    options={[
                      { key: 'LIGHT', text: 'Default' },
                      { key: 'DARK', text: 'Dark' },
                      { key: 'CUSTOM', text: 'Organization' },
                    ]}
                    onChange={(evt, { key }) => {
                      setTheme(key);
                      changeTheme(key, key === 'CUSTOM' ? colors : {});
                    }}
                  />
                </CardSection>
              </Spacing>
            </StyledCard>
          </Column>
          <Column lg="6">
            <StyledCard elevation="smallest">
              <Spacing padding={{ left: "small" }}>
                <PasswordRules
                  password={passwords.new}
                  validations={validations}
                  onChange={setValidations}
                />
              </Spacing>
            </StyledCard>
          </Column>
        </StyledRow>
      </StyledBox>
    </LayoutDashboard>
  );
};

const UserSettingsPage = React.memo(_UserSettingsPage);

export { UserSettingsPage };
