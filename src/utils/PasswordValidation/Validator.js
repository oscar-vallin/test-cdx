import ValidationRulesParser from './Parser';

const getRulesObj = (data) => {
  const values = Object.values(data);
  
  if (values.length === 1) {
    return Object.values(data).pop().ruleGroup;
  }
  
  return data;
}

export default class RulesValidator {
  static parse(data) {
    const { numberOfCharacteristics, rules } = getRulesObj(data) ;
    
    let result = { numberOfCharacteristics };
    
    rules.forEach((rule, index) => {
      if (rule.__typename !== 'PasswordRuleGroup') {
        result = { ...result, ...ValidationRulesParser.parse(rule) };
      } else {
        result[`group${index}`] = PasswordValidator.parse(rule);
      }
    });
    
    return result;
  }
  
  static _getRuleObj(data) {
    const values = Object.values(data);
    
    if (values.length === 1) {
      return Object.values(data).pop().ruleGroup;
    }
    
    return data;
  }
}