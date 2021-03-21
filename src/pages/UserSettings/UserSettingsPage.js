import React, { useState, useEffect, useCallback, Fragment } from 'react';

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
import { Badge } from '../../components/badges/Badge';
import { CardSection } from '../../components/cards';
import { Dialog, DialogType, DialogFooter } from 'office-ui-fabric-react/lib/Dialog';
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
  StyledPreview,
} from './UserSettingsPage.styles';

import {
  PasswordValidator,
  ValidationMessages,
  ValidationRulesParser,
} from './../../utils/PasswordValidation';
import { Card } from '@uifabric/react-cards';

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

const _UserSettingsPage = () => {
  const [rules, setRules] = useState([]);
  const [theme, setTheme] = useState('custom');
  const [colors, setColors] = useState({
    themePrimary: '#0078d4',
    themeLighterAlt: '#eff6fc',
    themeLighter: '#deecf9',
    themeLight: '#c7e0f4',
    themeTertiary: '#71afe5',
    themeSecondary: '#2b88d8',
    themeDarkAlt: '#106ebe',
    themeDark: '#005a9e',
    themeDarker: '#004578',
    neutralLighterAlt: '#faf9f8',
    neutralLighter: '#f3f2f1',
    neutralLight: '#edebe9',
    neutralQuaternaryAlt: '#e1dfdd',
    neutralQuaternary: '#d0d0d0',
    neutralTertiaryAlt: '#c8c6c4',
    neutralTertiary: '#a19f9d',
    neutralSecondary: '#605e5c',
    neutralPrimaryAlt: '#3b3a39',
    neutralPrimary: '#323130',
    neutralDark: '#201f1e',
    black: '#000000',
    white: '#ffffff',
  });
  const [activeColor, setActiveColor] = useState({
    key: 'themePrimary',
    color: colors.themePrimary,
  });

  const onColorChange = useCallback((evt, { hex }) => {
    setColors({ ...colors, [activeColor.key]: `#${hex}` });
    setActiveColor({ ...activeColor, color: `#${hex}` });

    changeTheme('custom', { ...colors, [activeColor.key]: `#${hex}` })
  });

  const { changeTheme } = useThemeContext();

  const [validations, setValidations] = useState([]);
  const [password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');
  const [currentPassword, setCurrentPassword] = useState('');

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
                          asd="123"
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
