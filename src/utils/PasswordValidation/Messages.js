const strengthLevels = ['too short', 'weak', 'okay', 'good', 'strong'];

export default {
  strength: (count) => `Minimum strength level: <strong>${strengthLevels[count]}</strong>`, 
  length: ({ min, max }) => `Must be between ${min} and ${max} characters`, 
  uppercase: (count = 1) => `Must contain at least ${count} uppercase character(s)`, 
  lowercase: (count = 1) => `Must contain at least ${count} lowercase character(s)`,
  digits: (count = 1) => `Must contain at least ${count} digit(s)`,
  symbols: (count = 1) => `Must contain at least ${count} special character(s)`,
  whitespaces: (count = 0) => !count
    ? `Must not contain whitespaces`
    : `Maximum of ${count} whitespaces`,
}