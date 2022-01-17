import { useEffect, useState } from 'react';
import { PasswordValidation, PasswordValidationRule, usePasswordValidationLazyQuery } from 'src/data/services/graphql';

import { Column, Row } from 'src/components/layouts';
import { SessionUser } from 'src/store/SessionStore/SessionTypes';
import { IStackItemStyles, IStackTokens, Stack } from '@fluentui/react';
import { StyledTitle } from 'src/pages/Admin/DashboardSite/DefaultTheme/DefaultThemePage.styles';
import { CompositeRulesSeparator } from '../UserSettingsPage.styles';
import { RuleGroup } from './RuleGroup';

import { RuleItems } from './RuleItems';

type PasswordRulesParam = {
  user: SessionUser;
  password: string;
  onChange: (passes: boolean) => void;
};

const PasswordRules = ({ user, password, onChange }: PasswordRulesParam) => {
  const [rules, setRules] = useState<PasswordValidation>();
  const [apiCall, { data, loading }] = usePasswordValidationLazyQuery();

  const mustBeMetTitle = () => {
    return (
      <span>
        Meet <strong>all</strong> of these
      </span>
    );
  };

  const someMustBeMetTitle = (requiredNumPassingRules: number) => {
    return (
      <span>
        Meet <strong>{requiredNumPassingRules}</strong> of these
      </span>
    );
  };

  useEffect(() => {
    apiCall({
      variables: {
        orgSid: user.orgSid ?? '',
        userSid: user.id ?? '',
        password,
      },
    });
  }, [user, password]);

  useEffect(() => {
    if (!loading && data) {
      const passwordValidation = data.passwordValidation ?? {
        passes: false,
      };
      setRules(passwordValidation);
      onChange(passwordValidation.passes);
    }
  }, [loading, data]);

  const passwordStrengthRuleItems = (): PasswordValidationRule[] => {
    const rule: PasswordValidationRule = {
      passes: rules?.passwordStrength?.passes ?? false,
      label: `Minimum Strength: ${rules?.passwordStrength?.minPasswordComplexity}`,
    };

    return [rule];
  };

  const stackItemStyles: IStackItemStyles = {
    root: {
      alignItems: 'top',
      display: 'flex',
      justifyContent: 'center',
    },
  };

  const compositeRuleSepStyle: IStackItemStyles = {
    root: {
      alignItems: 'center',
      display: 'flex',
      justifyContent: 'center',
    },
  };

  // Tokens definition
  const stackTokens: IStackTokens = {
    childrenGap: 10,
    padding: 10,
  };

  return (
    <>
      <StyledTitle id="__userSettings_Password_rules">Password rules</StyledTitle>
      <Row>
        <Column lg="12">
          <RuleGroup title={mustBeMetTitle()} passes={rules?.mustAlwaysBeMet?.passes ?? false}>
            <RuleItems items={(rules?.mustAlwaysBeMet?.rules ?? []) as PasswordValidationRule[]} />
          </RuleGroup>
        </Column>
      </Row>
      <Row>
        <Stack horizontal tokens={stackTokens}>
          <Stack.Item grow={3} styles={stackItemStyles}>
            <RuleGroup title="Meet strength level" passes={rules?.passwordStrength?.passes ?? false}>
              <RuleItems items={passwordStrengthRuleItems()} />
            </RuleGroup>
          </Stack.Item>
          <Stack.Item disableShrink styles={compositeRuleSepStyle}>
            <CompositeRulesSeparator>or</CompositeRulesSeparator>
          </Stack.Item>
          <Stack.Item grow={3} styles={stackItemStyles}>
            <RuleGroup
              title={someMustBeMetTitle(rules?.someMustBeMet?.requiredNumPassingRules ?? 1)}
              passes={rules?.someMustBeMet?.passes ?? false}
            >
              <RuleItems items={(rules?.someMustBeMet?.rules ?? []) as PasswordValidationRule[]} />
            </RuleGroup>
          </Stack.Item>
        </Stack>
      </Row>
    </>
  );
};

export default PasswordRules;
