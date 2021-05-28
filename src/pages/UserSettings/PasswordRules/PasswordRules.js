import React, { useState, useEffect, useCallback, Fragment } from 'react';
import PasswordStrengthBar from 'react-password-strength-bar';
import chroma from 'chroma-js';
import _ from 'lodash';

import { List } from '@fluentui/react';
import { useChangeOwnPasswordPageQuery } from '../../../data/services/graphql';

import { CardSection } from '../../../components/cards';
import { Spacing } from '../../../components/spacings/Spacing';
import { Spinner } from '../../../components/spinners/Spinner';
import { Text } from '../../../components/typography/Text';

import { StyledTitle, StyledIcon } from './../UserSettingsPage.styles';

import {
  PasswordValidator,
  ValidationMessages,
  ValidationRulesParser,
} from './../../../utils/PasswordValidation';

const isArrayOfArrays = arr => arr.filter(item => Array.isArray(item)).length > 0;

const isValid = (rules) => {
  const { expectation, ruleCount, validations } = PasswordValidator
    .getValidationStatus({ rules })
    .reduce((count, { expectation, isValid }) => {
      return ({
        expectation: count.expectation + (Array.isArray(rules))
          ? PasswordValidator.countExpectations(rules)
          : expectation,
        ruleCount: Array.isArray(rules)
          ? rules.map(PasswordValidator.countRulesets)
          : 0,
        validations: [
          ...count.validations,
          ...isValid
            .reduce((arr, item) => [...arr, ...PasswordValidator.flattenValidations(item)], [])
        ],
      });
    }, { expectation: 0, ruleCount: 0, validations: [] });


  const baseChildRules = _.flattenDeep(ruleCount)[0] - rules[0].rules.length;

  const childRules = baseChildRules === 0 ? baseChildRules : baseChildRules + 1;
  const childExpectations = expectation - rules[0].expectation;
  const allowedChildFailures = childRules - childExpectations;

  const currentRuleCount = rules[0].rules.length;
  const currentValidationCount = rules[0].validations.length;
  const currentAllowedFailures = currentRuleCount - rules[0].expectation;

  // console.log('asd', {
  //   ruleCount: _.flattenDeep(ruleCount)[0],
  //   expectation,
  //   validations: currentValidationCount,
  //   allowedChildFailures: allowedChildFailures,
  //   currentAllowedFailures: currentAllowedFailures,
  //   currentRuleCount: currentRuleCount,
  //   currentExpectation: rules[0].expectation,
  //   differential: baseChildRules === 0 ? 0 : rules[0].expectation,

  //   exp: `${currentValidationCount} - ${allowedChildFailures} <= (${currentAllowedFailures} + ${baseChildRules === 0 ? 0 : rules[0].expectation})`,
  //   exp2: `${currentValidationCount - allowedChildFailures}  <= (${currentAllowedFailures + (baseChildRules === 0 ? 0 : rules[0].expectation)})`,
  //   result: (currentValidationCount - allowedChildFailures) <= (currentAllowedFailures + baseChildRules === 0 ? 0 : rules[0].expectation),
  // })

  const x = _.flattenDeep(ruleCount)[0] - (expectation - (allowedChildFailures - (!baseChildRules ? 0 : currentAllowedFailures)));

  console.log({
    x,
    ruleCount: _.flattenDeep(ruleCount)[0],
    expectation,
    vals: rules[0].validations,
    allowedChildFailures,
    currentAllowedFailures,
    baseChildRules,
    exp: `(${x} + 
      ${(rules[0].level === 0 ? 1 : 0)}) >= 
      (${rules[0].validations.length} - 
        (${baseChildRules === 0
          ? 0
          : (allowedChildFailures +
            (!baseChildRules ? 0 : currentAllowedFailures))}))`.replace(/(\r\n|\n|\r)/gm, "").replace(/\s/g, "")
  })

  return {
    ruleCount,
    expectation,
    valid: (
      x + (rules[0].level === 0
        ? 1
        : !baseChildRules ? 0 : -1)
      ) >=
      (rules[0].validations.length -
        (!baseChildRules
          ? 0
          : (allowedChildFailures +
            (!baseChildRules ? 0 : currentAllowedFailures)
          )
        )
      )
  };
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

  const rootValidations = Array.from(
    new Set(validationResults
      .filter(validation => !isArrayOfArrays(validation))
      .reduce((rules, rule) => [...rules, ...rule], [])
    )
  );

  const ruleObj = {
    ...ruleSet,
    validations: rootValidations,
    rules: ruleSet
      .rules
      .map((rule, index) => {
        const item = Array.isArray(rule) ? rule : [rule];

        return item.map(rule => {
          if (rule.rules) {
            return validateRulesArr(value, item);
          }

          const validations = isArrayOfArrays(validationResults[index])
            ? validationResults[index].reduce((rules, rule) => [...rules, ...rule], [])
            : validationResults[index];

          return {
            ...rule,
            ...(rule.rules)
              ? {
                validations: Array.from(new Set(validations)),
                isValid: isValid(rule.rules).valid,
                acceptable: isValid(rule.rules).expectation,
              }
              : {},
            message: ValidationMessages[rule.characteristic](rule.condition),
          };
        });
      })
      .reduce((rules, rule) => [...rules, ...rule], []),
  }

  const results = isValid([ruleObj]);

  return { ...ruleObj, isValid: results.valid, acceptable: results.acceptable };
});


