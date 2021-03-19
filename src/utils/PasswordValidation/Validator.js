import PasswordValidator from 'password-validator';
import ValidationMessages from './Messages';

const validateRulesets = (value, ruleSets) => {
  return ruleSets.map(ruleSet => {
    if (ruleSet.rules) {
      return validateRulesets(value, ruleSet.rules).filter(validation => validation.length > 0);
    }

    return Validator.validate(value, [ruleSet]);
  })
}

class PasswordRulesValidator {
  /* Validates a value against a set of rules */
  static validate(value, rules) {
    const validator = new PasswordValidator();
    
    const getRule = (characteristic) => rules.find((rule) => rule.characteristic === characteristic);
    const contains = (characteristic) => getRule(characteristic) !== undefined;
    const getCondition = (characteristic) => getRule(characteristic).condition;

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
  
    if (contains('whitespaces')) {
      const whitespaces = getCondition('whitespaces');

      (!whitespaces) 
        ? validator.has().not().spaces()  
        : validator.has().spaces();
    }

    return validator.validate(value, { list: true });
  }
  
  /* Checks if a set of validations fulfills its required set of characteristics */
  static getValidationStatus(data = {}) {
    return data.rules.map(ruleSet => {
      if(ruleSet.rules) {
        return PasswordRulesValidator.getValidationStatus(ruleSet)
          .reduce((validations, isValid) => [...validations, isValid], []);
      }
      
      return (ruleSet.expectation && ruleSet.expectation > 0)
        ? (ruleSet.rules.length - ruleSet.expectation) >= data.validations.length
        : data.validations.length !== 0
    });
  }
}

export default PasswordRulesValidator;