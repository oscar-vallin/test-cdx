import React, { useState, useEffect, useCallback, Fragment } from 'react';
import PasswordStrengthBar from 'react-password-strength-bar';
import chroma from 'chroma-js';

import { ROUTE_USER_SETTINGS } from '../../data/constants/RouteConstants';
import { 
  List,
  ChoiceGroup,
} from '@fluentui/react';

import { useThemeContext } from '../../contexts/ThemeContext';

import { LayoutDashboard } from '../../layouts/LayoutDashboard';
import { PageHeader } from '../../containers/headers/PageHeader';
import { Breadcrumb } from '../../components/breadcrumbs/Breadcrumb';
import { Button } from '../../components/buttons/Button';
import { CardSection } from '../../components/cards';
import { InputText } from '../../components/inputs/InputText'
import { Row, Column } from '../../components/layouts';
import { Spacing } from '../../components/spacings/Spacing';

import {
  StyledBox,
  StyledRow,
  StyledCard,
  StyledTitle,
  StyledIcon,
  StyledColorPicker,
  StyledChoiceGroup,
} from './UserSettingsPage.styles';

import {
  PasswordValidator,
  ValidationMessages,
  ValidationRulesParser,
} from './../../utils/PasswordValidation';

const isArrayOfArrays = arr => arr.filter(item => Array.isArray(item)).length > 0;

const isValid = (rules) => {
  return PasswordValidator.getValidationStatus({ rules })
    .reduce((arr, item) => [...arr, ...item], [])
    .filter(item => !item)
    .length === 0;
}

const validateRulesets = (value, ruleSets) => {
  return ruleSets.map(ruleSet => {
    if (ruleSet.rules) {
      return validateRulesets(value, ruleSet.rules)
        .filter(validation => validation.length > 0)
        .reduce((arr, item) => [...arr, ...item || []], []);
    }

    return PasswordValidator.validate(value, ruleSet);
  })
}

const validateRulesArr = (value, data) => data.map(ruleSet => {
  const validationResults = validateRulesets(value, ruleSet.rules);

  const rootValidations = Array.from(new Set(validationResults
      .filter(validation => !isArrayOfArrays(validation))
      .reduce((rules, rule) => [...rules, ...rule], [])));
  
  const ruleObj = {
    ...ruleSet,
    validations: rootValidations,
    rules: ruleSet.rules.map((rule, index) => {
      const item = Array.isArray(rule) ? rule[0] : rule;

      if (rule.rules) {
        return validateRulesArr(value, [item]);
      }
      
      const validations = isArrayOfArrays(validationResults[index])
        ? validationResults[index].reduce((rules, rule) => [...rules, ...rule], [])
        : validationResults[index];

      return {
        ...item,
        ...(item.rules)
          ? {
            validations: Array.from(new Set(validations)),
            isValid: isValid(item.rules),
          }
          : {},
          message: ValidationMessages[item.characteristic](item.condition),
      };
    }),
  }

  return { ...ruleObj, isValid: isValid([ruleObj]) };
});

const getLightTheme = ({ themePrimary, neutralPrimary = '#323130' }) => {
  return {
    themePrimary: themePrimary,
    themeLighterAlt: chroma(themePrimary).brighten(3.55).hex(),
    themeLighter: chroma(themePrimary).brighten(3.25).hex(),
    themeLight: chroma(themePrimary).brighten(2.85).hex(),
    themeTertiary: chroma(themePrimary).brighten(1.32).hex(),
    themeSecondary: chroma(themePrimary).brighten(0.29).hex(),
    themeDarkAlt: chroma(themePrimary).brighten(0.065).hex(),
    themeDark: chroma(themePrimary).brighten(-0.7).hex(),
    themeDarker: chroma(themePrimary).brighten(-1.2).hex(),
    neutralLighterAlt: '#faf9f8',
    neutralLighter: '#f3f2f1',
    neutralLight: '#edebe9',
    neutralQuaternaryAlt: '#e1dfdd',
    neutralQuaternary: '#d0d0d0',
    neutralTertiaryAlt: '#c8c6c4',
    neutralTertiary: '#a19f9d',
    neutralSecondary: '#605e5c',
    neutralPrimaryAlt: '#3b3a39',
    neutralPrimary: neutralPrimary,
    neutralDark: '#201f1e',
    black: '#000000',
    white: '#ffffff',
  };
}

