import React, { useState, useEffect, useCallback, Fragment } from 'react';
import PasswordStrengthBar from 'react-password-strength-bar';
import chroma from 'chroma-js';
import { useUserThemeQuery, useChangeOwnPasswordPageQuery } from '../../data/services/graphql';

import { ROUTE_USER_SETTINGS } from '../../data/constants/RouteConstants';
import { 
  List,
  ChoiceGroup,
} from '@fluentui/react';

import { useThemeContext } from '../../contexts/ThemeContext';

import { LayoutDashboard } from '../../layouts/LayoutDashboard';
import { PageHeader } from '../../containers/headers/PageHeader';
import { Breadcrumb } from '../../components/breadcrumbs/Breadcrumb';
import { CardSection } from '../../components/cards';
import { Row, Column } from '../../components/layouts';
import { Spacing } from '../../components/spacings/Spacing';
import { PasswordChange } from './PasswordChange';
import { PasswordRules } from './PasswordRules';

import {
  StyledBox,
  StyledRow,
  StyledCard,
  StyledTitle,
  StyledIcon,
  StyledChoiceGroup,
} from './UserSettingsPage.styles';

const getThemeVariant = ({
  themePrimary,
  neutralPrimary = '#323130',
  black = '#000',
  white = '#fff',
}) => {
  return {
    themeColors: {
      themePrimary: themePrimary,
      themeLighterAlt: chroma(themePrimary).brighten(3.55).hex(),
      themeLighter: chroma(themePrimary).brighten(3.25).hex(),
      themeLight: chroma(themePrimary).brighten(2.85).hex(),
      themeTertiary: chroma(themePrimary).brighten(1.32).hex(),
      themeSecondary: chroma(themePrimary).brighten(0.29).hex(),
      themeDarkAlt: chroma(themePrimary).brighten(0.065).hex(),
      themeDark: chroma(themePrimary).brighten(-0.7).hex(),
      themeDarker: chroma(themePrimary).brighten(-1.2).hex(),
      neutralLighterAlt: chroma(neutralPrimary).brighten(4.3).hex(),
      neutralLighter: chroma(neutralPrimary).brighten(4.17).hex(),
      neutralLight: chroma(neutralPrimary).brighten(4.04).hex(),
      neutralQuaternaryAlt: chroma(neutralPrimary).brighten(3.81).hex(),
      neutralQuaternary: chroma(neutralPrimary).brighten(3.49).hex(),
      neutralTertiaryAlt: chroma(neutralPrimary).brighten(3.33).hex(),
      neutralTertiary: chroma(neutralPrimary).brighten(2.52).hex(),
      neutralSecondary: chroma(neutralPrimary).brighten(1.1).hex(),
      neutralPrimaryAlt: chroma(neutralPrimary).brighten(0.22).hex(),
      neutralPrimary: neutralPrimary,
      neutralDark: chroma(neutralPrimary).brighten(-0.47).hex(),
      black,
      white,
    }
  };
}

const _UserSettingsPage = () => {
  const [validations, setValidations] = useState([]);
  const [passwords, setPasswords] = useState({
    current: '',
    new: '',
    confirmation: ''
  });
  
  const activeTheme = localStorage.getItem('CURRENT_THEME');
  const { changeTheme } = useThemeContext();

  const {
    data: userThemeResult,
    loading: isLoadingTheme,
    error: userThemeError,
  } = useUserThemeQuery({
    variables: {}
  });

  useEffect(() => {
    if (!isLoadingTheme) {
      console.log(userThemeResult);
      console.log(userThemeError);
    }
  }, [isLoadingTheme])

  // const [themeVariant, setThemeVariant] = useState(
  //   activeTheme ? JSON.parse(activeTheme) : getThemeVariant({ themePrimary: '#0078d4' })
  // );

  const [theme, setTheme] = useState(activeTheme ? JSON.parse(activeTheme).name : 'LIGHT');
  // const [colors, setColors] = useState({
  //   themePrimary: themeVariant.themeColors.themePrimary,
  //   neutralPrimary: themeVariant.themeColors.neutralPrimary,
  //   white: themeVariant.themeColors.white,
  //   black: themeVariant.themeColors.black,
  // });
  
  // const [activeColor, setActiveColor] = useState({ key: 'themePrimary', color: colors.themePrimary });
  
  // const onColorChange = useCallback((evt, { hex }) => {
  //   const variant = getThemeVariant({ ...colors, [activeColor.key]: `#${hex}` });
   
  //   setColors({ ...colors, [activeColor.key]: `#${hex}` });
  //   setActiveColor({ ...activeColor, color: `#${hex}` });

  //   setThemeVariant(variant);
  //   changeTheme('custom', variant.themeColors);
  // });


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
                
                {/* {theme === 'CUSTOM' && (
                  <CardSection>
                    <Row>
                      <Column lg="8">
                        <ChoiceGroup
                          label="Colors"
                          defaultSelectedKey={activeColor.key}
                          options={
                            Object
                              .keys(colors)
                              .map(key => ({
                                key,
                                label: key === 'themePrimary'
                                  ? 'Primary color'
                                  : key === 'neutralPrimary'
                                    ? 'Neutral color'
                                    : key === 'black'
                                      ? 'Text color'
                                      : 'Background color',
                                onRenderField: (props, render) => {
                                  const key = props.id.split('-').pop();

                                  return (
                                    <div style={{ display: 'flex', alignItems: 'center' }}>
                                      {render(props)}

                                      <div style={{
                                        height: 30,
                                        width: 30,
                                        margin: `0 15px`,
                                        border: '1px solid #d0d0d0',
                                        background: colors[key]
                                      }} />

                                      <span>{props.label}</span>
                                    </div>
                                  )
                                }
                              }))
                          }
                          onChange={(evt, { key }) => setActiveColor({ ...activeColor, key })}
                        />
                      </Column>
                      <Column lg="4" right={true}>
                        <StyledColorPicker
                          showPreview={false}
                          alphaType={'none'}
                          color={activeColor.color}
                          onChange={onColorChange}
                        />
                      </Column>
                    </Row>

                    <Row>
                      <Column>
                        <Spacing margin={{ top: "double" }}>
                          <Button
                            variant="primary"
                            text="Save theme"
                            onClick={() => {
                              changeTheme('CUSTOM', themeVariant.themeColors)
                            }}
                          />
                        </Spacing>
                      </Column>
                    </Row>
                  </CardSection>
                )} */}
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
