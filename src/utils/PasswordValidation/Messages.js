export default {
  min: (count) => `Minimum of ${count} characters`, 
  max: (count) => `Maximum of ${count} characters`, 
  uppercase: (count = 1) => `Must contain at least ${count} uppercase character(s)`, 
  lowercase: (count = 1) => `Must contain at least ${count} lowercase character(s)`,
  digits: (count = 1) => `Must contain at least ${count} digit(s)`,
  symbols: (count = 1) => `Must contain at least ${count} special character(s)`,
}