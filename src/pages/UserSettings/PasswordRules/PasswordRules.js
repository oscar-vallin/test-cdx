import React, { useState, useEffect, useCallback, Fragment } from 'react';
import PasswordStrengthBar from 'react-password-strength-bar';
import { List } from '@fluentui/react';
import { useChangeOwnPasswordPageQuery } from '../../../data/services/graphql';

import { CardSection } from '../../../components/cards';
import { Spacing } from '../../../components/spacings/Spacing';

import { StyledTitle, StyledIcon } from './../UserSettingsPage.styles';

import {
  PasswordValidator,
  ValidationMessages,
  ValidationRulesParser,
} from './../../../utils/PasswordValidation';
import { validate } from 'graphql';

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
                isValid: isValid(rule.rules),
              }
              : {},
              message: ValidationMessages[rule.characteristic](rule.condition),
          };
        });
      })
      .reduce((rules, rule) => [...rules, ...rule], []),
  }

  return { ...ruleObj, isValid: isValid([ruleObj]) };
});


const PasswordRules = ({ validations, password, onChange }) => {
  const [rules, setRules] = useState([]);
  const { data, loading, error } = useChangeOwnPasswordPageQuery();

  const onRenderCell = (item, index) => {
    return (
      <div style={{marginLeft: `${item.level * 15}px`}} key={index}>
        {item.title && <h5 style={{ margin: '15px 0 5px' }}>
          {/* {item.isValid
            ? <StyledIcon iconName="StatusCircleCheckmark" />
            : <StyledIcon iconName="StatusCircleErrorX" />} */}
  
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
                      <div key={ruleIndex}>
                        <div style={{ display: 'flex', alignItems: 'center' }}>
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
        <List items={validations} onRenderCell={onRenderCell} />
      </Spacing>
    </CardSection>
  );
}

export default PasswordRules;