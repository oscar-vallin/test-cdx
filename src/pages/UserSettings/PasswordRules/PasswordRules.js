/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/no-danger */
import { useState, useEffect } from 'react';
import PasswordStrengthBar from 'react-password-strength-bar';
import _ from 'lodash';

import { List } from '@fluentui/react';
import { useChangeOwnPasswordPageQuery } from '../../../data/services/graphql';

import { CardSection } from '../../../components/cards';
import { Spacing } from '../../../components/spacings/Spacing';
import { Spinner } from '../../../components/spinners/Spinner';

import { StyledTitle, StyledIcon } from '../UserSettingsPage.styles';
import { RuleGroup } from './RuleGroup';

import { PasswordValidator, ValidationMessages, ValidationRulesParser } from '../../../utils/PasswordValidation';

const isArrayOfArrays = (arr) => arr.filter((item) => Array.isArray(item)).length > 0;

const validateRulesets = (value, ruleSets) => {
  return ruleSets.map((ruleSet) => {
    if (ruleSet.rules) {
      return validateRulesets(value, ruleSet.rules)
        .filter((validation) => validation.length > 0)
        .reduce((arr, item) => [...arr, ...(item || [])], []);
    }

    return PasswordValidator.validate(value, ruleSet);
  });
};

const validateRulesArr = (value, data) =>
  data.map((ruleSet) => {
    const validationResults = validateRulesets(value, ruleSet.rules);
    const rootValidations = Array.from(
      new Set(
        validationResults
          .filter((validation) => !isArrayOfArrays(validation))
          .reduce((rules, rule) => [...rules, ...rule], [])
      )
    );

    const ruleObj = {
      ...ruleSet,
      validations: rootValidations,
      rules: ruleSet.rules
        .map((rule, index) => {
          const item = Array.isArray(rule) ? rule : [rule];

          return item.map((rule) => {
            if (rule.rules) {
              return validateRulesArr(value, item);
            }

            const validations = isArrayOfArrays(validationResults[index])
              ? validationResults[index].reduce((rules, rule) => [...rules, ...rule], [])
              : validationResults[index];

            const isValid = !validations.includes(rule.characteristic);

            return {
              ...rule,
              isValid,
              message: ValidationMessages[rule.characteristic](rule.condition),
              ...(rule.rules
                ? {
                    validations: Array.from(
                      new Set(validations.map((validation) => validation.includes(rule.characteristic)))
                    ),
                  }
                : {}),
            };
          });
        })
        .reduce((rules, rule) => [...rules, ...rule], []),
    };

    const currentLevelRules = ruleObj.rules.filter((rule) => !Array.isArray(rule)).map((rule) => rule.characteristic);
    const childRules = _.flatten(ruleObj.rules.filter((rule) => Array.isArray(rule)));

    const currentLevelValidations = ruleObj.validations.filter((validation) => currentLevelRules.includes(validation));

    const currentValidationResults = childRules.length
      ? [
          currentLevelValidations.length <=
            currentLevelRules.length - (ruleObj.expectation - (ruleObj.level === 0 ? 1 : 0)),
          ...[childRules[0]?.isCurrentLevelValid],
        ]
      : [currentLevelValidations.length <= currentLevelRules.length - ruleObj.expectation];

    const isCurrentLevelValid = !childRules.length
      ? currentValidationResults[0]
      : _.flattenDeep(currentValidationResults).filter(Boolean).length >=
        ruleObj.expectation - (ruleObj.level === 0 ? 1 : 0);

    return { ...ruleObj, isCurrentLevelValid };
  });

const PasswordRules = ({ validations, password, onChange }) => {
  const [rules, setRules] = useState([]);
  const { data, loading } = useChangeOwnPasswordPageQuery();

  const onRenderCell = (item, index) => {
    return (
      <RuleGroup item={item} key={index}>
        {item.rules ? (
          item.rules.map((rule, ruleIndex) => {
            if (Array.isArray(rule)) {
              return rule.map(onRenderCell);
            }
            if (rule.characteristic === 'strength') {
              return (
                <div key={ruleIndex}>
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                    }}
                  >
                    {!item.validations.includes(rule.characteristic) ? (
                      <StyledIcon iconName="StatusCircleCheckmark" />
                    ) : (
                      <StyledIcon iconName="StatusCircleErrorX" />
                    )}

                    <div dangerouslySetInnerHTML={{ __html: rule.message }} />
                  </div>

                  <PasswordStrengthBar password={password} style={{ margin: '15px 0 0', width: '50%' }} />
                </div>
              );
            }

            return (
              <div key={ruleIndex} style={{ display: 'flex', alignItems: 'center' }}>
                {!item.validations.includes(rule.characteristic) ? (
                  <StyledIcon iconName="StatusCircleCheckmark" />
                ) : (
                  <StyledIcon iconName="StatusCircleErrorX" />
                )}

                {rule.message}
              </div>
            );
          })
        ) : (
          <div style={{ display: 'flex', alignItems: 'center' }}>
            {item.isValid ? (
              <StyledIcon iconName="StatusCircleCheckmark" />
            ) : (
              <StyledIcon iconName="StatusCircleErrorX" />
            )}

            {item.message}
          </div>
        )}
      </RuleGroup>
    );
  };

  useEffect(() => {
    if (!loading && data) {
      setRules(ValidationRulesParser.parse([data.changeOwnPasswordPage.ruleGroup]));
    }
  }, [loading, data]);

  useEffect(() => onChange(validateRulesArr(password, rules)), [password, rules]);

  return (
    <CardSection>
      <StyledTitle>Password rules</StyledTitle>

      <Spacing margin={{ top: 'normal' }}>
        {loading ? (
          <Spacing margin={{ top: 'normal' }}>
            <Spinner size="lg" label="Loading rules" />
          </Spacing>
        ) : (
          <List items={validations} onRenderCell={onRenderCell} />
        )}
      </Spacing>
    </CardSection>
  );
};

export default PasswordRules;
