import React, { useState, useEffect, useCallback, Fragment } from 'react';

import { ROUTE_USER_SETTINGS } from '../../data/constants/RouteConstants';
import { 
  List,
  Icon,
} from '@fluentui/react';
import PasswordValidator from 'password-validator';

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
import { Spinner } from '../../components/spinners/Spinner';
import { Separator } from '../../components/separators/Separator';
import { Tabs } from '../../components/tabs/Tabs';
import { Text } from '../../components/typography/Text';

import { StyledBox, StyledTitle, StyledChoiceGroup, StyledIcon } from './UserSettingsPage.styles';
import {
  RulesValidator,
  ValidationMessages,
  ValidationRulesParser,
} from './../../utils/PasswordValidation';

const getValidationObj = ({ characteristic, condition }, validations) => {
  console.log(characteristic);
  return {
    characteristic,
    condition,
    message: ValidationMessages[characteristic](condition),
    isValid: validations.find(rule => rule === characteristic) === undefined,
  };
}

const _UserSettingsPage = () => {
  const [rules, setRules] = useState([
    // { characteristic: 'strength', condition: 3 },
    { characteristic: 'min', condition: 8 },
    { characteristic: 'max', condition: 120 },
    { characteristic: 'lowercase', condition: 3 },
    { characteristic: 'uppercase', condition: 1 },
    { characteristic: 'symbols', condition: 1 },
    { characteristic: 'digits', condition: 1 }
  ]);

  const [validations, setValidations] = useState([]);
  const [password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');
  const [currentPassword, setCurrentPassword] = useState('');

  const validatePassword = (value, rules) => {
    const validator = new PasswordValidator();
    
    const getRule = (characteristic) => rules.filter((rule) => rule.characteristic === characteristic);
    const contains = (characteristic) => getRule(characteristic).length > 0;
    const getCondition = (characteristic) => getRule(characteristic).pop().condition;

    if (contains('min')) {
      validator.is().min(Number(getCondition('min')))
    }
  
    if (contains('max')) {
      validator.is().max(Number(getCondition('max')))
    }
  
    if (contains('uppercase')) {
      validator.has().uppercase(Number(getCondition('uppercase')));
    }
  
    if (contains('lowercase')) {
      validator.has().lowercase(Number(getCondition('lowercase')));
    }
  
    if (contains('digits')) {
      validator.has().digits(Number(getCondition('digits')));
    }
  
    if (contains('symbols')) {
      validator.has().symbols(Number(getCondition('symbols')));
    }
  
    if (contains('whitespaces')) {
      validator.has().spaces(Number(getCondition('whitespaces')));
    }

    setValidations(validator.validate(value, { list: true }));
  };

  const onRenderCell = useCallback((item, index) => {
    return (
      <div style={{ display: 'flex', alignItems: 'center' }}>
        { 
          item.isValid
            ? <StyledIcon iconName="StatusCircleCheckmark" />
            : <StyledIcon iconName="StatusCircleErrorX" />
        }
  
        {item.message}
      </div>
    );
  }, []);

  const getFieldMessages = callback => value => new Promise((resolve) => {
    if (!value) {
      resolve('Required field');
    }

    if (callback) {
      resolve(callback(value));
    }
  });

  useEffect(() => validatePassword(password, rules), [password, rules]);

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
                        onGetErrorMessage={getFieldMessages()}
                      />

                      <InputText
                        required
                        type="password"
                        label="Password"
                        value={password}
                        canRevealPassword
                        onChange={({ target }) => setPassword(target.value)}
                        onGetErrorMessage={getFieldMessages(
                          value => validations.length > 0
                            ? "Please fulfill the password requirements"
                            : null 
                        )}
                      />

                      <InputText
                        required
                        type="password"
                        label="Retype new password" 
                        canRevealPassword
                        value={passwordConfirmation}
                        onChange={({ target }) => setPasswordConfirmation(target.value)}
                        onGetErrorMessage={getFieldMessages(
                          value => password !== value ? "Passwords don't match" : null 
                        )}
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
                      items={rules.map((rule) => getValidationObj(rule, validations))}
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
