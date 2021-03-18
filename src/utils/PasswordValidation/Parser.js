const rules = {
  minLength: 'min',
  maxLength: 'max',
  LOWER_CASE: 'lowercase',
  UPPER_CASE: 'uppercase',
  DIGIT: 'digits',
  SPECIAL: 'symbols',
}

export default class ValidationRulesParser {
  static parse(rules = []) {
    return rules
      .map(ValidationRulesParser.getRuleCharacteristics)
      .reduce((rules, rule) => [...rules, ...rule], []);
  }

  static getRuleCharacteristics(rule = {}) {
    switch(rule.__typename) {
      case 'PasswordLengthRule':
        return [
          { characteristic: rules.minLength, condition: rule.minLength },
          { characteristic: rules.maxLength, condition: rule.maxLength },
        ];
      case 'PasswordCharacterRule':
        return [
          {
            characteristic: rules[rule.characterType],
            condition: rule.numberOfCharacters
          }
        ]
      default:
        return [];
    }
  }
}