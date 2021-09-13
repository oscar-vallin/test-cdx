/* eslint-disable no-shadow */
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
      .map((_rule) => {
        if (_rule.rules) {
          return {
            level,
            expectation: _rule.numberOfCharacteristics,
            rules: ValidationRulesParser.parse(_rule.rules, level + 1),
          };
        }

        return ValidationRulesParser.getRuleCharacteristics(_rule, level);
      })
      .reduce((_rules, _rule) => [..._rules, _rule], []);
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
