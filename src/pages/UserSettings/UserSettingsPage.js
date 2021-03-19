import React, { useState, useEffect, useCallback, Fragment } from 'react';

import { ROUTE_USER_SETTINGS } from '../../data/constants/RouteConstants';
import { 
  List,
  Icon,
} from '@fluentui/react';

import { LayoutDashboard } from '../../layouts/LayoutDashboard';
import { PageHeader } from '../../containers/headers/PageHeader';
import { Breadcrumb } from '../../components/breadcrumbs/Breadcrumb';
import { Button } from '../../components/buttons/Button';
import { Badge } from '../../components/badges/Badge';
import { Card, CardSection } from '../../components/cards';
import { Dialog, DialogType, DialogFooter } from 'office-ui-fabric-react/lib/Dialog';
import { InputText } from '../../components/inputs/InputText'
import { Row, Column } from '../../components/layouts';
import { Spacing } from '../../components/spacings/Spacing';

import { StyledBox, StyledTitle, StyledChoiceGroup, StyledIcon } from './UserSettingsPage.styles';
import {
  PasswordValidator,
  ValidationMessages,
} from './../../utils/PasswordValidation';

const isArrayOfArrays = arr => arr.filter(item => Array.isArray(item)).length > 0;

const isValid = (rules) => {
  return PasswordValidator.getValidationStatus({ rules })
    .reduce((arr, item) => [...arr, ...item], [])
    .filter(item => !item)
    .length > 0
}

const validateRulesets = (value, ruleSets) => {
  return ruleSets.map(ruleSet => {
    if (ruleSet.rules) {
      return validateRulesets(value, ruleSet.rules).filter(validation => validation.length > 0);
    }

    return PasswordValidator.validate(value, [ruleSet]);
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
      if (rule.rules) {
        return validateRulesArr(value, [rule]);
      }
      
      const validations = isArrayOfArrays(validationResults[index])
        ? validationResults[index].reduce((rules, rule) => [...rules, ...rule], [])
        : validationResults[index];

      return {
        ...rule,
        ...(rule.rules)
          ? {
            validations: Array.from(new Set(validations)),
            isValid: isValid(rule.rules),
          }
          : {},
        message: ValidationMessages[rule.characteristic](rule.condition),
      };
    }),
  }
  
  return { ...ruleObj, isValid: isValid([ruleObj]) };
});

const _UserSettingsPage = () => {
  const [rules, setRules] = useState([]);

  const [validations, setValidations] = useState([]);
  const [password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');
  const [currentPassword, setCurrentPassword] = useState('');

  const onRenderCell = (item, index) => {
    return (
      <div style={{marginLeft: `${item.level * 15}px`}} key={index}>
        {item.title && <h5 style={{ margin: '15px 0 5px' }}>{item.title}</h5>}
        
        {
          item.rules
            ? item.rules.map((rule, ruleIndex) => {
                if(Array.isArray(rule)) {
                  return rule.map(onRenderCell);
                } else {
                  return (
                    <div style={{ display: 'flex', alignItems: 'center' }} key={ruleIndex}>
                      { 
                        rule.isValid
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
      [
        {
          title: 'General rules',
          expectation: 4,
          level: 0,
          rules: [
            { characteristic: "digits", condition: 1 },
            {
              title: 'Size',
              expectation: 2,
              level: 1,
              rules: [
                { characteristic: "min", condition: 8 },
                { characteristic: "max", condition: 120 },
                {
                  title: 'Cases',
                  expectation: 2,
                  level: 2,
                  rules: [
                    { characteristic: "uppercase", condition: 1 },
                    { characteristic: "lowercase", condition: 2 },
                  ]
                }
              ]
            },
            {
              title: 'Characters',
              expectation: 1,
              level: 1,
              rules: [
                { characteristic: "symbols", condition: 1 }
              ]
            },
          ]
        }
      ]
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
        <Row>
          <Column lg="6">
            <Card elevation="smallest">
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
                    defaultSelectedKey="light"
                    options={[
                      { key: 'light', text: 'Light' },
                      { key: 'dark', text: 'Dark' },
                      { key: 'custom', text: 'Custom' },
                    ]}
                  />
                </CardSection>
              </Spacing>
            </Card>
          </Column>
          <Column lg="6">
            <Card elevation="smallest">
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
            </Card>
          </Column>
        </Row>
      </StyledBox>
    </LayoutDashboard>
  );
};

const UserSettingsPage = React.memo(_UserSettingsPage);

export { UserSettingsPage };
