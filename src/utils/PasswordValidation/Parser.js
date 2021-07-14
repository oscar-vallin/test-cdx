const rules = {
  requiredStrengthLevel: 'strength',
  length: 'length',
  LOWER_CASE: 'lowercase',
  UPPER_CASE: 'uppercase',
  DIGIT: 'digits',
  SPECIAL: 'symbols',
  allowedWhitespace: 'whitespaces',
};
export default class ValidationRulesParser {
  static parse(rules = [], level = 0) {
    return rules
      .map((rule, index) => {
        if (rule.rules) {
          return {
            level,
            expectation: rule.numberOfCharacteristics,
            rules: ValidationRulesParser.parse(rule.rules, level + 1),
          };
        }

        return ValidationRulesParser.getRuleCharacteristics(rule, level);
      })
      .reduce((rules, rule) => [...rules, rule], []);
  }

  static getRuleCharacteristics(rule = {}, level) {
    switch (rule.__typename) {
      case 'PasswordStrengthRule':
        return [
          {
            level,
            characteristic: rules.requiredStrengthLevel,
            condition: rule.requiredStrengthLevel - 1,
          },
        ];
      case 'PasswordLengthRule':
        return [
          {
            level,
            characteristic: rules.length,
            condition: { min: rule.minLength, max: rule.maxLength },
          },
        ];
      case 'PasswordCharacterRule':
        return [
          {
            level,
            characteristic: rules[rule.characterType],
            condition: rule.numberOfCharacters,
          },
        ];
      case 'PasswordWhitespaceRule':
        return [
          {
            characteristic: rules.allowedWhitespace,
            condition: rule.allowedWhitespace !== 'NONE' ? Number(rule.allowedWhitespace) : 0,
          },
        ];
      default:
        return [];
    }
  }
}
