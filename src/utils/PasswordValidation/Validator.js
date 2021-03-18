import PasswordValidator from 'password-validator';
import ValidationMessages from './Messages';
class PasswordRulesValidator {
  constructor() {
    this.validator = new PasswordValidator();
  }

  validate(value, rules) {
    const getRule = (characteristic) => rules.find((rule) => rule.characteristic === characteristic);
    const contains = (characteristic) => getRule(characteristic) !== undefined;
    const getCondition = (characteristic) => getRule(characteristic).condition;

    if (contains('min')) {
      this.validator.is().min(getCondition('min'));
    }
  
    if (contains('max')) {
      this.validator.is().max(getCondition('max'));
    }
  
    if (contains('uppercase')) {
      this.validator.has().uppercase(getCondition('uppercase'));
    }
  
    if (contains('lowercase')) {
      this.validator.has().lowercase(getCondition('lowercase'));
    }
  
    if (contains('digits')) {
      this.validator.has().digits(getCondition('digits'));
    }
  
    if (contains('symbols')) {
      this.validator.has().symbols(getCondition('symbols'));
    }
  
    if (contains('whitespaces')) {
      this.validator.has().spaces(getCondition('whitespaces'));
    }

    return this.validator.validate(value, { list: true });
  }

  getValidationObj({ characteristic, condition }, validations) {
    return {
      characteristic,
      condition,
      message: ValidationMessages[characteristic](condition),
      isValid: validations.find(rule => rule === characteristic) === undefined,
    };
  }
}

export default new PasswordRulesValidator();