const _UserSettingsPage = () => {
  const activeTheme = localStorage.getItem('CURRENT_THEME');

  const [rules, setRules] = useState([]);
  const [theme, setTheme] = useState(activeTheme ? JSON.parse(activeTheme).name : 'light');
  const [colors, setColors] = useState(activeTheme
    ? JSON.parse(activeTheme).themeColors
    : getLightTheme({ themePrimary: '#0078d4' })
  );

  const [activeColor, setActiveColor] = useState({
    key: 'themePrimary',
    color: colors.themePrimary,
  });
  
  const { changeTheme } = useThemeContext();

  const [validations, setValidations] = useState([]);
  const [password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');
  const [currentPassword, setCurrentPassword] = useState('');

  const onColorChange = useCallback((evt, { hex }) => {
    if (activeColor.key === 'themePrimary') {
      const state = getLightTheme({ [activeColor.key]: `#${hex}` })

      setColors(state);
      setActiveColor({ ...activeColor, color: `#${hex}` });

      changeTheme('custom', state)
    }

    // setColors({ ...colors, [activeColor.key]: `#${hex}` });
    // setActiveColor({ ...activeColor, color: `#${hex}` });

    // changeTheme('custom', { ...colors, [activeColor.key]: `#${hex}` })
  });

  const onRenderCell = (item, index) => {
    return (
      <div style={{marginLeft: `${item.level * 15}px`}} key={index}>
        {item.title && <h5 style={{ margin: '15px 0 5px' }}>
          {item.isValid
            ? <StyledIcon iconName="StatusCircleCheckmark" />
            : <StyledIcon iconName="StatusCircleErrorX" />}

          {item.title} {/*(Minimum: {item.expectation})*/}
        </h5>}
        
        {
          item.rules
            ? item.rules.map((rule, ruleIndex) => {
                if(Array.isArray(rule)) {
                  return rule.map(onRenderCell);
                } else {
                  if (rule.characteristic === 'strength') {
                    return (
                      <div>
                        <div dangerouslySetInnerHTML={{ __html: rule.message }} />
                        
                        <PasswordStrengthBar
                          password={password}
                          style={{
                            margin: '15px 0 0',
                            width: '50%'
                          }}
                        />
                      </div>
                    )
                  }

                  return (
                    <div style={{ display: 'flex', alignItems: 'center' }} key={ruleIndex}>
                      { 
                        !item.validations.includes(rule.characteristic)
                          ? <StyledIcon iconName="StatusCircleCheckmark" />
                          : <StyledIcon iconName="StatusCircleErrorX" />
                      }
                
                      {rule.message}
                    </div>
                  )
                }
              })
            : (
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  { 
                    item.isValid
                      ? <StyledIcon iconName="StatusCircleCheckmark" />
                      : <StyledIcon iconName="StatusCircleErrorX" />
                  }
            
                  {item.message}
                </div>
              )
        }
      </div>
    );
  };

  useEffect(async () => {
    const response = await fetch('/nested-password.json');
    const { data } = await response.json();

    setRules(
      ValidationRulesParser.parse([data.changeOwnPasswordPage2.ruleGroup])
    );
  }, []);

  useEffect(
    () => setValidations(validateRulesArr(password, rules)),
    [password, rules]
  );

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
                <CardSection>
                  <StyledTitle>Change password</StyledTitle>

                  <Row>
                    <Column>
                      <InputText
                      required
                        type="password"
                        label="Existing password"
                        value={currentPassword}
                        canRevealPassword
                        onChange={({ target }) => setCurrentPassword(target.value)}
                      />

                      <InputText
                        required
                        type="password"
                        label="Password"
                        value={password}
                        canRevealPassword
                        onChange={({ target }) => setPassword(target.value)}
                      />

                      <InputText
                        required
                        type="password"
                        label="Retype new password" 
                        canRevealPassword
                        value={passwordConfirmation}
                        onChange={({ target }) => setPasswordConfirmation(target.value)}
                      />
                    </Column>
                  </Row>

                  <Row>
                    <Column>
                      <Spacing margin={{ top: "normal" }}>
                        <Button
                          variant="primary"
                          text="Save password"
                          onClick={() => alert('123')}
                        />
                      </Spacing>
                    </Column>
                  </Row>
                </CardSection>

                <CardSection>
                  <StyledTitle>Theme</StyledTitle>

                  <StyledChoiceGroup
                    label="Choose a theme"
                    defaultSelectedKey={theme}
                    options={[
                      { key: 'light', text: 'Light' },
                      { key: 'dark', text: 'Dark' },
                      { key: 'custom', text: 'Custom' },
                    ]}
                    onChange={(evt, { key }) => {
                      setTheme(key);
                      changeTheme(key, key === 'custom' ? colors : {});
                    }}
                  />
                </CardSection>
                
                {theme === 'custom' && (
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
                                label: key,
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
                            onClick={() => alert('123')}
                          />
                        </Spacing>
                      </Column>
                    </Row>
                  </CardSection>
                )}
              </Spacing>
            </StyledCard>
          </Column>
          <Column lg="6">
            <StyledCard elevation="smallest">
              <Spacing padding={{ left: "small" }}>
                <CardSection>
                  <StyledTitle>Password rules</StyledTitle>
 
                  <Spacing margin={{ top: "normal" }}>
                    <List
                      items={validations}
                      onRenderCell={onRenderCell}
                    />
                  </Spacing>
                </CardSection>
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
