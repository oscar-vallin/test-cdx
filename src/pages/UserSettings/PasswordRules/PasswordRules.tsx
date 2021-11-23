import { useEffect, useState } from 'react';
import {
  PasswordValidation,
  PasswordValidationRule,
  usePasswordValidationLazyQuery,
} from '../../../data/services/graphql';

import { StyledTitle } from '../UserSettingsPage.styles';
import { RuleGroup } from './RuleGroup';

import { useOrgSid } from '../../../hooks/useOrgSid';
import { Column, Row } from '../../../components/layouts';
import { RuleItems } from './RuleItems';

type PasswordRulesParam = {
  username: string;
  password: string;
  onChange: (passes: boolean) => void;
};

const PasswordRules = ({ username, password, onChange }: PasswordRulesParam) => {
  const { orgSid } = useOrgSid();
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
        orgSid,
        userName: username,
        password,
      },
    });
  }, [orgSid, username, password]);

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
        <Column lg="6">
          <RuleGroup title="Meet strength level" passes={rules?.passwordStrength?.passes ?? false}>
            <RuleItems items={passwordStrengthRuleItems()} />
          </RuleGroup>
        </Column>
        <Column lg="6">
          <RuleGroup
            title={someMustBeMetTitle(rules?.someMustBeMet?.requiredNumPassingRules ?? 1)}
            passes={rules?.someMustBeMet?.passes ?? false}
          >
            <RuleItems items={(rules?.someMustBeMet?.rules ?? []) as PasswordValidationRule[]} />
          </RuleGroup>
        </Column>
      </Row>
    </>
  );
};

export default PasswordRules;
