const { gql } = require('apollo-server');

module.exports = gql`
  type Query {
    beginLogin(userId: String!): LoginStep
    changeOwnPasswordPage: PasswordPage
    changeOwnPasswordPage2: PasswordPage2
    fileList: [File]
    fileGet(id: ID!): File
  }

  type Mutation {
    passwordLogin(userId: String!, password: String!): TokenUser
    fileUpdate(id: ID!, name: String, status: String): File
  }

  type LoginStep {
    userId: String!
    step: Int!
    redirectPath: String
    allowLostPassword: Boolean
  }

  type PasswordPage {
    strengthLevel: Int
    minLength: Int
    maxLength: Int
    minCharUpper: Int
    minCharLower: Int
    minCharDigit: Int
    minCharSpecial: Int
    strengthConjunction: Conjunction
  }

  type PasswordPage2 {
    ruleGroup: PasswordRuleGroup!
  }

  type PasswordRuleGroup {
    """
    number of rule predicates that must be true for the group to pass
    if numberOfCharacteristics is omitted all rules are required
    """
    numberOfCharacteristics: Int
    """
    list of rules or rule sub groups
    """
    rules: [PasswordRule]
  }

  type PasswordLengthRule {
    minLength: Int
    maxLength: Int
  }

  type PasswordWhitespaceRule {
    allowedWhitespace: WhitespaceRuleType
  }

  type PasswordCharacterRule {
    characterType: PasswordCharacterType
    numberOfCharacters: Int
  }

  type PasswordStrengthRule {
    requiredStrengthLevel: Int!
  }

  type TokenUser {
    token: String
    session: UserSession
  }

  type UserSession {
    id: ID!
    userId: String!
    defaultAuthorities: [String]
  }

  enum Conjunction {
    OR
    AND
  }

  enum WhitespaceRuleType {
    NONE
  }

  enum PasswordCharacterType {
    UPPER_CASE
    LOWER_CASE
    DIGIT
    SPECIAL
  }

  union PasswordRule =
      PasswordLengthRule
    | PasswordWhitespaceRule
    | PasswordCharacterRule
    | PasswordStrengthRule
    | PasswordRuleGroup

  enum FileStatus {
    Incomplete
    Complete
    Approved
  }

  type File {
    id: ID!
    name: String
    status: String
  }

  type Subscription {
    updateStatus: File
  }
`;
