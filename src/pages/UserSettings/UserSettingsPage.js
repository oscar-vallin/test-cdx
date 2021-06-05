import React, { useEffect, useState } from 'react';

import { ROUTE_USER_SETTINGS } from '../../data/constants/RouteConstants';

import { useThemeContext } from '../../contexts/ThemeContext';

import { LayoutDashboard } from '../../layouts/LayoutDashboard';
import { PageHeader } from '../../containers/headers/PageHeader';
import { Breadcrumb } from '../../components/breadcrumbs/Breadcrumb';
import { Button } from '../../components/buttons/Button';
import { MessageBar } from '../../components/notifications/MessageBar';
import { Text } from '../../components/typography/Text';
import { Row, Column } from '../../components/layouts';
import { Spacing } from '../../components/spacings/Spacing';
import { PasswordChange } from './PasswordChange';
import { PasswordRules } from './PasswordRules';
import { useCreateOrUpdateOwnDashThemeMutation } from '../../data/services/graphql';

import {
  StyledBox,
  StyledDiv,
  StyledRow,
  StyledCard,
  StyledTitle,
  StyledChoiceGroup,
} from './UserSettingsPage.styles';

/* TODO:
  Find out why dashTheme is null (GQL)
  Update theme on GQL response
  Cancel theme updates after leaving without saving
*/

const _UserSettingsPage = () => {
  const [validations, setValidations] = useState([]);
  const [passwords, setPasswords] = useState({
    current: '',
    new: '',
    confirmation: ''
  });
  
  const { changeTheme, themeConfig } = useThemeContext();
  const { theme = { themeColorMode: 'LIGHT' } } = themeConfig;

  const [themeFontSize, setThemeFontSize] = useState(theme.themeFontSize || 'MEDIUM');
  const [themeColorMode, setThemeColorMode] = useState(theme.themeColorMode || 'LIGHT');

  useEffect(() => {
    setThemeFontSize(themeFontSize);
    setThemeColorMode(themeColorMode);

    changeTheme(themeColorMode);
  }, [themeFontSize, themeColorMode]);

  const [
    createOrUpdateOwnDashTheme,
    {
      data: themeResponse,
      loading: isHandlingTheme,
      error: themeError
    }] = useCreateOrUpdateOwnDashThemeMutation();
  
  // const activeTheme = localStorage.getItem('CURRENT_THEME');

  // const [theme, setTheme] = useState(activeTheme ? JSON.parse(activeTheme).name : 'LIGHT');
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

        <br />

        <StyledRow>
          <Column>
            <StyledCard elevation="smallest">
              <Spacing padding={{ left: 'small' }}>
                <StyledTitle>Theme</StyledTitle>

                  <StyledDiv>
                    <Text
                      size="normal"
                      className={`text ${(themeConfig.themeColorPalettes || []).length > 1 && 'text--centered'}`}
                    >
                      Color palettes:
                    </Text>
                    
                    {
                      !themeConfig.themeColorPalettes
                        ? <MessageBar content="No color palettes available" />
                        : themeConfig.themeColorPalettes.length === 1
                          ? <MessageBar content="Organization (default)" />
                          : (
                            <StyledChoiceGroup
                              defaultSelectedKey={theme}
                              options={themeConfig.themeColorPalettes?.map(item => ({
                                  key: item.id,
                                  text: `Palette #${item.id}`
                                })) || []
                              }
                              onChange={(evt, { key }) => {
                                alert(key);
                              }}
                            />
                          )
                    }
                  </StyledDiv>

                  <StyledDiv>
                    <Text
                      size="normal"
                      className={`text ${(themeConfig.themeColorModes || []).length && 'text--centered'}`}
                    >
                      Color modes:
                    </Text>
                    
                    {
                      !(themeConfig.themeColorModes || []).length
                        ? <MessageBar content="No color modes available" />
                        : (
                            <StyledChoiceGroup
                              selectedKey={themeColorMode}
                              options={themeConfig.themeColorModes?.map(item => ({
                                  key: item,
                                  text: `${item.charAt(0)}${item.slice(1).toLowerCase()}`
                                })) || []
                              }
                              onChange={(evt, { key }) => {
                                setThemeColorMode(key);
                              }}
                            />
                          )
                    }
                  </StyledDiv>

                  <Row>
                    <Column>
                      <Spacing margin={{ top: "normal" }}>
                        <Button
                          variant="primary"
                          text={isHandlingTheme ? "Processing..." : "Save theme"}
                          // disabled={isFormInvalid(state) || !validations[0].isValid || isUpdatingPassword}
                          onClick={() => {
                            createOrUpdateOwnDashTheme({
                              variables: {
                                dashThemeInput: {
                                  themeFontSize,
                                  themeColorMode,
                                }
                              }
                            })
                          }}
                        />
                      </Spacing>
                    </Column>
                  </Row>
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
