import PasswordValidator from 'password-validator';
import zxcvbn from 'zxcvbn';

class PasswordRulesValidator {
  /* Validates a value against a set of rules */
  static validate(value, rules) {
    const validator = new PasswordValidator();
    const strength = [];
    
    const getRule = (characteristic) => rules.find((rule) => rule.characteristic === characteristic);
    const contains = (characteristic) => getRule(characteristic) !== undefined;
    const getCondition = (characteristic) => getRule(characteristic).condition;

    if (contains('strength')) {
      if (zxcvbn(value).score < getCondition('strength')) {
        strength.push('strength');
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
  
    if (contains('whitespaces')) {
      const whitespaces = getCondition('whitespaces');

      (!whitespaces) 
        ? validator.has().not().spaces()  
        : validator.has().spaces();
    }

    return [...strength, ...validator.validate(value, { list: true })];
  }
  
  /* Checks if a set of validations fulfills its required set of characteristics */
  static getValidationStatus(data = {}) {
    return data.rules.map(ruleSet => {
      const item = Array.isArray(ruleSet) ? ruleSet[0] : ruleSet;

      if(item.rules) {
        return PasswordRulesValidator.getValidationStatus(item)
          .reduce((validations, isValid) => [...validations, isValid], []);
      }

      return (data.expectation && data.expectation > 0)
        ? (data.rules.length - data.expectation) >= data.validations.length
        : data.validations.length !== 0
    });
  }
}

export default PasswordRulesValidator;