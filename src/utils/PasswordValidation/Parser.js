export default class ValidationRulesParser {
  static parse(rule) {
    switch(rule.__typename) {
      case 'PasswordStrengthRule':
        return { strength: rule.requiredStrengthLevel };
      case 'PasswordLengthRule':
        return { min: rule.minLength, max: rule.maxLength };
      case 'PasswordCharacterRule':
        switch(rule.characterType) {
          case 'UPPER_CASE':
            return { uppercase: rule.numberOfCharacters };
          case 'LOWER_CASE':
            return { lowercase: rule.numberOfCharacters };
          case 'DIGIT':
            return { digits: rule.numberOfCharacters };
          case 'SPECIAL':
            return { symbols: rule.numberOfCharacters };
          default:
            return {};
          }
      case 'PasswordWhitespaceRule':
        return { spaces: (rule.allowedWhitespace !== 'NONE')
          ? rule.allowedWhitespace
          : 0
        }
      default: 
        return {};
    }
  }
}