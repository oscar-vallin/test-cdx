import PasswordValidator from 'password-validator';
import zxcvbn from 'zxcvbn';
import _ from 'lodash';
class PasswordRulesValidator {
  static countRulesets = (rules) => {
    const data = Array.isArray(rules) ? rules : [rules];

    return _
      .chain(data)
      .map(rule => (Array.isArray(rule))
        ? PasswordRulesValidator.countRulesets(rule)
        : rule.rules
          ? PasswordRulesValidator.countRulesets(rule.rules)
          : rule.level !== 0 ? 1 : 1 //ou 0 
      )
      .flattenDeep()
      .sum()
      .value()
  }

  static countExpectations = (rule) => {
    const data = Array.isArray(rule) ? rule[0] : rule;

    if (!data.rules) {
      return 0;
    }

    const expectations = data
      .rules
      .map(PasswordRulesValidator.countExpectations)

    return _
      .chain([data.expectation, ...expectations])
      .flattenDeep()
      .sum()
      .value()
  }

  static flattenValidations(item) {
    const items = (typeof item === 'object')
      ? item.isValid ? item.isValid.map(PasswordRulesValidator.flattenValidations) : item.validations
      : [item];

    return items.reduce((arr, item) => [...arr, ...Array.isArray(item) ? item : [item]], []);
  }

  /* Validates a value against a set of rules */
  static validate(value, rules) {
    const validator = new PasswordValidator();
    const manualValidations = [];
    
    const getRule = (characteristic) => rules.find((rule) => rule.characteristic === characteristic);
    const contains = (characteristic) => getRule(characteristic) !== undefined;
    const getCondition = (characteristic) => getRule(characteristic).condition;


    if (contains('strength')) {
      if (zxcvbn(value).score < getCondition('strength')) {
        manualValidations.push('strength');
      }
    }

    if (contains('whitespaces')) {
      const allowedWhitespaces = getCondition('whitespaces');
      const whitespaces = value.match(/\s/g);

      if (Array.isArray(whitespaces) && whitespaces[0].length > allowedWhitespaces) {
        manualValidations.push('whitespaces');
      }
    }

    if (contains('length')) {
      const { min, max } = getCondition('length');

      if (value.length < min || value.length > max) {
        manualValidations.push('length');
      }
    }

    if (contains('min')) {
      validator.is().min(getCondition('min'));
    }
  
    if (contains('max')) {
      validator.is().max(getCondition('max'));
    }
  
    if (contains('uppercase')) {
      validator.has().uppercase(getCondition('uppercase'));
    }
  
    if (contains('lowercase')) {
      validator.has().lowercase(getCondition('lowercase'));
    }
  
    if (contains('digits')) {
      validator.has().digits(getCondition('digits'));
    }
  
    if (contains('symbols')) {
      validator.has().symbols(getCondition('symbols'));
    }

    return [
      ...Array.from(new Set(manualValidations)),
      ...validator.validate(value, { list: true })
    ];
  }
  
  /* Checks if a set of validations fulfills its required set of characteristics */
  static getValidationStatus(data = {}) {
    return data.rules.map(ruleSet => {
      const item = Array.isArray(ruleSet) ? ruleSet[0] : ruleSet;

      if(item.rules) {
        return {
          expectation: item.expectation,
          isValid: PasswordRulesValidator
            .getValidationStatus(item)
            .reduce((validations, isValid) => [...validations, isValid], []),
        }
      } 

      const { rules, expectation, validations } = data;

      return (expectation && expectation > 0)
        ? (rules.length - expectation) >= validations.length
        : validations.length !== 0
    });
  }
}

export default PasswordRulesValidator;