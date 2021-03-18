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
  ValidationRulesParser,
} from './../../utils/PasswordValidation';

const _UserSettingsPage = () => {
  const [rules, setRules] = useState([]);

  const [validations, setValidations] = useState([]);
  const [password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');
  const [currentPassword, setCurrentPassword] = useState('');

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

  useEffect(async () => {
    const response = await fetch('/nested-password.json');
    const { data } = await response.json();

    setRules(
      ValidationRulesParser.parse(data.changeOwnPasswordPage2.ruleGroup.rules)
    );
  }, []);

  useEffect(
    () => setValidations(PasswordValidator.validate(password, rules)),
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
                        // onGetErrorMessage={getFieldMessages()}
                      />

                      <InputText
                        required
                        type="password"
                        label="Password"
                        value={password}
                        canRevealPassword
                        onChange={({ target }) => setPassword(target.value)}
                        // onGetErrorMessage={getFieldMessages(
                        //   value => validations.length > 0
                        //     ? "Please fulfill the password requirements"
                        //     : null 
                        // )}
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
                      items={rules.map((rule) => PasswordValidator.getValidationObj(rule, validations))}
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
