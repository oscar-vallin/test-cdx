import React, { useState, useEffect, Fragment } from 'react';

import { ROUTES, ROUTE_USER_SETTINGS } from '../../data/constants/RouteConstants';
import { Icon } from '@fluentui/react/lib/Icon';

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

import { StyledBox, StyledTitle, StyledChoiceGroup, StyledSubTitle } from './UserSettingsPage.styles';

const breadcrumbItems = [ROUTE_USER_SETTINGS];

const themes = [
  {
    key: 'light',
    text: 'Light',
  },
  {
    key: 'dark',
    text: 'Dark',
  },
  {
    key: 'custom',
    text: 'Custom',
  },
];

const validationMessages = {
  min: (count) => `Minimum of ${count} characters`, 
  max: (count) => `Maximum of ${count} characters`, 
  uppercase: (count = 1) => `Must contain at least ${count} uppercase character(s)`, 
  lowercase: (count = 1) => `Must contain at least ${count} lowercase character(s)`,
  digits: (count = 1) => `Must contain at least ${count} digit(s)`,
  symbols: (count = 1) => `Must contain at least ${count} special character(s)`,
}

const _UserSettingsPage = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [validationRules, setValidationRules] = useState({});
  const [validationErrors, setValidationErrors] = useState([]);
  const [password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');
  const [isCalloutVisible, setIsCalloutVisible] = useState(false);

  return (
    <LayoutDashboard id="USER_SETTINGS">
      <PageHeader>
        <Breadcrumb items={breadcrumbItems} />
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
                        type="password"
                        label="Existing password"
                        canRevealPassword
                        required
                      />

                      <InputText
                        type="password"
                        label="New password"
                        canRevealPassword
                        required
                      />

                      <InputText
                        type="password"
                        label="Retype new password" 
                        canRevealPassword
                        required
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
                    options={themes}
                  />
                </CardSection>
              </Spacing>
            </Card>
          </Column>
          <Column lg="6">
            <Card elevation="smallest">
              <Spacing padding={{ left: 'small' }}>
                <CardSection>
                  <StyledTitle>Password rules</StyledTitle>

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