const PasswordRules = ({ validations, password, onChange }) => {
  const [rules, setRules] = useState([]);
  const { data, loading, error } = useChangeOwnPasswordPageQuery();

  const onRenderCell = (item, index) => {
    return (
      <div style={{
        background: chroma('#eee').darken(0.15 * item.level),
        border: `1px solid ${chroma('#ddd').darken(0.15 * item.level)}`,
        borderRadius: 5,
        padding: `10px 15px 15px`,
        margin: `30px 0 0 0`,
        position: 'relative',
      }} key={index}>
        <Spacing margin={{ top: 'small', bottom: 'normal' }}>
          <Text style={{
            display: 'flex',
            alignItems: 'center',
            border: `1px solid ${chroma('#ddd').darken(0.15 * item.level)}`,
            borderRadius: 5,
            position: 'absolute',
            top: '-15px',
            background: '#f5f5f5',
            padding: '5px 10px',
          }}>
            {item.isValid
              ? <StyledIcon iconName="StatusCircleCheckmark" />
              : <StyledIcon iconName="StatusCircleErrorX" />}

            <div>
              Meet <strong>{
                item.level === 0 ? 'all' : item.level === 1 ? 'any' : item.expectation
              }</strong> of these
            </div>
          </Text>
        </Spacing>

        {
          item.rules
            ? item.rules.map((rule, ruleIndex) => {
              if (Array.isArray(rule)) {
                return rule.map(onRenderCell);
              } else {
                if (rule.characteristic === 'strength') {
                  return (
                    <div key={ruleIndex}>
                      <div style={{
                        display: 'flex',
                        alignItems: 'center',
                      }}>
                        {
                          !item.validations.includes(rule.characteristic)
                            ? <StyledIcon iconName="StatusCircleCheckmark" />
                            : <StyledIcon iconName="StatusCircleErrorX" />
                        }

                        <div dangerouslySetInnerHTML={{ __html: rule.message }} />
                      </div>

                      <PasswordStrengthBar
                        password={password}
                        style={{ margin: '15px 0 0', width: '50%' }}
                      />
                    </div>
                  )
                }

                return (
                  <div
                    key={ruleIndex}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                    }}
                  >
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

  useEffect(() => {
    if (!loading && data) {
      setRules(
        ValidationRulesParser.parse([data.changeOwnPasswordPage.ruleGroup])
      );
    }
  }, [loading, data]);

  useEffect(
    () => onChange(validateRulesArr(password, rules)),
    [password, rules]
  );

  return (
    <CardSection>
      <StyledTitle>Password rules</StyledTitle>

      <Spacing margin={{ top: "normal" }}>
        {
          loading
            ? (
              <Spacing margin={{ top: 'normal' }}>
                <Spinner size="lg" label="Loading rules" />
              </Spacing>
            )
            : <List items={validations} onRenderCell={onRenderCell} />
        }
      </Spacing>
    </CardSection>
  );
}

export default PasswordRules;